import mysql.connector
from pymongo import MongoClient

# --- MySQL Connection ---
mysql_conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123",
    database="kltn"
)

mysql_cursor = mysql_conn.cursor()
mysql_cursor.execute("SELECT id FROM issues")
mysql_ids = set(row[0] for row in mysql_cursor.fetchall())

# --- MongoDB Connection ---
mongo_client = MongoClient("mongodb://root:123@localhost:27017/kltn?authSource=admin")  # Adjust if needed
mongo_db = mongo_client["kltn"]
mongo_collection = mongo_db["issue"]

# --- Delete from MongoDB where nk_task_id not in MySQL ---
docs_not_in_mysql = mongo_collection.find({
    "nk_task_id": { "$nin": list(mysql_ids) }
})

# --- Show or handle these docs ---
for doc in docs_not_in_mysql:
    print("To delete:", doc["_id"], "->", doc["nk_task_id"])
    mongo_collection.delete_one({ "_id": doc["_id"] })  # Uncomment to delete

mysql_cursor.close()
mysql_conn.close()
mongo_client.close()