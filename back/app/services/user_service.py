from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password
from typing import Optional

# сервис для работы с юзерами в бд
class UserService:

    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email==email).first()
    
    @staticmethod
    def get_by_id(db: Session, id: int) -> Optional[User]:
        return db.query(User).filter(User.id==id).first()
    
    @staticmethod
    def create(db: Session, user_data: UserCreate) -> User:
        user_count = db.query(User).count()
        role = "admin" if user_count == 0 else "user" # если пользователь первый - он админ

        hashed_pwd = get_password_hash(user_data.password)

        db_user = User(
            email=user_data.email,
            hashed_password=hashed_pwd,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            phone=user_data.phone,
            gender=user_data.gender,
            role=role
        )

        db.add(db_user)
        db.commit()
        db.refresh(db_user) 

        return db_user
    
    @staticmethod
    def authenticate(db: Session, email: str, password: str) -> Optional[User]:
        user = UserService.get_by_email(db, email)

        if not User: return None
        if not verify_password(password, user.hashed_password): return None
        return user
    
    @staticmethod
    def is_admin(user: User) -> bool:
        return user.role == "admin"
    

    @staticmethod
    def ban(db: Session, user_id: int) -> Optional[User]:
        user = UserService.get_by_id(db, user_id)
        if user:
            user.is_active = False
            db.commit()
            db.refresh(user)
        return user
    
    @staticmethod
    def unban(db: Session, user_id: int) -> Optional[User]:
        user = UserService.get_by_id(db, user_id)
        if user:
            user.is_active = True
            db.commit()
            db.refresh(user)
        return user






    


