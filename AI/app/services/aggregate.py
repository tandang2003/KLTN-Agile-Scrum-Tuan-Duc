import joblib


class AggregateService:
  def __init__(self):
    self.model = joblib.load("model.pkl")
