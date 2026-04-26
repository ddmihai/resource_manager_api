from sqlalchemy import Boolean, Column, Integer, String, Numeric, ForeignKey
from config.db_connection import Base
from sqlalchemy import Enum as SAEnum
from decimal import Decimal
from sqlalchemy.orm import relationship

from models.ressource_model import UnitOfMeasurement


# Import enum for unit of measurement






class Storage(Base):
    __tablename__ = 'storage'

    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    description = Column(String(255), nullable=True)

    capacity = Column(Numeric(10, 2), nullable=False, default=1000.00)              # Total storage capacity
    current_level = Column(Numeric(10, 2), nullable=False, default=0.00)            # Current storage level
    max_input_rate = Column(Numeric(10, 2), nullable=False, default=100.00)         # Max input rate per time unit
    is_active = Column(Boolean, nullable=True, default=False)                       # Indicates if the storage is currently off
    unit_of_measure = Column(SAEnum(UnitOfMeasurement), nullable=False, 
        default=UnitOfMeasurement.KILOGRAMS
    )

    # Price of buying or selling resources from/to the storage, used for market transactions and later on for economic simulations
    buy_price = Column(Numeric(10, 2), nullable=False, default=50.00)
    # resell price will be 35% of the buying price for simulating use and tear
    sell_price = Column(Numeric(10, 2), nullable=True, default= Decimal(0.35))
    
    # Foreign key to company that owns a storage 
    owner_id = Column(Integer, ForeignKey('companies.id'), nullable=False)
    # Relationship to the commpany that owns the storage, back_populates is used to define the relationship in both directions
    owner = relationship("Company", back_populates="storages")
    inventory_items = relationship("StorageInventory", back_populates="storage")

    # Relationship to producers that use the storage, back_populates is used to define the relationship in both directions
    producer_items = relationship("Producers", back_populates="storage")

    
    def __str__(self):
        return self.name