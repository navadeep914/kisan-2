from pydantic import BaseModel
from typing import Dict, List, Optional

class SoilAnalysisRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    ph: float
    organic_carbon: Optional[float] = 0.5
    moisture: Optional[float] = 35.0

class NutrientDetail(BaseModel):
    level: float
    status: str
    color: str
    cls: str
    unit: str

class NutrientStatus(BaseModel):
    nitrogen: NutrientDetail
    phosphorus: NutrientDetail
    potassium: NutrientDetail
    ph: NutrientDetail

class FertilizerRecommendation(BaseModel):
    name: str
    dose: str
    when: str
    method: str
    priority: str

class SoilAnalysisResponse(BaseModel):
    nutrients: NutrientStatus
    health_score: int
    health_label: str
    health_advice: str
    fertilizers: List[FertilizerRecommendation]
