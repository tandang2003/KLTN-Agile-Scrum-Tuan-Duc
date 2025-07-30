import pandas as pd
from src.api.utils import ROOT_PATH, get_project_token, set_header, login, BASE_API
import requests
import random

def preprocess ():
  # Load your CSV
  df = pd.read_csv(ROOT_PATH /"create_skill"/ "skill.csv", sep="\t")

  df['topics'] = df['topics'].astype(str).str.strip()
  df = df[df['topics'] != "(Không có topic kỹ thuật trực tiếp)"]

  # Ensure 'topics', 'assigneeId', and 'reviewerId' are treated as strings
  df['topics'] = df['topics'].fillna("").astype(str)
  df['assigneeId'] = df['assigneeId'].astype(str)
  df['reviewerId'] = df['reviewerId'].astype(str)

  # Create a long-format DataFrame: one row per (uniId, topic)
  rows = []

  for _, row in df.iterrows():
      topic_list = [t.strip() for t in row['topics'].split(',') if t.strip()]
      for uid in [row['assigneeId'], row['reviewerId']]:
          for topic in topic_list:
              rows.append((uid, topic))

  long_df = pd.DataFrame(rows, columns=['uniId', 'skill'])

  # Group by uniId and get unique list of skills
  grouped = long_df.groupby('uniId')['skill'].unique().reset_index()

  # Optionally join into a comma-separated string
  grouped['skills'] = grouped['skill'].apply(lambda x: ', '.join(sorted(set(x))))
  grouped.drop(columns='skill', inplace=True)

  # Output result
  print(grouped)

  # Save to CSV if needed
  grouped.to_csv(ROOT_PATH / "create_skill" / "uniid_skill_mapping.csv", index=False)


def main():
  # Load tracking file if exists
    tracking_file = ROOT_PATH / "create_skill" / "created_skills.csv"
    if tracking_file.exists():
        created_df = pd.read_csv(tracking_file)
    else:
        created_df = pd.DataFrame(columns=["uniId", "skill"])

    df = pd.read_csv(ROOT_PATH / "create_skill" / "uniid_skill_mapping.csv")

    for index, row in df.iterrows():
        uni_id = str(row['uniId'])
        password = "123456" if uni_id == "21130320" else "123123123"
        login_payload = {"uniId": uni_id, "password": password}
        access_token = login(login_payload)
        headers = set_header(access_token)

        skill_str = str(row["skills"])
        skills = [s.strip() for s in skill_str.split(",") if s.strip().lower() != "nan" and s.strip() != ""]
        for skill in skills:
            # Check if skill already created
            if ((created_df["uniId"] == uni_id) & (created_df["skill"] == skill)).any():
                print(f"⏩ Skill '{skill}' for user {uni_id} already exists, skipping.")
                continue

            body = {
                "skillName": skill,
                "proficiency": random.randint(1, 5)
            }

            print(f"Creating skill for {uni_id}: {body}")
            response = requests.post(f"{BASE_API}/skill", headers=headers, json=body)
            if response.status_code == 200:
                print("✅ Create success")
                # Append to tracking
                created_df = pd.concat([
                    created_df,
                    pd.DataFrame([{"uniId": uni_id, "skill": skill}])
                ], ignore_index=True)
            else:
                print(f"❌ Create failed: {response.status_code} - {response.text}")

    # Save updated tracking file
    created_df.to_csv(tracking_file, index=False)


if __name__ == '__main__':
    main()