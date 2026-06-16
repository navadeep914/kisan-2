import random

class MarketPriceService:
    def predict(self, crop: str):
        # Base prices in ₹ per quintal
        prices_db = {
            "Rice":      {"base": 2100, "trend": 2.1,  "dir": "up"},
            "Wheat":     {"base": 2050, "trend": 0.8,  "dir": "up"},
            "Onion":     {"base": 3400, "trend": -1.4, "dir": "down"},
            "Tomato":    {"base": 2650, "trend": 3.2,  "dir": "up"},
            "Maize":     {"base": 1800, "trend": 0.0,  "dir": "stable"},
            "Sugarcane": {"base": 350,  "trend": 1.5,  "dir": "up"},
            "Cotton":    {"base": 6500, "trend": -0.5, "dir": "down"}
        }

        crop_info = prices_db.get(crop, {"base": 2000, "trend": 1.0, "dir": "up"})
        base_price = crop_info["base"]

        # Generate 30 days of historical trend data ending at current price
        history = []
        current_val = base_price
        for _ in range(30):
            history.append(round(current_val))
            # Walk backwards
            change = random.uniform(-0.015, 0.015) * base_price
            current_val -= change
        history.reverse()

        # Mandi details
        mandis = [
            {"mandi": "Begumpet APMC", "distance": "12 km", "price_multiplier": 1.038, "recommendation": "✓ Best Price"},
            {"mandi": "Bowenpally",     "distance": "18 km", "price_multiplier": 1.000, "recommendation": ""},
            {"mandi": "Kukatpally",     "distance": "24 km", "price_multiplier": 0.976, "recommendation": ""}
        ]

        mandi_prices = []
        for m in mandis:
            mandi_price = round(base_price * m["price_multiplier"])
            mandi_prices.append({
                "mandi": m["mandi"],
                "distance": m["distance"],
                "price": float(mandi_price),
                "recommendation": m["recommendation"]
            })

        # Set best price recommendation dynamically
        best_mandi = max(mandi_prices, key=lambda x: x["price"])
        for m in mandi_prices:
            if m["mandi"] == best_mandi["mandi"]:
                m["recommendation"] = "✓ Best Price"
            else:
                m["recommendation"] = ""

        return {
            "crop": crop,
            "current_price": float(base_price),
            "price_unit": "₹/q",
            "trend_pct": crop_info["trend"],
            "trend_direction": crop_info["dir"],
            "history_30_days": [float(p) for p in history],
            "mandi_prices": mandi_prices
        }
