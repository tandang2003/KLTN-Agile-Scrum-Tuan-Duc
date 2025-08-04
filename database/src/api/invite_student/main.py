import requests
from src.api.utils import set_header, get_project_token, login, ROOT_PATH, BASE_API
import pandas as pd
UNI_ID = "1000001"
PASSWORD = "123123123"
workspace_id = "f228ad1b-f250-41b6-ab6e-7979a8c78a52"

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