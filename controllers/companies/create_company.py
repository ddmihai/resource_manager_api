from schema.company_schema import CreateCompany
from services.company.company_services import create_company as create_company_service


def create_company(company: CreateCompany, user_id: int, db):
    return create_company_service(company, user_id, db)
