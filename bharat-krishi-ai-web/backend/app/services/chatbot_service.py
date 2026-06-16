import os
import requests
import logging

logger = logging.getLogger(__name__)

class ChatbotService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY", "").strip()
        self.use_llm = self.api_key and self.api_key != "your_openai_key_here"

    def predict(self, message: str, history: list = None):
        if self.use_llm:
            try:
                # Try calling OpenAI API
                response_text = self._call_openai_api(message, history)
                if response_text:
                    return response_text
            except Exception as e:
                logger.error(f"OpenAI API call failed, falling back to local engine: {e}")

        # Fallback to local knowledge matching engine
        return self._local_nlp_match(message)

    def _call_openai_api(self, message: str, history: list = None):
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        
        system_prompt = (
            "You are Krishi AI, the official intelligent farming assistant for the Bharat Krishi AI (Kisan Sarathi) platform. "
            "Your job is to assist farmers with agricultural queries and explain all functions and pages of the Bharat Krishi AI website.\n\n"
            "### Platform Info:\n"
            "- Name: Bharat Krishi AI (also referred to as Kisan Sarathi).\n"
            "- Jointly Implemented by: ICAR (Indian Council of Agricultural Research) & Digital India Corporation (DIC), Ministry of Electronics & IT (MeitY), Govt. of India.\n"
            "- Technology Platform: Powered by IIDS (Interactive Information Dissemination System).\n"
            "- Technology Stack: FastAPI (Python) backend, local MongoDB + MongoDB Atlas database, and React + Vite frontend.\n\n"
            "### The 9 Core AI Modules (Sidebar Tabs):\n"
            "1. **Dashboard (📊)**: Shows farm alerts, weather chip, live market prices ticker, active notifications, and summary cards.\n"
            "2. **Crop Recommendation (🌱)**: Recommends the optimal crop to cultivate. Takes inputs: Nitrogen (N), Phosphorus (P), Potassium (K), Temperature, Humidity, Soil pH, and Rainfall (mm). Uses machine learning to recommend crops (e.g. Rice, Maize, Cotton) with confidence percentages.\n"
            "3. **Plant Disease (🦠)**: Scans leaf photos to diagnose diseases. Users can upload/drag-and-drop a leaf image, and the system detects the disease (e.g., Rice Blast, Tomato Leaf Mold) and provides chemical/organic treatments.\n"
            "4. **Soil Analysis (🪱)**: Checks soil nutrient status. Takes NPK levels and pH to generate a Soil Health Score and a customized Fertilizer Schedule (e.g. Urea top-dressing, SSP basal dose).\n"
            "5. **Crop Yield (📈)**: Predicts expected production. Takes inputs: Crop name, State, District, Season, Farm Area (acres), and Soil organic carbon. Outputs predicted yield in quintals per acre.\n"
            "6. **Market Price (💹)**: Displays current mandi prices and 30-day live trends/12-month forecasts for major crops like Rice, Wheat, Onion, Tomato, Maize, Cotton.\n"
            "7. **Weather (🌦️)**: Uses live integration (OpenWeatherMap or Open-Meteo fallback) to show temperature, humidity, wind, and rain alerts, accompanied by specific agricultural advice (e.g., delay chemical applications if rain is imminent).\n"
            "8. **Crop Rotation (🔁)**: Suggests sustainable multi-year crop sequences (e.g. Rice -> Black Gram -> Green Manure) to restore nitrogen and prevent pest build-up.\n"
            "9. **Gov Schemes (🏛️)**: Checks eligibility and application steps for major agricultural schemes like PM-KISAN (₹6000/year support), Rythu Bandhu (investment support), PMFBY (crop insurance), and KCC (low-interest loans).\n\n"
            "### Other Features:\n"
            "- **Farmer Profile (👤)**: Displays registered name, state, phone, overall stats (Total Reports, Disease Scans, Soil Tests, Avg Soil Score), and scrollable farming history logs.\n"
            "- **Language Switcher (🌐)**: Click the globe pill in the top-right navbar to switch the entire UI instantly between English, Hindi, Telugu, and Tamil.\n\n"
            "### Guidelines:\n"
            "- Keep your answers helpful, friendly, and practical for farmers.\n"
            "- Always use clean markdown headers (e.g. `### Title`), bold text (`**text**`), bullet lists (`• item`), or inline code (`` `keyword` ``).\n"
            "- Encourage users to try the corresponding sidebar tools.\n"
            "- Respond in the language the user speaks (English, Hindi, Telugu, or Tamil)."
        )

        messages = [{"role": "system", "content": system_prompt}]
        
        if history:
            for item in history:
                messages.append({
                    "role": item.get("role", "user"),
                    "content": item.get("content", "")
                })
        
        messages.append({"role": "user", "content": message})
        
        payload = {
            "model": "gpt-4o-mini",
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": 800
        }
        
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}"
            },
            json=payload,
            timeout=8
        )
        
        if response.status_code == 200:
            data = response.json()
            return data["choices"][0]["message"]["content"]
        else:
            logger.warning(f"OpenAI returned status code {response.status_code}: {response.text}")
            return None

    def _local_nlp_match(self, message: str) -> str:
        msg = message.lower()

        # 1. Main features / Modules list
        if any(w in msg for w in ["module", "function", "tool", "features", "what can you do", "capabilities", "menu", "list"]):
            return (
                "### 🛠️ Bharat Krishi AI Modules\n\n"
                "I support **9 interactive AI modules** accessible from the left sidebar navigation:\n\n"
                "• **Crop Recommendation (🌱)**: Suggests optimal crops based on NPK, pH, and climate sliders.\n"
                "• **Plant Disease (🦠)**: Diagnoses leaf diseases from photos and gives treatments.\n"
                "• **Soil Analysis (🪱)**: Rates soil health and computes customized fertilizer dosages.\n"
                "• **Crop Yield (📈)**: Forecasts expected harvest tonnage in quintals per acre.\n"
                "• **Market Price (💹)**: Shows live mandi price trends and 12-month projections.\n"
                "• **Weather (🌦️)**: Queries live local forecasts and provides smart agricultural advisory.\n"
                "• **Crop Rotation (🔁)**: Recommends sustainable nitrogen-fixing rotation sequences.\n"
                "• **Gov Schemes (🏛️)**: Checks eligibility for PM-KISAN, Rythu Bandhu, PMFBY, and KCC.\n"
                "• **Farmer Profile (👤)**: Tracks registration credentials and logs past diagnostic reports.\n\n"
                "Which module would you like to explore? Type `tell me about Soil Analysis` or similar to learn more!"
            )

        # 2. Crop Recommendation details
        if any(w in msg for w in ["recommendation", "recommend crop", "crop advisor", "suggest crop", "npk"]):
            return (
                "### 🌱 Crop Recommendation Module\n\n"
                "The **Crop Recommendation** tool uses machine learning to suggest the most suitable crop for your field.\n\n"
                "### How to Use:\n"
                "1. Go to the **Crop Recommendation** tab in the sidebar.\n"
                "2. Adjust the sliders for soil nutrients: **Nitrogen (N)**, **Phosphorus (P)**, and **Potassium (K)**.\n"
                "3. Adjust the climate inputs: **Temperature**, **Humidity**, **Soil pH**, and annual **Rainfall**.\n"
                "4. Click `Predict Optimal Crop`.\n\n"
                "### What you get:\n"
                "• The best crop recommendation (e.g. `Rice`, `Cotton`, `Maize`) represented in a colorful **Confidence Ring**.\n"
                "• Alternate crops with their probability scores in comparative bar charts.\n\n"
                "Give it a try in the **Crop Recommendation** page!"
            )

        # 3. Plant Disease scan details
        if any(w in msg for w in ["disease", "pest", "leaf", "scan", "fungus", "spot", "blast", "blight"]):
            return (
                "### 🦠 Plant Disease Scanner\n\n"
                "This module allows you to instantly diagnose plant diseases by uploading a leaf photo.\n\n"
                "### How to Use:\n"
                "1. Open the **Plant Disease** tab in the sidebar.\n"
                "2. Click the dashed **Upload Zone** to select a photo of the infected leaf (or drag and drop it).\n"
                "3. Click `Analyze Leaf Photo`.\n\n"
                "### What you get:\n"
                "• Disease diagnosis (e.g., `Rice Blast`, `Tomato Leaf Mold`) and infection severity (`Low`, `Medium`, `High`).\n"
                "• **Chemical Treatments** (e.g., specific fungicide name and dilution ratio).\n"
                "• **Organic Treatments** (e.g., Neem oil sprays or cultural crop hygiene advice).\n\n"
                "Try scanning a leaf photo in the **Plant Disease** page!"
            )

        # 4. Soil Analysis details
        if any(w in msg for w in ["soil", "fertility", "fertilizer", "urea", "ssp", "potassium"]):
            return (
                "### 🪱 Soil Analysis & Fertilizers\n\n"
                "The **Soil Analysis** module helps you evaluate soil fertility and manage nutrients.\n\n"
                "### How to Use:\n"
                "1. Click the **Soil Analysis** tab in the sidebar.\n"
                "2. Input the NPK values and pH from your soil test report.\n"
                "3. Click `Calculate Fertilizers`.\n\n"
                "### What you get:\n"
                "• A overall **Soil Health Score** (e.g., `82/100 - Good Soil`).\n"
                "• Gauge indicators highlighting whether your Nitrogen, Phosphorus, Potassium, or pH levels are `Low`, `Good`, or `High`.\n"
                "• A customized **Fertilizer Dosage Table** showing exactly how much `Urea`, `SSP`, or `Muriate of Potash (MOP)` to apply, alongside the schedule (e.g. basal dose, top-dressing splits).\n\n"
                "Check it out under the **Soil Analysis** tab!"
            )

        # 5. Crop Yield details
        if any(w in msg for w in ["yield", "production", "how much yield", "acres", "organic carbon"]):
            return (
                "### 📈 Crop Yield Prediction\n\n"
                "The **Crop Yield** module forecasts your expected harvest tonnage in quintals per acre.\n\n"
                "### How to Use:\n"
                "1. Navigate to the **Crop Yield** tab.\n"
                "2. Select your **Crop**, **State**, and **District**.\n"
                "3. Select the **Season** (Kharif, Rabi, Summer) and input your farm **Acreage**.\n"
                "4. Enter your soil's **Organic Carbon percentage**.\n"
                "5. Click `Predict expected yield`.\n\n"
                "### What you get:\n"
                "• Total predicted yield in **quintals**.\n"
                "• Average yield density per acre (e.g., `18 q/acre`).\n"
                "• Agronomic tips to increase yield (like crop rotation advice or weeding cycles).\n\n"
                "Plan your harvest in the **Crop Yield** page!"
            )

        # 6. Market Price details
        if any(w in msg for w in ["price", "mandi", "market", "rate", "cost", "daam", "bhau", "paisa"]):
            return (
                "### 💹 Market Price Intelligence\n\n"
                "This module tracks daily mandi prices and predicts future pricing trends to help you time your sales.\n\n"
                "### How to Use:\n"
                "1. Select the **Market Price** tab in the sidebar.\n"
                "2. Choose your commodity (e.g. `Wheat`, `Onion`, `Rice`, `Tomato`).\n"
                "3. Toggle between **30-Day Mandi Trends** and **12-Month Projections**.\n\n"
                "### What you get:\n"
                "• Live pricing charts displaying recent daily averages.\n"
                "• Forecast curves showing expected price rises or dips over the coming months.\n"
                "• A summary of **Best APMC Markets** nearby to fetch premium rates.\n\n"
                "Monitor market rates on the **Market Price** page!"
            )

        # 7. Weather Forecast details
        if any(w in msg for w in ["weather", "rain", "temperature", "temp", "monsoon", "barish", "advisory"]):
            return (
                "### 🌦️ Live Weather & Farming Advisory\n\n"
                "The **Weather** module provides real-time local updates and 5-day forecasts with custom agricultural alerts.\n\n"
                "### How it works:\n"
                "• Integrates with live weather APIs (OpenWeatherMap or Open-Meteo fallback) to query current conditions.\n"
                "• Provides an **Agricultural Advice Banner** dynamically generated based on conditions:\n"
                "  - *Imminent rain*: advice to delay pesticide sprays or fertilizers.\n"
                "  - *High heat*: advice to increase irrigation frequency.\n\n"
                "See current forecasts in the **Weather** tab!"
            )

        # 8. Crop Rotation details
        if any(w in msg for w in ["rotation", "rotate", "next crop", "sequence"]):
            return (
                "### 🔁 Crop Rotation Planner\n\n"
                "The **Crop Rotation** tool creates multi-year crop sequences designed to naturally replenish nitrogen and disrupt pest cycles.\n\n"
                "### How to Use:\n"
                "1. Open the **Crop Rotation** tab.\n"
                "2. Select your **Current Crop** (e.g. Rice) and **Soil Type**.\n"
                "3. Click `Generate rotation plan`.\n\n"
                "### What you get:\n"
                "• A 3-year visual sequence (e.g., `Rice` → `Black Gram` → `Green Manure`).\n"
                "• Rationale for each recommendation (like fixing nitrogen via legumes or breaking pest build-ups).\n\n"
                "Optimize soil health in the **Crop Rotation** page!"
            )

        # 9. Government Schemes details
        if any(w in msg for w in ["scheme", "government", "subsidy", "loan", "yojana", "pm-kisan", "bima"]):
            return (
                "### 🏛️ Government Schemes & Subsidies\n\n"
                "This module matches your farm profile with active government support schemes.\n\n"
                "### How to Use:\n"
                "1. Open the **Gov Schemes** tab.\n"
                "2. Input details like **Land Size**, **Category**, and **State**.\n"
                "3. Click `Check Schemes Eligibility`.\n\n"
                "### What you get:\n"
                "• Eligibility flags for schemes like `PM-KISAN` (annual ₹6,000 cash transfer), `PMFBY` (crop insurance), and `Kisan Credit Card` (low-interest credit).\n"
                "• Application status tracking and direct enrollment guides.\n\n"
                "Explore available subsidies on the **Gov Schemes** page!"
            )

        # 10. Farmer Profile details
        if any(w in msg for w in ["profile", "history", "logs", "account", "reports"]):
            return (
                "### 👤 Farmer Profile & Logs\n\n"
                "The **Farmer Profile** page serves as your personal farming dashboard.\n\n"
                "### Key Features:\n"
                "• **Personal Details**: Displays registered credentials, state, and mobile number (editable via `Edit Profile`).\n"
                "• **Overview Tracker**: Card metrics counting your `Total Reports`, `Disease Scans`, `Soil Tests`, and `Average Soil Health Score`.\n"
                "• **Activity logs**: A chronological feed of all past predictions. Click items to review previous crop recommendations or fertilizer schedules.\n\n"
                "Access it by clicking your profile name/avatar in the top-right navbar!"
            )

        # 11. General website and Kisan Sarathi info
        if any(w in msg for w in ["website", "site", "about", "kisan sarathi", "bharat krishi", "who built", "developers", "iids"]):
            return (
                "### 🌿 About Bharat Krishi AI (Kisan Sarathi)\n\n"
                "**Bharat Krishi AI** is a state-of-the-art agricultural portal designed for Indian farmers. "
                "It is modeled on the **Kisan Sarathi** initiative, which is a joint technology hub by:\n"
                "1. **ICAR** (Indian Council of Agricultural Research)\n"
                "2. **Digital India Corporation** (DIC), Ministry of Electronics & IT, Govt. of India.\n\n"
                "### Tech Stack:\n"
                "• **Backend**: `FastAPI` (Python) providing REST endpoints.\n"
                "• **Database**: `MongoDB` (falling back to a local instance if cloud connectivity is limited).\n"
                "• **Frontend**: `React` (JavaScript) built with `Vite` for smooth single-page performance.\n"
                "• **Styling**: Structured with clean, custom `CSS` stylesheet definitions.\n\n"
                "Let me know if you want details on how any specific module operates!"
            )

        # 12. Language Switcher
        if any(w in msg for w in ["language", "hindi", "telugu", "tamil", "english", "translate", "bhasha"]):
            return (
                "### 🌐 Multilingual Capabilities\n\n"
                "This platform is designed to be accessible to everyone by supporting **four languages**:\n"
                "• **English** (`EN`)\n"
                "• **Hindi** (`हिंदी`)\n"
                "• **Telugu** (`తెలుగు`)\n"
                "• **Tamil** (`தமிழ்`)\n\n"
                "### How to Switch:\n"
                "Simply click the globe icon pill in the upper-right corner of the navbar (e.g. `🌐 EN ▾`) and select your language. "
                "The sidebar navigation, dashboard tags, KPI values, and AI modules will adapt instantly!"
            )

        # 13. Default farming prompt greeting helper
        return (
            "### 🤖 Krishi AI Assistant\n\n"
            f"I can help you navigate this portal or provide crop advice. "
            f"I detected you asked about: *'{message}'*. Here are some useful things you can ask:\n\n"
            "• `What can this website do?` — to list all modules.\n"
            "• `Explain Crop Recommendation` — to learn how soil indicators are predicted.\n"
            "• `How does the Soil Analysis tool calculate urea?` — for nutrient instructions.\n"
            "• `How do I scan plant leaves for diseases?` — for leaf diagnostics.\n"
            "• `How do I change the language to Telugu or Hindi?` — for translation guides.\n\n"
            "What specific crop, disease, or site feature can I explain for you today?"
        )
