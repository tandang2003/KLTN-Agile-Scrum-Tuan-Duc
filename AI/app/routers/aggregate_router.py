from fastapi import APIRouter

from app.services.aggregate import AggregateService

router = APIRouter()
service = AggregateService()

@router.get("/list-issues")
async def list_issues(project_id: str, sprint_id: str):
  return service.get_list_issues(project_id, sprint_id)
