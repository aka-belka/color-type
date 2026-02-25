from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# для регистрации
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    phone: str = Field(..., description="Номер телефона")
    gender: str = Field(..., pattern='^(male|female)$')

# для повторного входа
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# для апи
class UserResponse(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    phone: str
    gender: str
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# для бд
class UserInDB(UserResponse):
    hashed_password: str