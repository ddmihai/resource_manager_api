from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from config.db_connection import Base 






class CreateCompany(BaseModel):
    name: str
    description: Optional[str] = None


class ReturnCompany(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    balance: float
    owner_id: int
    time_created: datetime