# mongo_util.py
from pymongo import MongoClient
from src.config.env_config import MONGODB_CONFIG, FOLDER_DATA_MONGO

def get_mongo_client():
    uri = f"mongodb://{MONGODB_CONFIG['USERNAME']}:{MONGODB_CONFIG['PASSWORD']}@{MONGODB_CONFIG['HOST']}:{MONGODB_CONFIG['PORT']}/{MONGODB_CONFIG['DATABASE']}?authSource=admin"
    client = MongoClient(uri, )
    return client[MONGODB_CONFIG['DATABASE']]
