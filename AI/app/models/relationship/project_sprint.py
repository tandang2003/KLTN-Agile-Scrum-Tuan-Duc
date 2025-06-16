from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ProjectSprint(Base):
    __tablename__ = 'project_sprint'

    project_id = Column(Integer, ForeignKey('projects.id'), primary_key=True)
    sprint_id = Column(Integer, ForeignKey('sprints.id'), primary_key=True)

    project = relationship("Project", back_populates="project_sprints")
    sprint = relationship("Sprint", back_populates="project_sprints")
