import random

# Historical yield data (quintals per acre) by state and crop
YIELD_DATA = {
    "Telangana": {
        "Rice":      {"base": 22.5, "growth": 0.8, "rain_factor": 0.015, "volatility": 1.5},
        "Wheat":     {"base": 14.0, "growth": 0.5, "rain_factor": 0.008, "volatility": 1.0},
        "Maize":     {"base": 18.0, "growth": 0.6, "rain_factor": 0.010, "volatility": 1.2},
        "Sugarcane": {"base": 35.0, "growth": 1.0, "rain_factor": 0.020, "volatility": 2.0},
        "Cotton":    {"base": 8.0,  "growth": 0.3, "rain_factor": 0.005, "volatility": 0.8},
    },
    "Andhra Pradesh": {
        "Rice":      {"base": 24.0, "growth": 0.9, "rain_factor": 0.016, "volatility": 1.6},
        "Wheat":     {"base": 12.0, "growth": 0.4, "rain_factor": 0.007, "volatility": 0.9},
        "Maize":     {"base": 19.5, "growth": 0.7, "rain_factor": 0.011, "volatility": 1.3},
        "Sugarcane": {"base": 38.0, "growth": 1.1, "rain_factor": 0.022, "volatility": 2.2},
        "Cotton":    {"base": 7.5,  "growth": 0.3, "rain_factor": 0.005, "volatility": 0.7},
    },
    "Punjab": {
        "Rice":      {"base": 28.0, "growth": 1.0, "rain_factor": 0.012, "volatility": 1.2},
        "Wheat":     {"base": 22.0, "growth": 0.8, "rain_factor": 0.010, "volatility": 1.0},
        "Maize":     {"base": 16.0, "growth": 0.5, "rain_factor": 0.009, "volatility": 1.1},
        "Sugarcane": {"base": 32.0, "growth": 0.9, "rain_factor": 0.018, "volatility": 1.8},
        "Cotton":    {"base": 9.0,  "growth": 0.4, "rain_factor": 0.006, "volatility": 0.9},
    },
    "Maharashtra": {
        "Rice":      {"base": 18.0, "growth": 0.6, "rain_factor": 0.014, "volatility": 1.4},
        "Wheat":     {"base": 12.5, "growth": 0.4, "rain_factor": 0.007, "volatility": 0.8},
        "Maize":     {"base": 15.0, "growth": 0.5, "rain_factor": 0.009, "volatility": 1.0},
        "Sugarcane": {"base": 40.0, "growth": 1.2, "rain_factor": 0.025, "volatility": 2.5},
        "Cotton":    {"base": 6.5,  "growth": 0.2, "rain_factor": 0.004, "volatility": 0.6},
    },
    "Uttar Pradesh": {
        "Rice":      {"base": 20.0, "growth": 0.7, "rain_factor": 0.013, "volatility": 1.3},
        "Wheat":     {"base": 20.0, "growth": 0.7, "rain_factor": 0.009, "volatility": 1.0},
        "Maize":     {"base": 14.0, "growth": 0.4, "rain_factor": 0.008, "volatility": 0.9},
        "Sugarcane": {"base": 36.0, "growth": 1.0, "rain_factor": 0.020, "volatility": 2.0},
        "Cotton":    {"base": 7.0,  "growth": 0.3, "rain_factor": 0.005, "volatility": 0.7},
    },
}

class CropYieldService:
    def predict(self, state: str, crop: str, area: float, rainfall: float):
        state_data = YIELD_DATA.get(state, YIELD_DATA["Telangana"])
        crop_data = state_data.get(crop, state_data.get("Rice"))

        base = crop_data["base"]
        rain_bonus = (rainfall - 100) * crop_data["rain_factor"]
        predicted_per_acre = round(base + rain_bonus + random.uniform(-crop_data["volatility"], crop_data["volatility"]), 1)
        predicted_per_acre = max(5, predicted_per_acre)
        total_yield = round(predicted_per_acre * area, 1)

        # Generate historical data
        history = []
        for year in range(2024, 2020, -1):
            yr_yield = round(base + (year - 2020) * crop_data["growth"] + random.uniform(-1, 1), 1)
            history.append({"year": str(year), "yield_per_acre": yr_yield})

        # Revenue estimate
        price_per_quintal = {"Rice": 2100, "Wheat": 2050, "Maize": 1800, "Sugarcane": 350, "Cotton": 6500}
        price = price_per_quintal.get(crop, 2000)
        revenue = round(total_yield * price)

        return {
            "predicted_yield_per_acre": predicted_per_acre,
            "total_yield": total_yield,
            "unit": "quintals",
            "area": area,
            "state": state,
            "crop": crop,
            "estimated_revenue": revenue,
            "price_per_quintal": price,
            "history": history,
            "tips": [
                f"Optimal rainfall for {crop} in {state} is 100-200mm",
                "Use certified seeds for 10-15% higher yield",
                "Timely sowing increases yield by up to 20%",
            ]
        }
