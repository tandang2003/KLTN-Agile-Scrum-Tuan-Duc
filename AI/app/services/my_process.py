import pickle

import joblib
from sklearn.cluster import KMeans
from sklearn.svm import SVC


class My_Process():
  def __init__(self, model="models/process.pkl", sprint_data=None, issue_data=None):
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
    statistic = self.calculate_issue_statistics(self.issue_data)
    bow = self.bow(self.issue_data, self.k)
    data = self.merge(self.set_sprint_data, statistic, bow)
    data = data.drop(columns=["sprint_id"])
    y_pred = self.model.predict(data)
    print(y_pred)
    return y_pred

  def calculate_issue_statistics(self, df):
    categorical_columns = ["type", "priority"]
    issue_type = ['THEORY', 'PRACTICE']
    issue_priority = ['CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL', 'BLOCKED']

    map_type = {v: i for i, v in enumerate(issue_type)}
    map_priority = {v: i for i, v in enumerate(issue_priority)}

    # Safe mapping dictionary
    mapping_dicts = {
      "type": map_type,
      "priority": map_priority
    }

    categorical_columns_to_map = ["type", "priority"]

    for col in categorical_columns_to_map:
      if col in df.columns:
        df[col] = df[col].astype(str).map(mapping_dicts[col])
    # Define numerical aggregation functions
    numerical_columns = [
      "no_affect_version", "no_fix_version", "no_link", "no_issue_blocking",
      "no_issue_blocked", "no_fix_version_change", "no_priority_change",
      "no_description_change", "complexity_of_description", "suitable_assignee"
    ]

    numerical_aggregations = {
      col: ["min", "max", "mean", "median", "std", "var", lambda x: x.max() - x.min()]
      for col in numerical_columns
    }

    # Group by boardId and sprintId
    grouped = df.groupby(["project_id", "sprint_id"])

    # Numerical statistics
    numerical_stats = grouped.agg(numerical_aggregations)
    numerical_stats.columns = [
      f"{col}_{agg}" if agg != "<lambda_0>" else f"{col}_range"
      for col, agg in numerical_stats.columns
    ]

    # Replace NaN with 0 in numerical statistics
    numerical_stats = numerical_stats.fillna(0)
    # Categorical statistics: Type, Priority, and Gunning Fog
    categorical_columns = ["type", "priority"]
    categorical_stats = []

    for col in categorical_columns:
      # Include NaN values in the frequency count
      categorical_frequency = (
        grouped[col]
        .value_counts(dropna=False)  # Include NaN values
        .unstack(fill_value=0)
      )
      categorical_frequency.columns = [f"{col}_{val}_frequency" for val in categorical_frequency.columns]
      categorical_stats.append(categorical_frequency)

    # Combine numerical and categorical statistics
    result = numerical_stats.reset_index()

    for cat_stat in categorical_stats:
      result = result.merge(cat_stat.reset_index(), on=["project_id", "sprint_id"], how="left")

    # Replace NaN with 0 in categorical statistics as well
    result = result.fillna(0)

    return result

  def bow(df, k):
    """
    Applies KMeans clustering with k clusters on issue-level data
    and aggregates the cluster counts per (project_id, sprint_id).
    """
    df = df.copy(deep=True)

    # Drop non-feature columns
    df = df.drop(columns=["issue_name"])


    categorical_columns = ["type", "priority"]
    issue_type = ['THEORY', 'PRACTICE']
    issue_priority = ['CRITICAL', 'MAJOR', 'MINOR', 'TRIVIAL', 'BLOCKED']

    map_type = {v: i for i, v in enumerate(issue_type)}
    map_priority = {v: i for i, v in enumerate(issue_priority)}

    # Safe mapping dictionary
    mapping_dicts = {
        "type": map_type,
        "priority": map_priority
    }

    # Suppose df is your DataFrame
    # df = pd.DataFrame(...)

    categorical_columns_to_map = ["type", "priority"]

    for col in categorical_columns_to_map:
        if col in df.columns:
            df[col] = df[col].astype(str).map(mapping_dicts[col])
    # Fill NaNs from mapping (if any)
    df.fillna(0, inplace=True)

    # Prepare features
    # Exclude project_id and sprint_id from the features for clustering
    feature_columns = [col for col in df.columns if col not in ["project_id", "sprint_id"]]
    X = df[feature_columns].to_numpy()

    # KMeans clustering
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    df["Cluster"] = kmeans.fit_predict(X)

    # Group and pivot
    grouped = df.groupby(["project_id", "sprint_id", "Cluster"]).size().reset_index(name="count")
    df_pivot = grouped.pivot_table(index=["project_id", "sprint_id"], columns="Cluster", values="count", fill_value=0)
    df_pivot.reset_index(inplace=True)
    df_pivot.columns.name = None

    # Convert only the cluster count columns to Int64
    cluster_columns = [col for col in df_pivot.columns if isinstance(col, int)]
    df_pivot[cluster_columns] = df_pivot[cluster_columns].astype("Int64")

    return df_pivot

  def merge(df_label, df_statistics=None, df_bow=None):
    merge_feature = ["project_id", "sprint_id"]
    if df_statistics is None or df_statistics.empty:
      return df_bow.merge(df_label, on=merge_feature, how="left")

    if df_bow is None or df_bow.empty:
      return df_statistics.merge(df_label, on=merge_feature, how="left")
    df = df_statistics.merge(df_bow, on=merge_feature, how="left")
    df = df.merge(df_label, on=merge_feature, how="left")
    df.fillna(0, inplace=True)
    df.columns = df.columns.astype(str)
    return df
