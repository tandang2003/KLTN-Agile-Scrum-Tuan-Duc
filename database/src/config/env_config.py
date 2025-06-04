from pathlib import Path
import os
from dotenv import load_dotenv

ROOT_DIR = Path(__file__).parent.parent.parent
FOLDER_DATA_MYSQL = ROOT_DIR / "data" / "mysql"
FOLDER_DATA_MONGO = ROOT_DIR / "data" / "mongo"

PATH_ENV = os.path.join(ROOT_DIR, ".env")


load_dotenv(dotenv_path=PATH_ENV)

MYSQL_CONFIG = {
    "HOST": os.getenv("MYSQL_HOST"),
    "PORT": int(os.getenv("MYSQL_PORT", 3306)),
    "USERNAME": os.getenv("MYSQL_USERNAME"),
    "PASSWORD": os.getenv("MYSQL_PASSWORD"),
    "DATABASE": os.getenv("MYSQL_DATABASE"),
}
MONGODB_CONFIG = {
    "HOST": os.getenv("MONGODB_HOST"),
    "PORT": int(os.getenv("MONGODB_PORT", 27017)),
    "USERNAME": os.getenv("MONGODB_USERNAME"),
    "PASSWORD": os.getenv("MONGODB_PASSWORD"),
    "DATABASE": os.getenv("MONGODB_DATABASE"),
}
