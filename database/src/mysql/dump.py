import subprocess
from src.config.env_config import MYSQL_CONFIG, FOLDER_DATA_MYSQL
from datetime import datetime
from pathlib import Path

# Output files
schema_file = "schema.sql"
data_file = "data.sql"

# Common MySQL login params
base_cmd = [
    "mysqldump",
    f"-u{MYSQL_CONFIG['USERNAME']}",
    f"-p{MYSQL_CONFIG['PASSWORD']}",
    f"-h{MYSQL_CONFIG['HOST']}",
    f"-P{MYSQL_CONFIG['PORT']}",
    MYSQL_CONFIG['DATABASE']
]


def dump_mysql (schema_file: Path, data_file: Path):
    # Dump schema only
    schema_cmd = base_cmd + ["--no-data"]
      

    # Dump data only
    data_cmd = base_cmd + ["--no-create-info"]

    print(f"Dumping schema to {schema_file}")
    with open(schema_file, "w", encoding="utf-8") as f_schema:
        subprocess.run(schema_cmd, stdout=f_schema, check=True)

    print(f"Dumping data to {data_file}")
    with open(data_file, "w", encoding="utf-8") as f_data:
        subprocess.run(data_cmd, stdout=f_data, check=True)


def main():
    # Create timestamp folder name
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    backup_dir = FOLDER_DATA_MYSQL / timestamp
    backup_dir.mkdir(parents=True, exist_ok=True)

    schema_file = backup_dir / "schema.sql"
    data_file = backup_dir / "data.sql"

    dump_mysql(schema_file, data_file)
    print(f"Backup completed successfully in folder: {backup_dir}")

if __name__ == "__main__":
    main()