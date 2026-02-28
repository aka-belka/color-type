from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from app.api.endpoints import auth, admin, palettes
from app.core.database import engine
from app.models import user, palette

user.Base.metadata.create_all(bind=engine)
palette.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Color Type API",
    description="API для определения цветотипа",
    version="1.0.0",
    swagger_ui_parameters={
        "persistAuthorization": True,  
        "displayRequestDuration": True,
    }
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# схема безопасности для swagger
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
    
    openapi_schema["components"]["securitySchemes"] = {
        "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": "Введите JWT токен в формате: Bearer <токен>"
        }
    }
    
    for path in openapi_schema["paths"].values():
        for operation in path.values():
            if "security" not in operation:
                operation["security"] = [{"bearerAuth": []}]
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

app.include_router(auth.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(palettes.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Color Type API is running"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}