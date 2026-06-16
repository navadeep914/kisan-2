# 📡 Bharat Krishi AI — API Documentation

## Base URL
`http://localhost:8000/api`

---

## 🌱 Crop Recommendation
**POST** `/crop/predict`
```json
{ "nitrogen":80, "phosphorus":50, "potassium":50,
  "temperature":25, "humidity":85, "ph":6.5, "rainfall":250 }
```

## 🪱 Soil Analysis
**POST** `/soil/predict`
```json
{ "nitrogen":60, "phosphorus":40, "potassium":50, "ph":6.8,
  "soil_type":"Loam", "season":"Summer" }
```

## 📈 Crop Yield
**POST** `/yield/predict`
```json
{ "crop":"Rice", "state":"Andhra Pradesh", "area":5000,
  "rainfall":1100, "fertilizer":50000, "season":"Kharif" }
```

## 💹 Market Price
**POST** `/market/predict`
```json
{ "commodity":"Onion", "state":"Maharashtra",
  "month":6, "year":2025, "arrivals_qty":800 }
```

## 🌦️ Weather
**POST** `/weather/predict`
```json
{ "location":"Hyderabad", "month":7, "hour":10,
  "humidity":80, "pressure_mb":1005 }
```
