import json
import datetime
from app.utils.security import decode_token

async def save_prediction(db, authorization: str, module: str, input_data: dict, result_data: dict):
    if not authorization or not authorization.startswith("Bearer "):
        return
    try:
        token = authorization.split(" ")[1]
        payload = decode_token(token)
        if payload and "user_id" in payload:
            prediction_doc = {
                "user_id": str(payload["user_id"]),
                "module": module,
                "input_data": json.dumps(input_data),
                "result_data": json.dumps(result_data),
                "created_at": datetime.datetime.utcnow()
            }
            result = await db.predictions.insert_one(prediction_doc)
            print(f"📊 Logged prediction for user {payload['user_id']} in module '{module}' with ID: {result.inserted_id}")
    except Exception as e:
        print(f"⚠️ Failed to log prediction to MongoDB: {e}")

