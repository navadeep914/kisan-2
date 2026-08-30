from fastapi import APIRouter, HTTPException, Header, Depends
from typing import Optional

from app.schemas.crop_yield_schema import CropYieldRequest
from app.services.crop_yield_service import CropYieldService
from app.core.database import get_db
from app.utils.history import save_prediction

router = APIRouter()
service = CropYieldService()

@router.post("/predict")
async def predict(request: CropYieldRequest, authorization: Optional[str] = Header(None), db = Depends(get_db)):
    try:
        result = service.predict(
            state=request.state,
            crop=request.crop,
            area=request.area,
            rainfall=request.rainfall
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    # Save to database history (non-fatal)
    try:
        await save_prediction(
            db=db,
            authorization=authorization,
            module="yield",
            input_data=request.model_dump(),
            result_data=result
        )
    except Exception:
        pass
    
    return result

