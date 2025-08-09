from fastapi import APIRouter

from app.dto.iteration import IterationModel
from app.models.sprint import map as sprintMap, map_to_dataframe as sprintMapDataframe
from app.models.Issue import map as issueMap, map_list as issueMapList, issues_to_dataframe as issueMapListToDataFrame

from app.services.aggregate import AggregateService
from app.services.my_process import My_Process

router = APIRouter()
service = AggregateService()
process = My_Process()


@router.post("")
async def list_issues(data: IterationModel):
  # try:
  process.reset_model(data.course_name)
  # except:
  #   return [-1];
  process.set_sprint_data(sprintMapDataframe(data))
  process.set_issue_data(issueMapListToDataFrame(issueMapList(data.issueModelList)))
  return process.process();
