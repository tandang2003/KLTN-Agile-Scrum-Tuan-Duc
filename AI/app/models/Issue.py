from pydantic import BaseModel

from app.dto.iteration import IterationModel, IssueModel
from app.models.sprint import Sprint

import pandas as pd
from typing import List

class Issue(BaseModel):
  sprint_id: str
  type: str
  priority: str
  no_affect_version: int
  no_fix_version: int
  no_link: int
  no_issue_blocking: int
  no_issue_blocked: int
  no_of_comment: int
  no_fix_version_change: int
  no_priority_change: int
  no_description_change: int
  complexity_of_description: int
  suitable_assignee: float

def map(issue: IssueModel) -> Issue:
    return Issue(
      sprint_id=issue.sprint_id,
      type=issue.type,
      priority=issue.priority,
      no_affect_version=issue.numOfAffectVersions,
      no_fix_version=issue.numOfFixVersions,
      no_link=issue.numOfLink,
      no_issue_blocked=issue.numOfBlocked,
      no_of_comment=issue.numOfComment,
      no_issue_blocking=issue.numOfBlock,
      no_fix_version_change=issue.numOfChangeFixVersion,
      no_priority_change=issue.numOfChangeOfPriority,
      no_description_change=issue.numOfChangeOfDescription,
      complexity_of_description=issue.complexityOfDescription,
      suitable_assignee=issue.complatibleOfAssignee
    )


def map_list( issues:List[IssueModel])-> List[Issue]:
  result= list()
  for i in range(0,len(issues)):
    result.append(map(issues[i]))
  return result

def issues_to_dataframe(issues: List[Issue]) -> pd.DataFrame:
    data = [{
      "sprint_id": issue.sprint_id,
      "type": issue.type,
      "priority": issue.priority,
      "no_affect_version": issue.no_affect_version,
      "no_fix_version": issue.no_fix_version,
      "no_link": issue.no_link,
      "no_of_comment": issue.numOfComment,
      "no_issue_blocked": issue.no_issue_blocked,
      "no_issue_blocking": issue.no_issue_blocking,
      "no_fix_version_change": issue.no_fix_version_change,
      "no_priority_change": issue.no_priority_change,
      "no_description_change": issue.no_description_change,
      "complexity_of_description": issue.complexity_of_description,
      "suitable_assignee": issue.suitable_assignee
    } for issue in issues]

    return pd.DataFrame(data)