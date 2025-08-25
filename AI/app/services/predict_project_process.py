from typing import List

import joblib
import pandas as pd
from pandas import CategoricalDtype

from app.dto.iteration import IterationModel
from app.models.sprint import map_to_dataframe as sprintMapDataframe, map_list as sprintMapList
from app.models.Issue import map_list as issueMapList, issues_to_dataframe as issueMapListToDataFrame

feature_cols_30 =['story_point',
 'no_issue_inprogress',
 'no_issue_starttime',
 'no_issue_added',
 'no_team_size',
 'no_issue_done',
 'no_issue_blocking',
 'no_issue_blocked',
 'no_fix_version_change',
 'no_priority_change',
 'no_description_change',
 'suitable_assignee',
 'type_PRACTICE',
 'type_THEORY',
 'priority_BLOCKED',
 'priority_CRITICAL',
 'priority_MAJOR',
 'priority_MINOR',
 'priority_TRIVIAL',
 'complexity_of_description_0',
 'complexity_of_description_1',
 'complexity_of_description_2']
model = joblib.load("models/random_forest_model_30.joblib")
class Project_Process():

  def __init__(self, under=0.1, sprint_data=None, issue_data=None):
    self.under = 0.08843052496134951
    self.sprint_data = sprint_data
    self.issue_data = issue_data

  @classmethod
  def insert_data(cls, data):
    return cls(None, data)

  @classmethod
  def insert_model(cls, model):
    return cls(model, None)

  def set_sprint_data(self, sprint_data:List[IterationModel]):

    self.sprint_data = sprintMapList(sprint_data)

  def set_issue_data(self, issue_data:List[IterationModel]):
    list =[];
    for issue in issue_data:
      list.append(issueMapListToDataFrame(issueMapList(issue.issueModelList)))
    self.issue_data = list

  def set_under(self, under):
    self.under = under

  def process(self):
    # --- 1️⃣ Gán nhãn Project_success_sprint cho mỗi sprint ---
    df_sprints = self.sprint_data.copy()
    df_sprints['Project_success_sprint'] = (df_sprints['vel_diff'] >= float(self.under)).astype(int)
    df_issues = self.issue_data.copy()

    # --- 2️⃣ BoW cho các cột categorical của issue ---
    cat_cols = ["type", "priority", "complexity_of_description"]

    # Các giá trị hợp lệ
    issue_types = ["THEORY", "PRACTICE"]
    priorities = ["TRIVIAL", "MINOR", "MAJOR", "CRITICAL", "BLOCKED"]

    # Chuyển cột về Categorical với đầy đủ category
    df_issues['type'] = df_issues['type'].astype(CategoricalDtype(categories=issue_types))
    df_issues['priority'] = df_issues['priority'].astype(CategoricalDtype(categories=priorities))

    # Điền giá trị mặc định nếu null
    df_issues['type'] = df_issues['type'].fillna('THEORY')
    df_issues['priority'] = df_issues['priority'].fillna('TRIVIAL')

    # One-hot / BoW
    df_issues_bow = pd.get_dummies(df_issues, columns=cat_cols)

    # Đảm bảo tất cả các cột type/priority có mặt
    for t in issue_types:
      col_name = f"type_{t}"
      if col_name not in df_issues_bow.columns:
        df_issues_bow[col_name] = 0

    for p in priorities:
      col_name = f"priority_{p}"
      if col_name not in df_issues_bow.columns:
        df_issues_bow[col_name] = 0

    # --- 3️⃣ Tổng hợp issue theo project ---
    df_issues_agg = df_issues_bow.groupby("project_id").agg({
      "no_issue_blocking": "sum",
      "no_issue_blocked": "sum",
      "no_fix_version_change": "sum",
      "no_priority_change": "sum",
      "no_description_change": "sum",
      "suitable_assignee": "mean",
      # các cột one-hot
      **{col: "sum" for col in df_issues_bow.columns if col.startswith(tuple(cat_cols))}
    }).reset_index()

    # --- 4️⃣ Tổng hợp sprint theo project ---
    df_sprint_agg = df_sprints.groupby("project_id").agg({
      "story_point": "sum",
      "no_issue_inprogress": "sum",
      "no_issue_starttime": "sum",
      "no_issue_added": "sum",
      "no_team_size": "mean",
      "no_issue_done": "sum",
      "Project_success_sprint": "mean"
    }).reset_index()

    # --- 5️⃣ Merge sprint + issue ---
    df_projects = df_sprint_agg.merge(df_issues_agg, on="project_id", how="left")
    X = df_projects[feature_cols_30]
    # print(X.columns)
    y_pred = model.predict(X)

    return y_pred

