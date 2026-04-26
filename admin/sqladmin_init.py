from sqladmin import ModelView
from sqladmin.authentication import AuthenticationBackend
from starlette.requests import Request

from schema.user_schema import UserLogin
from config.db_connection import get_db
from models.users_model import User
import bcrypt
from utils.jwt_handler import create_access_token

from models.ressource_model import Ressources, UnitOfMeasurement
from models.company_model import Company
from models.users_model import User
from models.storage_model import Storage
from models.producers_model import Producers


# dependency database, SessionLocal
from config.db_connection import Base, SessionLocal


class AdminAuth(AuthenticationBackend):
    async def login(self, request: Request) -> bool:
        form = await request.form()
        email = form.get("username")
        password = form.get("password")

        db = SessionLocal()
        try:
            db_user = db.query(User).filter(User.email == email).first()
            if db_user is None:
                return False
            if not bcrypt.checkpw(password.encode('utf-8'), db_user.password.encode('utf-8')):
                return False
            if db_user.role.value != 'admin':
                return False

            token_payload = {"id": db_user.id, "email": db_user.email, "role": db_user.role.name}
            token = create_access_token(token_payload)
            request.session.update({"token": token})
            return True
        finally:
            db.close()

    async def logout(self, request: Request) -> bool:
        request.session.clear()
        return True

    async def authenticate(self, request: Request) -> bool:
        token = request.session.get("token")
        if not token:
            return False
        return True


# register models with sqladmin
class RessourcesAdmin(ModelView, model=Ressources):
    column_list = [Ressources.id, Ressources.name, Ressources.is_raw_material, Ressources.unit_of_measure, Ressources.max_price, Ressources.min_price, Ressources.base_price]
    form_excluded_columns = [Ressources.storage_items, Ressources.producer_items]
    
class CompanyAdmin(ModelView, model=Company):
    column_list = [Company.id, Company.name, Company.owner_id]
    form_excluded_columns = [Company.balance, Company.time_created]

class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.full_name, User.email, User.role]

class StorageAdmin(ModelView, model=Storage):
    column_list = [Storage.id, Storage.name, Storage.description, Storage.capacity, Storage.max_input_rate, Storage.unit_of_measure, Storage.buy_price]
    form_excluded_columns = [Storage.current_level, Storage.is_active, Storage.sell_price, Storage.owner_id]

class ProducersAdmin(ModelView, model=Producers):
    column_list = [Producers.id, Producers.name, Producers.build_cost, Producers.sell_cost, Producers.ressource_id, Producers.storage_id]