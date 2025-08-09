from pydantic import BaseModel
from typing import List
from enum import Enum

class IssueTag(str, Enum):
    THEORY = "THEORY"
    PRACTICE = "PRACTICE"

class IssuePriority(str, Enum):
    CRITICAL = "CRITICAL"
    MAJOR = "MAJOR"
    MINOR = "MINOR"
    TRIVIAL = "TRIVIAL"
    BLOCKED = "BLOCKED"

class IssueModel(BaseModel):
    sprint_id: str
    type: IssueTag
    priority: IssuePriority
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

class IterationModel(BaseModel):
    sprint_id: str
    course_name: str
    storyPoint:int
    sprintDuration: int
    numOfIssueAtStart: int
    numOfIssueAdded: int
    numOfIssueRemoved: int
    numOfIssueTodo: int
    numOfIssueInProgress: int
    numOfIssueDone: int
    issueModelList: List[IssueModel]
    teamSize: int
