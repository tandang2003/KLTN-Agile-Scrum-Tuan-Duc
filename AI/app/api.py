from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.models.entity.user import User
from app.db.mysql import get_db
from app.routers import users

app = FastAPI()

app.include_router(users.router, prefix="/users", tags=["users"])

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return {"message": "DB connected successfully!", "user_count": len(users)}