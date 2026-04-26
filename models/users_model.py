from sqlalchemy import Column, Integer, String, Text, DateTime, func, Enum as SAEnum
from sqlalchemy.orm import relationship
from config.db_connection import Base
from schema.user_schema import UserRole
from models.company_model import Company


class User(Base):
    __tablename__ = "users"

    id =           Column(Integer, primary_key=True, index=True)
    full_name =    Column(String, nullable=False)
    email =        Column(String, unique=True, nullable=False)
    password =     Column(String, nullable=False)
    bio =          Column(Text, nullable=True)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    role = Column(SAEnum(UserRole), default=UserRole.PLAYER, nullable=False)
    companies = relationship("Company", back_populates="owner")

    def __str__(self):
        return self.full_name