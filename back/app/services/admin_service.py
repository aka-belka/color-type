from sqlalchemy.orm import Session
from app.models.user import User
from typing import List, Optional
import logging

logger = logging.getLogger(__name__)

class AdminService:
    @staticmethod
    def get_all_users(db: Session) -> List[User]:
        return db.query(User).all()
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def toggle_user_role(db: Session, user_id: int) -> User:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError("Пользователь не найден")
        
        user.role = "admin" if user.role == "user" else "user"
        db.commit()
        db.refresh(user)
        logger.info(f"Роль пользователя {user.id} изменена на {user.role}")
        return user
    
    @staticmethod
    def delete_user(db: Session, user_id: int) -> bool:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError("Пользователь не найден")
        
        db.delete(user)
        db.commit()
        logger.info(f"Пользователь {user_id} удален")
        return True
    
    @staticmethod
    def ban_user(db: Session, user_id: int) -> User:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError("Пользователь не найден")
        
        user.is_active = False
        db.commit()
        db.refresh(user)
        logger.info(f"Пользователь {user.id} забанен")
        return user
    
    @staticmethod
    def unban_user(db: Session, user_id: int) -> User:
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise ValueError("Пользователь не найден")
        
        user.is_active = True
        db.commit()
        db.refresh(user)
        logger.info(f"Пользователь {user.id} разбанен")
        return user
    
    @staticmethod
    def get_stats(db: Session) -> dict:
        total_users = db.query(User).count()
        active_users = db.query(User).filter(User.is_active == True).count()
        admin_count = db.query(User).filter(User.role == "admin").count()
        
        from sqlalchemy import func
        today_stats = db.query(func.date(User.created_at), func.count(User.id))\
                        .group_by(func.date(User.created_at))\
                        .order_by(func.date(User.created_at).desc())\
                        .limit(7).all()
        
        return {
            "total_users": total_users,
            "active_users": active_users,
            "admin_count": admin_count,
            "registration_stats": [
                {"date": str(date), "count": count} 
                for date, count in today_stats
            ]
        }