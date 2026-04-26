from fastapi import Depends, HTTPException
from models.users_model import User


def get_user_by_email(email: str, db):
    print(email)
    db_user = db.query(User).filter(User.email == email).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

