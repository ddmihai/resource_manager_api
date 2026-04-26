from sqlalchemy import Boolean, Column, Enum, Integer, String, Numeric
from config.db_connection import Base
from decimal import Decimal
from sqlalchemy.orm import relationship

# Import enum for unit of measurement
from enum import Enum as UnitOfMeasurementEnum

# enum for unit of measurement
class UnitOfMeasurement(str, UnitOfMeasurementEnum):
    TONNES = "tonnes"
    KILOGRAMS = "kilograms"
    LITERS = "liters"
    BARRELS = "barrels"
    UNITS = "units"
    CUBIC_METERS = "cubic_meters"
    KWH = "kWh"
    MWH = "MWh"
    GWH = "GWh"



class Ressources(Base):
    __tablename__ = 'ressources'


    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)

    is_raw_material = Column(Boolean, nullable=False, default=True)  

    # Price range for the resource, used for market transactions and later on for economic simulations
    max_price = Column(Numeric(10, 2), nullable=False, default=100.00)
    min_price = Column(Numeric(10, 2), nullable=False, default=0.01)
    base_price = Column(Numeric(10, 2), nullable=False, default=50.00)
    unit_of_measure = Column(Enum(UnitOfMeasurement), nullable=False, default=UnitOfMeasurement.KILOGRAMS)
    storage_items = relationship("StorageInventory", back_populates="ressource")

    # populate producer_items relationship for back_populates in Producers model
    producer_items = relationship("Producers", back_populates="ressource")

    
    def __str__(self):
        return self.name