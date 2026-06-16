from fastapi import APIRouter, HTTPException
from app.schemas.weather_schema import WeatherRequest, WeatherResponse
from app.services.weather_service import WeatherService

router = APIRouter()
service = WeatherService()

@router.post("/predict")
async def predict(request: WeatherRequest):
    try:
        result = service.predict(location=request.location)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
