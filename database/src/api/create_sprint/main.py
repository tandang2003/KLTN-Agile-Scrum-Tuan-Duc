from src.api.utils import set_header, get_project_token, login, ROOT_PATH, BASE_API
from datetime import datetime
import pandas as pd
import requests


UNI_ID = "1000005"
PASSWORD = "123123123"


def parse_date(date_str: str) -> str:
    """Convert dd/mm/yyyy to ISO 8601 UTC format."""
    dt = datetime.strptime(date_str.strip(), "%d/%m/%Y")
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def calculate_predict_date(start_str: str, end_str: str) -> str:
    """Calculate middle date between start and end in ISO 8601 format."""
    try:
        start_date = datetime.strptime(start_str.strip(), "%d/%m/%Y")
        end_date = datetime.strptime(end_str.strip(), "%d/%m/%Y")
        midpoint = start_date + (end_date - start_date) / 2
        return midpoint.strftime("%Y-%m-%dT%H:%M:%SZ")
    except Exception as e:
        raise ValueError(f"Invalid date input: {start_str} / {end_str}. Reason: {e}")


def main():
    # Step 1: Authenticate and get headers
    login_payload = {"uniId": UNI_ID, "password": PASSWORD}
    access_token = login(login_payload)

    workspace_id = "26b84f37-a0bb-4d11-8cc4-785e7707dfbb"
    headers = set_header(access_token)
    project_token, project_id, project_ids = get_project_token(workspace_id, headers)
    headers = set_header(access_token, project_token)

    # Step 2: Load sprint data
    df = pd.read_csv(ROOT_PATH / "create_sprint" / "sprints.csv")
    df["sprint_id"] = None
    df["predict"] = None

    # Step 3: Process and create sprints
    for index, row in df.iterrows():
        try:
            predict_date = calculate_predict_date(row["start"], row["end"])

            body = {
                "workspaceId": workspace_id,
                "title": str(row["title"]).strip(),
                "description": str(row["description"]).strip(),
                "start": parse_date(row["start"]),
                "end": parse_date(row["end"]),
                "storyPoint": int(row["storyPoint"]),
                "predict": predict_date
            }

            response = requests.post(f"{BASE_API}/sprint", json=body, headers=headers)

            if response.status_code == 201:
                print(f"✅ Sprint created: {row['title']}")
                sprint_id = response.json().get("data", {}).get("id")
                df.at[index, "sprint_id"] = sprint_id
                df.at[index, "predict"] = predict_date
            else:
                print(f"❌ Failed to create sprint: {row['title']}")
                print(response.status_code, response.text)

            print("-" * 40)

        except Exception as e:
            print(f"❌ Error processing row {row.to_dict()}")
            print(f"Reason: {e}")

    # Step 4: Save results
    output_path = ROOT_PATH / "create_sprint" / "sprints_with_ids.csv"
    df.to_csv(output_path, index=False)
    print(f"✅ Saved updated sprint data to {output_path}")


if __name__ == "__main__":
    main()
