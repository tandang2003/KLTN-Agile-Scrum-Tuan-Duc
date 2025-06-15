import mysql.connector
import os
import uuid
from datetime import datetime

script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'linkedin_skills.txt')

skills = [
    "Python", "JavaScript", "HTML", "CSS", "SQL", "Java", "C++", "Git",
    "Docker", "Kubernetes", "AWS", "Azure", "TensorFlow", "React", "Node.js",
    "Linux", "Agile", "Scrum", "Machine Learning", "Data Analysis"
]

with open(file_path, "w", encoding="utf-8") as f:
    for skill in skills:
        f.write(skill + "\n")

print("✅ Skill file created.")



# Database connection config
db_config = {
    'host': 'localhost',
    'user': 'root ',
    'password': '123',
    'database': 'kltn'
}

# Connect to database
conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

# Open your text file
with open(file_path, 'r', encoding='utf-8') as file:
    for line in file:
        skill_name = line.strip()
        if skill_name:  # Ignore empty lines
            skill_id = str(uuid.uuid4())  # Generate a UUID
            dt_created = datetime.now()
            cursor.execute(
                "INSERT INTO skills (id, name, dt_created) VALUES (%s, %s, %s)",
                (skill_id, skill_name, dt_created)
            )

# Commit changes and close connection
conn.commit()
cursor.close()
conn.close()

print("Done inserting skills into database.")
