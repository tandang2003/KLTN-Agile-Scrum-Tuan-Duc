import pandas as pd
import requests
import json
import os

UNI_ID=21130363
PASSWORD="123123123"
CSV_NAME = "nhom4.csv"
CSV_FOLDER = "ltw"

# 1. LOGIN: Lấy access_token
URL_LOGIN = "http://localhost:8080/auth"
login_payload = {
    "uniId": UNI_ID,
    "password": PASSWORD
}

response = requests.post(URL_LOGIN, json=login_payload)
if response.status_code == 200:
    try:
        json_data = response.json()
        access_token = json_data.get("data", {}).get("access_token")
        if access_token:
            print("✅ Access token:", access_token)
        else:
            print("⚠️ Không tìm thấy access_token trong response:", json_data)
            exit()
    except Exception as e:
        print("❌ Lỗi parse JSON:", e)
        exit()
else:
    print(f"❌ Login thất bại. Status code: {response.status_code}")
    print(response.text)
    exit()

# 2. Lấy project_token từ workspace_id
workspace_id = "3d4c23db-a9f0-41d2-aa6e-5254b7f48277"
URL_TOKEN_PROJECT = f"http://localhost:8080/workspace/project/user-info?workspaceId={workspace_id}"

headers = {
    "Authorization": f"Bearer {access_token}"
}

response = requests.get(URL_TOKEN_PROJECT, headers=headers)
project_id = None
if response.status_code == 200:
    try:
        data = response.json()
        project_token = data.get("data", {}).get("project_authorization_token")
        project_id = data.get("data", {}).get("project_id")

        if project_token and project_id:
            print("🎯 Project Token:", project_token)
            print("📁 Project ID:", project_id)
        else:
            print("⚠️ Không tìm thấy token hoặc project_id:", data)
            exit()
    except Exception as e:
        print("❌ Lỗi phân tích JSON:", e)
        exit()
else:
    print(f"❌ Lỗi khi lấy project token. Status code: {response.status_code}")
    print(response.text)
    exit()

# 3. Đọc CSV và gửi API tạo issue
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(BASE_DIR, "data", CSV_FOLDER, CSV_NAME)
API_URL = 'http://localhost:8080/issue'

try:
    df = pd.read_csv(CSV_FILE)
except Exception as e:
    print("❌ Lỗi đọc file CSV:", e)
    exit()

# Headers cho tạo issue
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {access_token}",
    "Project-Authorization": project_token
}

positions = {}

# Tạo từng issue
for index, row in df.iterrows():
    issue_data = {
        "name": row["name"],
        "sprintId": row["sprint_id"] if pd.notna(row["sprint_id"]) else None,
        "projectId": project_id,
        "status": row["status"],
        "priority": row["priority"],
        "tag": row["tag"],
        "position": str(row["position"]),
        "description": row["description"] if pd.notna(row["description"]) else "<p><br></p>"
    }

    print(f"📌 Tạo issue: {issue_data}")
    response = requests.post(API_URL, headers=headers, data=json.dumps(issue_data))

    if response.status_code == 200:
        try:
            data = response.json().get("data", {})
            issue_id = data.get("id")
            sprint_id = data.get("sprintId")
            status = data.get("status")

            print(f"✅ Created: {issue_data['name']} | Issue ID: {issue_id} | Sprint ID: {sprint_id} | Status: {status}")

            if sprint_id:
                if sprint_id not in positions:
                    positions[sprint_id] = {
                        "TODO": [],
                        "INPROCESS": [],
                        "REVIEW": [],
                        "DONE": []
                    }
                positions[sprint_id][status].append(issue_id)

        except Exception as e:
            print(f"❌ Lỗi parse JSON response tạo issue: {e}")
    else:
        print(f"❌ Failed: {issue_data['name']} | Status: {response.status_code}")
        print(response.text)

# 4. Gửi position lên server
print(positions)
if positions:
    UPDATE_POSITION_URL = f"http://localhost:8080/project/{project_id}/position"
    position_payload = positions

    print("\n📦 Đang cập nhật position lên server...")
    response = requests.put(UPDATE_POSITION_URL, headers=headers, data=json.dumps(position_payload))

    if response.status_code == 200 or response.status_code == 201:
        print("✅ Cập nhật position thành công!")
    else:
        print(f"❌ Lỗi khi cập nhật position. Status code: {response.status_code}")
        print(response.text)
else:
    print("⚠️ Không có position nào để cập nhật.")