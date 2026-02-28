from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import decode_token
from app.schemas.palette import PaletteCreate, PaletteUpdate, PaletteResponse
from app.services.palette_service import PaletteService
from app.services.user_service import UserService
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/palettes", tags=["palettes"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
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

@router.get("/", response_model=List[PaletteResponse])
def get_my_palettes(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return PaletteService.get_user_palettes(db, current_user.id)

@router.post("/", response_model=PaletteResponse, status_code=status.HTTP_201_CREATED)
def create_palette(
    palette_data: PaletteCreate,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return PaletteService.create(db, current_user.id, palette_data)

@router.delete("/{palette_id}")
def delete_palette(
    palette_id: int,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not PaletteService.delete(db, palette_id, current_user.id):
        raise HTTPException(status_code=404, detail="Палитра не найдена")
    return {"message": "Палитра удалена"}