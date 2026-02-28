from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime
import re

def validate_hex_color(color: str) -> str:
    """Проверка HEX-цвета"""
    if not re.match(r'^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$', color):
        raise ValueError(f'Некорректный HEX-цвет: {color}')
    return color

class PaletteBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    colors: List[str] = Field(..., min_items=1, max_items=10)
    
    @validator('colors', each_item=True)
    def validate_colors(cls, v):
        return validate_hex_color(v)

class PaletteCreate(PaletteBase):
    is_ai_generated: bool = False
    color_type: Optional[str] = Field(None, pattern='^(spring|summer|autumn|winter)?$')

class PaletteUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=500)
    colors: Optional[List[str]] = Field(None, min_items=1, max_items=10)
    
    @validator('colors', each_item=True)
    def validate_colors(cls, v):
        return validate_hex_color(v)

class PaletteResponse(PaletteBase):
    id: int
    user_id: int
    is_ai_generated: bool
    color_type: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True