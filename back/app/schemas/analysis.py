from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AnalysisBase(BaseModel):
    season: str
    confidence: float
    colors: List[str]
    recommendations: List[str]

class AnalysisResult(AnalysisBase):
    pass

class AnalysisCreate(AnalysisBase):
    photo_url: Optional[str] = None

class AnalysisResponse(AnalysisBase):
    id: int
    user_id: int
    photo_url: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True