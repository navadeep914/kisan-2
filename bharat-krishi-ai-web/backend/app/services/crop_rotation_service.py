class CropRotationService:
    def predict(self, current_crop: str, soil_type: str, season: str = "Kharif"):
        # Normalize inputs
        crop = current_crop.lower()
        soil = soil_type.lower()

        # Default rotation schedule (if no crop matched)
        sequence = [
            {
                "crop": "Mung Bean (Legume)",
                "duration": "75 Days",
                "soil_health_impact": "Excellent nitrogen replenishment and soil aeration.",
                "nitrogen_fixation_pct": 80.0,
                "description": "Leguminous crop that absorbs atmospheric nitrogen and incorporates it into the soil root nodes."
            },
            {
                "crop": "Mustard (Oilseed)",
                "duration": "110 Days",
                "soil_health_impact": "Effective pest disruption and high biomass addition.",
                "nitrogen_fixation_pct": 15.0,
                "description": "Deep taproots break subsoil compaction, improving moisture penetration for future cereal crops."
            },
            {
                "crop": "Green Manure (Sesbania)",
                "duration": "60 Days",
                "soil_health_impact": "Massive organic matter input and nutrient recycling.",
                "nitrogen_fixation_pct": 95.0,
                "description": "Ploughed back directly into the soil at flowering stage to enrich humus content."
            }
        ]
        
        score = 85.0
        advice = "A rotation sequence consisting of Legumes and cover crops is advised to break disease cycles and replenish macro-nutrients naturally."

        if "rice" in crop:
            sequence = [
                {
                    "crop": "Black Gram (Legume)",
                    "duration": "90 Days",
                    "soil_health_impact": "Restores nitrogen depleted by Rice cultivation and improves clay soil texture.",
                    "nitrogen_fixation_pct": 85.0,
                    "description": "Low-water requirement legume that utilizes residual soil moisture from previous Rice fields."
                },
                {
                    "crop": "Sesame (Oilseed)",
                    "duration": "100 Days",
                    "soil_health_impact": "Interrupts fungal pathogen and nematode lifecycles common in monoculture paddy.",
                    "nitrogen_fixation_pct": 10.0,
                    "description": "Drought-tolerant oilseed that leaves light residue, facilitating easy seedbed prep for next season."
                },
                {
                    "crop": "Green Manure (Dhaincha)",
                    "duration": "60 Days",
                    "soil_health_impact": "Extremely high biological nitrogen fixation and increases soil organic carbon.",
                    "nitrogen_fixation_pct": 95.0,
                    "description": "Cultivated during pre-monsoon and ploughed into wet soil before transplanting next paddy crop."
                }
            ]
            score = 94.0
            advice = "Rotating paddy with leguminous Black Gram and Dhaincha green manure fixes up to 80-100 kg of Nitrogen/hectare and prevents soil compaction."

        elif "wheat" in crop:
            sequence = [
                {
                    "crop": "Pigeon Pea (Legume)",
                    "duration": "120 Days",
                    "soil_health_impact": "Deep root systems aerate soil and bring up minerals from deep layers.",
                    "nitrogen_fixation_pct": 75.0,
                    "description": "Perennial-like legume that provides excellent leaf-litter cover to keep soil cool."
                },
                {
                    "crop": "Maize (Cereal)",
                    "duration": "110 Days",
                    "soil_health_impact": "Diversifies plant architecture and high carbohydrate carbon feed for micro-fauna.",
                    "nitrogen_fixation_pct": 20.0,
                    "description": "Excellent rotation partner that breaks winter-cereal weed cycles."
                },
                {
                    "crop": "Chickpea (Pulses)",
                    "duration": "115 Days",
                    "soil_health_impact": "Replenishes soil nitrogen and has high biological activity.",
                    "nitrogen_fixation_pct": 70.0,
                    "description": "Highly profitable winter pulse crop requiring minimal irrigation."
                }
            ]
            score = 90.0
            advice = "Rotating Wheat with Chickpea and deep-rooted Pigeon Pea ensures balanced soil nutrition and breaks the root-rot disease cycle."

        elif "cotton" in crop:
            sequence = [
                {
                    "crop": "Soybean (Oilseed/Legume)",
                    "duration": "100 Days",
                    "soil_health_impact": "Supplies nitrogen and improves drainage in heavy cotton soils.",
                    "nitrogen_fixation_pct": 65.0,
                    "description": "Improves organic matter and can be sold as a highly cash-flow positive rotation crop."
                },
                {
                    "crop": "Sorghum (Millet)",
                    "duration": "115 Days",
                    "soil_health_impact": "Heavy root residues improve soil organic matter (carbon sink) and physical stability.",
                    "nitrogen_fixation_pct": 12.0,
                    "description": "Reduces cotton wilt pathogens. Large stubble acts as excellent surface mulch."
                },
                {
                    "crop": "Sunn Hemp (Cover Crop)",
                    "duration": "55 Days",
                    "soil_health_impact": "Suppress noxious weeds, controls root nematodes and adds massive nitrogen.",
                    "nitrogen_fixation_pct": 90.0,
                    "description": "Fast growing green manure crop that decomposes rapidly when ploughed."
                }
            ]
            score = 88.0
            advice = "Cotton is a heavy feeder. Rotating with Sorghum and Sunn Hemp restores humic compounds and suppresses soil-borne root pathogens."

        # Soil type specific adjustments to score
        if "clay" in soil and "rice" in crop:
            score += 2.0
        elif "sandy" in soil and "cotton" in crop:
            score -= 5.0 # Cotton prefers loamy/black cotton soils
            advice += " Note: Sandy soil has poor water retention for Cotton; consider incorporating compost before rotation."

        return {
            "current_crop": current_crop,
            "soil_type": soil_type,
            "rotation_sequence": sequence,
            "overall_sustainability_score": min(score, 99.0),
            "rotation_advice": advice
        }
