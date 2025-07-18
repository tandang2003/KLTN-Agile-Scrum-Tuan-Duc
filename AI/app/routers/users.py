from fastapi import APIRouter
router = APIRouter()


@router.get("/")
async def get_users():
    return [{"id": 1, "name": "Alice"}]

@router.get("/users/")
async def get_users():
    return [{"user_id": 1, "username": "user1"}]