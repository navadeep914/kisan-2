from fastapi import APIRouter, HTTPException, Header, Depends
from typing import Optional

from app.schemas.soil_analysis_schema import SoilAnalysisRequest
from app.services.soil_analysis_service import SoilAnalysisService
from app.core.database import get_db
from app.utils.history import save_prediction

router = APIRouter()
service = SoilAnalysisService()

@router.post("/predict")
async def predict(request: SoilAnalysisRequest, authorization: Optional[str] = Header(None), db = Depends(get_db)):
    try:
        result = service.analyze(
            nitrogen=request.nitrogen,
            phosphorus=request.phosphorus,
            potassium=request.potassium,
            ph=request.ph,
            organic_carbon=request.organic_carbon,
            moisture=request.moisture
        )
        
        # Save to database history
        await save_prediction(
            db=db,
            authorization=authorization,
            module="soil",
            input_data=request.model_dump(),
            result_data=result
        )
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

