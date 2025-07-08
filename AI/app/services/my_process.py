import pickle

import joblib
from sklearn.cluster import KMeans
from sklearn.svm import SVC


class My_Process():
  def __init__(self, model=None, sprint_data=None, issue_data=None):
    # change it
    self.model = SVC(kernel='linear', random_state=42)
    self.kmeans = joblib.load("kmeans.pkl")
    self.sprint_data = sprint_data
    self.issue_data = issue_data
    self.k = 100
    self.numerical_columns = [
      "no_comment", "no_affectversion", "no_fixversion", "no_issuelink",
      "no_blocking", "no_blockedby", "no_fixversion_change",
      "no_priority_change", "no_des_change", "asignee_point", "complexity_description"
    ]
    self.categorical_columns = ["type", "priority"]

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
    return y_pred

  def calculate_issue_statistics(self, df):


    df = df.copy(deep=True)

    for col in self.categorical_columns :
      df[col] = df[col].astype(str).map(eval(f"map_{col}"))
    # Define numerical aggregation functions


    numerical_aggregations = {
      col: ["min", "max", "mean", "median", "std", "var", lambda x: x.max() - x.min()]
      for col in self.numerical_columns
    }

    # Group by boardId and sprintId
    grouped = df.groupby(["sprint_id"])

    # Numerical statistics
    numerical_stats = grouped.agg(numerical_aggregations)
    numerical_stats.columns = [
      f"{col}_{agg}" if agg != "<lambda_0>" else f"{col}_range"
      for col, agg in numerical_stats.columns
    ]

    # Replace NaN with 0 in numerical statistics
    numerical_stats = numerical_stats.fillna(0)
    # Categorical statistics: Type, Priority, and Gunning Fog

    categorical_stats = []

    for col in self.categorical_columns :
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
      result = result.merge(cat_stat.reset_index(), on=["sprint_id"], how="left")

    # Replace NaN with 0 in categorical statistics as well
    result = result.fillna(0)

    return result

  def bow(self, df, k):
    df = df.copy(deep=True)
    for col in self.categorical_columns :
      df[col] = df[col].astype(str).map(eval(f"map_{col}"))
    X = df.to_numpy()
    # kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    # kmeans.fit(X)
    # centers = kmeans.cluster_centers_
    centers = self.kmeans.predict(X).reshape(-1, 1)
    df['Cluster'] = centers
    df = df[["sprint_id", "Cluster"]]
    grouped = df.groupby(["sprint_id", "Cluster"]).size().reset_index(name="count")

    # Pivot the table
    df_pivot = grouped.pivot_table(index=["sprint_id"], columns="Cluster", values="count", fill_value=0)

    # Reset index to make it a regular DataFrame
    df_pivot.reset_index(inplace=True)

    # Rename columns
    df_pivot.columns.name = None  # Remove multi-index column name

    df_pivot = df_pivot.astype('Int64')
    return df_pivot

  def merge(self, df_label, df_statistics=None, df_bow=None):
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
