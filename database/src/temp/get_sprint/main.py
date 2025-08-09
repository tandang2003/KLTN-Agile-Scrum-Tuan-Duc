from src.connection.mysql import get_mysql_connection
from src.config.env_config import ROOT_DIR
import pandas as pd
from pathlib import Path

conn = get_mysql_connection()

try:
    query = """
    SELECT title, description, dt_start, dt_end, dt_predict, story_point
    FROM sprints
    WHERE workspace_id = '26b84f37-a0bb-4d11-8cc4-785e7707dfbb'
    ORDER BY dt_start ASC
"""
    df = pd.read_sql(query, conn)

    print(f"✅ Retrieved {len(df)} rows")
    print(df.head())

    # Ensure output directory exists
    output_path = ROOT_DIR / 'data' / 'sprint.csv'
    Path(output_path.parent).mkdir(parents=True, exist_ok=True)

    df.to_csv(output_path, index=False)
    print(f"✅ CSV written to: {output_path}")

except Exception as e:
    print("❌ Error:", e)

finally:
    conn.close()
