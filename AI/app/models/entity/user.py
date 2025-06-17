from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from app.models.entity.workspace import Workspace

Base = declarative_base()

class User(Base) :
    __tablename__ = 'users'

    id = Column(String, primary_key=True, autoincrement=True)  # Assuming BaseEntity has id field
    name = Column(String(255))
    password = Column(String(255))
    email = Column(String(255))
    uni_id = Column(String(255))        # mapped from uniId
    class_name = Column(String(255))    # mapped from className
    uni_password = Column(String(255))

    # OneToMany mappedBy "owner" in Workspace
    workspaces = relationship("Workspace", back_populates="owner")

    # OneToMany join column user_id in WorkspacesUsersProjects
    workspaces_user_projects = relationship("WorkspacesUsersProjects", back_populates="user")

    # OneToMany mappedBy "assignee" in Issue
    assigned_issues = relationship("Issue", back_populates="assignee")

    # OneToMany mappedBy "reviewer" in Issue
    reviewed_issues = relationship("Issue", back_populates="reviewer")

    # Transient attribute (not stored in DB)
    _alive = None

    @property
    def alive(self):
        return self._alive

    @alive.setter
    def alive(self, value):
        self._alive = value

    # For UserDetails-like features, you might add methods or properties here as needed
    # e.g. get_username, get_password, is_active, etc., if used with Flask-Login or similar

# Don't forget to define back_populates on the related classes accordingly:
# For example, Workspace.owner, WorkspacesUsersProjects.user, Issue.assignee, Issue.reviewer
