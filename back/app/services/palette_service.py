from sqlalchemy.orm import Session
from sqlalchemy import desc
from app.models.palette import Palette
from app.models.user import User
from app.schemas.palette import PaletteCreate, PaletteUpdate
from typing import List, Optional
import logging

logger = logging.getLogger(__name__)

class PaletteService:
    
    @staticmethod
    def get_user_palettes(db: Session, user_id: int) -> List[Palette]:
        return db.query(Palette)\
            .filter(Palette.user_id == user_id)\
            .order_by(desc(Palette.created_at))\
            .all()
    
    @staticmethod
    def get_by_id(db: Session, palette_id: int, user_id: int) -> Optional[Palette]:
        return db.query(Palette)\
            .filter(Palette.id == palette_id)\
            .filter(Palette.user_id == user_id)\
            .first()
    
    @staticmethod
    def create(db: Session, user_id: int, palette_data: PaletteCreate) -> Palette:
        db_palette = Palette(
            user_id=user_id,
            name=palette_data.name,
            description=palette_data.description,
            colors=palette_data.colors,
            is_ai_generated=palette_data.is_ai_generated,
            color_type=palette_data.color_type
        )
        db.add(db_palette)
        db.commit()
        db.refresh(db_palette)
        logger.info(f"✅ Палитра создана: {db_palette.id} - {db_palette.name}")
        return db_palette
    
    @staticmethod
    def update(db: Session, palette_id: int, user_id: int, palette_data: PaletteUpdate) -> Optional[Palette]:
        db_palette = PaletteService.get_by_id(db, palette_id, user_id)
        if not db_palette:
            return None
        
        update_data = palette_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_palette, field, value)
        
        db.commit()
        db.refresh(db_palette)
        logger.info(f"✅ Палитра обновлена: {db_palette.id}")
        return db_palette
    
    @staticmethod
    def delete(db: Session, palette_id: int, user_id: int) -> bool:
        db_palette = PaletteService.get_by_id(db, palette_id, user_id)
        if not db_palette:
            return False
        
        db.delete(db_palette)
        db.commit()
        logger.info(f"✅ Палитра удалена: {palette_id}")
        return True