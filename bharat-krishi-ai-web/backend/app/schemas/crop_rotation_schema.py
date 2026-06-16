from pydantic import BaseModel
from typing import List, Optional

class CropRotationRequest(BaseModel):
    current_crop: str
    soil_type: str
    season: Optional[str] = "Kharif"

class RotationStage(BaseModel):
    crop: str
    duration: str
    soil_health_impact: str
    nitrogen_fixation_pct: float
    description: str

class CropRotationResponse(BaseModel):
    current_crop: str
    soil_type: str
    rotation_sequence: List[RotationStage]
    overall_sustainability_score: float
    rotation_advice: str
