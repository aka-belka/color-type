from fastapi import APIRouter, Depends, UploadFile, File, BackgroundTasks
from sqlalchemy.orm import Session
import random
import os
import shutil
from datetime import datetime
from typing import List  # ← добавить этот импорт

from app.core.database import get_db
from app.api.endpoints.auth import get_current_user
from app.schemas.analysis import AnalysisResult, AnalysisCreate, AnalysisResponse  # ← добавить AnalysisResponse
from app.services.analysis_service import AnalysisService

router = APIRouter(prefix="/analyze", tags=["analysis"])

# Статические тестовые данные
SEASONS = ["Весна", "Лето", "Осень", "Зима"]
COLORS = {
    "Весна": ["#FFDAB9", "#FFB347", "#FF8C69", "#A8E6CF", "#FFD3B6"],
    "Лето": ["#E6E6FA", "#B0E0E6", "#D8BFD8", "#AFEEEE", "#C7CEEA"],
    "Осень": ["#DEB887", "#CD853F", "#8B4513", "#6B8E23", "#D2691E"],
    "Зима": ["#FF4757", "#1E90FF", "#FFFFFF", "#2C3A47", "#AA80F9"]
}
RECOMMENDATIONS = {
    "Весна": [
        "Теплые пастельные тона",
        "Золотые аксессуары",
        "Коралловый и персиковый",
        "Избегайте холодных ярких цветов"
    ],
    "Лето": [
        "Холодные пастельные тона",
        "Серебряные аксессуары",
        "Розовый и сиреневый",
        "Избегайте теплых оранжевых оттенков"
    ],
    "Осень": [
        "Землистые тона",
        "Медные аксессуары",
        "Охра, хаки, терракот",
        "Избегайте пастельных тонов"
    ],
    "Зима": [
        "Яркие холодные тона",
        "Белый и черный",
        "Красный и синий",
        "Избегайте теплых приглушенных цветов"
    ]
}

async def save_upload_file(file: UploadFile) -> str:
    """Сохранить загруженный файл (опционально)"""
    # Создаем папку uploads если её нет
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Генерируем имя файла
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{file.filename}"
    filepath = os.path.join(upload_dir, filename)
    
    # Сохраняем файл
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return filepath

@router.post("/", response_model=AnalysisResult)
async def analyze_photo(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Заглушка для AI-анализа.
    Принимает фото, возвращает тестовые данные и сохраняет результат в БД.
    """
    # Выбираем случайный сезон для разнообразия
    season = random.choice(SEASONS)
    
    # Формируем результат
    result = AnalysisResult(
        season=season,
        confidence=random.randint(75, 95),
        colors=COLORS[season],
        recommendations=RECOMMENDATIONS[season]
    )
    
    # Опционально сохраняем фото
    # filepath = await save_upload_file(file)
    filepath = None  # пока не сохраняем фото
    
    # Сохраняем результат в БД
    analysis_data = AnalysisCreate(
        season=result.season,
        confidence=result.confidence,
        colors=result.colors,
        recommendations=result.recommendations,
        photo_url=filepath
    )
    
    saved_analysis = AnalysisService.create(db, current_user.id, analysis_data)
    
    return result

@router.get("/history", response_model=List[AnalysisResponse])
def get_analysis_history(
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Получить историю анализов пользователя"""
    return AnalysisService.get_user_analyses(db, current_user.id)