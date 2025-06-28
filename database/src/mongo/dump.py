import subprocess
from src.config.env_config import MONGODB_CONFIG, FOLDER_DATA_MONGO
from datetime import datetime
from pathlib import Path

def backup_mongodb():
    # Timestamped backup folder
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    backup_dir = Path(FOLDER_DATA_MONGO) / timestamp
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
    backup_mongodb()
