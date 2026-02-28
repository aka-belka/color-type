from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth, admin, palettes, analysis  
from app.core.database import engine
from app.models import user, palette
from app.models import analysis as analysis_model  

user.Base.metadata.create_all(bind=engine)
palette.Palette.metadata.create_all(bind=engine)
analysis_model.Analysis.metadata.create_all(bind=engine)

app = FastAPI(title="Color Type API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(palettes.router, prefix="/api")
app.include_router(analysis.router, prefix="/api")  

@app.get("/")
async def root():
    return {"message": "Color Type API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}