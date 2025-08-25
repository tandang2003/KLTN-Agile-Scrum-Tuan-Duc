from typing import List

import pandas as pd
from pydantic import BaseModel

from app.dto.iteration import IterationModel


class Sprint(BaseModel):
  sprint_id: str
  planday: int
  story_point: int
  no_issue_starttime: int
  no_issue_added: int
  no_issue_removed: int
  no_issue_todo: int
  no_issue_inprogress: int
  no_issue_done: int
  no_team_size: int


def map(iterator: IterationModel) -> Sprint:
  return Sprint(
    sprint_id=iterator.sprint_id,
    planday=iterator.sprintDuration,
    # story_point=iterator.storyPoint,
    story_point=iterator.storyPoint,
    no_issue_starttime=iterator.numOfIssueAtStart,
    no_issue_added=iterator.numOfIssueAdded,
    no_issue_removed=iterator.numOfIssueRemoved,
    no_issue_todo=iterator.numOfIssueTodo,
    no_issue_inprogress=iterator.numOfIssueInProgress,
    no_issue_done=iterator.numOfIssueDone,
    no_team_size=iterator.teamSize
  )


def map_to_dataframe(iterator: IterationModel) -> pd.DataFrame:
  sprint = map(iterator)  # map to Sprint (Pydantic model)
  return pd.DataFrame([sprint.model_dump()])


def map_list(issues: List[IterationModel]) -> List[Sprint]:
  result = list()
  for i in range(0, len(issues)):
    result.append(map(issues[i]))
  return result
