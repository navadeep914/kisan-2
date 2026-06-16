class SoilAnalysisService:
    def analyze(self, nitrogen: float, phosphorus: float, potassium: float, ph: float, organic_carbon: float = 0.5, moisture: float = 35):
        """Analyze soil health from nutrient levels."""
        # Evaluate each nutrient
        def nutrient_status(val, low, mid, high):
            if val < low:
                return {"level": val, "status": "Very Low", "color": "#e63946", "cls": "status-low"}
            elif val < mid:
                return {"level": val, "status": "Low", "color": "#e63946", "cls": "status-low"}
            elif val < high:
                return {"level": val, "status": "Moderate", "color": "#f59e0b", "cls": "status-ok"}
            else:
                return {"level": val, "status": "Optimal", "color": "#2d6a4f", "cls": "status-good"}

        def ph_status(ph_val):
            if ph_val < 5.5:
                return {"level": ph_val, "status": "Acidic", "color": "#e63946", "cls": "status-low"}
            elif ph_val < 6.0:
                return {"level": ph_val, "status": "Slightly Acidic", "color": "#f59e0b", "cls": "status-ok"}
            elif ph_val <= 7.5:
                return {"level": ph_val, "status": "Optimal", "color": "#2d6a4f", "cls": "status-good"}
            elif ph_val <= 8.0:
                return {"level": ph_val, "status": "Slightly Alkaline", "color": "#f59e0b", "cls": "status-ok"}
            else:
                return {"level": ph_val, "status": "Alkaline", "color": "#e63946", "cls": "status-low"}

        n_status = nutrient_status(nitrogen, 30, 50, 70)
        p_status = nutrient_status(phosphorus, 15, 30, 50)
        k_status = nutrient_status(potassium, 20, 40, 60)
        ph_stat  = ph_status(ph)

        # Calculate soil health score (0-100)
        n_score = min(nitrogen / 80, 1.0) * 25
        p_score = min(phosphorus / 50, 1.0) * 25
        k_score = min(potassium / 60, 1.0) * 25
        ph_score = max(0, 1.0 - abs(ph - 6.5) / 3.0) * 25
        health_score = round(n_score + p_score + k_score + ph_score)
        health_score = max(10, min(100, health_score))

        if health_score >= 80:
            health_label = "Excellent"
            health_advice = "Your soil is in excellent condition for most crops."
        elif health_score >= 60:
            health_label = "Good"
            health_advice = "Soil is in good condition with minor improvements needed."
        elif health_score >= 40:
            health_label = "Fair"
            health_advice = "Significant nutrient deficiencies need to be addressed."
        else:
            health_label = "Poor"
            health_advice = "Major soil amendments required before planting."

        # Fertilizer recommendations
        fertilizers = []
        if nitrogen < 70:
            dose = round((70 - nitrogen) * 0.8)
            fertilizers.append({
                "name": "Urea (Nitrogen 46%)",
                "dose": f"{dose} kg/acre",
                "when": "30 days after sowing",
                "method": "Top dressing in 2 splits",
                "priority": "High" if nitrogen < 40 else "Medium"
            })
        if phosphorus < 50:
            dose = round((50 - phosphorus) * 1.2)
            fertilizers.append({
                "name": "Single Super Phosphate (SSP)",
                "dose": f"{dose} kg/acre",
                "when": "Before sowing (basal)",
                "method": "Broadcast and incorporate",
                "priority": "High" if phosphorus < 25 else "Medium"
            })
        if potassium < 60:
            dose = round((60 - potassium) * 0.5)
            fertilizers.append({
                "name": "Muriate of Potash (MOP)",
                "dose": f"{dose} kg/acre",
                "when": "At sowing time",
                "method": "Basal application",
                "priority": "High" if potassium < 30 else "Medium"
            })
        if ph < 5.5:
            fertilizers.append({
                "name": "Agricultural Lime",
                "dose": "200 kg/acre",
                "when": "2 weeks before sowing",
                "method": "Broadcast and plough",
                "priority": "High"
            })
        elif ph > 8.0:
            fertilizers.append({
                "name": "Gypsum (Calcium Sulphate)",
                "dose": "150 kg/acre",
                "when": "Before sowing",
                "method": "Broadcast and mix",
                "priority": "High"
            })

        if not fertilizers:
            fertilizers.append({
                "name": "Vermicompost (maintenance)",
                "dose": "500 kg/acre",
                "when": "Before sowing",
                "method": "Broadcast and incorporate",
                "priority": "Low"
            })

        return {
            "nutrients": {
                "nitrogen": {**n_status, "unit": "mg/kg"},
                "phosphorus": {**p_status, "unit": "mg/kg"},
                "potassium": {**k_status, "unit": "mg/kg"},
                "ph": {**ph_stat, "unit": ""},
            },
            "health_score": health_score,
            "health_label": health_label,
            "health_advice": health_advice,
            "fertilizers": fertilizers,
        }
