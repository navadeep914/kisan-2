from fastapi import APIRouter, HTTPException
from app.schemas.government_schemes_schema import GovernmentSchemesRequest, GovernmentSchemesResponse
from app.services.government_schemes_service import GovernmentSchemesService

router = APIRouter()
service = GovernmentSchemesService()

@router.post("/predict")
async def predict(request: GovernmentSchemesRequest):
    try:
        result = service.predict(
            state=request.state,
            land_size=request.land_size,
            crop=request.crop,
            farmer_category=request.farmer_category
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
