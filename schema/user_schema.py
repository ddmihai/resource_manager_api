from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum 

class UserRole(str, Enum):
    PLAYER = "player"
    ADMIN = "admin"
    COOP = "coop"



class CreateUser(BaseModel):
    full_name :     str
    email :         EmailStr
    password :      str
    # Enum Player, Admin, Coop -> default will be player
    role:           Optional[UserRole] = UserRole.PLAYER
    bio :           Optional[str] = None


class ReturnUser(BaseModel):
    full_name :     str
    email :         EmailStr
    bio :           Optional[str] = None
    role:           UserRole

class UserLogin(BaseModel):
    email :         EmailStr
    password :      str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: ReturnUser