from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings

SQLALCHEMY_DATABASE_URL = settings.MYSQL_URL

MONGO_URL = settings.MONGO_URL
mongo_client = AsyncIOMotorClient(MONGO_URL)
mongo_db = mongo_client["kltn"]

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
# ✅ Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_mongo_db():
  return mongo_db