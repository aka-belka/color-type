from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    POSTGRES_SERVER: str  
    POSTGRES_USER: str     
    POSTGRES_PASSWORD: str 
    POSTGRES_DB: str       
    
    SECRET_KEY: str        
    ALGORITHM: str = "HS256"  
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()