from pydantic import BaseModel
from typing import List, Optional

class Crop_recommendationRequest(BaseModel):
    nitrogen:    float
    phosphorus:  float
    potassium:   float
    temperature: float
    humidity:    float
    ph:          float
    rainfall:    float

class AlternativeCrop(BaseModel):
    crop:       str
    confidence: float

class Crop_recommendationResponse(BaseModel):
    recommended_crop: str
    confidence:       float
    alternatives:     List[AlternativeCrop]
