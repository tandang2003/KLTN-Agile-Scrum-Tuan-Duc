from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.routers import users
from app.routers import aggregate_router
from app.services.aggregate import AggregateService

app = FastAPI()
aggregate = AggregateService()
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(aggregate_router.router, prefix="/aggregate", tags=["aggregate"])