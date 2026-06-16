from pydantic import BaseModel
from typing import List, Optional, Dict

class ChatbotRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = []

class ChatbotResponse(BaseModel):
    response: str
