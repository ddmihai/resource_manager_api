from sqlalchemy.orm import Session
from config.db_connection import get_db
from models.company_model import Company
from schema.company_schema import CreateCompany
from fastapi import HTTPException



def get_user_companies(user_id: int, db: Session):
    return db.query(Company).filter(Company.owner_id == user_id).all()





def create_company(company_data: CreateCompany, user_id: int, db: Session):

    user_companies = get_user_companies(user_id, db)
    user_has_companies = False
    if len(user_companies) > 0:
        user_has_companies = True
    # check the user company names and reject if the name already exists
    for company in user_companies:
        if company.name == company_data.name:
            raise HTTPException(status_code=409, detail="Company name already exists") 
        
    new_company = Company(
        name=company_data.name,
        description=company_data.description,
        owner_id=user_id,
        balance = 0.00 if len(user_companies) > 0 else 100_000.00
    )
    db.add(new_company)
    db.commit()
    db.refresh(new_company)
    return new_company