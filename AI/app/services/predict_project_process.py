from typing import List

import joblib
import pandas as pd
from pandas import CategoricalDtype

from app.dto.iteration import IterationModel
from app.models.sprint import map_to_dataframe as sprintMapDataframe, map_list as sprintMapList, map_to_dataframe
from app.models.Issue import map_list as issueMapList, issues_to_dataframe as issueMapListToDataFrame, map_list, \
  issues_to_dataframe

feature_cols_30 =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

model = joblib.load("models/random_forest_model_30.joblib")
process = joblib.load("models/kmeans_model_30.joblib")
class Project_Process():

  def __init__(self, under=0.1, sprint_data=None, issue_data=None):
    self.under = -0.3084397367567701
    self.sprint_data = sprint_data
    self.issue_data = issue_data

  @classmethod
  def insert_data(cls, data):
    return cls(None, data)

  @classmethod
  def insert_model(cls, model):
    return cls(model, None)

  
  def set_sprint_data(self, sprint_data: List[IterationModel]):

    if not sprint_data:
      self.sprint_data = pd.DataFrame()
      return

    dataframes = [map_to_dataframe(sprint) for sprint in sprint_data]
    self.sprint_data = pd.concat(dataframes, ignore_index=True)   
  
  def set_issue_data(self, issue_data: List[IterationModel]):
        """
        Processes a list of IterationModel objects and converts
        all contained issues into a single DataFrame.
        """
        # A list to hold all the individual Issue objects
        all_issues = []

        # Iterate through each IterationModel in the input list
        for iteration in issue_data:
            # Map the list of IssueModels to a list of Issue Pydantic models
            issues_for_iteration = map_list(iteration.issueModelList)
            # Add these mapped issues to the master list
            all_issues.extend(issues_for_iteration)

        # Convert the entire list of issues into a single DataFrame
        self.issue_data = issues_to_dataframe(all_issues)

  def set_under(self, under):
    self.under = under

  def process(self):
    # --- 1️⃣ Gán nhãn Project_success_sprint cho mỗi sprint ---
    df_sprints = self.sprint_data.copy()
    # df_sprints['Project_success_sprint'] = (df_sprints['vel_diff'] >= float(self.under)).astype(int)
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
    df_issues_bow["project_id"]=1
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
    df_sprints["project_id"]=1

    # --- 4️⃣ Tổng hợp sprint theo project ---
    df_sprint_agg = df_sprints.groupby("project_id").agg({
      "story_point": "sum",
      "no_issue_inprogress": "sum",
      "no_issue_starttime": "sum",
      "no_issue_added": "sum",
      "no_team_size": "mean",
      "no_issue_done": "sum",
      # "Project_success_sprint": "mean"
    }).reset_index()

    df_projects =pd.merge(df_issues_agg, df_sprint_agg, on='project_id', how='left')
    print(df_projects.columns)

    # --- 5️⃣ Merge sprint + issue ---
    X = df_projects[['story_point', 'no_issue_inprogress',
                     'no_issue_starttime', 'no_issue_added', 'no_team_size', 'no_issue_done',
                     'no_issue_blocking', 'no_issue_blocked', 'no_fix_version_change',
                     'no_priority_change', 'no_description_change', 'suitable_assignee',
                     'type_PRACTICE', 'type_THEORY', 'priority_BLOCKED', 'priority_CRITICAL',
                     'priority_MAJOR', 'priority_MINOR', 'priority_TRIVIAL',
                     'complexity_of_description_0', 'complexity_of_description_1',
                     'complexity_of_description_2', ]]

    # centers = kmeans.cluster_centers_

    df_projects['Cluster'] = (process.predict(X))
    df = df_projects[["project_id",  "Cluster"]]
    grouped = df.groupby(["project_id", "Cluster"]).size().reset_index(
      name="count")
    df_pivot = grouped.pivot_table(
      index=["project_id"],
      columns="Cluster",
      values="count",
      fill_value=0
    )

    # Đảm bảo đủ 20 cột cluster (0 → 19)
    all_clusters = list(range(20))
    df_pivot = df_pivot.reindex(columns=all_clusters, fill_value=0)

    # Reset index
    df_pivot.reset_index(inplace=True)
    df_pivot.columns.name = None
    df_final = pd.concat([df_projects, df_pivot.drop(columns=["project_id"])],
                         axis=1)

    # y = df_final["Project_success"]
    X = df_final[feature_cols_30]
    y_pred = model.predict(X)

    return y_pred.tolist()

