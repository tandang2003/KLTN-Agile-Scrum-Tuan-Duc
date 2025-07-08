from fastapi import APIRouter

from app.dto.iteration import IterationModel
from app.services.aggregate import AggregateService

router = APIRouter()
service = AggregateService()

@router.post("")
async def list_issues(data:IterationModel):
  print(data)
  return None;
