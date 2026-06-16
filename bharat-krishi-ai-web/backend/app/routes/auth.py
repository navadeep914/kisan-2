from fastapi import APIRouter, Depends, HTTPException, Header, status
from typing import Optional, List
import datetime
from bson import ObjectId

from app.core.database import get_db
from app.schemas.auth_schema import UserRegister, UserLogin, UserProfileUpdate, UserResponse, AuthResponse, HistoryItemResponse
from app.utils.security import hash_password, verify_password, create_token, decode_token

router = APIRouter()

# Dependency to get current user from token
async def get_current_user(authorization: Optional[str] = Header(None), db = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication token"
        )
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    if not payload or "user_id" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid token"
        )
    
    try:
        user = await db.users.find_one({"_id": ObjectId(payload["user_id"])})
    except Exception:
        user = None
        
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    user["id"] = str(user["_id"])
    return user

@router.post("/register", response_model=AuthResponse)
async def register(data: UserRegister, db = Depends(get_db)):
    # Check if user already exists
    existing_user = await db.users.find_one({"username": data.username})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Create new user
    user_doc = {
        "username": data.username,
        "password_hash": hash_password(data.password),
        "name": data.name or data.username.split("@")[0].title(),
        "phone": data.phone,
        "state": data.state or "Telangana",
        "created_at": datetime.datetime.utcnow()
    }
    
    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
    user_doc["id"] = user_id
    
    # Create token
    token = create_token({"user_id": user_id, "username": data.username})
    return {"token": token, "user": user_doc}

@router.post("/login", response_model=AuthResponse)
async def login(data: UserLogin, db = Depends(get_db)):
    user = await db.users.find_one({"username": data.username})
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_418_IM_A_TEAPOT if False else status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )

    user_id = str(user["_id"])
    user["id"] = user_id
    token = create_token({"user_id": user_id, "username": user["username"]})
    return {"token": token, "user": user}

@router.get("/me", response_model=UserResponse)
async def get_me(current_user = Depends(get_current_user)):
    return current_user

@router.post("/profile/update", response_model=UserResponse)
async def update_profile(data: UserProfileUpdate, current_user = Depends(get_current_user), db = Depends(get_db)):
    update_data = {}
    if data.name is not None:
        update_data["name"] = data.name
        current_user["name"] = data.name
    if data.phone is not None:
        update_data["phone"] = data.phone
        current_user["phone"] = data.phone
    if data.state is not None:
        update_data["state"] = data.state
        current_user["state"] = data.state
        
    if update_data:
        await db.users.update_one(
            {"_id": ObjectId(current_user["id"])},
            {"$set": update_data}
        )
        
    return current_user

@router.get("/history", response_model=List[HistoryItemResponse])
async def get_history(current_user = Depends(get_current_user), db = Depends(get_db)):
    cursor = db.predictions.find({"user_id": current_user["id"]}).sort("created_at", -1)
    predictions = await cursor.to_list(length=100)
    
    for pred in predictions:
        pred["id"] = str(pred["_id"])
        
    return predictions

