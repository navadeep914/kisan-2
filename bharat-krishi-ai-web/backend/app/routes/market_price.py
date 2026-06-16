from fastapi import APIRouter, HTTPException
from app.schemas.market_price_schema import MarketPriceRequest, MarketPriceResponse
from app.services.market_price_service import MarketPriceService

router = APIRouter()
service = MarketPriceService()

@router.post("/predict")
async def predict(request: MarketPriceRequest):
    try:
        result = service.predict(crop=request.crop)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
