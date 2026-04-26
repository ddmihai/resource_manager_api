from models.users_model import User



def get_user_by_id(user_id: int, db):
    db_user = db.query(User).filter(User.id == user_id).first()
    return db_user
