from src.connection.mysql import get_mysql_connection
from src.connection.mongo import get_mongo_client

workspace_id = '3d4c23db-a9f0-41d2-aa6e-5254b7f48277'
project_ids = []
issue_ids = []

# === MySQL: Create/Delete Procedure ===
conn = get_mysql_connection()
try:
    with conn.cursor() as cursor:
        # 1️⃣ Get project IDs
        cursor.execute("""
            SELECT DISTINCT project_id 
            FROM workspaces_users_projects 
            WHERE workspace_id = %s
        """, (workspace_id,))
        rows = cursor.fetchall()
        project_ids = [row['project_id'] for row in rows]
        print(f"📦 Found {len(project_ids)} project(s) in workspace.")

        # 2️⃣ Get issue IDs
        cursor.execute("""
            SELECT DISTINCT issues.id
            FROM issues 
            JOIN workspaces_users_projects wup 
            ON wup.project_id = issues.project_id
            WHERE wup.workspace_id = %s
        """, (workspace_id,))
        rows = cursor.fetchall()
        issue_ids = [row['id'] for row in rows]
        print(f"📦 Found {len(issue_ids)} issue(s) in workspace.")

        # Create procedure
        procedure_sql = """
        CREATE PROCEDURE delete_workspace(IN p_workspace_id VARCHAR(36))
        BEGIN
            START TRANSACTION;

            DROP TEMPORARY TABLE IF EXISTS tmp_project_ids;
            CREATE TEMPORARY TABLE tmp_project_ids
            SELECT wup.project_id
            FROM workspaces_users_projects wup
            WHERE wup.workspace_id = p_workspace_id;

            DELETE ir
            FROM issue_resources ir
            JOIN issues i ON ir.issue_id = i.id
            WHERE i.project_id IN (SELECT project_id FROM tmp_project_ids);

            DELETE r
            FROM issue_relation r
            JOIN issues i ON r.issue_id = i.id
            WHERE i.project_id IN (SELECT project_id FROM tmp_project_ids);

            DELETE FROM issues
            WHERE project_id IN (SELECT project_id FROM tmp_project_ids);

            DELETE sr
            FROM sprint_resource sr
            JOIN sprints s ON sr.sprint_id = s.id
            WHERE s.workspace_id = p_workspace_id;

            DELETE ps
            FROM project_sprint ps
            JOIN sprints s ON ps.sprint_id = s.id
            WHERE s.workspace_id = p_workspace_id;

            DELETE FROM sprints
            WHERE workspace_id = p_workspace_id;

            DELETE FROM workspaces_users_projects
            WHERE workspace_id = p_workspace_id;

            DELETE FROM projects
            WHERE id IN (SELECT project_id FROM tmp_project_ids);

            DELETE FROM workspaces
            WHERE id = p_workspace_id;

            DROP TEMPORARY TABLE IF EXISTS tmp_project_ids;

            COMMIT;
        END
        """
        # 1️⃣ Drop existing procedure if any
        cursor.execute("DROP PROCEDURE IF EXISTS delete_workspace")
        print("✅ Existing procedure dropped (if any)")

        # 2️⃣ Create procedure
        cursor.execute(procedure_sql)
        print("✅ Procedure created successfully")

        # 3️⃣ Call procedure
        cursor.execute("CALL delete_workspace(%s)", (workspace_id,))
        conn.commit()
        print(f"✅ Procedure delete_workspace executed for workspace {workspace_id}")

finally:
    conn.close()


# === MongoDB Cleanup ===
db = get_mongo_client()

# Delete projects
res = db.project.delete_many({"nk_project_id": {"$in": project_ids}})
print(f"📦 Deleted {res.deleted_count} project(s)")

# Delete change logs
res = db.changeLog.delete_many({"change.projectId": {"$in": project_ids}})
print(f"📦 Deleted {res.deleted_count} change log(s)")

# Delete issues
res = db.issue.delete_many({"nk_task_id": {"$in": issue_ids}})
print(f"📦 Deleted {res.deleted_count} issue(s)")

# Delete project snapshots
res = db.projectSnapshot.delete_many({"nk_project_id": {"$in": project_ids}})
print(f"📦 Deleted {res.deleted_count} project snapshot(s)")
