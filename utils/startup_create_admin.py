# import connection 
from models.users_model import User
import bcrypt
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# import email admin and password from .env
from dotenv import load_dotenv
import os

load_dotenv()

from config.db_connection import SessionLocal


def create_admin_startup():
    connection = SessionLocal()
    try:
        user_obj = User(
            full_name = 'Daniel Mihai',
            email = os.getenv("ADMIN_EMAIL"),
            role = 'admin',
            bio = 'this is the admin user, created at startup',
            password = hash_password(os.getenv("ADMIN_PASSW"))
        )

        db_user = connection.query(User).filter(User.email == user_obj.email).first()
        if db_user is not None:
            print("Admin user already exists, skipping creation")
            return
        
        connection.add(user_obj)
        connection.commit() 
        print("Admin user created successfully")
    finally:
        connection.close()


