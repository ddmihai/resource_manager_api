
import os
from dotenv import load_dotenv
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import HTTPException, status

from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends


load_dotenv()
jwtSecret = os.getenv('JWT_SECRET')
algorithm = os.getenv('ALGORITHM')


def create_access_token(data: dict):
    payload = data.copy()
    expiry = datetime.utcnow() + timedelta(minutes=30)
    payload.update({"exp": expiry})
    return jwt.encode(payload, jwtSecret, algorithm=algorithm)



def verify_access_token(token: str):
    try:
        token = jwt.decode(token, jwtSecret, algorithms=[algorithm])
        if not token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return token 


security = HTTPBearer()
def admin_only(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    if payload['role'] != "ADMIN":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    return payload



# get current user from token
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return payload