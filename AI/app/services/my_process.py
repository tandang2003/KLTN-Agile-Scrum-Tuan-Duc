import pickle
import numpy as np
import pandas as pd
import joblib
from sklearn.cluster import KMeans
from sklearn.svm import SVC


class My_Process():
  def __init__(self, model="models/model.pkl", sprint_data=None, issue_data=None):
    # change it
    self.model = joblib.load(model)
    self.kmeans = joblib.load("models/process.pkl")
    self.sprint_data = sprint_data
    self.issue_data = issue_data
    self.k = 20
    # self.numerical_columns = [
    #   "no_comment", "no_affectversion", "no_fixversion", "no_issuelink",
    #   "no_blocking", "no_blockedby", "no_fixversion_change",
    #   "no_priority_change", "no_des_change", "asignee_point", "complexity_description"
    # ]
    # self.categorical_columns = ["type", "priority"]

  @classmethod
  def insert_data(cls, data):
    return cls(None, data)

  @classmethod
  def insert_model(cls, model):
    return cls(model, None)

  def set_model(self, model):
    self.model = model

  def set_sprint_data(self, sprint_data):
    self.sprint_data = sprint_data

  def set_issue_data(self, issue_data):
    self.issue_data = issue_data

  def set_k(self, k):
    self.k = k

  @classmethod
  def default(cls):
    return cls(None, None, None)

  def process(self):
    # statistic = self.calculate_issue_statistics(self.issue_data)
    bow = self.bow(self.issue_data, self.k)
    data = self.merge(self.sprint_data, None, bow)
    data = data.drop(columns=["sprint_id"])
    # print(data.columns)
    y_pred = self.model.predict(data)
    # print(y_pred)
    return y_pred.tolist()

  def calculate_issue_statistics(self,df):
    df = df.copy(deep=True)
    df = df.drop(columns=["issue_name"], errors="ignore")

    # Define categorical structure
    category_definitions = {
        "type": ['THEORY', 'PRACTICE'],
        "priority": ['CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL', 'BLOCKED']
    }

    # Don't map to integers — keep original strings
    categorical_columns = list(category_definitions.keys())

    # Define numerical columns
    numerical_columns = [
        "no_affect_version", "no_fix_version", "no_link", "no_issue_blocking",
        "no_issue_blocked", "no_fix_version_change", "no_priority_change",
        "no_description_change", "complexity_of_description", "suitable_assignee"
    ]

    numerical_aggregations = {
        col: ["min", "max", "mean", "median", "std", "var", lambda x: x.max() - x.min()]
        for col in numerical_columns
    }

    grouped = df.groupby([ "sprint_id"], dropna=False)

    # Numerical aggregation
    numerical_stats = grouped.agg(numerical_aggregations)
    numerical_stats.columns = [
        f"{col}_{agg}" if agg != "<lambda_0>" else f"{col}_range"
        for col, agg in numerical_stats.columns
    ]
    numerical_stats = numerical_stats.fillna(0)

    # Categorical frequency stats
    categorical_stats = []

    for col in categorical_columns:
        expected_vals = category_definitions[col]
        freq = grouped[col].value_counts(dropna=False).unstack(fill_value=0)

        # Add missing expected values
        for val in expected_vals:
            if val not in freq.columns:
                freq[val] = 0

        # Add NaN column if needed
        if np.nan not in freq.columns:
            freq[np.nan] = 0

        freq = freq[expected_vals + [np.nan]]

        # Rename columns with label names
        freq.columns = [
            f"{col}_{'nan' if pd.isna(v) else v}_frequency"
            for v in freq.columns
        ]

        categorical_stats.append(freq)

    result = numerical_stats.reset_index()

    for cat_stat in categorical_stats:
        result = result.merge(cat_stat.reset_index(), on=["sprint_id"], how="left")

    result = result.fillna(0)
    return result

  def bow(self, df, k):


    df = df.copy(deep=True)

    categorical_columns = ["type", "priority"]
    issue_type = ['THEORY', 'PRACTICE']
    issue_priority = ['CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL', 'BLOCKED']

    map_type = {v: i for i, v in enumerate(issue_type)}
    map_priority = {v: i for i, v in enumerate(issue_priority)}

    mapping_dicts = {
        "type": map_type,
        "priority": map_priority
    }

    for col in categorical_columns:
        if col in df.columns:
            df[col] = df[col].map(mapping_dicts[col])

    df.fillna(0, inplace=True)

    # Drop only non-feature columns
    feature_columns = [col for col in df.columns if col not in [ "sprint_id"]]
    X = df[feature_columns].to_numpy()

    # Predict cluster
    df["Cluster"] = self.kmeans.predict(X)

    # Group by cluster
    grouped = df.groupby(["sprint_id", "Cluster"]).size().reset_index(name="count")
    df_pivot = grouped.pivot_table(index=[ "sprint_id"], columns="Cluster", values="count", fill_value=0)

    # Ensure all cluster columns (0 to k-1) exist
    for i in range(k):
        if i not in df_pivot.columns:
            df_pivot[i] = 0

    # Reorder columns: project_id, sprint_id, and sorted cluster indices
    df_pivot.reset_index(inplace=True)
    df_pivot.columns.name = None

    id_columns = ["sprint_id"]
    cluster_columns = sorted([col for col in df_pivot.columns if isinstance(col, int)])
    df_pivot = df_pivot[id_columns + cluster_columns]

    # Convert cluster columns to Int64
    df_pivot[cluster_columns] = df_pivot[cluster_columns].astype("Int64")

    return df_pivot


  def merge(self,df_label, df_statistics=None, df_bow=None):
    merge_feature = ["sprint_id"]
    if df_statistics is None or df_statistics.empty:
      return df_bow.merge(df_label, on=merge_feature, how="left")

    if df_bow is None or df_bow.empty:
      return df_statistics.merge(df_label, on=merge_feature, how="left")
    df = df_statistics.merge(df_bow, on=merge_feature, how="left")
    df = df.merge(df_label, on=merge_feature, how="left")
    df.fillna(0, inplace=True)
    df.columns = df.columns.astype(str)
    return df
