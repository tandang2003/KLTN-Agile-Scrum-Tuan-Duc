from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Sprint(Base):
    __tablename__ = 'sprints'

    id = Column(Integer, primary_key=True, autoincrement=True)  # Assuming BaseEntity has id field
    title = Column(Text)  # LONGTEXT equivalent in SQLAlchemy is Text
    dt_start = Column(DateTime)
    dt_end = Column(DateTime)
    dt_predict = Column(DateTime)
    story_point = Column(Integer)

    workspace_id = Column(Integer, ForeignKey('workspaces.id'))
    workspace = relationship("Workspace", back_populates="sprints")

    project_sprints = relationship("ProjectSprint", back_populates="sprint")
    issues = relationship("Issue", back_populates="sprint")
