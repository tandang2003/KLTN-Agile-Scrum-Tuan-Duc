import requests
from src.api.utils import set_header, get_project_token, login, ROOT_PATH, BASE_API
import pandas as pd
import json

WORKSPACE_ID = "26b84f37-a0bb-4d11-8cc4-785e7707dfbb"
UNI_ID='21130371'
PASSWORD='123123123'
ISSUE_FILE='issue.csv'

priority_map = {
    "EASY": 0,
    "MEDIUM": 1,
    "HARD": 2
}
def parse_date(date_str: str) -> str:
    """Convert dd/mm/yyyy to ISO 8601 UTC format."""
    dt = datetime.strptime(date_str.strip(), "%d/%m/%Y")
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def preprocess ():
    df = pd.read_csv(ROOT_PATH / "create_issue" / ISSUE_FILE, encoding='utf-8')

    # Drop completely empty rows
    df.dropna(how='all', inplace=True)

    # Optionally reset index
    df.reset_index(drop=True, inplace=True)
    df[df.select_dtypes(include=['object']).columns] = df.select_dtypes(include=['object']).fillna("")
    # Fill NaNs with empty strings if needed
    df = df[df["priority"].astype(str).str.strip() != ""]
    # Normalize 'uniId' (handle float-like values)
    if "uniId" in df.columns:
        df["uniId"] = df["uniId"].apply(lambda x: str(int(float(x))) if pd.notna(x) and str(x).strip() != "" else "")
    return df

def main():
  # Step 1: Authenticate and get headers
    login_payload = {"uniId": UNI_ID, "password": PASSWORD}
    access_token = login(login_payload)

    headers = set_header(access_token)
    project_token, project_id, project_ids = get_project_token(WORKSPACE_ID, headers)
    headers = set_header(access_token, project_token)

    df = preprocess()
    
    if "id" not in df.columns:
        df["id"] = ""
    
    matching_rows = df[df["uniId"] == UNI_ID]
    print(matching_rows)
    for index, row in matching_rows.iterrows():
      try:
        if row["id"]:  # ✅ Skip if already created
                print(f"Skipping row {index} — already has ID: {row['id']}")
                continue

        topics_raw = row.get("topics_mapper", "")
        topics = str(topics_raw).strip().split(", ")
        topics_json = [{"name": topic.strip(), "color": ""} for topic in topics if topic.strip()]

        subtasks = str(row['subtasks']).strip().split(" - ")
        subtasks_json = [
            {"name": sub.strip(), "order": i, "checked": False}
            for i, sub in enumerate(subtasks) if sub.strip()
        ]

        body = {
            "name": str(row['name']).strip(),
            "projectId": str(row['projectId']).strip(),
            "sprintId": str(row['sprintId']).strip(),
            "status": "TODO",
            "priority": str(row['priority']).strip(),
            "assigneeId": str(row['assigneeId']),
            "reviewerId": str(row['reviewerId']),
            "tag": str(row['tag']).strip(),
            "topics": topics_json,
            "subtasks": subtasks_json,
            "complexOfDescription": priority_map.get(str(row['complexOfDescription']).strip().upper(), 0),
            "start": parse_date(row["start"]),
             "end": parse_date(row["end"]),
        }

        print(json.dumps(body, indent=4, ensure_ascii=False))
        try:
            response = requests.post(f"{BASE_API}/issue", headers=headers, json=body)
            if response.status_code == 200:
                  issue_id = response.json().get("data", {}).get("id")
                  df.at[index, "id"] = issue_id
                  print(f"✅ Issue created with ID: {issue_id}")
            else:
                print(f"❌ Failed at index {index}: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Error at index {index}: {e}")

     
      except Exception as e:
        print(f"Skipping row {index} due to error: {e}")
    # Optionally save updated CSV
    df.to_csv(ROOT_PATH / "create_issue" /"issue_with_ids_.tsv", sep="\t", index=False)

if __name__ == '__main__':
    main()