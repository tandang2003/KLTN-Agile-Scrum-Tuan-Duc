import subprocess
import sys
from pathlib import Path
from src.config.env_config import MONGODB_CONFIG, FOLDER_DATA_MONGO

def restore_mongodb(timestamp, target_db=None):
    source_dir = FOLDER_DATA_MONGO / timestamp / "kltn"
    if not source_dir.exists():
        print(f"❌ Backup folder not found: {source_dir}")
        return

    base_cmd = [
        "mongorestore",
        f"--host={MONGODB_CONFIG['HOST']}",
        f"--port={MONGODB_CONFIG['PORT']}",
        f"--username={MONGODB_CONFIG['USERNAME']}",
        f"--password={MONGODB_CONFIG['PASSWORD']}",
        f"--db={MONGODB_CONFIG['DATABASE']}",
        "--authenticationDatabase=admin"
    ]

    if target_db:
        # Merge mode: restore into another database without dropping
        base_cmd += [
            "--nsFrom", f"{MONGODB_CONFIG['DATABASE']}.*",
            "--nsTo", f"{target_db}.*"
        ]
        print(f"🔄 Restoring into new database: {target_db} (merge mode)")
    else:
        # Overwrite mode: drop collections and restore
        base_cmd.append("--drop")
        print(f"🔄 Restoring original database: {MONGODB_CONFIG['DATABASE']} (overwrite mode)")

    base_cmd.append(str(source_dir))

    subprocess.run(base_cmd, check=True)
    print("✅ Restore completed.")

def main():
    if len(sys.argv) < 2:
        print("❌ Usage: python restore_mongodb.py <timestamp> [target_db]")
        return

    timestamp = sys.argv[1]
    target_db = sys.argv[2] if len(sys.argv) > 2 else None

    restore_mongodb(timestamp, target_db)

if __name__ == "__main__":
    main()
