from sqlalchemy.orm import Session
from pymongo.database import Database

from app.models.entity.issue import Issue
from app.db.database import get_db, get_mongo_db

class AggregateService:
  mysql: Session
  mongo: Database
  def __init__(self):
    self.mysql = get_db()
    self.mongo = get_mongo_db()

#   def get_aggreate_data(selfs, project_id, sprint_id):):
#
  def get_list_issues(self,project_id:str,sprint_id:str):
    issues = self.mysql.query(Issue).filter(
      Issue.project_id == project_id,
      Issue.sprint_id == sprint_id
    ).all()
    print(issues)
    return issues
  # def get_suitable_point(self, project_id, sprint_id):

#   def calculate_affect_version(self, issue_id):
#   def calculate_fix_version(self, issue_id):
#   def calculate_num_change_fix_version(self, issue_id):
#     def num_of_issue_link(
# return num_of_issue_link, blocked_by, blocks
# def get_issue_feature(self, issue_id):):

