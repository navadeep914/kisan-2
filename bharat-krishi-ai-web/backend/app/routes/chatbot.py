from fastapi import APIRouter, HTTPException
from app.schemas.chatbot_schema import ChatbotRequest, ChatbotResponse
from app.services.chatbot_service import ChatbotService

router = APIRouter()
service = ChatbotService()

@router.post("/predict")
async def predict(request: ChatbotRequest):
    try:
        result = service.predict(
            message=request.message,
            history=request.history
        )
        return {"response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
