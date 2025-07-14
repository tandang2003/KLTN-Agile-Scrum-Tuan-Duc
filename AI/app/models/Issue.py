from pydantic import BaseModel

from app.dto.iteration import IterationModel, IssueModel
from app.models.sprint import Sprint

import pandas as pd
from typing import List

class Issue(BaseModel):
  sprint_id: str
  type: str
  priority: str
  numOfAffectVersions: int
  numOfFixVersions: int
  numOfLink: int
  numOfBlocked: int
  numOfBlock: int
  numOfComment: int
  numOfChangeFixVersion: int
  numOfChangeOfPriority: int
  numOfChangeOfDescription: int
  complexityOfDescription: int
  complatibleOfAssignee: float
  def __init__(self,  sprint_id,
  type,
  priority,
  numOfAffectVersions,
  numOfFixVersions,
  numOfLink,
  numOfBlocked,
  numOfBlock,
  numOfComment,
  numOfChangeFixVersion,
  numOfChangeOfPriority,
  numOfChangeOfDescription,
  complexityOfDescription,
  complatibleOfAssignee):
    self.sprint_id = sprint_id
    self.type = type
    self.priority = priority
    self.numOfLink = numOfLink
    self.numOfBlocked = numOfBlocked
    self.numOfBlock = numOfBlock
    self.numOfComment = numOfComment
    self.numOfFixVersions = numOfFixVersions
    self.numOfChangeFixVersion = numOfChangeFixVersion
    self.numOfChangeOfPriority = numOfChangeOfPriority
    self.numOfChangeOfDescription = numOfChangeOfDescription
    self.complexityOfDescription = complexityOfDescription
    self.numOfAffectVersions=numOfAffectVersions
    self.complatibleOfAssignee = complatibleOfAssignee


def map(issue: IssueModel) -> Issue:
  return Issue(
    sprint_id=issue.sprint_id,
    type=issue.type,
    priority=issue.priority,
    numOfAffectVersions=issue.numOfAffectVersions,
    numOfFixVersions=issue.numOfFixVersions,
    numOfLink=issue.numOfLink,
    numOfBlocked=issue.numOfBlocked,
    numOfBlock=issue.numOfBlock,
    numOfComment=issue.numOfComment,
    numOfChangeFixVersion=issue.numOfChangeFixVersion,
    numOfChangeOfPriority=issue.numOfChangeOfPriority,
    numOfChangeOfDescription=issue.numOfChangeOfDescription,
    complexityOfDescription=issue.complexityOfDescription,
    complatibleOfAssignee=issue.complatibleOfAssignee
  )
def map_list( issues:List[IssueModel])-> List[Issue]:
  issues= []
  for i in range(len(issues)):
    issues[i] = map(issues[i])
  return issues




def issues_to_dataframe(issues: List[Issue]) -> pd.DataFrame:
  data = [{
    "sprint_id": issue.sprint_id,
    "type": issue.type,
    "priority": issue.priority,
    "numOfAffectVersions": issue.numOfAffectVersions,
    "numOfFixVersions": issue.numOfFixVersions,
    "numOfLink": issue.numOfLink,
    "numOfBlocked": issue.numOfBlocked,
    "numOfBlock": issue.numOfBlock,
    "numOfComment": issue.numOfComment,
    "numOfChangeFixVersion": issue.numOfChangeFixVersion,
    "numOfChangeOfPriority": issue.numOfChangeOfPriority,
    "numOfChangeOfDescription": issue.numOfChangeOfDescription,
    "complexityOfDescription": issue.complexityOfDescription,
    "complatibleOfAssignee": issue.complatibleOfAssignee
  } for issue in issues]

  return pd.DataFrame(data)
