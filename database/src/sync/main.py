import requests

URL_LOGIN = "http://localhost:8080/auth"
UNI_ID=21130320
PASSWORD="123456"
login_payload = {
    "uniId": UNI_ID,
    "password": PASSWORD
}

def login(body):
    response = requests.post(URL_LOGIN, json=body)
    if response.status_code == 200:
        return response.json().get("data", {}).get("access_token")
    else:
        print(f"❌ Login failed for : {response.text}")
        return None
    
access_token = login(login_payload)

headers = {
    "Authorization": f"Bearer {access_token}",
            'Content-Type': 'application/json'
}

def getWorkspace():
    URL_LIST_WORKSPACE = 'http://localhost:8080/workspace/list'
    response = requests.get(URL_LIST_WORKSPACE, headers=headers)
    list_workspace = response.json().get("data", {}).get("items", [])
    workspace_ids=[]
    for item in list_workspace:
      workspace_ids.append(item.get("id"))
    return workspace_ids


def getSprintByWorkspace(workspace_id):
    URL_LIST_WORKSPACE = f'http://localhost:8080/sprint/list?workspace_id={workspace_id}'
    response = requests.get(URL_LIST_WORKSPACE, headers=headers)
    list_sprint = response.json().get("data", [])
    result=[]
    for item in list_sprint:
      result.append(item.get("id"))
    return result

def getTokenProject(workspace_id):
    URL_TOKEN_PROJECT = f"http://localhost:8080/workspace/project/user-info?workspaceId={workspace_id}"
    response = requests.get(URL_TOKEN_PROJECT, headers=headers)
    if response.status_code == 200:
        try:
            data = response.json()
            project_token = data.get("data", {}).get("project_authorization_token")
            project_id = data.get("data", {}).get("project_id")

            return project_id, project_token
        except Exception as e:
            print("❌ Lỗi phân tích JSON:", e)
            exit()
    else:
        print(f"❌ Lỗi khi lấy project token. Status code: {response.status_code}")
        print(response.text)
        exit()

def getIssuesBySprintAndProjectId(sprint_id, project_id):

workspace_ids=getWorkspace()
for workspace_id in workspace_ids:
   sprint_ids = getSprintByWorkspace(workspace_id)
   print(sprint_ids)