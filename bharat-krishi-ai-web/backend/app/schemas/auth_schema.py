from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class UserRegister(BaseModel):
    username: str
    password: str
    name: Optional[str] = None
    phone: Optional[str] = None
    state: Optional[str] = None

class UserLogin(BaseModel):
    username: str
    password: str

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    state: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    username: str
    name: Optional[str]
    phone: Optional[str]
    state: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True

class AuthResponse(BaseModel):
    token: str
    user: UserResponse

class HistoryItemResponse(BaseModel):
    id: str
    module: str
    input_data: str
    result_data: str
    created_at: datetime

    class Config:
        from_attributes = True

