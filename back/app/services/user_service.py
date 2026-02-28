from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password
from typing import Optional
import logging

logger = logging.getLogger(__name__)

class UserService:
    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_by_id(db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def create(db: Session, user_data: UserCreate) -> User:
        logger.info(f"Создание пользователя с email: {user_data.email}")
        
        user_count = db.query(User).count()
        role = "admin" if user_count == 0 else "user"
        
        db_user = User(
            email=user_data.email,
            hashed_password=get_password_hash(user_data.password),
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            phone=user_data.phone,
            gender=user_data.gender,
            role=role
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        logger.info(f"✅ Пользователь создан с ID: {db_user.id}")
        return db_user
    
    @staticmethod
    def authenticate(db: Session, email: str, password: str) -> Optional[User]:
        logger.info(f"Попытка входа: {email}")
        
        user = UserService.get_by_email(db, email)
        if not user:
            logger.warning(f"Пользователь не найден: {email}")
            return None
        
        if not user.is_active:
            logger.warning(f"Пользователь забанен: {email}")
            return None
        
        if not verify_password(password, user.hashed_password):
            logger.warning(f"Неверный пароль для: {email}")
            return None
        
        logger.info(f"✅ Успешный вход: {email}")
        return user
    
    @staticmethod
    def update_profile(db: Session, user_id: int, **kwargs) -> User:
        user = UserService.get_by_id(db, user_id)
        if not user:
            raise ValueError("Пользователь не найден")
        
        for key, value in kwargs.items():
            if hasattr(user, key) and value is not None:
                setattr(user, key, value)
        
        db.commit()
        db.refresh(user)
        logger.info(f"Профиль пользователя {user_id} обновлен")
        return user
    
    @staticmethod
    def change_password(db: Session, user_id: int, old_password: str, new_password: str) -> bool:
        user = UserService.get_by_id(db, user_id)
        if not user:
            raise ValueError("Пользователь не найден")
        
        if not verify_password(old_password, user.hashed_password):
            raise ValueError("Неверный текущий пароль")
        
        user.hashed_password = get_password_hash(new_password)
        db.commit()
        logger.info(f"Пароль пользователя {user_id} изменен")
        return True