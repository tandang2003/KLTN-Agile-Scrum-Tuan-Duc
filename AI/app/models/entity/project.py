from sqlalchemy import Column, String, Text, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Project(Base):
    __tablename__ = 'projects'

    id = Column(String, primary_key=True, autoincrement=True)  # Assuming BaseEntity has id field

    name = Column(String(255), nullable=False)
    description = Column(Text)

    workspaces_user_projects = relationship("WorkspacesUsersProjects", back_populates="project")
    project_sprints = relationship("ProjectSprint", back_populates="project")
    issues = relationship("Issue", back_populates="project")

    # Getter methods
    def get_name(self):
        return self.name

    def get_description(self):
        return self.description

    def get_workspaces_user_projects(self):
        return self.workspaces_user_projects

    def get_project_sprints(self):
        return self.project_sprints

    def get_issues(self):
        return self.issues
