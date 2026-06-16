from pydantic import BaseModel
from typing import List, Dict

class CropYieldRequest(BaseModel):
    state: str
    crop: str
    area: float
    rainfall: float

class YieldHistoryItem(BaseModel):
    year: str
    yield_per_acre: float

class CropYieldResponse(BaseModel):
    predicted_yield_per_acre: float
    total_yield: float
    unit: str
    area: float
    state: str
    crop: str
    estimated_revenue: float
    price_per_quintal: float
    history: List[YieldHistoryItem]
    tips: List[str]
