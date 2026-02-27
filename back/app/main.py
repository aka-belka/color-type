from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import auth
from app.core.database import engine
from app.models import user

app = FastAPI(title="Color Type API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Color Type API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

