from fastapi import APIRouter, HTTPException, File, UploadFile, Header, Depends
from typing import Optional

from app.services.plant_disease_service import PlantDiseaseService
from app.core.database import get_db
from app.utils.history import save_prediction

router = APIRouter()
service = PlantDiseaseService()

@router.post("/predict")
async def predict(file: UploadFile = File(...), authorization: Optional[str] = Header(None), db = Depends(get_db)):
    try:
        result = service.detect(filename=file.filename)
        
        # Save to database history
        await save_prediction(
            db=db,
            authorization=authorization,
            module="disease",
            input_data={"filename": file.filename},
            result_data=result
        )
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

