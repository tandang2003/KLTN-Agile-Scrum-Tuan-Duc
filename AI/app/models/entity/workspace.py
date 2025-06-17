from sqlalchemy import Column, String, Text, Integer, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

from app.models.baseEntity import BaseEntity

Base = declarative_base()

class Workspace(Base):
    __tablename__ = 'workspaces'
    id = Column(String, primary_key=True, autoincrement=True)  # Assuming BaseEntity has id field
    name = Column(String(255), nullable=False)
    description = Column(Text)  # LONGTEXT equivalent
    start = Column(DateTime)  # Instant can map to DateTime in Python
    end = Column(DateTime)

    owner_id = Column(String, ForeignKey("users.id"))
    owner = relationship("User", back_populates="workspaces")

    # OneToMany relationship, join column workspace_id on WorkspacesUsersProjects side
    workspaces_user_projects = relationship("WorkspacesUsersProjects", back_populates="workspace")

    # OneToMany mappedBy workspace in Sprint entity
    sprints = relationship("Sprint", back_populates="workspace")

    # Transient fields (not stored in DB)
    _sprint_num = None
    _current_sprint = None
    personal_skills = relationship("PersonalSkill", back_populates="user")
    # Properties for transient fields
    @property
    def sprint_num(self):
        if self.sprints:
            return len(self.sprints)
        return 0

    @sprint_num.setter
    def sprint_num(self, value):
        self._sprint_num = value

    @property
    def current_sprint(self):
        return self._current_sprint

    @current_sprint.setter
    def current_sprint(self, sprint):
        self._current_sprint = sprint
