from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import decode_token
from app.schemas.user import UserResponse
from app.services.user_service import UserService
from app.services.admin_service import AdminService
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/admin", tags=["admin"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

async def get_current_admin(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    logger.info("Проверка прав администратора")
    
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Недействительный токен"
        )
    
    user = UserService.get_by_id(db, payload.get("user_id"))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден"
        )
    
    if user.role != "admin":
        logger.warning(f"Попытка доступа к админке пользователем {user.id}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Недостаточно прав"
        )
    
    logger.info(f"Администратор {user.id} авторизован")
    return user

@router.get("/users", response_model=List[UserResponse])
def get_all_users(
    admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    logger.info("Запрос списка всех пользователей")
    return AdminService.get_all_users(db)

@router.put("/users/{user_id}/role")
def toggle_user_role(
    user_id: int,
    admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    try:
        user = AdminService.toggle_user_role(db, user_id)
        return {"message": f"Роль изменена на {user.role}"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    try:
        AdminService.delete_user(db, user_id)
        return {"message": "Пользователь удален"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/users/{user_id}/ban")
def ban_user(
    user_id: int,
    admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    try:
        user = AdminService.ban_user(db, user_id)
        return {"message": f"Пользователь {user.email} забанен"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/users/{user_id}/unban")
def unban_user(
    user_id: int,
    admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    try:
        user = AdminService.unban_user(db, user_id)
        return {"message": f"Пользователь {user.email} разбанен"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/stats")
def get_stats(
    admin = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    return AdminService.get_stats(db)