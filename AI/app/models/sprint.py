from pydantic import BaseModel

from app.dto.iteration import IterationModel


class Sprint(BaseModel):
  # project_id:str
  # sprint_id: str
  sprintDuration: int
  numOfIssueAtStart: int
  numOfIssueAdded: int
  numOfIssueRemoved: int
  numOfIssueTodo: int
  numOfIssueInProgress: int
  numOfIssueDone: int
  teamSize: int

  def __init__(
    self,
    sprintId,
    sprintDuration,
    numOfIssueAtStart, numOfIssueAdded, numOfIssueRemoved, numOfIssueTodo, numOfIssueInProgress, numOfIssueDone,
    teamSize
  ):
    self.sprintId = sprintId
    self.sprintDuration = sprintDuration
    self.numOfIssueAtStart = numOfIssueAtStart
    self.numOfIssueAdded = numOfIssueAdded
    self.numOfIssueRemoved = numOfIssueRemoved
    self.numOfIssueTodo = numOfIssueTodo
    self.numOfIssueInProgress = numOfIssueInProgress
    self.numOfIssueDone = numOfIssueDone
    self.teamSize = teamSize


def map(iterator: IterationModel) -> Sprint:
  return Sprint(iterator.sprint_id, iterator.sprintDuration, iterator.numOfIssueAtStart, iterator.numOfIssueAdded,
                iterator.numOfIssueRemoved, iterator.numOfIssueTodo, iterator.numOfIssueInProgress,
                iterator.numOfIssueDone, iterator.teamSize)
