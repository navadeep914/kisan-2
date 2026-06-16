from pydantic import BaseModel
from typing import List, Optional

class GovernmentSchemesRequest(BaseModel):
    state: str
    land_size: float
    crop: str
    farmer_category: Optional[str] = "General"

class SchemeItem(BaseModel):
    name: str
    amount: str
    desc: str
    eligible: bool
    steps: List[str]
    category: str

class GovernmentSchemesResponse(BaseModel):
    state: str
    land_size: float
    crop: str
    schemes: List[SchemeItem]
