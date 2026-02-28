from sqlalchemy.orm import Session
from app.models.analysis import Analysis
from app.schemas.analysis import AnalysisCreate
from typing import List
import logging

logger = logging.getLogger(__name__)

class AnalysisService:
    
    @staticmethod
    def get_user_analyses(db: Session, user_id: int) -> List[Analysis]:
        """Получить все анализы пользователя"""
        return db.query(Analysis)\
            .filter(Analysis.user_id == user_id)\
            .order_by(Analysis.created_at.desc())\
            .all()
    
    @staticmethod
    def create(db: Session, user_id: int, analysis_data: AnalysisCreate) -> Analysis:
        """Создать запись об анализе"""
        db_analysis = Analysis(
            user_id=user_id,
            season=analysis_data.season,
            confidence=analysis_data.confidence,
            colors=analysis_data.colors,
            recommendations=analysis_data.recommendations,
            photo_url=analysis_data.photo_url
        )
        db.add(db_analysis)
        db.commit()
        db.refresh(db_analysis)
        logger.info(f"✅ Анализ сохранен: ID {db_analysis.id}, сезон {db_analysis.season}")
        return db_analysis