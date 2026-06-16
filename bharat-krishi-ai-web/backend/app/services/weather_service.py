import random
import requests
import datetime
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class WeatherService:
    def map_wmo_code(self, code: int) -> str:
        if code == 0:
            return "Sunny"
        elif code in [1, 2]:
            return "Partly Cloudy"
        elif code == 3:
            return "Cloudy"
        elif code in [45, 48]:
            return "Foggy"
        elif code in [51, 53, 55]:
            return "Drizzle"
        elif code in [61, 63]:
            return "Light Rain"
        elif code == 65:
            return "Heavy Rain"
        elif code in [80, 81, 82]:
            return "Rain Showers"
        elif code in [95, 96, 99]:
            return "Thunderstorm"
        else:
            return "Partly Cloudy"

    def condition_to_emoji(self, condition: str) -> str:
        cond = condition.lower()
        if "thunder" in cond:
            return "⛈️"
        elif "heavy rain" in cond:
            return "🌧️"
        elif "rain" in cond or "drizzle" in cond or "shower" in cond:
            return "🌧️"
        elif "cloud" in cond:
            return "⛅"
        elif "fog" in cond or "mist" in cond or "haze" in cond:
            return "🌫️"
        elif "snow" in cond:
            return "❄️"
        else:
            return "☀️"

    def generate_agricultural_advice(self, temp: float, humidity: float, condition: str) -> str:
        cond = condition.lower()
        if "thunderstorm" in cond or "heavy rain" in cond:
            return "⚠️ Heavy rain/thunderstorm alert. Postpone fertilizer/pesticide applications. Ensure proper field drainage to prevent waterlogging."
        elif "rain" in cond or "drizzle" in cond:
            return "🌦️ Light rain expected. Delay chemical applications. Good time for transplanting crops if soil moisture is low."
        elif temp > 35.0:
            return "⚠️ Excessive heat warning. Irrigate crops in the early morning or late evening. Mulch soil to conserve moisture."
        elif temp < 15.0:
            return "⚠️ Cold weather warning. Protect frost-sensitive crops. Limit evening irrigation to avoid frost damage."
        elif humidity > 80.0:
            return "💧 High humidity levels. Increased risk of fungal disease. Monitor crops closely and ensure adequate ventilation."
        elif humidity < 35.0:
            return "🍂 Dry conditions with low humidity. Monitor soil moisture levels closely. Ideal weather for harvesting and drying grains."
        else:
            return "🌾 Stable weather conditions. Suitable for regular field operations, sowing, weeding, and soil amendments."

    def predict(self, location: str):
        loc_clean = location.strip().title()
        
        # Check for OpenWeatherMap Key
        api_key = settings.weather_api_key
        has_valid_key = api_key and api_key != "your_weather_api_key_here" and len(api_key.strip()) > 5
        
        if has_valid_key:
            logger.info("🌤️ Attempting current weather fetch using OpenWeatherMap API...")
            try:
                # 1. Fetch current weather
                curr_url = f"https://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"
                curr_res = requests.get(curr_url, timeout=5)
                if curr_res.status_code == 200:
                    curr_data = curr_res.json()
                    
                    # 2. Fetch forecast
                    fore_url = f"https://api.openweathermap.org/data/2.5/forecast?q={location}&appid={api_key}&units=metric"
                    fore_res = requests.get(fore_url, timeout=5)
                    fore_data = {}
                    if fore_res.status_code == 200:
                        fore_data = fore_res.json()
                        
                    return self._parse_openweathermap_data(location, curr_data, fore_data)
                else:
                    logger.warning(f"⚠️ OpenWeatherMap API returned status {curr_res.status_code}. Falling back to Open-Meteo.")
            except Exception as e:
                logger.error(f"❌ OpenWeatherMap API call failed: {e}. Falling back to Open-Meteo.")

        # Fallback 1: Open-Meteo API
        logger.info("🌤️ Attempting weather fetch using Open-Meteo API...")
        try:
            # 1. Geocode location name
            geocode_url = f"https://geocoding-api.open-meteo.com/v1/search?name={location}&count=1&language=en&format=json"
            geo_res = requests.get(geocode_url, timeout=5)
            if geo_res.status_code == 200 and geo_res.json().get("results"):
                result = geo_res.json()["results"][0]
                lat = result["latitude"]
                lon = result["longitude"]
                resolved_name = result.get("name", location)
                
                # 2. Fetch weather and forecast
                forecast_url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto"
                forecast_res = requests.get(forecast_url, timeout=5)
                if forecast_res.status_code == 200:
                    forecast_data = forecast_res.json()
                    return self._parse_openmeteo_data(resolved_name, forecast_data)
            else:
                logger.warning("⚠️ Open-Meteo geocoding search empty or failed. Trying simulation fallback.")
        except Exception as e:
            logger.error(f"❌ Open-Meteo API call failed: {e}. Trying simulation fallback.")

        # Fallback 2: Simulated Weather
        logger.info("🌤️ Using simulated weather fallback.")
        return self._generate_simulated_data(location)

    def _parse_openweathermap_data(self, location: str, curr: dict, fore: dict) -> dict:
        temp = float(curr["main"]["temp"])
        humidity = float(curr["main"]["humidity"])
        wind = float(curr["wind"]["speed"]) * 3.6  # Convert m/s to km/h
        feels_like = float(curr["main"]["feels_like"])
        condition = curr["weather"][0]["main"]
        advice = self.generate_agricultural_advice(temp, humidity, condition)
        
        forecast_list = fore.get("list", [])
        daily_forecasts = []
        seen_days = set()
        
        for item in forecast_list:
            dt = datetime.datetime.fromtimestamp(item["dt"])
            day_name = dt.strftime("%A")
            hour = dt.hour
            
            # Select one forecast per day, ideally around noon
            if day_name not in seen_days and (11 <= hour <= 14 or len(seen_days) < 5):
                t_max = item["main"]["temp_max"]
                t_min = item["main"]["temp_min"]
                cond = item["weather"][0]["main"]
                icon = self.condition_to_emoji(cond)
                
                pop = item.get("pop", 0) * 100
                rain_prob = f"{int(pop)}%"
                
                day_advice = "Stable conditions"
                if "rain" in cond.lower() or "thunder" in cond.lower():
                    day_advice = "Delay chemical applications"
                elif t_max > 35:
                    day_advice = "Increase irrigation frequency"
                elif icon == "⛅":
                    day_advice = "Monitor soil moisture"
                
                daily_forecasts.append({
                    "day": day_name,
                    "icon": icon,
                    "temp": f"{int(t_max)}°/{int(t_min)}°",
                    "rain": rain_prob,
                    "advice": day_advice
                })
                seen_days.add(day_name)
                if len(daily_forecasts) >= 5:
                    break
                    
        # If forecast data is empty, populate simulated daily forecast
        if not daily_forecasts:
            daily_forecasts = self._generate_simulated_forecast(temp)
            
        return {
            "location": location.title(),
            "current_temp": float(round(temp, 1)),
            "condition": condition,
            "humidity": float(humidity),
            "wind_speed": float(round(wind, 1)),
            "feels_like": float(round(feels_like, 1)),
            "advice": advice,
            "forecast": daily_forecasts
        }

    def _parse_openmeteo_data(self, location: str, data: dict) -> dict:
        temp = float(data["current"]["temperature_2m"])
        humidity = float(data["current"]["relative_humidity_2m"])
        wind = float(data["current"]["wind_speed_10m"])
        feels_like = temp + (2.0 if humidity > 60 else -1.0)
        
        weather_code = data["current"]["weather_code"]
        condition = self.map_wmo_code(weather_code)
        advice = self.generate_agricultural_advice(temp, humidity, condition)
        
        daily = data["daily"]
        daily_forecasts = []
        
        # We take up to 5 days
        for i in range(min(5, len(daily["time"]))):
            date_str = daily["time"][i]
            # Parse day of week
            dt = datetime.datetime.strptime(date_str, "%Y-%m-%d")
            day_name = dt.strftime("%A")
            
            t_max = daily["temperature_2m_max"][i]
            t_min = daily["temperature_2m_min"][i]
            rain_prob = f"{int(daily['precipitation_probability_max'][i])}%"
            
            # Map code or precipitation to emoji
            is_rainy = daily['precipitation_probability_max'][i] > 40
            icon = "🌧️" if is_rainy else ("☀️" if t_max > 30 else "⛅")
            
            day_advice = "Stable conditions"
            if is_rainy:
                day_advice = "Delay chemical applications"
            elif t_max > 35:
                day_advice = "Increase irrigation frequency"
            elif icon == "⛅":
                day_advice = "Monitor soil moisture"
                
            daily_forecasts.append({
                "day": day_name,
                "icon": icon,
                "temp": f"{int(t_max)}°/{int(t_min)}°",
                "rain": rain_prob,
                "advice": day_advice
            })
            
        return {
            "location": location,
            "current_temp": float(round(temp, 1)),
            "condition": condition,
            "humidity": float(humidity),
            "wind_speed": float(round(wind, 1)),
            "feels_like": float(round(feels_like, 1)),
            "advice": advice,
            "forecast": daily_forecasts
        }

    def _generate_simulated_data(self, location: str) -> dict:
        loc = location.lower()
        base_temp = 32.0
        condition = "Partly Cloudy"
        humidity = 45.0
        wind = 14.0
        advice = "Good weather for regular field work. Monitor soil moisture levels."
        
        if "hyderabad" in loc or "telangana" in loc:
            base_temp = 32.0
            condition = "Partly Cloudy"
            humidity = 42.0
            wind = 18.0
            advice = "⚠️ Moderate heat expected. Irrigate crops early morning or late evening. Avoid midday spraying."
        elif "punjab" in loc or "amritsar" in loc or "ludhiana" in loc:
            base_temp = 29.0
            condition = "Sunny"
            humidity = 35.0
            wind = 12.0
            advice = "Ideal dry weather for harvesting Wheat. Ensure grain storehouses are dry."
        elif "mumbai" in loc or "maharashtra" in loc:
            base_temp = 28.0
            condition = "Heavy Rain"
            humidity = 85.0
            wind = 25.0
            advice = "⚠️ Heavy rain alert. Postpone fertilizer applications. Ensure proper drainage in fields to prevent waterlogging."
        elif "lucknow" in loc or "uttar pradesh" in loc:
            base_temp = 34.0
            condition = "Clear Sky"
            humidity = 30.0
            wind = 15.0
            advice = "High temperature forecast. Mulch vegetable beds to conserve moisture and protect roots from heat."
        else:
            base_temp = round(random.uniform(22, 38), 1)
            condition = random.choice(["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Thunderstorm"])
            humidity = round(random.uniform(25, 90))
            wind = round(random.uniform(5, 30), 1)
            advice = self.generate_agricultural_advice(base_temp, humidity, condition)

        feels_like = base_temp + (2.0 if humidity > 60 else -1.0)
        daily_forecasts = self._generate_simulated_forecast(base_temp, condition)

        return {
            "location": location.title(),
            "current_temp": float(round(base_temp, 1)),
            "condition": condition,
            "humidity": float(humidity),
            "wind_speed": float(wind),
            "feels_like": float(round(feels_like, 1)),
            "advice": advice,
            "forecast": daily_forecasts
        }

    def _generate_simulated_forecast(self, base_temp: float, condition: str = "Sunny") -> list:
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
        conditions = ["⛅", "🌧️", "☀️", "⛅", "🌧️"] if condition == "Partly Cloudy" else ["☀️", "☀️", "⛅", "⛅", "🌧️"]
        if "rain" in condition.lower() or "thunderstorm" in condition.lower():
            conditions = ["🌧️", "⛈️", "🌧️", "⛅", "☀️"]
            
        forecast = []
        for i, day in enumerate(days):
            icon = conditions[i % len(conditions)]
            t_max = round(base_temp + random.uniform(-3, 3))
            t_min = round(t_max - random.uniform(6, 10))
            rain_prob = "10%"
            day_advice = "Good for field work"
            
            if icon == "🌧️" or icon == "⛈️":
                rain_prob = f"{random.randint(60, 95)}%"
                day_advice = "Delay chemical applications"
            elif icon == "⛅":
                rain_prob = f"{random.randint(15, 40)}%"
                day_advice = "Monitor soil moisture"
            else:
                rain_prob = f"{random.randint(0, 10)}%"
                day_advice = "Ideal for sowing"

            forecast.append({
                "day": day,
                "icon": icon,
                "temp": f"{t_max}°/{t_min}°",
                "rain": rain_prob,
                "advice": day_advice
            })
        return forecast

