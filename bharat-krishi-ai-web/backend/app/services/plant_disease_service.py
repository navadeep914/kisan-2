import random

# Disease database with symptoms, treatments, and metadata
DISEASE_DB = {
    "Rice Blast": {
        "scientific_name": "Magnaporthe oryzae",
        "type": "Fungal",
        "severity_range": (60, 95),
        "crops": ["rice"],
        "symptoms": "Diamond-shaped lesions on leaves with gray centers and brown borders. Affects nodes, panicles, and collars.",
        "treatment": [
            "Remove and destroy infected plant debris immediately",
            "Apply Tricyclazole fungicide @ 0.6 g/L water",
            "Reduce nitrogen fertilizer application for next 2 weeks",
            "Ensure proper drainage to reduce prolonged leaf wetness",
            "Use resistant varieties like IR64, Pusa Basmati for next season"
        ],
        "prevention": "Use certified disease-free seeds, avoid excess nitrogen, maintain proper spacing"
    },
    "Bacterial Leaf Blight": {
        "scientific_name": "Xanthomonas oryzae",
        "type": "Bacterial",
        "severity_range": (40, 85),
        "crops": ["rice"],
        "symptoms": "Water-soaked lesions along leaf margins that turn yellow to white. Leaves dry from tip downward.",
        "treatment": [
            "Drain excess water from the field immediately",
            "Apply Streptocycline @ 15g + Copper oxychloride @ 500g per acre",
            "Avoid excess nitrogen application",
            "Remove severely infected plants from the field",
            "Spray Pseudomonas fluorescens @ 5g/L as biocontrol"
        ],
        "prevention": "Use resistant varieties, balanced fertilization, proper water management"
    },
    "Late Blight": {
        "scientific_name": "Phytophthora infestans",
        "type": "Fungal",
        "severity_range": (50, 90),
        "crops": ["tomato", "potato"],
        "symptoms": "Dark water-soaked spots on leaves that rapidly enlarge. White fuzzy growth on undersides in humid conditions.",
        "treatment": [
            "Remove and destroy all infected plant parts",
            "Apply Mancozeb 75% WP @ 2.5 g/L water spray",
            "Improve air circulation by wider plant spacing",
            "Apply copper-based fungicide as preventive measure",
            "Avoid overhead irrigation, water at base of plants"
        ],
        "prevention": "Use disease-free seeds, avoid overhead watering, crop rotation"
    },
    "Powdery Mildew": {
        "scientific_name": "Erysiphe spp.",
        "type": "Fungal",
        "severity_range": (30, 70),
        "crops": ["wheat", "pea", "cucumber"],
        "symptoms": "White powdery coating on upper leaf surfaces. Affected leaves curl and turn yellow.",
        "treatment": [
            "Spray Karathane (Dinocap) @ 1 ml/L water",
            "Apply sulfur-based fungicide @ 3g/L water",
            "Remove heavily infected leaves and destroy",
            "Ensure proper spacing for air circulation",
            "Apply neem oil spray @ 5ml/L as organic alternative"
        ],
        "prevention": "Adequate spacing, avoid shading, resistant varieties"
    },
    "Leaf Curl Virus": {
        "scientific_name": "Begomovirus",
        "type": "Viral",
        "severity_range": (50, 85),
        "crops": ["tomato", "chili", "cotton"],
        "symptoms": "Upward or downward curling of leaves, stunted growth, reduced fruit size and yield.",
        "treatment": [
            "Remove and destroy infected plants immediately",
            "Control whitefly vectors with Imidacloprid @ 0.3 ml/L",
            "Install yellow sticky traps around the field (20/acre)",
            "Apply neem oil spray @ 5ml/L to repel whiteflies",
            "Use reflective mulch to deter whitefly landing"
        ],
        "prevention": "Use virus-resistant varieties, control whitefly population, remove weeds"
    },
    "Rust": {
        "scientific_name": "Puccinia spp.",
        "type": "Fungal",
        "severity_range": (35, 80),
        "crops": ["wheat", "soybean"],
        "symptoms": "Orange-brown pustules on leaf surfaces. Severely infected leaves turn yellow and drop early.",
        "treatment": [
            "Apply Propiconazole 25% EC @ 1 ml/L water",
            "Remove volunteer plants and alternate hosts nearby",
            "Apply Mancozeb as preventive spray @ 2.5g/L",
            "Ensure adequate potassium fertilization",
            "Use resistant varieties for next planting season"
        ],
        "prevention": "Early sowing, resistant varieties, proper nutrition"
    },
    "Healthy": {
        "scientific_name": "N/A",
        "type": "None",
        "severity_range": (0, 0),
        "crops": ["all"],
        "symptoms": "No disease symptoms detected. Plant appears healthy with normal growth patterns.",
        "treatment": [
            "Continue current farming practices",
            "Maintain regular irrigation schedule",
            "Apply balanced fertilizers as per soil test recommendations",
            "Monitor plants weekly for early signs of disease"
        ],
        "prevention": "Regular monitoring, balanced nutrition, proper irrigation"
    }
}

class PlantDiseaseService:
    def detect(self, filename: str = "leaf.jpg"):
        """Simulate disease detection based on filename keywords or random selection."""
        fname = filename.lower()

        # Try to match filename keywords to diseases
        if "healthy" in fname or "good" in fname or "normal" in fname:
            disease_name = "Healthy"
        elif "blast" in fname or "rice" in fname:
            disease_name = "Rice Blast"
        elif "blight" in fname:
            disease_name = random.choice(["Bacterial Leaf Blight", "Late Blight"])
        elif "mildew" in fname or "powder" in fname:
            disease_name = "Powdery Mildew"
        elif "curl" in fname or "virus" in fname:
            disease_name = "Leaf Curl Virus"
        elif "rust" in fname:
            disease_name = "Rust"
        else:
            # Random detection for demo
            disease_name = random.choice([d for d in DISEASE_DB if d != "Healthy"])

        disease = DISEASE_DB[disease_name]
        sev_low, sev_high = disease["severity_range"]
        confidence = round(random.uniform(85, 97), 1) if disease_name != "Healthy" else 99.2
        severity = round(random.uniform(sev_low, sev_high), 1) if disease_name != "Healthy" else 0

        severity_label = "None"
        if severity > 0:
            if severity < 40:
                severity_label = "Mild"
            elif severity < 70:
                severity_label = "Moderate"
            else:
                severity_label = "Severe"

        return {
            "disease": disease_name,
            "scientific_name": disease["scientific_name"],
            "type": disease["type"],
            "confidence": confidence,
            "severity": severity,
            "severity_label": severity_label,
            "symptoms": disease["symptoms"],
            "treatment": disease["treatment"],
            "prevention": disease["prevention"],
            "is_healthy": disease_name == "Healthy"
        }
