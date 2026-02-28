from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Any

from app.core.database import get_db
from app.core.security import create_access_token, decode_token
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.schemas.token import Token
from app.services.user_service import UserService

router = APIRouter(prefix="/auth", tags=["authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# для регистрации: 
# - почта должна быть уникальной 
# - пароль минимум 6 симв
# - обязательные поля: first_name, last_name, phone, gender
# - первый зареганный - адм
@router.post("/register", response_model=Token)
def register(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate
) -> Any:
    user = UserService.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким email уже существует"
        )
    
    user = UserService.create(db, user_data=user_in)

    access_token = create_access_token(
        data={"sub": user.email, "user_id": user.id}
    )

    return Token(
        access_token=access_token,
        user=UserResponse.model_validate(user)
    )

# для входа
# - почта
# - пароль
@router.post("/login", response_model=Token)
def login(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    user = UserService.authenticate(
        db, 
        email=form_data.username, 
        password=form_data.password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь заблокирован"
        )
    
    access_token = create_access_token(
        data={"sub": user.email, "user_id": user.id}
    )
    
    return Token(
        access_token=access_token,
        user=UserResponse.model_validate(user)
    )

@router.post("/token", response_model=Token)
def login_for_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    return login(db, form_data)


@router.get("/me", response_model=UserResponse)
def read_users_me(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Any:
    payload = decode_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Недействительный токен",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user_id = payload.get("user_id")
    user = UserService.get_by_id(db, user_id=user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Пользователь не найден",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """Получить текущего пользователя по токену"""
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
    
    return user

async def get_current_admin(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """Получить текущего пользователя и проверить, что он админ"""
    user = await get_current_user(token, db)
    if user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Недостаточно прав"
        )
    return user