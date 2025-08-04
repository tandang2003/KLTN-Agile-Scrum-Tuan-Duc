from src.api.utils import set_header, get_project_token, login, ROOT_PATH, BASE_API
import pandas as pd
import requests

workspace_id = "139b821a-f5d0-49c8-9f26-da68e54d59a2"
COURSE='android'
def merge_csv ():
    
    # Read the first file (only uniIds)
    df_first = pd.read_csv(ROOT_PATH / "create_project" / "grouped.csv",  sep="\t")  # contains only 'uniId'

    # Read the second file (id, uniId, name)
    df_second = pd.read_csv(ROOT_PATH / "create_project" / "student.csv", sep="\t")  # assuming it's tab-separated

    df_first["id"] = df_first["uniId"].map(df_second.set_index("uniId")["id"])

    # Save result
    df_first.to_csv(ROOT_PATH / "create_project" /"merged_output.csv", index=False)

def group_member():
    # Load student list
    df = pd.read_csv(ROOT_PATH / "create_project" / "merged_output.csv")

    # Drop rows where uniId is missing
    df = df.dropna(subset=["uniId"])

    # Reset index to ensure clean grouping
    df = df.reset_index(drop=True)

    # Add group number (1-based index)
    df['group'] = (df.index // 3) + 1

    # Get first member (sender) of each group
    senders = df.groupby("group").first().reset_index()

    # For each group, build the send list (exclude sender's uniId)
    send_lists = (
        df.groupby("group")["uniId"]
        .apply(list)
        .reset_index()
        .merge(senders[["group", "uniId"]], on="group", suffixes=("", "_sender"))
    )
    send_lists["send"] = send_lists.apply(
        lambda row: "\b".join(str(uid) for uid in row["uniId"] if uid != row["uniId_sender"]),
        axis=1
    )

    # Merge send info back into sender rows
    senders = senders.merge(send_lists[["group", "send"]], on="group")

    return senders


def main():
    # df = group_member()
    # df.to_csv(ROOT_PATH / "create_project" /"grouped.csv", index=False)
    # merge_csv()
    sent = []
    
    df = pd.read_csv(ROOT_PATH/ "create_project" / "data"/ COURSE  /"merged_output.csv")

    if "projectId" not in df.columns:
        df["projectId"] = None

    for index, row in df.iterrows():
      uni_id = str(row["uniId"]).strip()
      print(f"{uni_id}")
      # Step 1: Authenticate and get headers
      login_payload = {"uniId": uni_id, "password": "123456" if uni_id =='21130320' else "123123123"}
      try:
            access_token = login(login_payload)
            headers = set_header(access_token)
            project_token, project_id, project_ids = get_project_token(workspace_id, headers)
            headers = set_header(access_token, project_token)
      except Exception as e:
          print(f"❌ Login or token error for {uni_id}: {e}")
          continue
      
      # Step 2: Create project
      try:
          body = {
              "name": str(row['name']),
              "description": str(row.get('desc', '')),
              "workspaceId": workspace_id,
              "userId": str(row['user-id'])
          }

          print("Creating project:", body)
          response = requests.post(f"{BASE_API}/project", headers=headers, json=body)

          if response.status_code == 201:
              project_id = response.json().get("data", {}).get("id")
              print(f"✅ Project created: {project_id}")

              # Step 3: Invite users
              send_list = str(row['send']).split(' - ')  # \b is BACKSPACE; use '\\b' or better delimiter if needed
              # ⬅️ Save projectId into DataFrame
              df.at[index, "projectId"] = project_id
              invite_body = {
                  "projectId": project_id,
                  "workspaceId": workspace_id,
                  "userId": send_list  # assuming API accepts a list
              }

              invite_response = requests.post(f"{BASE_API}/project/invite", headers=headers, json=invite_body)

              if invite_response.status_code == 200:
                  print("✅ Invites sent")
                  sent.extend(send_list)
              else:
                  print(f"❌ Invite failed: {invite_response.status_code} - {invite_response.text}")
          else:
              print(f"❌ Project creation failed: {response.status_code} - {response.text}")

      except Exception as e:
          print(f"❌ Error processing row {index}: {e}")
          continue

    df.to_csv(ROOT_PATH / "create_project" /  "data"/ COURSE  / "merged_output_with_project_ids.csv", index=False)
    print("✅ Saved updated CSV with project IDs")
    
    print("All invited uniIds:", ",".join(map(str, sent)))

if __name__ == '__main__':
    main()