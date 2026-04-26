from schema.user_schema import UserLogin
from fastapi import Depends, HTTPException
from config.db_connection import get_db
from models.users_model import User  
import bcrypt

from utils.jwt_handler import create_access_token





def login_controller(user_obj: UserLogin, db):
    db_user = db.query(User).filter(User.email == user_obj.email).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="Incorrect credentials")
    
    if not bcrypt.checkpw(user_obj.password.encode('utf-8'), db_user.password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Incorrect credentials")

    token_payload = {"id": db_user.id, "email": db_user.email, "role": db_user.role.name}
    token = create_access_token(token_payload)
    return {"access_token": token, "token_type": "bearer", "user": db_user}
