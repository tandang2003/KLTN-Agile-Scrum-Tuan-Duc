from src.connection.mysql import get_mysql_connection
from src.connection.mongo import get_mongo_client

# 🔧 Config
workspace_id = '80e07861-b2ba-4c27-88f7-b5ec46872474'

# === MYSQL: Get all project IDs in the workspace ===
project_ids = ['c090565e-6aba-4a26-90c2-a06e5be18e0e']

# === LOOP THROUGH EACH PROJECT ===
for project_id in project_ids:
    print(f"\n🔁 Processing project: {project_id}")

    # === MYSQL: Update issues for project ===
    conn = get_mysql_connection()
    try:
        with conn.cursor() as cursor:
            # First update
            update_issues = """
                UPDATE issues 
                JOIN sprints ON sprints.id = issues.sprint_id 
                SET issues.status = 'TODO',
                    issues.dt_append = sprints.dt_start,
                    issues.open = %s
                WHERE issues.project_id = %s AND issues.status != 'BACKLOG'
            """
            cursor.execute(update_issues, (True, project_id))
            print(f"✅ Updated {cursor.rowcount} issue(s) in MySQL for project {project_id}.")

            # Second update
            update_project_sprint = """
                UPDATE project_sprint
                SET project_sprint.dt_last_predicted = NULL, 
                    project_sprint.predicted_result = -2,
                    project_sprint.dt_last_predicted_second = NULL,
                    project_sprint.predicted_result_second = -2
                WHERE project_sprint.project_id = %s
            """
            cursor.execute(update_project_sprint, (project_id,))
            print(f"✅ Updated {cursor.rowcount} project_sprint row(s) in MySQL for project {project_id}.")

        conn.commit()
    finally:
        conn.close()

    # === MONGO: Clean and reset board ===
    db = get_mongo_client()

    # 🚮 Delete change logs
    change_log_result = db['changeLog'].delete_many({"projectId": project_id})
    print(f"🗑️ Deleted {change_log_result.deleted_count} changeLog entries.")

    # 🚮 Delete snapshots
    snapshot_result = db['projectSnapshot'].delete_many({"nk_project_id": project_id})
    print(f"🗑️ Deleted {snapshot_result.deleted_count} projectSnapshot entries.")

    # 🔄 Reset sprint board statuses
    projects_collection = db['project']  # collection name
    query = {"nk_project_id": project_id}
    projects = projects_collection.find(query)

    for project in projects:
        updated = False
        position = project.get("position", {})

        for sprint_id, board in position.items():
            if not isinstance(board, dict):
                continue

            # Collect all issue IDs from all columns
            all_issues = set()
            for status in ["TODO", "INPROCESS", "REVIEW", "DONE"]:
                issues = board.get(status)
                if isinstance(issues, list):
                    all_issues.update(issues)

            # Set all to TODO, clear the rest
            board["TODO"] = list(all_issues)
            board["INPROCESS"] = []
            board["REVIEW"] = []
            board["DONE"] = []

            updated = True

        if updated:
            projects_collection.update_one(
                {"_id": project["_id"]},
                {"$set": {"position": position}}
            )
            print(f"🧹 Reset sprint board for project document: {project['_id']}")
