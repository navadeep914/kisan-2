from fastapi import APIRouter, HTTPException, Header, Depends
from typing import Optional

from app.schemas.crop_recommendation_schema import Crop_recommendationRequest
from app.services.crop_recommendation_service import CropRecommendationService
from app.core.database import get_db
from app.utils.history import save_prediction

router = APIRouter()
service = CropRecommendationService()

@router.get("/")
async def health_check():
    return {"message": "Crop Recommendation API working"}

@router.post("/predict")
async def predict(request: Crop_recommendationRequest, authorization: Optional[str] = Header(None), db = Depends(get_db)):
    try:
        result = service.predict(
            nitrogen=request.nitrogen,
            phosphorus=request.phosphorus,
            potassium=request.potassium,
            temperature=request.temperature,
            humidity=request.humidity,
            ph=request.ph,
            rainfall=request.rainfall
        )
        
        # Save to database if user is authenticated
        await save_prediction(
            db=db,
            authorization=authorization,
            module="crop",
            input_data=request.model_dump(),
            result_data=result
        )
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

