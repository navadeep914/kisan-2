import random
import math

# Crop database with ideal growing conditions
CROP_DB = {
    "Rice":    {"n": (80, 120), "p": (40, 60),  "k": (40, 60),  "temp": (20, 35), "hum": (60, 90), "ph": (5.5, 7.0), "rain": (150, 300), "emoji": "🌾"},
    "Wheat":   {"n": (60, 100), "p": (40, 60),  "k": (30, 50),  "temp": (15, 25), "hum": (40, 70), "ph": (6.0, 7.5), "rain": (50, 100),  "emoji": "🌿"},
    "Maize":   {"n": (60, 100), "p": (40, 80),  "k": (30, 60),  "temp": (18, 32), "hum": (50, 80), "ph": (5.5, 7.0), "rain": (60, 110),  "emoji": "🌽"},
    "Lentils": {"n": (20, 60),  "p": (40, 80),  "k": (20, 40),  "temp": (18, 30), "hum": (30, 60), "ph": (6.0, 7.5), "rain": (40, 80),   "emoji": "🫘"},
    "Cotton":  {"n": (80, 120), "p": (40, 60),  "k": (20, 40),  "temp": (25, 35), "hum": (50, 70), "ph": (6.0, 7.5), "rain": (60, 110),  "emoji": "☁️"},
    "Sugarcane":{"n":(80, 130), "p": (50, 80),  "k": (40, 80),  "temp": (20, 35), "hum": (60, 85), "ph": (5.5, 7.5), "rain": (100, 200), "emoji": "🎋"},
    "Millet":  {"n": (40, 80),  "p": (20, 40),  "k": (20, 40),  "temp": (25, 35), "hum": (30, 60), "ph": (5.5, 7.5), "rain": (30, 60),   "emoji": "🌾"},
    "Groundnut":{"n":(20, 50),  "p": (40, 60),  "k": (30, 50),  "temp": (25, 35), "hum": (40, 70), "ph": (5.5, 7.0), "rain": (50, 100),  "emoji": "🥜"},
    "Soybean": {"n": (20, 50),  "p": (40, 80),  "k": (30, 60),  "temp": (20, 30), "hum": (50, 80), "ph": (6.0, 7.0), "rain": (60, 120),  "emoji": "🫛"},
    "Chickpea":{"n": (20, 50),  "p": (40, 60),  "k": (20, 40),  "temp": (15, 30), "hum": (30, 60), "ph": (6.0, 8.0), "rain": (40, 80),   "emoji": "🟤"},
}

def _score_crop(crop_ranges, n, p, k, temp, hum, ph, rain):
    """Score how well the input conditions match a crop's ideal ranges."""
    def param_score(val, low, high):
        if low <= val <= high:
            mid = (low + high) / 2
            span = (high - low) / 2
            return 1.0 - 0.3 * abs(val - mid) / max(span, 1)
        elif val < low:
            return max(0, 1.0 - (low - val) / max(low, 1))
        else:
            return max(0, 1.0 - (val - high) / max(high, 1))

    scores = [
        param_score(n,    *crop_ranges["n"]),
        param_score(p,    *crop_ranges["p"]),
        param_score(k,    *crop_ranges["k"]),
        param_score(temp, *crop_ranges["temp"]),
        param_score(hum,  *crop_ranges["hum"]),
        param_score(ph,   *crop_ranges["ph"]),
        param_score(rain, *crop_ranges["rain"]),
    ]
    return sum(scores) / len(scores)


class CropRecommendationService:
    def predict(self, nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall):
        results = []
        for crop_name, ranges in CROP_DB.items():
            score = _score_crop(ranges, nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall)
            results.append((crop_name, score, ranges.get("emoji", "🌱")))

        results.sort(key=lambda x: x[1], reverse=True)
        top = results[0]

        return {
            "recommended_crop": top[0],
            "confidence": round(min(top[1] * 100, 99.5), 1),
            "emoji": top[2],
            "alternatives": [
                {"crop": r[0], "confidence": round(min(r[1] * 100, 99.5), 1), "emoji": r[2]}
                for r in results[1:4]
            ],
            "soil_profile": {
                "nitrogen": nitrogen,
                "phosphorus": phosphorus,
                "potassium": potassium,
                "temperature": temperature,
                "humidity": humidity,
                "ph": ph,
                "rainfall": rainfall,
            },
            "ideal_conditions": {
                "nitrogen": list(CROP_DB[top[0]]["n"]),
                "phosphorus": list(CROP_DB[top[0]]["p"]),
                "potassium": list(CROP_DB[top[0]]["k"]),
                "temperature": list(CROP_DB[top[0]]["temp"]),
                "humidity": list(CROP_DB[top[0]]["hum"]),
                "ph": list(CROP_DB[top[0]]["ph"]),
            }
        }
