from fastapi import APIRouter, Depends

from schema.company_schema import CreateCompany, ReturnCompany
from utils.jwt_handler import get_current_user
company_router = APIRouter(prefix="/companies", tags=["companies"])


# bearer token imports
from fastapi.security import HTTPBearer
security = HTTPBearer()




# deps imports
from sqlalchemy.orm import Session
from config.db_connection import get_db

# Models imports
from config.db_connection import get_db





# Controllers imports
from controllers.companies.create_company import create_company as create_company_controller


@company_router.post("/create_company", response_model=ReturnCompany, status_code=201)
def create_company(company: CreateCompany, current_user = Depends(get_current_user), db: Session = Depends(get_db)):
    return create_company_controller(company, current_user['id'], db)
