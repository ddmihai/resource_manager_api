# import and init fastapi server
import os

from fastapi import FastAPI, Depends

# Import all models to create tables
from models.ressource_model import Ressources, UnitOfMeasurement
from models.company_model import Company
from models.users_model import User
from models.storage_model import Storage
from models.storage_inventory_model import StorageInventory
from models.producers_model import Producers

# dependency database, SessionLocal
from config.db_connection import Base, engine






# startup event to create admin user
from utils.startup_create_admin import create_admin_startup
from contextlib import asynccontextmanager
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    create_admin_startup()  # runs on startup
    yield
    # anything after yield runs on shutdown



app = FastAPI(lifespan=lifespan)




# SQLadmin setup
from admin.sqladmin_init import AdminAuth, RessourcesAdmin, CompanyAdmin, UserAdmin, StorageAdmin, ProducersAdmin
from sqladmin import Admin
authentication_backend = AdminAuth(secret_key=os.getenv("JWT_SECRET"))
admin = Admin(app, engine, authentication_backend=authentication_backend)
admin.add_view(RessourcesAdmin)
admin.add_view(CompanyAdmin)
admin.add_view(UserAdmin)
admin.add_view(StorageAdmin)
admin.add_view(ProducersAdmin)




# import user routes
from routers import company_routes, user_routes
app.include_router(user_routes.user_routes)
app.include_router(company_routes.company_router)







# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# security = HTTPBearer()
# @app.get("/protected")
# def protected_route(credentials: HTTPAuthorizationCredentials = Depends(security)):
#     token = credentials.credentials
#     payload = verify_access_token(token)
#     return payload



# from utils.jwt_handler import admin_only
# @app.get("/admin/test", tags=['Admin'])
# def admin_test(payload = Depends(admin_only)):
#     return {"message": "Welcome admin", "user": payload}













