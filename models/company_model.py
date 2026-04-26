from decimal import Decimal
from sqlalchemy import Column, DateTime, Integer, Numeric, String, func, ForeignKey
from config.db_connection import Base
from sqlalchemy.orm import relationship



class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=True)
    balance = Column(Numeric(12, 2), nullable=False, default=Decimal("0.00"))

    # User relationship
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)  
    owner = relationship("User", back_populates="companies")

    # Storages relationship
    storages = relationship("Storage", back_populates="owner") 
    producers = relationship("Producers", back_populates="owner")

    time_created = Column(DateTime(timezone=True), server_default=func.now())

    
    def __str__(self):
        return self.name