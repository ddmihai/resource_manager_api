from fastapi import APIRouter, Depends
from config.db_connection import get_db

# response models
from schema.user_schema import TokenResponse, UserLogin, CreateUser, ReturnUser
user_routes = APIRouter(prefix="/v1/users", tags=["users"])


# controllers
from controllers.user_controllers.login_user import login_controller
from controllers.user_controllers.create_user import create_user as create_user_controller
from controllers.user_controllers.get_user_by_email import get_user_by_email as get_user_by_email_controller
from controllers.user_controllers.get_user_by_id import get_user_by_id as get_user_by_id_controller
from controllers.user_controllers.get_all_users import get_users as get_users_controller


@user_routes.post("/login", summary="Login a user", status_code=200, response_model=TokenResponse)
def login(user_obj: UserLogin, db = Depends(get_db)):
    return login_controller(user_obj, db)




@user_routes.post("/create", summary="Create a new user", status_code=201, response_model=ReturnUser)
def create_user(user_obj: CreateUser, db = Depends(get_db)):
    return create_user_controller(user_obj, db)





@user_routes.get("/user/get_by_email/{email}", summary="Get user by email", status_code=200, response_model=ReturnUser)
def get_user_by_email(email: str, db = Depends(get_db)):
    return get_user_by_email_controller(email, db)





@user_routes.get("/user/get/{user_id}", summary="Get user by ID", status_code=200, response_model=ReturnUser)
def get_user(user_id: int, db = Depends(get_db)):
    return get_user_by_id_controller(user_id, db)





@user_routes.get("/users/all", summary="Get all users", status_code=200, response_model=list[ReturnUser])
def get_users(db = Depends(get_db)):
    return get_users_controller(db)

