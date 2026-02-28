from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class PaletteBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    colors: List[str] = Field(..., min_items=1, max_items=10)
    is_public: bool = False

class PaletteCreate(PaletteBase):
    is_ai_generated: bool = False
    color_type: Optional[str] = None

class PaletteUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    colors: Optional[List[str]] = None
    is_public: Optional[bool] = None

class PaletteResponse(PaletteBase):
    id: int
    user_id: int
    is_ai_generated: bool
    color_type: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class PaletteListResponse(BaseModel):
    palettes: List[PaletteResponse]
    total: int