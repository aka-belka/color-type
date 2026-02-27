from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

pwd_context = CryptContext(
    schemes=["argon2"],
    deprecated="auto",
    argon2__memory_cost=102400,  # 100 MB памяти
    argon2__time_cost=3,          # 3 итерации
    argon2__parallelism=4         # 4 параллельных потока
)

# pwd funcs
def verify_password(plain_pwd: str, hash_pwd: str) -> bool:
    try:
        return pwd_context.verify(plain_pwd, hash_pwd)
    except Exception as e:
        logger.error(f"Ошибка verify_password: {e}")
        return False

def get_password_hash(password: str) -> str:
    try:
        logger.info(f"Хеширование пароля длиной {len(password)} символов")
        result = pwd_context.hash(password)
        logger.info("✅ Пароль успешно захеширован")
        return result
    except Exception as e:
        logger.error(f"Ошибка при хешировании: {e}")
        raise

# jwt funcs
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else: 
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire.timestamp()})

    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def decode_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        return None
    

