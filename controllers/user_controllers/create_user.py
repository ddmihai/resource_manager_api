from schema.user_schema import CreateUser
from models.users_model import User
from fastapi import HTTPException
from utils.handle_password import hash_password


def create_user(user_obj: CreateUser, db):
    # Fetch the user email to avoid duplicates
    db_user = db.query(User).filter(User.email == user_obj.email).first()
    if db_user is not None:
        raise HTTPException(status_code=409, detail="User already exists")
    
    # check the imput of enum to be blocked for admins 
    if user_obj.role is not None and user_obj.role.name != 'PLAYER':
        raise HTTPException(status_code=400, detail="Invalid role")
    
    user_insert = User(
        full_name = user_obj.full_name,
        email = user_obj.email,
        bio = user_obj.bio,
        password = hash_password(user_obj.password)
    )
    db.add(user_insert)
    db.commit() 
    db.refresh(user_insert) 
    return user_insert
