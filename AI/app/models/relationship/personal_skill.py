from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()
class PersonalSkill(Base):
    __tablename__ = 'personal_skill'  # You can specify the actual table name if different

    skill_id = Column(Integer, ForeignKey('skills.id'), primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    proficiency = Column(Integer, nullable=False)

    skill = relationship("Skill", back_populates="personal_skills")
    user = relationship("User", back_populates="personal_skills")

