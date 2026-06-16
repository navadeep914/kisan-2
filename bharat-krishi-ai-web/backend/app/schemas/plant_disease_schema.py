from pydantic import BaseModel
from typing import List

class PlantDiseaseResponse(BaseModel):
    disease: str
    scientific_name: str
    type: str
    confidence: float
    severity: float
    severity_label: str
    symptoms: str
    treatment: List[str]
    prevention: str
    is_healthy: bool
