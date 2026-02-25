from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# базовая модель
class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=50)
    first_name: Optional[str] = Field(None, max_length=50)
    last_name: Optional[str] = Field(None, max_length=50)
    phone: Optional[str] = Field(None, pattern=r'^\+?[0-9\-\s()]{10,15}$')
    gender: Optional[str] = Field(None, pattern='^(male|female)$')

# для регистрации
class UserCreate(UserBase):
    password: str = Field(..., min_length=6)

# для входа
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# для апи
class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# для бд
class UserInDB(UserResponse):
    hashed_password: str


