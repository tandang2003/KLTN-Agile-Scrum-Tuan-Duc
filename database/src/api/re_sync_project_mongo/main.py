import pandas as pd
from src.api.utils import set_header, get_project_token, login, ROOT_PATH, BASE_API
from src.connection.mongo import get_mongo_client
import uuid

df = pd.read_csv(ROOT_PATH / "re_sync_project_mongo" / "project.csv",  sep="\t")  # contains only 'uniId'

# 2. Convert string dates to datetime
date_cols = ["dt_created", "dt_modified", "last_modified_by"]
for col in date_cols:
    df[col] = pd.to_datetime(df[col])

# 3. Add _id manually (UUID)
df["_id"] = [str(uuid.uuid4()) for _ in range(len(df))]

# 4. Convert to dicts for MongoDB
records = df.to_dict(orient="records")
# 5. Connect to MongoDB
db = get_mongo_client()
collection = db["project"]

# 6. Insert into collection
collection.insert_many(records)

print("✅ Data inserted successfully.")