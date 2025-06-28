import subprocess
import sys
from pathlib import Path
from src.config.env_config import MYSQL_CONFIG, FOLDER_DATA_MYSQL

def run_sql_file(sql_path, target_db):
    mysql_cmd = [
        "mysql",
        f"--host={MYSQL_CONFIG['HOST']}",
        f"--port={MYSQL_CONFIG['PORT']}",
        f"--user={MYSQL_CONFIG['USERNAME']}",
        f"--password={MYSQL_CONFIG['PASSWORD']}",
        target_db,
    ]
    print(f"📂 Restoring {sql_path.name} ...")
    try:
        with sql_path.open("rb") as f:
            subprocess.run(mysql_cmd, stdin=f, check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to restore {sql_path.name}: {e}")
        sys.exit(1)

def create_database_if_not_exists(db_name):
    mysql_cmd = [
        "mysql",
        f"--host={MYSQL_CONFIG['HOST']}",
        f"--port={MYSQL_CONFIG['PORT']}",
        f"--user={MYSQL_CONFIG['USERNAME']}",
        f"--password={MYSQL_CONFIG['PASSWORD']}",
        "-e",  # execute the following query
        f"CREATE DATABASE IF NOT EXISTS `{db_name}`;"
    ]
    print(f"🔧 Ensuring database `{db_name}` exists...")
    try:
        subprocess.run(mysql_cmd, check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to create database {db_name}: {e}")
        sys.exit(1)

def restore_mysql(timestamp, target_db=None):
    backup_dir = FOLDER_DATA_MYSQL / timestamp

    if not backup_dir.exists():
        print(f"❌ Backup folder not found: {backup_dir}")
        return

    target_db = target_db or MYSQL_CONFIG["DATABASE"]

    schema_file = backup_dir / "schema.sql"
    data_file = backup_dir / "data.sql"

    if not schema_file.exists():
        print(f"❌ schema.sql not found in {backup_dir}")
        return
    if not data_file.exists():
        print(f"❌ data.sql not found in {backup_dir}")
        return

    create_database_if_not_exists(target_db)

    print(f"🔄 Restoring database `{target_db}` from timestamp `{timestamp}`")

    # Run schema.sql first
    run_sql_file(schema_file, target_db)

    # Then run data.sql
    run_sql_file(data_file, target_db)

    print("✅ Restore completed.")

def main():
    if len(sys.argv) < 2:
        print("❌ Usage: python restore_mysql.py <timestamp> [target_db]")
        return

    timestamp = sys.argv[1]
    target_db = sys.argv[2] if len(sys.argv) > 2 else None

    restore_mysql(timestamp, target_db)

if __name__ == "__main__":
    main()
