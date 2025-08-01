# uniId, password, name
import requests
import pandas as pd
from src.api.utils import ROOT_PATH, BASE_API

password = "123123123"

if __name__ == '__main__':
  df = pd.read_csv(ROOT_PATH / "register" / "student.csv")
  for index, row in df.iterrows():
    body = {
        "uniId": str(row['uniId']).strip(),
        "name": str(row['name']).strip(),
        "password": password
    }
    response = requests.post(f"{BASE_API}/auth/register", json=body)
    if (response.status_code == 200):
        print(f"create {row['uniId']} success")
    else:
        print(f"create {row['uniId']} failed")