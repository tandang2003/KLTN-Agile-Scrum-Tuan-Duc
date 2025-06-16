from sqlalchemy import Column, ForeignKey, Enum, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class IssueRelationType(enum.Enum):
    BLOCKS = "blocks"
    IS_BLOCKED_BY = "is blocked by"
    RELATES_TO = "relates to"
    IS_RELATED_TO = "is related to"
    DEPENDS_ON = "depends on"
    IS_DEPENDED_ON_BY = "is depended on by"
    SUPERSEDES = "supersedes"
    IS_SUPERSEDED_BY = "is superseded by"
    DUPLICATES = "duplicates"
    IS_DUPLICATED_BY = "is duplicated by"



class IssueRelation(Base):
    __tablename__ = 'issue_relations'

    # Composite primary key columns
    issue_id = Column(Integer, ForeignKey('issues.id'), primary_key=True)
    issue_related_id = Column(Integer, ForeignKey('issues.id'), primary_key=True)

    type_relation = Column(Enum(IssueRelationType))

    # Relationships
    issue = relationship(
        "Issue",
        foreign_keys=[issue_id],
        back_populates="affect_to"
    )
    issue_related = relationship(
        "Issue",
        foreign_keys=[issue_related_id],
        back_populates="affect_by"
    )
