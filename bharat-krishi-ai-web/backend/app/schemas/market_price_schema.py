from pydantic import BaseModel
from typing import List, Optional

class MarketPriceRequest(BaseModel):
    crop: str

class MandiPriceDetail(BaseModel):
    mandi: str
    distance: str
    price: float
    recommendation: str

class MarketPriceResponse(BaseModel):
    crop: str
    current_price: float
    price_unit: str
    trend_pct: float
    trend_direction: str
    history_30_days: List[float]
    mandi_prices: List[MandiPriceDetail]
