from sqlalchemy import Column, Integer, String, ForeignKey, JSON, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Analysis(Base):
    __tablename__ = "analyses"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    photo_url = Column(String, nullable=True)
    season = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    colors = Column(JSON, nullable=False)
    recommendations = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="analyses")
    
    def __repr__(self):
        return f"<Analysis {self.id} - {self.season}>"
    
    