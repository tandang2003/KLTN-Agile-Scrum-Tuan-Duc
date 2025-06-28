from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from uuid import UUID


class BaseEntity(BaseModel):
  dt_created: Optional[datetime] = Field(default=None, description="Created timestamp")
  dt_modified: Optional[datetime] = Field(default=None, description="Modified timestamp")
  dt_deleted: Optional[datetime] = Field(default=None, description="Deleted timestamp")
  deleted: Optional[bool] = False
  created_by: Optional[str] = None
  modified_by: Optional[str] = None
  deleted_by: Optional[str] = None

  # class Config:
  #   orm_mode = True
