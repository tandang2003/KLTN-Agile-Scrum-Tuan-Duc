import requests
import json

PASSWORD = "123123123"
LOGIN_URL = "http://localhost:8080/auth"
CREATE_SKILL_URL = "http://localhost:8080/skill"

data = [
    #    {
    #     "uniId": "21130320",
    #     "skills": [
    #         {"skillName": "OOP", "proficiency": 3},
    #         {"skillName": "SQL", "proficiency": 2},
    #         {"skillName": "React", "proficiency": 4}
    #     ]
    # },
    {
        "uniId": "21130416",
        "skills": [
            {"skillName": "OOP", "proficiency": 2},
            {"skillName": "SQL", "proficiency": 3},
            {"skillName": "React", "proficiency": 3}
        ]
    },
    {
        "uniId": "21130319",
        "skills": [
            {"skillName": "OOP", "proficiency": 4},
            {"skillName": "SQL", "proficiency": 3},
            {"skillName": "React", "proficiency": 2}
        ]
    },
    {
        "uniId": "21130451",
        "skills": [
            {"skillName": "Python", "proficiency": 4},
            {"skillName": "HTML", "proficiency": 2},
            {"skillName": "Linux", "proficiency": 3}
        ]
    },
    {
        "uniId": "21130444",
        "skills": [
            {"skillName": "Python", "proficiency": 3},
            {"skillName": "HTML", "proficiency": 3},
            {"skillName": "Linux", "proficiency": 4}
        ]
    },
    {
        "uniId": "21130509",
        "skills": [
            {"skillName": "Python", "proficiency": 5},
            {"skillName": "HTML", "proficiency": 2},
            {"skillName": "Linux", "proficiency": 3}
        ]
    },
    {
        "uniId": "21130601",
        "skills": [
            {"skillName": "Java", "proficiency": 3},
            {"skillName": "Networking", "proficiency": 2},
            {"skillName": "DSA", "proficiency": 4}
        ]
    },
    {
        "uniId": "21130612",
        "skills": [
            {"skillName": "Java", "proficiency": 4},
            {"skillName": "Networking", "proficiency": 3},
            {"skillName": "DSA", "proficiency": 3}
        ]
    },
    {
        "uniId": "21130363",
        "skills": [
            {"skillName": "Java", "proficiency": 2},
            {"skillName": "Networking", "proficiency": 2},
            {"skillName": "DSA", "proficiency": 3}
        ]
    },
    {
        "uniId": "21130175",
        "skills": [
            {"skillName": "TypeScript", "proficiency": 3},
            {"skillName": "CI/CD", "proficiency": 2},
            {"skillName": "MongoDB", "proficiency": 4}
        ]
    },
    {
        "uniId": "21130171",
        "skills": [
            {"skillName": "TypeScript", "proficiency": 4},
            {"skillName": "CI/CD", "proficiency": 3},
            {"skillName": "MongoDB", "proficiency": 3}
        ]
    }
]

def login(uniId, password):
    response = requests.post(LOGIN_URL, json={
        "uniId": uniId,
        "password": password
    })
    if response.status_code == 200:
        return response.json().get("data", {}).get("access_token")
    else:
        print(f"❌ Login failed for {uniId}: {response.text}")
        return None

def create_skill(access_token, skill):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    response = requests.post(CREATE_SKILL_URL, json=skill, headers=headers)
    return response.status_code, response.text


def main():
  # 🔁 Loop through users
  for user in data:
      uniId = user["uniId"]
      skills = user["skills"]

      print(f"\n🔑 Logging in: {uniId}")
      token = login(uniId, PASSWORD)

      if token:
          for skill in skills:
              print(f"➕ Creating skill for {uniId}: {skill}")
              status, text = create_skill(token, skill)

              if status == 200 or status == 201:
                  print(f"✅ Skill added: {skill['skillName']}")
              else:
                  print(f"❌ Failed to add skill: {skill['skillName']} | {text}")

if __name__ == "__main__":
    main()