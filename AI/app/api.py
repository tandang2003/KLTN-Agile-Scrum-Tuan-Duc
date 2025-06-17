from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.models.entity.user import User
from app.db.database import get_db
from app.models.entity.workspace import Workspace
from app.routers import users
from app.routers import aggregate_router

app = FastAPI()

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(aggregate_router.router, prefix="/aggregate", tags=["aggregate"])

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return "message: DB connected successfully!, user_count"