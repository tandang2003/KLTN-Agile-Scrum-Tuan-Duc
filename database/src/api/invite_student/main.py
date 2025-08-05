import requests
from src.api.utils import set_header, get_project_token, login, ROOT_PATH, BASE_API
import pandas as pd
UNI_ID = "1000003"
PASSWORD = "123123123"
workspace_id = "139b821a-f5d0-49c8-9f26-da68e54d59a2"

def main ():
    # Step 1: Authenticate and get headers
    login_payload = {"uniId": UNI_ID, "password": PASSWORD}
    access_token = login(login_payload)

    headers = set_header(access_token)
    project_token, project_id, project_ids = get_project_token(workspace_id, headers)
    headers = set_header(access_token, project_token)
    df = pd.read_csv(ROOT_PATH / "invite_student" / "student.csv")
    studentIds = []
    for _ , row in df.iterrows():
        studentIds.append(str(row['uniId']).strip())
    body = {
        "workspaceId": workspace_id,
        "studentIds":studentIds
    }
    requests.post(f"{BASE_API}/workspace/student", headers=headers, json=body)

if __name__ == "__main__":
    main()