from pydantic import BaseModel
from typing import Optional
from app.schemas.user import UserResponse

# сам токен с данными юзера
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# данные внутри токена
class TokenData(BaseModel):
    email: Optional[str] = None
    user_id: Optional[int] = None