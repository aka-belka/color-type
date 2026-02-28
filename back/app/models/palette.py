from sqlalchemy import Column, Integer, String, ForeignKey, JSON, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Palette(Base):
    __tablename__ = "palettes"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    colors = Column(JSON, nullable=False)  # массив HEX-цветов
    is_ai_generated = Column(Boolean, default=False)
    color_type = Column(String, nullable=True)  # spring/summer/autumn/winter
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Связь с пользователем
    user = relationship("User", back_populates="palettes")
    
    def __repr__(self):
        return f"<Palette {self.name} by user {self.user_id}>"