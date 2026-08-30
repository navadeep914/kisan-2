from fastapi import APIRouter, HTTPException, Header, Depends
from typing import Optional

from app.schemas.crop_rotation_schema import CropRotationRequest
from app.services.crop_rotation_service import CropRotationService
from app.core.database import get_db
from app.utils.history import save_prediction

router = APIRouter()
service = CropRotationService()

@router.post("/predict")
async def predict(request: CropRotationRequest, authorization: Optional[str] = Header(None), db = Depends(get_db)):
    try:
        result = service.predict(
            current_crop=request.current_crop,
            soil_type=request.soil_type,
            season=request.season
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # Save to database history (non-fatal)
    try:
        await save_prediction(
            db=db,
            authorization=authorization,
            module="rotation",
            input_data=request.model_dump(),
            result_data=result
        )
    except Exception:
        pass
    
    return result

