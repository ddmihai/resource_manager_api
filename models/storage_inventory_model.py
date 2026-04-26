from sqlalchemy import Column, Integer, Numeric, ForeignKey
from config.db_connection import Base
from sqlalchemy.orm import relationship



class StorageInventory(Base):
    __tablename__ = 'storage_inventory'

    id = Column(Integer, primary_key=True)
    storage_id = Column(Integer, ForeignKey('storage.id'), nullable=False)
    ressource_id = Column(Integer, ForeignKey('ressources.id'), nullable=False)
    quantity = Column(Numeric(10, 2), nullable=False, default=0.00)

    # Relationships to storage and ressources
    storage = relationship("Storage", back_populates="inventory_items")
    ressource = relationship("Ressources", back_populates="storage_items")