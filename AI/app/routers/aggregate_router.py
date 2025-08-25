from typing import List

from fastapi import APIRouter

from app.dto.iteration import IterationModel
from app.models.Issue import map_list as issueMapList, issues_to_dataframe as issueMapListToDataFrame
from app.models.sprint import map_to_dataframe as sprintMapDataframe
from app.services.aggregate import AggregateService
from app.services.my_process import My_Process
from app.services.predict_project_process import Project_Process

router = APIRouter()
service = AggregateService()
process = My_Process()
project_process = Project_Process()


@router.post("")
async def list_issues(data: IterationModel):
  try:
    if data.timeMade:
      process.reset_model_30(data.course_name)
      print("30")
    else:
      process.reset_model_50(data.course_name)
      print("50")
  except Exception as e:
    print(f"Error resetting model: {e}")
    return [-1];
  process.set_sprint_data(sprintMapDataframe(data))
  process.set_issue_data(issueMapListToDataFrame(issueMapList(data.issueModelList)))
  return process.process()

@router.post("/project")
async def list_issues(data: List[IterationModel]):
  project_process.set_sprint_data(data)
  project_process.set_issue_data(data)
  return project_process.process()
