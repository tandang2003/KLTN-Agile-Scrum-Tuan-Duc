from sqlalchemy import Boolean, Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.mysql import INTEGER

Base = declarative_base()

class WorkspacesUsersProjects(Base):
    __tablename__ = 'workspaces_users_projects'

    # Assuming WorkspacesUsersId is a composite primary key (workspace_id, user_id)
    workspace_id = Column(INTEGER, ForeignKey('workspaces.id'), primary_key=True)
    user_id = Column(INTEGER, ForeignKey('users.id'), primary_key=True)

    project_id = Column(INTEGER, ForeignKey('projects.id'), nullable=True)
    role_id = Column(INTEGER, ForeignKey('roles.id'), nullable=True)

    in_project = Column(Boolean, default=False)
    in_workspace = Column(Boolean, default=False)

    # Relationships
    workspace = relationship("Workspace", back_populates="workspaces_user_projects")
    user = relationship("User", back_populates="workspaces_user_projects")
    project = relationship("Project")
    role = relationship("Role")

# You need to define the inverse relationships in the Workspace and User classes:
#
# In Workspace:
#     workspaces_user_projects = relationship("WorkspacesUsersProjects", back_populates="workspace")
#
# In User:
#     workspaces_user_projects = relationship("WorkspacesUsersProjects", back_populates="user")
