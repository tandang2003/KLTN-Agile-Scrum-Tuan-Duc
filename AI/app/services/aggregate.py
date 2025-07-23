import joblib
from app.core.loader import MODEL_FILE

class AggregateService:
  def __init__(self):
    self.model = joblib.load(MODEL_FILE)
