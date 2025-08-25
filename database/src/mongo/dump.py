import subprocess
from src.config.env_config import MONGODB_CONFIG, FOLDER_DATA_MONGO
from datetime import datetime
from pathlib import Path
import sys

def backup_mongodb(postfix: str = ""):
    # Timestamped backup folder
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    backup_dir = Path(FOLDER_DATA_MONGO) / (timestamp + "_" + postfix)
    backup_dir.mkdir(parents=True, exist_ok=True)

    # Construct mongodump command
    command = [
        "mongodump",
        f"--host={MONGODB_CONFIG['HOST']}",
        f"--port={MONGODB_CONFIG['PORT']}",
        f"--username={MONGODB_CONFIG['USERNAME']}",
        f"--password={MONGODB_CONFIG['PASSWORD']}",
        "--authenticationDatabase=admin",  # Optional, adjust based on your setup
        "--db", MONGODB_CONFIG['DATABASE'],
        "--out", str(backup_dir)
    ]

    try:
        print("Running mongodump...")
        subprocess.run(command, check=True)
        print(f"✅ MongoDB backup completed: {backup_dir}")
    except subprocess.CalledProcessError as e:
        print("❌ Backup failed:", e)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("❌ Usage: python dump.py <timestamp>")
        sys.exit(1)

    postfix = sys.argv[1]
    backup_mongodb(postfix)
