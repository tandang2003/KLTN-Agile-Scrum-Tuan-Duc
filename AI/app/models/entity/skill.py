from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import PrimaryKeyConstraint

Base = declarative_base()

class Skill(Base):
    __tablename__ = 'skills'

    id = Column(String, primary_key=True, autoincrement=True)  # Assuming BaseEntity has id field

    name = Column(String(255), nullable=False)

    personal_skills = relationship("PersonalSkill", back_populates="skill")

