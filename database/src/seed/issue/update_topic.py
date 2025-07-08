import mysql.connector
from pymongo import MongoClient

# Connect to MySQL
mysql_conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123",
    database="kltn"
)
mysql_cursor = mysql_conn.cursor(dictionary=True)

# Connect to MongoDB
mongo_client = MongoClient("mongodb://root:123@localhost:27017/kltn?authSource=admin")
mongo_db = mongo_client["kltn"]
mongo_collection = mongo_db["issue"]

project_id = "caf9e00b-e1c5-4b0f-9c49-2eac892a327e"

# Step 1: Get MySQL issue ID -> name mapping
mysql_cursor.execute("SELECT id, name FROM issues WHERE project_id = %s", (project_id,))

data =[]

for row in mysql_cursor.fetchall():
    data.append({
        "id": row["id"],
        "name": row["name"],
        "topics": None 
    })

id_to_data = {row["id"]: row for row in data}

mongo_issues_with_topics = mongo_collection.find(
    {
        "nk_task_id": {
            "$in": [row["id"] for row in data]
        },
    }
)

for issue in mongo_issues_with_topics:
    nk_task_id = issue.get("nk_task_id")
    topics = issue.get("topics")

    if nk_task_id in id_to_data:
        id_to_data[nk_task_id]["topics"] = topics

# Step 4: Print results
for row in data:
    print(f"MySQL ID: {row['id']}, Name: {row['name']}, Topics: {row['topics']}")

# for name, index in names:
#     mysql_cursor.execute("SELECT id, name FROM issues WHERE name = %s", (name))
#     issue_same_name = mysql_cursor.fetchall()
#     for issue in issue_same_name:
#         mysql_id = issue["id"]
#         mongo_collection.update_many(
#             {"nk_task_id": mysql_id},
#             {"$set": {"topics": name}}
#         )
#         print(f"Updated MongoDB Issue ID: {issue['_id']} with Topic: {name}")

mysql_cursor.execute( "SELECT id, name FROM issues WHERE project_id != %s", (project_id,))

grouped_by_name = {}

for row in mysql_cursor.fetchall():
    name = row["name"]
    issue_id = row["id"]
    if name not in grouped_by_name:
        grouped_by_name[name] = []
    grouped_by_name[name].append(issue_id)

# Print result
for name, ids in grouped_by_name.items():
    print(f"Name: {name}, IDs: {ids}")

    topics = None
    for row in data:
        if row["name"] == name and row["topics"] is not None:
            topics = row["topics"]
            break
    for issue_id in ids:
        mongo_collection.update_many(
            {"nk_task_id": issue_id},
            {"$set": {"topics": topics}}
        )
        print(f"Updated MongoDB Issue ID: {issue_id} with Topic: {topics}")

