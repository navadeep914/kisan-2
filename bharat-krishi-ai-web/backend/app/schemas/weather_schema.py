from pydantic import BaseModel
from typing import List

class WeatherRequest(BaseModel):
    location: str

class WeatherForecastItem(BaseModel):
    day: str
    icon: str
    temp: str
    rain: str
    advice: str

class WeatherResponse(BaseModel):
    location: str
    current_temp: float
    condition: str
    humidity: float
    wind_speed: float
    feels_like: float
    advice: str
    forecast: List[WeatherForecastItem]
