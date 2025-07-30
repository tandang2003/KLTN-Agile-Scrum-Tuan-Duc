import requests
from typing import Tuple, Optional
from pathlib import Path

ROOT_PATH = Path(__file__).resolve().parent
BASE_API = "http://localhost:8080"
def login(body) -> str: 
    URL_LOGIN = "http://localhost:8080/auth"
    response = requests.post(URL_LOGIN, json=body)
    if response.status_code == 200:
        return response.json().get("data", {}).get("access_token")
    else:
        print(f"❌ Login failed for : {response.text}")
        return None
    
def set_header(access_token, project_token=None):
  headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
  if project_token:
        headers["Project-Authorization"] = project_token
  return headers

def get_project_token(workspace_id: str, headers: dict) -> Tuple[str,  Optional[str], list[str]]:
    URL_TOKEN_PROJECT = f"http://localhost:8080/workspace/project/user-info?workspaceId={workspace_id}"
    response = requests.get(URL_TOKEN_PROJECT, headers=headers)

    if response.status_code == 200:
        try:
            data = response.json().get("data", {})
            project_token: Optional[str] = data.get("project_authorization_token")
            project_id:  Optional[str]  = data.get("project_id") 
            project_ids : list[str] = data.get("project_ids") or []

            if not project_token:
                raise Exception("Missing project_token in the response.")

            return project_token, project_id, project_ids
        except Exception as e:
            raise Exception(f"❌ Lỗi phân tích JSON: {e}")
    else:
        raise Exception(
            f"❌ Lỗi khi lấy project token. Status code: {response.status_code}. Response: {response.text}"
        )