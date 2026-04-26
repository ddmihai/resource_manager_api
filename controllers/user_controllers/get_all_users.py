from models.users_model import User


def get_users(db):
    all_users = db.query(User).all()
    return all_users
