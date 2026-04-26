from sqlalchemy import Boolean, Column, Integer, String, Numeric, ForeignKey
from config.db_connection import Base
from sqlalchemy import Enum as SAEnum
from decimal import Decimal
from sqlalchemy.orm import relationship

from models.ressource_model import UnitOfMeasurement






class Producers(Base):
    __tablename__ = 'producers'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    description = Column(String(255), nullable=True)

    production_rate = Column(Numeric(10, 2), nullable=False, default=100.00)         # Max production capacity per time unit
    is_active = Column(Boolean, nullable=True, default=False)                       # Indicates if the producer is currently active
    unit_of_measure = Column(SAEnum(UnitOfMeasurement), nullable=False, 
        default=UnitOfMeasurement.KILOGRAMS
    )

    # Costs
    build_cost = Column(Numeric(10, 2), nullable=False, default=1000.00)             # Cost to build the producer
    # the selling cost is 40% of the building cost sell_cost = Column(Numeric(10, 2), nullable=False, default=Decimal("400.00"))
    sell_cost = Column(Numeric(10, 2), nullable=False, default=Decimal("40.00"))             # Cost to sell the producer, 40% of the building cost for simulating use and tear

    # Foreign key to company that owns a producer 
    owner_id = Column(Integer, ForeignKey('companies.id'), nullable=False)
    owner = relationship("Company", back_populates="producers")

    # Foreign key ressource and storage
    ressource_id = Column(Integer, ForeignKey('ressources.id'), nullable=False)
    storage_id = Column(Integer, ForeignKey('storage.id'), nullable=False)
    
    # Relationships to ressources and storage
    ressource = relationship("Ressources", back_populates="producer_items")
    storage = relationship("Storage", back_populates="producer_items")

    def __str__(self):
        return self.name