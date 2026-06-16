from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import (
    crop_recommendation, plant_disease, soil_analysis,
    crop_yield, market_price, weather, crop_rotation,
    government_schemes, chatbot, auth
)
from app.core.database import verify_and_init_db


app = FastAPI(
    title="Bharat Krishi AI",
    description="Intelligent Agriculture Decision Support System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all routers
app.include_router(auth.router,                prefix="/api/auth",      tags=["Authentication"])
app.include_router(crop_recommendation.router, prefix="/api/crop",      tags=["Crop Recommendation"])
app.include_router(plant_disease.router,       prefix="/api/disease",   tags=["Plant Disease"])
app.include_router(soil_analysis.router,       prefix="/api/soil",      tags=["Soil Analysis"])
app.include_router(crop_yield.router,          prefix="/api/yield",     tags=["Crop Yield"])
app.include_router(market_price.router,        prefix="/api/market",    tags=["Market Price"])
app.include_router(weather.router,             prefix="/api/weather",   tags=["Weather"])
app.include_router(crop_rotation.router,       prefix="/api/rotation",  tags=["Crop Rotation"])
app.include_router(government_schemes.router,  prefix="/api/schemes",   tags=["Government Schemes"])
app.include_router(chatbot.router,             prefix="/api/chatbot",   tags=["AI Chatbot"])

@app.on_event("startup")
async def startup_event():
    await verify_and_init_db()

@app.get("/")
def root():
    return {"message": "🌾 Bharat Krishi AI API is running!", "version": "1.0.0"}

