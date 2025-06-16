from sqlalchemy import (
    Column, Integer, String, ForeignKey, Enum, Boolean, DateTime, Text, Table
)
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

# Enums converted as Python enums for IssueStatus, IssuePriority, IssueTag

class IssueStatus(enum.Enum):
    BACKLOG = "BACKLOG"
    TODO = "TODO"
    INPROCESS = "INPROCESS"
    REVIEW = "REVIEW"
    DONE = "DONE"


class IssuePriority(enum.Enum):
  CRITICAL = "CRITICAL"
  MAJOR = "MAJOR"
  MINOR = "MINOR"
  TRIVIAL = "TRIVIAL"
  BLOCKED = "BLOCKED"

class IssueTag(enum.Enum):
    THEORY = "THEORY"
    PRACTICE = "PRACTICE"

class Issue(Base):
    __tablename__ = 'issues'

    id = Column(Integer, primary_key=True, autoincrement=True)  # Assuming BaseEntity has id

    description = Column(Text)  # LONGTEXT equivalent
    name = Column(String)

    project_id = Column(Integer, ForeignKey('projects.id'), nullable=False)
    project = relationship("Project", back_populates="issues")

    sprint_id = Column(Integer, ForeignKey('sprints.id'))
    sprint = relationship("Sprint", back_populates="issues")


    assignee_id = Column(Integer, ForeignKey('users.id'))
    assignee = relationship("User", foreign_keys=[assignee_id], back_populates="assigned_issues")

    reviewer_id = Column(Integer, ForeignKey('users.id'))
    reviewer = relationship("User", foreign_keys=[reviewer_id], back_populates="reviewed_issues")

    status = Column(Enum(IssueStatus))
    priority = Column(Enum(IssuePriority))
    tag = Column(Enum(IssueTag))

    num_change_of_priority = Column(Integer)
    num_change_of_description = Column(Integer)
    complex_of_description = Column(Integer)

    dt_start = Column(DateTime)
    dt_end = Column(DateTime)
    dt_planning = Column(DateTime)

    affect_by = relationship(
        "IssueRelation",
        foreign_keys='IssueRelation.issue_related_id',
        back_populates="issue_related",
        cascade="all, delete",
        lazy='select'
    )

    affect_to = relationship(
        "IssueRelation",
        foreign_keys='IssueRelation.issue_id',
        back_populates="issue",
        cascade="all, delete",
        lazy='joined'
    )

    open = Column(Boolean, default=True)
