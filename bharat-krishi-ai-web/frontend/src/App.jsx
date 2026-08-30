import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useApp } from './context/AppContext'

// Configure axios base path
axios.defaults.baseURL = '';

// ─── SIDEBAR NAV ITEMS ──────────────────────────────────────────
const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'crop',      icon: '🌱', label: 'Crop Recommendation' },
  { id: 'disease',   icon: '🦠', label: 'Plant Disease' },
  { id: 'soil',      icon: '🪱', label: 'Soil Analysis' },
  { id: 'yield',     icon: '📈', label: 'Crop Yield' },
  { id: 'market',    icon: '💹', label: 'Market Price' },
  { id: 'weather',   icon: '🌦️', label: 'Weather' },
  { id: 'rotation',  icon: '🔁', label: 'Crop Rotation' },
  { id: 'schemes',   icon: '🏛️', label: 'Gov Schemes' },
  { id: 'chatbot',   icon: '🤖', label: 'AI Chatbot' },
  { id: 'profile',   icon: '👤', label: 'Farmer Profile' },
]

// ─── TRANSLATIONS DICTIONARY ────────────────────────────────────
const translations = {
  en: {
    dashboard: "Dashboard",
    crop: "Crop Recommendation",
    disease: "Plant Disease",
    soil: "Soil Analysis",
    yield: "Crop Yield",
    market: "Market Price",
    weather: "Weather Forecast",
    rotation: "Crop Rotation",
    schemes: "Gov Schemes",
    chatbot: "AI Chatbot",
    profile: "Farmer Profile",
    searchPlaceholder: "Search crops, diseases, schemes...",
    navTagline: "Navigation",
    goodMorning: "Good Morning",
    fieldsReady: "Your fields are ready for today's decisions",
    recommendation: "Recommendation",
    ready: "Ready",
    riceOptimal: "Rice optimal today",
    wheatPrice: "Wheat Price",
    nextRain: "Next Rain",
    activeAlerts: "Active Alerts",
    blightRisk: "Blight risk nearby",
    aiModules: "AI Modules",
    liveMarketPrices: "Live Market Prices — 30 Days",
    fiveDayForecast: "5-Day Forecast",
    tryNow: "Try Now",
    scanLeaf: "Scan Leaf",
    analyze: "Analyze",
    predict: "Predict",
    viewPrices: "View Prices",
    seeForecast: "See Forecast",
    plan: "Plan",
    checkNow: "Check Now",
    chatNow: "Chat Now",
    popular: "Popular",
    newAlerts: "new",
    backToDashboard: "Back to Dashboard",
    submit: "Submit",
    results: "Results",
    loading: "Loading...",
    logout: "Logout",
    welcome: "Sign In / Register",
    
    // Additional keys
    soilNutrientsParams: "Soil Nutrients & Environmental Parameters",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    nLabel: "N — Nitrogen (mg/kg)",
    pLabel: "P — Phosphorus (mg/kg)",
    kLabel: "K — Potassium (mg/kg)",
    phLevel: "pH Level",
    tempLabel: "Temperature (°C)",
    humLabel: "Humidity (%)",
    rainLabel: "Rainfall (mm)",
    getRecommendation: "Get Recommendation",
    aiRecommendation: "AI Recommendation",
    confidence: "Confidence",
    alternativeCrops: "Alternative Crops",
    adjustInputsToAnalyze: 'Adjust inputs and click "Get Recommendation" to analyze.',
    runningAiModels: "Running AI models...",
    dropLeafImage: "Drop leaf image here",
    tapToCapture: "or tap to capture with camera",
    uploadBtn: "Upload",
    cameraBtn: "Camera",
    detectionResult: "Detection Result",
    runningCnnClassification: "Running CNN disease classification...",
    uploadLeafToDiagnose: "Upload or drop a leaf image to diagnose plant health.",
    treatmentSteps: "Treatment Steps",
    preventionLabel: "Prevention",
    soilNutrientInputs: "Soil Nutrient Inputs",
    analyzeSoilQuality: "Analyze Soil Quality",
    soilHealthIndex: "Soil Health Index",
    outOf100: "out of 100",
    fertilizerRecs: "Fertilizer Recommendations",
    fertilizerTh: "Fertilizer",
    doseTh: "Dose",
    whenTh: "When to Apply",
    methodTh: "Method",
    priorityTh: "Priority",
    predictionParams: "Prediction Parameters",
    stateLabel: "State",
    cropLabel: "Crop",
    areaLabel: "Area (acres)",
    avgRainLabel: "Avg Rainfall (mm)",
    predictYieldBtn: "Predict Yield",
    predictedYieldPerAcre: "Predicted Yield per Acre",
    quintalsPerAcre: "quintals / acre",
    totalHarvest: "Total Harvest",
    estimatedRevenue: "Estimated Revenue",
    historicalYieldTitle: "Historical Yield Comparison (quintals/acre)",
    productionTips: "Production Tips",
    selectCrop: "Select Crop:",
    priceTrendsTitle: "Price Trends — Last 30 Days (₹/q)",
    mandiPriceLabel: "Mandi Price",
    nearestMandiPrices: "Nearest Mandi Prices for",
    mandiNameTh: "Mandi Name",
    distanceTh: "Distance",
    priceTh: "Price (₹/q)",
    compActionTh: "Comparison / Action",
    averageRateLabel: "Average rate",
    searchLocationPlaceholder: "Search location...",
    searchBtn: "Search",
    humidityLabel: "Humidity",
    windLabel: "Wind",
    feelsLikeLabel: "Feels like",
    fetchingWeatherLabel: "Fetching live satellite weather forecast...",
    rotationParams: "Rotation Parameters",
    currentCrop: "Current Crop",
    soilType: "Soil Type",
    currentSeason: "Current Season",
    planRotationBtn: "Plan Rotation Sequence",
    rotationTimeline: "Rotation Timeline",
    selectParamsToPlan: 'Select parameters and click "Plan Rotation Sequence" to see timeline.',
    generatingRotationLabel: "Generating rotation timeline...",
    stageLabel: "Stage",
    nitrogenReplenishment: "Nitrogen replenishment:",
    farmerProfileFilterTitle: "Farmer Profile",
    checkEligibility: "Check Eligibility",
    verifyingSchemesLabel: "Verifying direct-benefit database eligibility...",
    youAreEligible: "✓ You're Eligible",
    notEligible: "✗ Not Eligible",
    applyNow: "Apply Now",
    viewGuidelines: "View Guidelines",
    guestModeMsg: "You are currently browsing as a guest.",
    guestModeDesc: "Sign in to save reports, view fertilizer statistics, and track crop history logs.",
    totalReportsLabel: "Total Reports",
    diseaseScansLabel: "Disease Scans",
    soilTestsLabel: "Soil Tests",
    avgSoilScoreLabel: "Avg Soil Score",
    farmingHistoryLogs: "Farming History Logs",
    noActivityLogs: "No recent farm reports or predictions. Run the AI tools to populate your dashboard!",
    loadingLogs: "Loading activity logs...",
    editProfile: "Edit Profile",
    cancel: "Cancel",
    saveChanges: "Save Changes",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    editDetails: "Edit Details"
  },
  hi: {
    dashboard: "डैशबोर्ड",
    crop: "फसल सिफारिश",
    disease: "पौधा रोग पहचान",
    soil: "मृदा विश्लेषण",
    yield: "फसल उपज",
    market: "बाजार मूल्य",
    weather: "मौसम पूर्वानुमान",
    rotation: "फसल चक्र",
    schemes: "सरकारी योजनाएं",
    chatbot: "एआई चैटबॉट",
    profile: "कृषक प्रोफ़ाइल",
    searchPlaceholder: "फसलें, बीमारियां, योजनाएं खोजें...",
    navTagline: "नेविगेशन",
    goodMorning: "सुप्रभात",
    fieldsReady: "आपके खेत आज के निर्णयों के लिए तैयार हैं",
    recommendation: "सिफारिश",
    ready: "तैयार",
    riceOptimal: "आज चावल के लिए अनुकूल",
    wheatPrice: "गेहूं का मूल्य",
    nextRain: "अगली बारिश",
    activeAlerts: "सक्रिय अलर्ट",
    blightRisk: "पास में झुलसा रोग का खतरा",
    aiModules: "एआई मॉड्यूल",
    liveMarketPrices: "लाइव बाजार भाव — 30 दिन",
    fiveDayForecast: "5-दिन का पूर्वानुमान",
    tryNow: "अभी प्रयास करें",
    scanLeaf: "पत्ती स्कैन करें",
    analyze: "विश्लेषण करें",
    predict: "अनुमान लगाएं",
    viewPrices: "कीमतें देखें",
    seeForecast: "पूर्वानुमान देखें",
    plan: "योजना बनाएं",
    checkNow: "अभी जांचें",
    chatNow: "अभी चैट करें",
    popular: "लोकप्रिय",
    newAlerts: "नया",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    submit: "जमा करें",
    results: "परिणाम",
    loading: "लोड हो रहा है...",
    logout: "लॉग आउट",
    welcome: "लॉग इन / रजिस्टर",
    
    // Additional keys
    soilNutrientsParams: "मिट्टी के पोषक तत्व और पर्यावरणीय पैरामीटर",
    nitrogen: "नाइट्रोजन (N)",
    phosphorus: "फास्फोरस (P)",
    potassium: "पोटेशियम (K)",
    nLabel: "N — नाइट्रोजन (mg/kg)",
    pLabel: "P — फास्फोरस (mg/kg)",
    kLabel: "K — पोटेशियम (mg/kg)",
    phLevel: "पीएच स्तर",
    tempLabel: "तापमान (°C)",
    humLabel: "आर्द्रता (%)",
    rainLabel: "वर्षा (mm)",
    getRecommendation: "सिफारिश प्राप्त करें",
    aiRecommendation: "एआई सिफारिश",
    confidence: "आत्मविश्वास",
    alternativeCrops: "वैकल्पिक फसलें",
    adjustInputsToAnalyze: 'विश्लेषण करने के लिए इनपुट समायोजित करें और "सिफारिश प्राप्त करें" पर क्लिक करें।',
    runningAiModels: "एआई मॉडल चल रहे हैं...",
    dropLeafImage: "पत्ती की छवि यहाँ छोड़ें",
    tapToCapture: "या कैमरे से कैप्चर करने के लिए टैप करें",
    uploadBtn: "अपलोड करें",
    cameraBtn: "कैमरा",
    detectionResult: "रोग पहचान परिणाम",
    runningCnnClassification: "सीएनएन रोग वर्गीकरण चल रहा है...",
    uploadLeafToDiagnose: "पौधों के स्वास्थ्य का निदान करने के लिए पत्ती की छवि अपलोड करें या छोड़ें।",
    treatmentSteps: "उपचार के चरण",
    preventionLabel: "रोकथाम",
    soilNutrientInputs: "मृदा पोषक तत्व इनपुट",
    analyzeSoilQuality: "मृदा गुणवत्ता का विश्लेषण करें",
    soilHealthIndex: "मृदा स्वास्थ्य सूचकांक",
    outOf100: "100 में से",
    fertilizerRecs: "उर्वरक सिफारिशें",
    fertilizerTh: "उर्वरक",
    doseTh: "मात्रा",
    whenTh: "कब लागू करें",
    methodTh: "विधि",
    priorityTh: "प्राथमिकता",
    predictionParams: "पूर्वानुमान पैरामीटर",
    stateLabel: "राज्य",
    cropLabel: "फसल",
    areaLabel: "क्षेत्र (एकड़)",
    avgRainLabel: "औसत वर्षा (mm)",
    predictYieldBtn: "उपज का अनुमान लगाएं",
    predictedYieldPerAcre: "प्रति एकड़ अनुमानित उपज",
    quintalsPerAcre: "क्विंटल / एकड़",
    totalHarvest: "कुल उपज",
    estimatedRevenue: "अनुमानित राजस्व",
    historicalYieldTitle: "ऐतिहासिक उपज तुलना (क्विंटल/एकड़)",
    productionTips: "उत्पादन युक्तियाँ",
    selectCrop: "फसल चुनें:",
    priceTrendsTitle: "मूल्य रुझान — अंतिम 30 दिन (₹/q)",
    mandiPriceLabel: "मंडी भाव",
    nearestMandiPrices: "निकटतम मंडी दरें -",
    mandiNameTh: "मंडी का नाम",
    distanceTh: "दूरी",
    priceTh: "भाव (₹/q)",
    compActionTh: "तुलना / कार्रवाई",
    averageRateLabel: "औसत दर",
    searchLocationPlaceholder: "स्थान खोजें...",
    searchBtn: "खोजें",
    humidityLabel: "आर्द्रता",
    windLabel: "हवा",
    feelsLikeLabel: "महसूस होता है",
    fetchingWeatherLabel: "लाइव सैटेलाइट मौसम पूर्वानुमान प्राप्त किया जा रहा है...",
    rotationParams: "फसल चक्र पैरामीटर",
    currentCrop: "वर्तमान फसल",
    soilType: "मिट्टी का प्रकार",
    currentSeason: "वर्तमान मौसम",
    planRotationBtn: "फसल चक्र अनुसूची की योजना बनाएं",
    rotationTimeline: "फसल चक्र समयरेखा",
    selectParamsToPlan: 'समयरेखा देखने के लिए पैरामीटर चुनें और "फसल चक्र अनुसूची की योजना बनाएं" पर क्लिक करें।',
    generatingRotationLabel: "फसल चक्र समयरेखा तैयार की जा रही है...",
    stageLabel: "चरण",
    nitrogenReplenishment: "नाइट्रोजन पुनःपूर्ति:",
    farmerProfileFilterTitle: "कृषक प्रोफ़ाइल",
    checkEligibility: "पात्रता की जांच करें",
    verifyingSchemesLabel: "प्रत्यक्ष-लाभ डेटाबेस पात्रता की पुष्टि की जा रही है...",
    youAreEligible: "✓ आप पात्र हैं",
    notEligible: "✗ पात्र नहीं हैं",
    applyNow: "अभी आवेदन करें",
    viewGuidelines: "दिशानिर्देश देखें",
    guestModeMsg: "आप वर्तमान में एक अतिथि के रूप में ब्राउज़ कर रहे हैं।",
    guestModeDesc: "रिपोर्ट सहेजने, उर्वरक आंकड़े देखने और फसल इतिहास लॉग को ट्रैक करने के लिए साइन इन करें।",
    totalReportsLabel: "कुल रिपोर्ट",
    diseaseScansLabel: "रोग स्कैन",
    soilTestsLabel: "मृदा परीक्षण",
    avgSoilScoreLabel: "औसत मिट्टी स्कोर",
    farmingHistoryLogs: "खेती का इतिहास लॉग",
    noActivityLogs: "कोई हालिया कृषि रिपोर्ट या पूर्वानुमान नहीं। अपने डैशबोर्ड को आबाद करने के लिए एआई टूल चलाएं!",
    loadingLogs: "गतिविधि लॉग लोड हो रहे हैं...",
    editProfile: "प्रोफ़ाइल संपादित करें",
    cancel: "रद्द करें",
    saveChanges: "बदलाव सहेजें",
    fullName: "पूरा नाम",
    phoneNumber: "फ़ोन नंबर",
    editDetails: "विवरण संपादित करें"
  },
  te: {
    dashboard: "డాష్‌బోర్డ్",
    crop: "పంట సిఫార్సు",
    disease: "మొక్కల వ్యాధి",
    soil: "నేల విశ్లేషణ",
    yield: "పంట దిగుబడి",
    market: "మార్కెట్ ధర",
    weather: "వాతావరణం",
    rotation: "పంట మార్పిడి",
    schemes: "ప్రభుత్వ పథకాలు",
    chatbot: "AI చాట్‌బాట్",
    profile: "రైతు ప్రొఫైల్",
    searchPlaceholder: "పంటలు, వ్యాధులు, పథకాలు శోధించండి...",
    navTagline: "నావిగేషన్",
    goodMorning: "శుభోదయం",
    fieldsReady: "ఈరోజు నిర్ణయాల కోసం మీ పొలాలు సిద్ధంగా ఉన్నాయి",
    recommendation: "సిఫార్సు",
    ready: "సిద్ధం",
    riceOptimal: "ఈరోజు వరికి అనుకూలం",
    wheatPrice: "గోధుమ ధర",
    nextRain: "తదుపరి వర్షం",
    activeAlerts: "సక్రియ అలర్ట్లు",
    blightRisk: "సమీపంలో తెగులు ముప్పు",
    aiModules: "AI మాడ్యూల్స్",
    liveMarketPrices: "లైవ్ మార్కెట్ ధరలు — 30 రోజులు",
    fiveDayForecast: "5-రోజుల సూచన",
    tryNow: "ప్రయ‌త్నించండి",
    scanLeaf: "ఆకును స్కాన్ చేయి",
    analyze: "విశ్లేషించండి",
    predict: "అంచనా వేయి",
    viewPrices: "ధరలు చూడండి",
    seeForecast: "వాతావరణం చూడు",
    plan: "ప్రణాళిక చేయి",
    checkNow: "తనిఖీ చేయి",
    chatNow: "చాట్ చేయి",
    popular: "ప్రసిద్ధ",
    newAlerts: "కొత్తవి",
    backToDashboard: "డాష్‌బోర్డ్‌కు తిరిగి వెళ్ళు",
    submit: "సమర్పించు",
    results: "ఫలితాలు",
    loading: "భారం అవుతోంది...",
    logout: "లాగ్ అవుట్",
    welcome: "సైన్ ఇన్ / రిజిస్టర్",
    
    // Additional keys
    soilNutrientsParams: "నేల పోషకాలు & పర్యావరణ పారామితులు",
    nitrogen: "నైట్రోజన్ (N)",
    phosphorus: "ఫాస్ఫరస్ (P)",
    potassium: "పొటాషియం (K)",
    nLabel: "N — నైట్రోజన్ (mg/kg)",
    pLabel: "P — ఫాస్ఫరస్ (mg/kg)",
    kLabel: "K — పొటాషియం (mg/kg)",
    phLevel: "pH స్థాయి",
    tempLabel: "ఉష్ణోగ్రత (°C)",
    humLabel: "తేమ (%)",
    rainLabel: "వర్షపాతం (mm)",
    getRecommendation: "సిఫార్సు పొందండి",
    aiRecommendation: "AI సిఫార్సు",
    confidence: "విశ్వాసం",
    alternativeCrops: "ప్రత్యామ్నాయ పంటలు",
    adjustInputsToAnalyze: 'విస్టేషించడానికి ఇన్‌పుట్‌లను సర్దుబాటు చేసి, "సిఫార్సు పొందండి" క్లిక్ చేయండి.',
    runningAiModels: "AI మోడల్స్ రన్ అవుతున్నాయి...",
    dropLeafImage: "ఆకు చిత్రాన్ని ఇక్కడ వేయండి",
    tapToCapture: "లేదా కెమెరాతో క్యాప్చర్ చేయడానికి నొక్కండి",
    uploadBtn: "అప్లోడ్ చేయి",
    cameraBtn: "కెమెరా",
    detectionResult: "వ్యాధి గుర్తింపు ఫలితం",
    runningCnnClassification: "CNN వ్యాధి వర్గీకరణ రన్ అవుతోంది...",
    uploadLeafToDiagnose: "మొక్కల ఆరోగ్యాన్ని గుర్తించడానికి ఆకు చిత్రాన్ని అప్‌లోడ్ చేయండి లేదా ఇక్కడ వేయండి.",
    treatmentSteps: "చికిత్స దశలు",
    preventionLabel: "నివారణ",
    soilNutrientInputs: "నేల పోషకాల ఇన్‌పుట్‌లు",
    analyzeSoilQuality: "నేల నాణ్యతను విశ్లేషించండి",
    soilHealthIndex: "నేల ఆరోగ్య సూచిక",
    outOf100: "100 కి",
    fertilizerRecs: "ఎరువుల సిఫార్సులు",
    fertilizerTh: "ఎరువులు",
    doseTh: "మోతాదు",
    whenTh: "ఎప్పుడు వేయాలి",
    methodTh: "విధానం",
    priorityTh: "ప్రాధాన్యత",
    predictionParams: "అంచనా పారామితులు",
    stateLabel: "రాష్ట్రం",
    cropLabel: "పంట",
    areaLabel: "ప్రాంతం (ఎకరాలు)",
    avgRainLabel: "సగటు వర్షపాతం (mm)",
    predictYieldBtn: "దిగుబడిని అంచనా వేయి",
    predictedYieldPerAcre: "ఎకరాకు అంచనా దిగుబడి",
    quintalsPerAcre: "క్వింటాళ్లు / ఎకరా",
    totalHarvest: "మొత్తం దిగుబడి",
    estimatedRevenue: "అంచనా ఆదాయం",
    historicalYieldTitle: "చారిత్రక దిగుబడి పోలిక (క్వింటాళ్లు/ఎకరా)",
    productionTips: "ఉత్పత్తి చిట్కాలు",
    selectCrop: "పంటను ఎంచుకోండి:",
    priceTrendsTitle: "ధరల పోకడలు — గత 30 రోజులు (₹/q)",
    mandiPriceLabel: "మండి ధర",
    nearestMandiPrices: "సమీప మండి ధరలు -",
    mandiNameTh: "మండి పేరు",
    distanceTh: "దూరం",
    priceTh: "ధర (₹/q)",
    compActionTh: "పోలిక / చర్య",
    averageRateLabel: "సగటు ధర",
    searchLocationPlaceholder: "స్థానాన్ని శోధించండి...",
    searchBtn: "వెతుకు",
    humidityLabel: "తేమ",
    windLabel: "గాలి",
    feelsLikeLabel: "అనిపిస్తుంది",
    fetchingWeatherLabel: "లైవ్ శాటిలైట్ వాతావరణ సమాచారాన్ని పొందుతోంది...",
    rotationParams: "పంట మార్పిడి పారామితులు",
    currentCrop: "ప్రస్తుత పంట",
    soilType: "నేల రకం",
    currentSeason: "ప్రస్తుత కాలం",
    planRotationBtn: "పంట మార్పిడి ప్రణాళికను సిద్ధం చేయి",
    rotationTimeline: "పంట మార్పిడి కాలక్రమం",
    selectParamsToPlan: 'కాలక్రమాన్ని చూడటానికి పారామితులను ఎంచుకుని, "పంట మార్పిడి ప్రణాళికను సిద్ధం చేయి" క్లిక్ చేయండి.',
    generatingRotationLabel: "పంట మార్పిడి కాలక్రమాన్ని సిద్ధం చేస్తోంది...",
    stageLabel: "దశ",
    nitrogenReplenishment: "నైట్రోజన్ పునరుద్ధరణ:",
    farmerProfileFilterTitle: "రైతు ప్రొఫైల్",
    checkEligibility: "అర్హతను తనిఖీ చేయి",
    verifyingSchemesLabel: "నేరుగా లబ్ధిదారుల డేటాబేస్ అర్హతను పరిశీలిస్తోంది...",
    youAreEligible: "✓ మీరు అర్హులు",
    notEligible: "✗ అర్హత లేదు",
    applyNow: "ఇప్పుడే దరఖాస్తు చేయి",
    viewGuidelines: "మార్గదర్శకాలను చూడు",
    guestModeMsg: "మీరు ప్రస్తుతం అతిథిగా బ్రౌజ్ చేస్తున్నారు.",
    guestModeDesc: "నివేదికలను సేవ్ చేయడానికి, ఎరువుల గణాంకాలను చూడటానికి మరియు పంట చరిత్ర లాగ్‌లను ట్రాక్ చేయడానికి సైన్ ఇన్ చేయండి.",
    totalReportsLabel: "మొత్తం నివేదికలు",
    diseaseScansLabel: "వ్యాధి స్కాన్లు",
    soilTestsLabel: "నేల పరీక్షలు",
    avgSoilScoreLabel: "సగటు నేల స్కోరు",
    farmingHistoryLogs: "వ్యవసాయ చరిత్ర లాగ్‌లు",
    noActivityLogs: "ఇటీవలి వ్యవసాయ నివేదికలు లేదా అంచనాలు లేవు. మీ డాష్‌బోర్డ్‌ను నింపడానికి AI సాధనాలను రన్ చేయండి!",
    loadingLogs: "కార్యకలాపాల లాగ్‌లను లోడ్ చేస్తోంది...",
    editProfile: "ప్రొఫైల్ సవరించు",
    cancel: "రద్దు చేయి",
    saveChanges: "మార్పులను సేవ్ చేయి",
    fullName: "పూర్తి పేరు",
    phoneNumber: "ఫోన్ నంబర్",
    editDetails: "వివరాలను సవరించు"
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    crop: "பயிர் பரிந்துரை",
    disease: "பயிர் நோய்",
    soil: "மண் பகுப்பாய்வு",
    yield: "பயிர் விளைச்சல்",
    market: "சந்தை விலை",
    weather: "வானிலை முன்னறிவிப்பு",
    rotation: "பயிர் சுழற்சி",
    schemes: "அரசு திட்டங்கள்",
    chatbot: "AI சாட்பாட்",
    profile: "விவசாயி சுயவிவரம்",
    searchPlaceholder: "பயிர்கள், நோய்கள், திட்டங்களைத் தேடுங்கள்...",
    navTagline: "வழிசெலுத்தல்",
    goodMorning: "காலை வணக்கம்",
    fieldsReady: "இன்றைய முடிவுகளுக்கு உங்கள் வயல்கள் தயாராக உள்ளன",
    recommendation: "பரிந்துரை",
    ready: "தயார்",
    riceOptimal: "இன்று நெல்லுக்கு உகந்தது",
    wheatPrice: "கோதுமை விலை",
    nextRain: "அடுத்த மழை",
    activeAlerts: "செயலில் உள்ள விழிப்பூட்டல்கள்",
    blightRisk: "அருகில் பூஞ்சை நோய் அபாயம்",
    aiModules: "AI தொகுதிகள்",
    liveMarketPrices: "நேரடி சந்தை விலைகள் — 30 நாட்கள்",
    fiveDayForecast: "5-நாள் முன்னறிவிப்பு",
    tryNow: "முயற்சி செய்",
    scanLeaf: "இலையை ஸணேக செய்",
    analyze: "பகுப்பாய்வு செய்",
    predict: "கணித்துக்கூறு",
    viewPrices: "விலைகளைப் பார்",
    seeForecast: "வானிலை பார்",
    plan: "திட்டமிடு",
    checkNow: "சரிபார்",
    chatNow: "சாட் செய்",
    popular: "பிரபலமான",
    newAlerts: "புதியது",
    backToDashboard: "டாஷ்போர்டுக்குத் திரும்பு",
    submit: "சமர்ப்பி",
    results: "முடிவுகள்",
    loading: "ஏற்றப்படுகிறது...",
    logout: "வெளியேறு",
    welcome: "உள்நுழைக / பதிவுசெய்",
    
    // Additional keys
    soilNutrientsParams: "மண் ஊட்டச்சத்துக்கள் மற்றும் சுற்றுச்சூழல் அளவுருக்கள்",
    nitrogen: "நைட்ரஜன் (N)",
    phosphorus: "பாஸ்பரஸ் (P)",
    potassium: "பொட்டாசியம் (K)",
    nLabel: "N — நைட்ரஜன் (மிகி/கிகி)",
    pLabel: "P — பாஸ்பரஸ் (மிகி/கிகி)",
    kLabel: "K — பொட்டாசியம் (மிகி/கிகி)",
    phLevel: "pH அளவு",
    tempLabel: "வெப்பநிலை (°C)",
    humLabel: "ஈரப்பதம் (%)",
    rainLabel: "மழைப்பொழிவு (மிமீ)",
    getRecommendation: "பரிந்துரையைப் பெறுங்கள்",
    aiRecommendation: "AI பரிந்துரை",
    confidence: "நம்பகத்தன்மை",
    alternativeCrops: "மாற்று பயிர்கள்",
    adjustInputsToAnalyze: 'பகுப்பாய்வு செய்ய இன்புட்டுகளை சரிசெய்து "பரிந்துரையைப் பெறுங்கள்" என்பதைக் கிளிக் செய்யவும்.',
    runningAiModels: "AI மாதிரிகள் இயங்குகின்றன...",
    dropLeafImage: "இலை படத்தை இங்கே விடவும்",
    tapToCapture: "அல்லது கேமரா மூலம் படம் பிடிக்க தட்டவும்",
    uploadBtn: "பதிவேற்று",
    cameraBtn: "கேமரா",
    detectionResult: "கண்டறிதல் முடிவு",
    runningCnnClassification: "CNN நோய் வகைப்பாடு இயங்குகிறது...",
    uploadLeafToDiagnose: "தாவர ஆரோக்கியத்தைக் கண்டறிய இலை படத்தை பதிவேற்றவும் அல்லது விடவும்.",
    treatmentSteps: "சிகிச்சை முறைகள்",
    preventionLabel: "தடுப்பு",
    soilNutrientInputs: "மண் ஊட்டச்சத்து உள்ளீடுகள்",
    analyzeSoilQuality: "மண் தரத்தை பகுப்பாய்வு செய்",
    soilHealthIndex: "மண் சுகாதார குறியீடு",
    outOf100: "100 இல்",
    fertilizerRecs: "உர பரிந்துரைகள்",
    fertilizerTh: "உரம்",
    doseTh: "அளவு",
    whenTh: "எப்போது பயன்படுத்துவது",
    methodTh: "முறை",
    priorityTh: "முன்னுரிமை",
    predictionParams: "கணிப்பு அளவுருக்கள்",
    stateLabel: "மாநிலம்",
    cropLabel: "பயிர்",
    areaLabel: "பரப்பளவு (ஏக்கர்)",
    avgRainLabel: "சராசரி மழைப்பொழிவு (மிமீ)",
    predictYieldBtn: "விளைச்சலைக் கணி",
    predictedYieldPerAcre: "ஒரு ஏக்கருக்கான கணிப்பு விளைச்சல்",
    quintalsPerAcre: "குவிண்டால் / ஏக்கர்",
    totalHarvest: "மொத்த விளைச்சல்",
    estimatedRevenue: "மதிப்பிடப்பட்ட வருவாய்",
    historicalYieldTitle: "வரலாற்று விளைச்சல் ஒப்பீடு (குவிண்டால்/ஏக்கர்)",
    productionTips: "உற்பத்தி குறிப்புகள்",
    selectCrop: "பயிரைத் தேர்ந்தெடு:",
    priceTrendsTitle: "விலை போக்குகள் — கடந்த 30 நாட்கள் (₹/q)",
    mandiPriceLabel: "மண்டி விலை",
    nearestMandiPrices: "அருகிலுள்ள மண்டி விலைகள் -",
    mandiNameTh: "மண்டியின் பெயர்",
    distanceTh: "தூரம்",
    priceTh: "விலை (₹/q)",
    compActionTh: "ஒப்பீடு / நடவடிக்கை",
    averageRateLabel: "சராசரி விலை",
    searchLocationPlaceholder: "இருப்பிடத்தைத் தேடு...",
    searchBtn: "தேடு",
    humidityLabel: "ஈரப்பதம்",
    windLabel: "காற்று",
    feelsLikeLabel: "உணர்வு",
    fetchingWeatherLabel: "நேரடி செயற்கைக்கோள் வானிலை முன்னறிவிப்பைப் பெறுகிறது...",
    rotationParams: "சுழற்சி அளவுருக்கள்",
    currentCrop: "தற்போதைய பயிர்",
    soilType: "மண் வகை",
    currentSeason: "தற்போதைய பருவம்",
    planRotationBtn: "சுழற்சி வரிசையைத் திட்டமிடு",
    rotationTimeline: "சுழற்சி காலவரிசை",
    selectParamsToPlan: 'காலவரிசையைக் காண அளவுமுடுவலைத் தேர்ந்தெடுத்து "சுழற்சி வரிசையைத் திட்டமிடு" என்பதைக் கிளிக் செய்யவும்.',
    generatingRotationLabel: "சுழற்சி காலவரிசையை உருவாக்குகிறது...",
    stageLabel: "நிலை",
    nitrogenReplenishment: "N  நிரப்புதல்:",
    farmerProfileFilterTitle: "விவசாயி சுயவிவரம்",
    checkEligibility: "தகுதியைச் சரிபார்",
    verifyingSchemesLabel: "நேரடி பயன் தரவுத்தள தகுதியைச் சரிபார்க்கிறது...",
    youAreEligible: "✓ நீங்கள் தகுதியானவர்",
    notEligible: "✗ தகுதியற்றவர்",
    applyNow: "இப்போதே விண்ணப்பி",
    viewGuidelines: "வழிமுறைகளைப் பார்",
    guestModeMsg: "நீங்கள் தற்போது விருந்தினராக உலாவுகிறீர்கள்.",
    guestModeDesc: "அறிக்கைகளைச் சேமிக்கவும், உரப் புள்ளிவிவரங்களைப் பார்க்கவும் மற்றும் பயிர் வரலாற்றுப் பதிவுகளைக் கண்காணிக்கவும் உள்நுழையவும்.",
    totalReportsLabel: "மொத்த அறிக்கைகள்",
    diseaseScansLabel: "நோய் ஸ்கேன்கள்",
    soilTestsLabel: "மண் பரிசோதனைகள்",
    avgSoilScoreLabel: "சராசரி மண் மதிப்பெண்",
    farmingHistoryLogs: "விவசாய வரலாற்றுப் பதிவுகள்",
    noActivityLogs: "சமீபத்திய விவசாய அறிக்கைகள் அல்லது கணிப்புகள் எதுவும் இல்லை. உங்கள் டாஷ்போர்டை நிரப்ப AI கருவிகளை இயக்கவும்!",
    loadingLogs: "செயல்பாட்டுப் பதிவுகளை ஏற்றுகிறது...",
    editProfile: "சுயவிவரத்தைத் திருத்து",
    cancel: "ரத்து செய்",
    saveChanges: "மாற்றங்களைச் சேமி",
    fullName: "முழு பெயர்",
    phoneNumber: "தொலைபேசி எண்",
    editDetails: "விவரங்களைத் திருத்து"
  }
};


// ─── MARKET CHART COMPONENT ─────────────────────────────────────
function MarketChart({ data }) {
  if (!data || data.length === 0) return null;
  const maxVal = Math.max(...data, 1);
  return (
    <div className="chart-placeholder">
      <div className="chart-bar-group">
        {data.map((v, i) => (
          <div key={i} className="chart-bar" style={{
            height: `${(v / maxVal) * 100}%`,
            background: i === data.length - 1
              ? 'var(--green)'
              : `rgba(45,106,79,${0.3 + (v / maxVal) * 0.5})`
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── LANDING PAGE (Kisan Sarathi Home) ───────────────────────────
function LandingPage({ onLoginClick, onRegisterClick }) {
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMsg, setContactMsg] = useState('')
  const [isRobotChecked, setIsRobotChecked] = useState(false)

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactEmail || !contactMsg) {
      alert("Please fill all contact fields.");
      return;
    }
    if (!isRobotChecked) {
      alert("Please verify that you are not a robot.");
      return;
    }
    alert(`Thank you ${contactName}! Your message has been sent successfully.`);
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setContactMsg('');
    setIsRobotChecked(false);
  };

  return (
    <div id="page-home" className="page active" style={{ height: '100%', overflowY: 'auto' }}>
      <nav className="landing-navbar">
        <div className="nav-brand" onClick={() => window.location.reload()}>
          <div style={{ width: 34, height: 34, background: 'var(--g5)', borderRadius: 6, border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-shield" aria-hidden="true" style={{ fontSize: 16, color: 'var(--g2)' }}></i>
          </div>
          <div style={{ width: 0.5, height: 30, background: 'var(--border)', margin: '0 4px' }}></div>
          <div className="nav-logo-box"><i className="ti ti-plant-2" aria-hidden="true"></i></div>
          <div>
            <div className="nav-brand-text">Bharat Krishi AI</div>
            <div className="nav-brand-sub">Smart Farming Platform</div>
          </div>
        </div>
        <div className="nav-links">
          <button className="nav-link active" onClick={() => alert("You are on the Home page.")}><i className="ti ti-home" aria-hidden="true" style={{ fontSize: 13, marginRight: 3 }}></i>Home</button>
          <button className="nav-link" onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}><i className="ti ti-info-circle" aria-hidden="true" style={{ fontSize: 13, marginRight: 3 }}></i>About</button>
          <button className="nav-link" onClick={() => document.getElementById('modules-section')?.scrollIntoView({ behavior: 'smooth' })}><i className="ti ti-tools" aria-hidden="true" style={{ fontSize: 13, marginRight: 3 }}></i>Services</button>
          <button className="nav-link" onClick={() => alert("Vikalp alternative channels list is coming soon.")}><i className="ti ti-switch" aria-hidden="true" style={{ fontSize: 13, marginRight: 3 }}></i>Vikalp <span className="nav-new">New</span></button>
          <button className="nav-link" onClick={() => alert("Downloading Kisan Sarathi brochure...")}><i className="ti ti-download" aria-hidden="true" style={{ fontSize: 13, marginRight: 3 }}></i>Brochure</button>
          <button className="nav-link" onClick={() => document.getElementById('connect-section')?.scrollIntoView({ behavior: 'smooth' })}><i className="ti ti-mail" aria-hidden="true" style={{ fontSize: 13, marginRight: 3 }}></i>Contact</button>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-farmer" onClick={onRegisterClick}>
            <i className="ti ti-user-plus" aria-hidden="true"></i>Farmer registration
          </button>
          <button className="btn-login" onClick={onLoginClick}>
            <i className="ti ti-login" aria-hidden="true"></i>Login
          </button>
        </div>
      </nav>

      <div className="hero-banner">
        <div className="hero-badge"><i className="ti ti-plant" aria-hidden="true" style={{ fontSize: 13 }}></i> Khet Bachao Abhiyan</div>
        <h1>Swasth Mitti, <span>Sashakt Kisan</span>, Samridh Bharat</h1>
        <div className="hero-tagline">AI-powered agriculture for every Indian farmer</div>
        <div className="hstats">
          <span className="hstat"><i className="ti ti-users" aria-hidden="true"></i>1650+ field teams</span>
          <span className="hstat"><i className="ti ti-award" aria-hidden="true"></i>500 special campaign teams</span>
          <span className="hstat"><i className="ti ti-building-community" aria-hidden="true"></i>1150+ partner teams</span>
          <span className="hstat"><i className="ti ti-microscope" aria-hidden="true"></i>Direct scientist guidance</span>
        </div>
        <div className="hero-date"><i className="ti ti-calendar-event" aria-hidden="true" style={{ color: 'var(--g2)' }}></i> 1 June – 30 June, 2026</div>
        <div className="hero-actions">
          <button className="btn-hp" onClick={onRegisterClick}><i className="ti ti-rocket" aria-hidden="true"></i>Get started free</button>
          <button className="btn-ho" onClick={() => alert("Downloading brochure...")}><i className="ti ti-download" aria-hidden="true"></i>Download brochure</button>
        </div>
        <div className="hero-circles">
          <div className="hero-circle"><i className="ti ti-bug" aria-hidden="true"></i></div>
          <div className="hero-circle"><i className="ti ti-plant-2" aria-hidden="true"></i></div>
          <div className="hero-circle"><i className="ti ti-tractor" aria-hidden="true"></i></div>
          <div className="hero-circle"><i className="ti ti-droplet" aria-hidden="true"></i></div>
        </div>
      </div>

      <div className="partners-bar">
        <div className="partners-label">Jointly implemented by</div>
        <div className="partners-row">
          <div className="partner-item">
            <div className="p-icon"><i className="ti ti-microscope" aria-hidden="true"></i></div>
            <div><div className="p-name">ICAR</div><div className="p-sub">Indian Council of Agricultural Research</div></div>
          </div>
          <div style={{ width: 0.5, height: 36, background: 'var(--border)' }}></div>
          <div className="partner-item">
            <div className="p-icon"><i className="ti ti-device-desktop" aria-hidden="true"></i></div>
            <div><div className="p-name">Digital India Corporation</div><div className="p-sub">Ministry of Electronics & IT</div></div>
          </div>
        </div>
      </div>

      <div id="about-section" className="about-section">
        <div className="about-inner">
          <div>
            <div className="about-label">About</div>
            <h2>Kisan Sarathi</h2>
            <p>Kisan Sarathi — System of Agri-information Resources Auto-transmission and Technology Hub Interface, ICAR. Powered by IIDS, Digital India Corporation (DIC), Ministry of Electronics and Information Technology (MeitY), Govt. of India.</p>
            <p>An ICT-based interface solution providing an intelligent online platform for agriculture at local niche with national perspective — seamless, multimedia, multi-ways connectivity to farmers with the latest agricultural technologies and subject matter experts.</p>
          </div>
          <div className="about-card">
            <div className="about-img"><i className="ti ti-user" aria-hidden="true"></i></div>
            <div className="about-card-title" style={{ marginTop: 10 }}>Download brochure</div>
            <div className="about-card-sub">Available in English and Hindi</div>
            <div className="dl-btns" style={{ marginTop: 8 }}>
              <button className="dl-btn" onClick={() => alert("Downloading English brochure...")}><i className="ti ti-download" aria-hidden="true"></i>English</button>
              <button className="dl-btn" onClick={() => alert("Downloading Hindi brochure...")}><i className="ti ti-download" aria-hidden="true"></i>Hindi</button>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2><i className="ti ti-chart-bar" aria-hidden="true" style={{ color: 'var(--g2)', marginRight: 6 }}></i>Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fde8d0' }}><i className="ti ti-users" style={{ color: '#b94a1a', fontSize: 20 }} aria-hidden="true"></i></div>
            <div><div className="stat-num">2,93,56,168</div><div className="stat-label">Farmers registered</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--g4)' }}><i className="ti ti-building" style={{ color: 'var(--g2)', fontSize: 20 }} aria-hidden="true"></i></div>
            <div><div className="stat-num">746</div><div className="stat-label">Registered institutions / DAATTC</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e8f4fd' }}><i className="ti ti-map-pin" style={{ color: '#1a6fac', fontSize: 20 }} aria-hidden="true"></i></div>
            <div><div className="stat-num">3,11,571</div><div className="stat-label">Villages covered</div></div>
          </div>
        </div>
      </div>

      <div className="tech-section">
        <div className="tech-reach">Reaching the unreached</div>
        <div style={{ maxWidth: 600 }}>
          <div className="tech-eyebrow"><i className="ti ti-cpu" aria-hidden="true" style={{ marginRight: 4 }}></i>Technology platform</div>
          <h2>Interactive Information Dissemination System (IIDS)</h2>
          <div className="tech-sub"><i className="ti ti-wifi" aria-hidden="true" style={{ marginRight: 4 }}></i>Anywhere and anytime access by scientists</div>
          <p>IIDS is the technical platform for delivery of personalised advisories through KVKs in Kisan Sarathi. It is a push-and-pull-based system where agriculture-related information can be pulled from farmers using mobile phones — combining smartphone apps, interactive portal, and IVRS.</p>
          <p>Data is transmitted through voice, text, images, and videos from both ends. Farmers subscribe to services and receive individual needs-based information.</p>
          <div className="read-more" onClick={() => alert("Full Technical details of IIDS platform loading...")}><i className="ti ti-arrow-right" aria-hidden="true"></i> Read more</div>
        </div>
      </div>

      <div id="modules-section" className="modules-section">
        <h2><i className="ti ti-apps" aria-hidden="true" style={{ color: 'var(--g2)', marginRight: 6 }}></i>Our AI modules</h2>
        <div className="sec-sub">Nine intelligent systems covering every farming decision</div>
        <div className="landing-modules-grid">
          {[
            { icon: 'ti ti-plant-2', name: 'Crop recommendation', desc: 'Best crop for your soil and weather', color: 'var(--g2)', bg: 'var(--g4)' },
            { icon: 'ti ti-virus', name: 'Disease detection', desc: 'Leaf photo scan diagnosis', color: '#c0392b', bg: '#fce8e8' },
            { icon: 'ti ti-mountain', name: 'Soil analysis', desc: 'NPK, pH and fertility scoring', color: '#b7770d', bg: '#fef9e7' },
            { icon: 'ti ti-chart-line', name: 'Yield prediction', desc: 'Forecast expected production', color: '#1a6fac', bg: '#e8f4fd' },
            { icon: 'ti ti-currency-rupee', name: 'Market prices', desc: 'Live mandi price forecasts', color: '#7d3c98', bg: '#f3e8fd' },
            { icon: 'ti ti-cloud-rain', name: 'Weather forecast', desc: 'Rain, drought and farm alerts', color: '#1a6fac', bg: '#e8f6fd' },
            { icon: 'ti ti-refresh', name: 'Crop rotation', desc: 'Sustainable rotation plans', color: '#0b6e4f', bg: '#e8fdf5' },
            { icon: 'ti ti-building-bank', name: 'Govt schemes', desc: 'Subsidies you are eligible for', color: '#b94a1a', bg: '#fdeee8' },
            { icon: 'ti ti-robot', name: 'AI chatbot', desc: 'Ask in your own language', color: '#b03060', bg: '#fde8f0' },
          ].map((mod, idx) => (
            <div key={idx} className="mod-card" onClick={onLoginClick}>
              <div className="mod-icon" style={{ background: mod.bg }}><i className={mod.icon} style={{ color: mod.color }} aria-hidden="true"></i></div>
              <div className="mod-name">{mod.name}</div>
              <div className="mod-desc">{mod.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div id="connect-section" className="connect-section">
        <h2><i className="ti ti-antenna" aria-hidden="true" style={{ color: 'var(--g2)', marginRight: 6 }}></i>Connect with us</h2>
        <div className="connect-inner">
          <div className="social-grid">
            <div className="social-card" onClick={() => window.open('https://facebook.com')}><i className="ti ti-brand-facebook" aria-hidden="true" style={{ color: '#1877f2' }}></i><span>Facebook</span></div>
            <div className="social-card" onClick={() => window.open('https://twitter.com')}><i className="ti ti-brand-x" aria-hidden="true" style={{ color: 'var(--charcoal)' }}></i><span>Twitter / X</span></div>
            <div className="social-card" onClick={() => window.open('https://youtube.com')}><i className="ti ti-brand-youtube" aria-hidden="true" style={{ color: '#ff0000' }}></i><span>YouTube</span></div>
            <div className="social-card" onClick={() => alert('App Store downloads coming soon!')}><i className="ti ti-brand-android" aria-hidden="true" style={{ color: '#3ddc84' }}></i><span>Android app</span></div>
            <div className="social-card" style={{ gridColumn: '1/-1' }} onClick={() => alert('iOS App Store download coming soon!')}><i className="ti ti-brand-apple" aria-hidden="true" style={{ color: 'var(--charcoal)' }}></i><span>iOS app</span></div>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row-3">
              <div>
                <div className="cf-label"><i className="ti ti-user" aria-hidden="true"></i>Name *</div>
                <input className="cf-input" type="text" placeholder="Your name" value={contactName} onChange={e => setContactName(e.target.value)} required />
              </div>
              <div>
                <div className="cf-label"><i className="ti ti-device-mobile" aria-hidden="true"></i>Mobile *</div>
                <input className="cf-input" type="tel" placeholder="+91 XXXXX" value={contactPhone} onChange={e => setContactPhone(e.target.value)} required />
              </div>
              <div>
                <div className="cf-label"><i className="ti ti-mail" aria-hidden="true"></i>Email *</div>
                <input className="cf-input" type="email" placeholder="you@example.com" value={contactEmail} onChange={e => setContactEmail(e.target.value)} required />
              </div>
            </div>
            <div style={{ marginBottom: 4 }}>
              <div className="cf-label"><i className="ti ti-message" aria-hidden="true"></i>Message *</div>
              <textarea className="cf-textarea" placeholder="Write your message here..." value={contactMsg} onChange={e => setContactMsg(e.target.value)} required></textarea>
            </div>
            <div className="captcha-box">
              <input type="checkbox" id="captcha" checked={isRobotChecked} onChange={e => setIsRobotChecked(e.target.checked)} />
              <label htmlFor="captcha">I'm not a robot</label>
              <i className="ti ti-refresh" aria-hidden="true" style={{ fontSize: 16, color: 'var(--gray)', marginLeft: 12, cursor: 'pointer' }} onClick={() => setIsRobotChecked(false)}></i>
            </div>
            <button type="submit" className="btn-submit"><i className="ti ti-send" aria-hidden="true"></i>Submit</button>
          </form>
        </div>
      </div>

      <div className="footer">
        <p>© Copyright <a>Kisan Sarathi</a>, Powered by Interactive Information Dissemination System (IIDS). All Rights Reserved.</p>
        <p style={{ marginTop: 4 }}>Designed &amp; Developed by <a>Digital India Corporation</a></p>
      </div>
    </div>
  )
}

// ─── AUTHENTICATION & MULTI-STEP REGISTRATION ───────────────────
function AuthPage({ onAuthSuccess, onGuestMode, defaultTab, onBackToHome }) {
  const [tab, setTab] = useState(defaultTab || 'login'); // 'login', 'register'
  const [regStep, setRegStep] = useState(1); // 1, 2, 3, 'success'
  
  // Login State
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Register State
  const [rFname, setRFname] = useState('');
  const [rLname, setRLname] = useState('');
  const [rMobile, setRMobile] = useState('');
  const [rEmail, setREmail] = useState('');
  const [rPass, setRPass] = useState('');
  const [pwStrength, setPwStrength] = useState(0);
  const [pwHint, setPwHint] = useState('Enter a password');
  const [showRegPass, setShowRegPass] = useState(false);
  const [regErr, setRegErr] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  // Farm Details State
  const [rState, setRState] = useState('Telangana');
  const [rDist, setRDist] = useState('');
  const [rLand, setRLand] = useState(5);
  const [rCategory, setRCategory] = useState('Medium (2–10 acres)');

  // Crops Chips Selection
  const availableCrops = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Onion', 'Tomato', 'Soybean', 'Sugarcane', 'Groundnut', 'Turmeric'];
  const [selectedCrops, setSelectedCrops] = useState(['Maize', 'Onion']);


  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginId || !loginPass) {
      setLoginErr('Please enter both mobile/email and password.');
      return;
    }
    setLoginLoading(true);
    setLoginErr('');
    try {
      const res = await axios.post('/api/auth/login', {
        username: loginId,
        password: loginPass
      });
      onAuthSuccess(res.data.token, res.data.user);
    } catch (err) {
      console.error(err);
      setLoginErr(err.response?.data?.detail || 'Invalid username or password. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Password validation strength checker
  const handlePwInput = (val) => {
    setRPass(val);
    if (!val) {
      setPwStrength(0);
      setPwHint('Enter a password');
      return;
    }
    let strength = 0;
    if (val.length >= 8) strength += 25;
    if (/[A-Z]/.test(val)) strength += 25;
    if (/[0-9]/.test(val)) strength += 25;
    if (/[^A-Za-z0-9]/.test(val)) strength += 25;

    setPwStrength(strength);
    if (strength < 50) {
      setPwHint('Weak (Too short or simple)');
    } else if (strength < 75) {
      setPwHint('Medium strength password');
    } else {
      setPwHint('Strong password secured');
    }
  };

  // Handle Step 1 -> 2
  const handleStep1Submit = () => {
    if (!rFname || !rMobile || !rPass) {
      setRegErr('Please fill in all required fields marked with *');
      return;
    }
    if (rPass.length < 8) {
      setRegErr('Password must be at least 8 characters long.');
      return;
    }
    setRegErr('');
    setRegStep(2);
  };

  // Handle Step 2 -> 3
  const handleStep2Submit = () => {
    if (!rState) {
      setRegErr('Please select your state.');
      return;
    }
    setRegErr('');
    setRegStep(3);
  };

  // Handle Step 3 (Submit registration)
  const handleRegisterSubmit = async () => {
    setRegLoading(true);
    setRegErr('');
    try {
      const name = `${rFname} ${rLname}`.trim();
      const payload = {
        username: rMobile,
        password: rPass,
        name: name,
        phone: rMobile,
        state: rState
      };
      
      const res = await axios.post('/api/auth/register', payload);
      // Store token in state but go to success page first!
      setRegStep('success');
      // Save details locally so we can proceed later
      localStorage.setItem('tempToken', res.data.token);
      localStorage.setItem('tempUser', JSON.stringify(res.data.user));
    } catch (err) {
      console.error(err);
      setRegErr(err.response?.data?.detail || 'Registration failed. Mobile might already be registered.');
      setRegStep(1); // go back to fix
    } finally {
      setRegLoading(false);
    }
  };

  // Complete onboarding
  const handleSuccessProceed = () => {
    const t = localStorage.getItem('tempToken');
    const u = JSON.parse(localStorage.getItem('tempUser') || 'null');
    localStorage.removeItem('tempToken');
    localStorage.removeItem('tempUser');
    if (t && u) {
      onAuthSuccess(t, u);
    } else {
      setTab('login');
      setRegStep(1);
    }
  };


  const toggleCropChip = (cropName) => {
    if (selectedCrops.includes(cropName)) {
      setSelectedCrops(prev => prev.filter(c => c !== cropName));
    } else {
      setSelectedCrops(prev => [...prev, cropName]);
    }
  };

  return (
    <div id="page-auth" className="page active" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="auth-page-navbar">
        <div className="nav-brand" onClick={onBackToHome}>
          <div style={{ width: 34, height: 34, background: 'var(--g5)', borderRadius: 6, border: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="ti ti-shield" aria-hidden="true" style={{ fontSize: 16, color: 'var(--g2)' }}></i></div>
          <div style={{ width: 0.5, height: 30, background: 'var(--border)', margin: '0 4px' }}></div>
          <div className="nav-logo-box"><i className="ti ti-plant-2" aria-hidden="true"></i></div>
          <div><div className="nav-brand-text">Bharat Krishi AI</div><div className="nav-brand-sub">Smart Farming Platform</div></div>
        </div>
        <button onClick={onBackToHome} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 14px', border: '0.5px solid var(--border)', borderRadius: 8, background: 'transparent', color: 'var(--gray)', fontSize: 13, cursor: 'pointer' }}>
          <i className="ti ti-arrow-left" aria-hidden="true"></i> Back to home
        </button>
      </div>

      <div className="auth-wrap">
        <div className="auth-left">
          <div className="al-logo" onClick={onBackToHome}>
            <div className="al-logo-box"><i className="ti ti-plant-2" aria-hidden="true"></i></div>
            <div><div className="al-brand">Bharat Krishi AI</div><div className="al-brand-sub">Smart Farming Platform</div></div>
          </div>
          <div className="al-hero">
            <h3>Welcome back,<br />farmer</h3>
            <p>Your crop recommendations, market prices, and weather forecasts are ready and waiting for you.</p>
            <div className="al-feats">
              <div className="al-feat"><div className="al-feat-dot"><i className="ti ti-chart-bar" aria-hidden="true"></i></div><div className="al-feat-text">Live mandi price predictions</div></div>
              <div className="al-feat"><div className="al-feat-dot"><i className="ti ti-cloud-rain" aria-hidden="true"></i></div><div className="al-feat-text">Hyper-local weather alerts</div></div>
              <div className="al-feat"><div className="al-feat-dot"><i className="ti ti-building-bank" aria-hidden="true"></i></div><div className="al-feat-text">Government scheme eligibility</div></div>
              <div className="al-feat"><div className="al-feat-dot"><i className="ti ti-language" aria-hidden="true"></i></div><div className="al-feat-text">10 Indian languages supported</div></div>
            </div>
          </div>
          <div className="al-testimonial">
            <div className="al-test-text">"Krishi AI helped me double my yield this season. The soil analysis was spot on."</div>
            <div className="al-test-author"><i className="ti ti-user-circle" aria-hidden="true"></i>Raju Reddy · Warangal, Telangana</div>
          </div>
        </div>

        <div className="auth-right">
          {tab === 'login' && (
            <div id="panel-login">
              <div className="tab-row">
                <button className="auth-tab active" onClick={() => setTab('login')}><i className="ti ti-login" aria-hidden="true" style={{ marginRight: 4 }}></i>Sign in</button>
                <button className="auth-tab" onClick={() => { setTab('register'); setRegStep(1); }}><i className="ti ti-user-plus" aria-hidden="true" style={{ marginRight: 4 }}></i>Create account</button>
              </div>
              <div className="form-title">Welcome back</div>
              <div className="form-sub">Sign in to your Krishi AI account</div>

              {loginErr && <div className="alert-err"><i className="ti ti-alert-circle" aria-hidden="true"></i>{loginErr}</div>}

              <div className="field">
                <label><i className="ti ti-device-mobile" aria-hidden="true"></i>Mobile number or email</label>
                <div className="field-wrap">
                  <i className="ti ti-user fi" aria-hidden="true"></i>
                  <input type="text" value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="e.g. 9876543210 or email@example.com" required />
                </div>
              </div>
              <div className="field">
                <label><i className="ti ti-lock" aria-hidden="true"></i>Password</label>
                <div className="field-wrap">
                  <i className="ti ti-key fi" aria-hidden="true"></i>
                  <input type={showLoginPass ? "text" : "password"} value={loginPass} onChange={e => setLoginPass(e.target.value)} placeholder="Enter your password" required />
                  <button type="button" className="eye-btn" onClick={() => setShowLoginPass(!showLoginPass)} aria-label="Toggle password visibility"><i className={showLoginPass ? "ti ti-eye" : "ti ti-eye-off"} aria-hidden="true"></i></button>
                </div>
              </div>

              <button className="btn-main" disabled={loginLoading} onClick={handleLogin}><i className="ti ti-login" aria-hidden="true"></i>{loginLoading ? "Signing in..." : "Sign in"}</button>

              <div className="divider"><span></span><p>or sign in with</p><span></span></div>
              <div className="social-btns">
                <button className="social-auth-btn" onClick={onGuestMode}><i className="ti ti-brand-google" aria-hidden="true" style={{ color: '#ea4335' }}></i>Google</button>
                <button className="social-auth-btn" onClick={onGuestMode}><i className="ti ti-brand-facebook" aria-hidden="true" style={{ color: '#1877f2' }}></i>Facebook</button>
              </div>

              <div className="switch-text">Don't have an account? <a onClick={() => { setTab('register'); setRegStep(1); }}>Register now</a></div>
            </div>
          )}


          {tab === 'register' && (
            <div id="panel-register">
              <div className="tab-row">
                <button className="auth-tab" onClick={() => setTab('login')}><i className="ti ti-login" aria-hidden="true" style={{ marginRight: 4 }}></i>Sign in</button>
                <button className="auth-tab active" onClick={() => { setTab('register'); setRegStep(1); }}><i className="ti ti-user-plus" aria-hidden="true" style={{ marginRight: 4 }}></i>Create account</button>
              </div>

              {regErr && <div className="alert-err"><i className="ti ti-alert-circle" aria-hidden="true"></i>{regErr}</div>}

              {regStep === 1 && (
                <div id="reg-s1">
                  <div className="step-ind"><div className="step-dot active"></div><div className="step-dot"></div><div className="step-dot"></div></div>
                  <div className="form-title">Create your account</div>
                  <div className="form-sub"><i className="ti ti-info-circle" aria-hidden="true" style={{ color: 'var(--g3)', marginRight: 4 }}></i>Step 1 of 3 — Personal details</div>
                  <div className="field-row-2">
                    <div className="field">
                      <label><i className="ti ti-user" aria-hidden="true"></i>First name *</label>
                      <div className="field-wrap"><i className="ti ti-user fi" aria-hidden="true"></i><input type="text" value={rFname} onChange={e => setRFname(e.target.value)} placeholder="First name" required /></div>
                    </div>
                    <div className="field">
                      <label><i className="ti ti-user" aria-hidden="true"></i>Last name</label>
                      <div className="field-wrap"><i className="ti ti-user fi" aria-hidden="true"></i><input type="text" value={rLname} onChange={e => setRLname(e.target.value)} placeholder="Last name" /></div>
                    </div>
                  </div>
                  <div className="field">
                    <label><i className="ti ti-device-mobile" aria-hidden="true"></i>Mobile number *</label>
                    <div className="field-wrap"><i className="ti ti-device-mobile fi" aria-hidden="true"></i><input type="tel" value={rMobile} onChange={e => setRMobile(e.target.value)} placeholder="+91 XXXXX" required /></div>
                  </div>
                  <div className="field">
                    <label><i className="ti ti-mail" aria-hidden="true"></i>Email (optional)</label>
                    <div className="field-wrap"><i className="ti ti-mail fi" aria-hidden="true"></i><input type="email" value={rEmail} onChange={e => setREmail(e.target.value)} placeholder="you@example.com" /></div>
                  </div>
                  <div className="field">
                    <label><i className="ti ti-lock" aria-hidden="true"></i>Password *</label>
                    <div className="field-wrap">
                      <i className="ti ti-key fi" aria-hidden="true"></i>
                      <input type={showRegPass ? "text" : "password"} value={rPass} onChange={e => handlePwInput(e.target.value)} placeholder="Min. 8 characters" required />
                      <button type="button" className="eye-btn" onClick={() => setShowRegPass(!showRegPass)} aria-label="Toggle password"><i className={showRegPass ? "ti ti-eye" : "ti ti-eye-off"} aria-hidden="true"></i></button>
                    </div>
                    <div className="pw-strength"><div className="pw-bar" style={{ width: `${pwStrength}%`, background: pwStrength < 50 ? 'var(--err)' : pwStrength < 75 ? 'var(--gold)' : 'var(--green-light)' }}></div></div>
                    <div className="pw-hint">{pwHint}</div>
                  </div>
                  <button className="btn-main" onClick={handleStep1Submit}><i className="ti ti-arrow-right" aria-hidden="true"></i>Continue</button>
                  <div className="switch-text">Already have an account? <a onClick={() => setTab('login')}>Sign in</a></div>
                </div>
              )}

              {regStep === 2 && (
                <div id="reg-s2">
                  <div className="step-ind"><div className="step-dot done"></div><div className="step-dot active"></div><div className="step-dot"></div></div>
                  <div className="form-title">Your farm details</div>
                  <div className="form-sub"><i className="ti ti-map-pin" aria-hidden="true" style={{ color: 'var(--g3)', marginRight: 4 }}></i>Step 2 of 3 — Personalise your experience</div>
                  <div className="field">
                    <label><i className="ti ti-map" aria-hidden="true"></i>State *</label>
                    <div className="field-wrap">
                      <i className="ti ti-map fi" aria-hidden="true"></i>
                      <select value={rState} onChange={e => setRState(e.target.value)} className="no-icon" style={{ paddingLeft: 36 }}>
                        <option>Telangana</option>
                        <option>Andhra Pradesh</option>
                        <option>Punjab</option>
                        <option>Maharashtra</option>
                        <option>Uttar Pradesh</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label><i className="ti ti-building-community" aria-hidden="true"></i>District / Village</label>
                    <div className="field-wrap"><i className="ti ti-map-pin fi" aria-hidden="true"></i><input type="text" value={rDist} onChange={e => setRDist(e.target.value)} placeholder="e.g. Bowenpally" /></div>
                  </div>
                  <div className="field-row-2">
                    <div className="field">
                      <label><i className="ti ti-ruler" aria-hidden="true"></i>Land size (acres): {rLand}</label>
                      <div className="field-wrap" style={{ display: 'flex', alignItems: 'center', height: 40 }}>
                        <input type="range" min="0.5" max="30" step="0.5" value={rLand} onChange={e => setRLand(+e.target.value)} style={{ padding: 0, border: 'none' }} />
                      </div>
                    </div>
                    <div className="field">
                      <label><i className="ti ti-users" aria-hidden="true"></i>Farmer category</label>
                      <div className="field-wrap">
                        <i className="ti ti-users fi" aria-hidden="true"></i>
                        <select className="no-icon" value={rCategory} onChange={e => setRCategory(e.target.value)} style={{ paddingLeft: 36 }}>
                          <option>Small (&lt;2 acres)</option>
                          <option>Medium (2–10 acres)</option>
                          <option>Large (&gt;10 acres)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button className="btn-main" onClick={handleStep2Submit}><i className="ti ti-arrow-right" aria-hidden="true"></i>Continue</button>
                  <button className="back-btn" onClick={() => setRegStep(1)}><i className="ti ti-arrow-left" aria-hidden="true"></i>Back</button>
                </div>
              )}

              {regStep === 3 && (
                <div id="reg-s3">
                  <div className="step-ind"><div className="step-dot done"></div><div className="step-dot done"></div><div className="step-dot active"></div></div>
                  <div className="form-title">What do you grow?</div>
                  <div className="form-sub"><i className="ti ti-plant" aria-hidden="true" style={{ color: 'var(--g3)', marginRight: 4 }}></i>Step 3 of 3 — Select your main crops</div>
                  
                  <div className="crop-chips">
                    {availableCrops.map(cropName => (
                      <button
                        key={cropName}
                        type="button"
                        className={`crop-chip ${selectedCrops.includes(cropName) ? 'sel' : ''}`}
                        onClick={() => toggleCropChip(cropName)}
                      >
                        <i className="ti ti-plant-2" aria-hidden="true" style={{ fontSize: 13 }}></i>
                        {cropName}
                      </button>
                    ))}
                  </div>
                  
                  <button className="btn-main" disabled={regLoading} onClick={handleRegisterSubmit}><i className="ti ti-user-plus" aria-hidden="true"></i>{regLoading ? "Registering..." : "Create Account"}</button>
                  <button className="back-btn" onClick={() => setRegStep(2)}><i className="ti ti-arrow-left" aria-hidden="true"></i>Back</button>
                </div>
              )}

              {regStep === 'success' && (
                <div className="success-wrap">
                  <div className="success-circle"><i className="ti ti-circle-check" aria-hidden="true"></i></div>
                  <div className="form-title">Registration Successful!</div>
                  <div className="form-sub" style={{ marginTop: 8 }}>Welcome to Bharat Krishi AI, <strong>{rFname}</strong>. Your account has been securely initialized.</div>
                  <div className="quick-tip">
                    <strong><i className="ti ti-bulb" aria-hidden="true"></i>Quick tip</strong>
                    Complete your first soil analysis test from the dashboard to unlock personalized fertilizer dosage and crop recommendations.
                  </div>
                  <button className="btn-main" style={{ marginTop: 20 }} onClick={handleSuccessProceed}><i className="ti ti-rocket" aria-hidden="true"></i>Proceed to dashboard</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD PAGE ─────────────────────────────────────────────
function DashboardPage({ onNavigate, user }) {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const nameLabel = user ? user.name : (language === 'hi' ? 'अतिथि किसान' : language === 'te' ? 'అతిథి రైతు' : language === 'ta' ? 'விருந்தினர் விவசாயி' : 'Guest Farmer')
  return (
    <>
      {/* Hero Banner */}
      <div className="hero" role="banner">
        <div className="hero-particles" aria-hidden="true">
          <span className="particle" style={{ top: '20%', left: '10%', animationDelay: '0s' }}>🌿</span>
          <span className="particle" style={{ top: '60%', left: '80%', animationDelay: '1s' }}>🌾</span>
          <span className="particle" style={{ top: '30%', left: '70%', animationDelay: '2s' }}>🍃</span>
          <span className="particle" style={{ top: '70%', left: '20%', animationDelay: '1.5s' }}>🌱</span>
        </div>
        <div className="hero-greeting">{t('goodMorning')}, {nameLabel} 🌅</div>
        <div className="hero-sub">{t('fieldsReady')}</div>
        <div className="hero-meta">
          <span>📍 {user?.state || (language === 'hi' ? 'हैदराबाद, तेलंगाना' : language === 'te' ? 'హైదరాబాద్, తెలంగాణ' : language === 'ta' ? 'ஹைதராபாத், தெலுங்கானா' : 'Hyderabad, Telangana')}</span>
          <span>🌡️ 32°C {language === 'hi' ? 'धूप' : language === 'te' ? 'ఎండగా' : language === 'ta' ? 'வெயில்' : 'Sunny'}</span>
          <span>💧 42% RH</span>
          <span>🌬️ 18 km/h NE</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-row">
        <div className="kpi-card" onClick={() => onNavigate('crop')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon">🌱</div>
          <div className="kpi-label">{t('recommendation')}</div>
          <div className="kpi-value kpi-up">{t('ready')}</div>
          <div className="kpi-sub">{language === 'hi' ? 'चावल आज अनुकूल है' : language === 'te' ? 'ఈరోజు వరి అనుకూలం' : language === 'ta' ? 'இன்று நெல் உகந்தது' : 'Rice optimal today'}</div>
        </div>
        <div className="kpi-card" onClick={() => onNavigate('market')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon">💹</div>
          <div className="kpi-label">{language === 'hi' ? 'गेहूं की कीमत' : language === 'te' ? 'గోధుమ ధర' : language === 'ta' ? 'கோதுமை விலை' : 'Wheat Price'}</div>
          <div className="kpi-value">₹2,050<span style={{ fontSize: 12 }}>/q</span></div>
          <div className="kpi-sub kpi-up">↑ 0.8% {language === 'hi' ? 'इस सप्ताह' : language === 'te' ? 'ఈ వారం' : language === 'ta' ? 'இந்த வாரம்' : 'this week'}</div>
        </div>
        <div className="kpi-card" onClick={() => onNavigate('weather')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon">🌦️</div>
          <div className="kpi-label">{t('nextRain')}</div>
          <div className="kpi-value" style={{ color: 'var(--blue)' }}>{language === 'hi' ? '3 दिन' : language === 'te' ? '3 రోజులు' : language === 'ta' ? '3 நாட்கள்' : '3 days'}</div>
          <div className="kpi-sub">80% {language === 'hi' ? 'संभावना' : language === 'te' ? 'అవకాశం' : language === 'ta' ? 'சம்பவத்தகவு' : 'probability'}</div>
        </div>
        <div className="kpi-card" onClick={() => onNavigate('disease')} style={{ cursor: 'pointer' }}>
          <div className="kpi-icon">⚠️</div>
          <div className="kpi-label">{t('activeAlerts')}</div>
          <div className="kpi-value kpi-alert">2</div>
          <div className="kpi-sub">{t('blightRisk')}</div>
        </div>
      </div>

      {/* AI Modules */}
      <div className="section-title">{t('aiModules')}</div>
      <div className="modules-grid">
        {[
          { id: 'crop', icon: '🌱', bg: 'linear-gradient(135deg,#d8f3dc,#b7e4c7)', title: t('crop'), desc: language === 'hi' ? 'अपनी मिट्टी और जलवायु के अनुकूल सर्वोत्तम फसल खोजें' : language === 'te' ? 'మీ నేల & వాతావరణ పరిస్థితులకు ఉత్తమమైన పంటను కనుగొనండి' : language === 'ta' ? 'உங்கள் மண் மற்றும் காலநிலைக்கு ஏற்ற சிறந்த பயிரைக் கண்டறியவும்' : 'Find the best crop for your soil & climate conditions', action: t('tryNow'), tag: t('popular') },
          { id: 'disease', icon: '🦠', bg: 'linear-gradient(135deg,#fde8e8,#fca5a5)', title: t('disease'), desc: language === 'hi' ? 'तत्काल एआई रोग पहचान के लिए पत्ती की फोटो अपलोड करें' : language === 'te' ? 'తక్షణ AI వ్యాధి గుర్తింపు కోసం ఆకు ఫోటోను అప్‌లోడ్ చేయండి' : language === 'ta' ? 'உடனடி AI நோய் கண்டறிதலுக்கு இலை புகைப்படத்தைப் பதிவேற்றவும்' : 'Upload leaf photo for instant AI disease detection', action: t('scanLeaf') },
          { id: 'soil', icon: '🪱', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', title: t('soil'), desc: language === 'hi' ? 'पोषक तत्व गेज, स्वास्थ्य स्कोर और उर्वरक गाइड' : language === 'te' ? 'పోషక స్థాయిలు, ఆరోగ్య స్కోరు మరియు ఎరువుల గైడ్' : language === 'ta' ? 'ஊட்டச்சத்து அளவீடுகள், சுகாதார மதிப்பெண் மற்றும் உர வழிகாட்டி' : 'Nutrient gauges, health score, fertilizer guide', action: t('analyze') },
          { id: 'yield', icon: '📈', bg: 'linear-gradient(135deg,#dbeafe,#93c5fd)', title: t('yield'), desc: language === 'hi' ? 'एमएल-संचालित पूर्वानुमान के साथ फसल उत्पादन का अनुमान लगाएं' : language === 'te' ? 'ML-ఆధారిత అంచనాలతో పంట దిగుబడిని అంచనా వేయండి' : language === 'ta' ? 'ML-இயங்கும் கணிப்புகளுடன் பயிர் விளைச்சலை முன்கூட்டியே கணிக்கவும்' : 'Predict harvest output with ML-powered forecasting', action: t('predict') },
          { id: 'market', icon: '💹', bg: 'linear-gradient(135deg,#ede9fe,#c4b5fd)', title: t('market'), desc: language === 'hi' ? '12 महीने का मूल्य पूर्वानुमान और मंडी तुलना' : language === 'te' ? '12 నెలల ధరల అంచనా + మండి పోలిక' : language === 'ta' ? '12 மாத விலை முன்னறிவிப்பு + மண்டி ஒப்பீடு' : '12-month price forecast + mandi comparison', action: t('viewPrices') },
          { id: 'weather', icon: '🌦️', bg: 'linear-gradient(135deg,#e0f2fe,#7dd3fc)', title: t('weather'), desc: language === 'hi' ? 'कृषि सलाह और अलर्ट के साथ 7 दिवसीय मौसम पूर्वानुमान' : language === 'te' ? 'వ్యవసాయ సలహాలు & హెచ్చరికలతో 7 రోజుల వాతావరణం' : language === 'ta' ? 'விவசாய ஆலோசனைகள் மற்றும் விழிப்பூட்டல்களுடன் 7 நாள் வானிலை' : '7-day forecast with farming advice & alerts', action: t('seeForecast') },
          { id: 'rotation', icon: '🔁', bg: 'linear-gradient(135deg,#ccfbf1,#5eead4)', title: t('rotation'), desc: language === 'hi' ? 'मृदा स्वास्थ्य के लिए फसल चक्र अनुसूची की योजना बनाएं' : language === 'te' ? 'నేల ఆరోగ్యం కోసం పంట మార్పిడి ప్రణాళికను సిద్ధం చేయండి' : language === 'ta' ? 'மண் ஆரோக்கியத்திற்காக பயிர் சுழற்சி அட்டவணையைத் திட்டமிடுங்கள்' : 'Plan rotation schedule for soil health', action: t('plan') },
          { id: 'schemes', icon: '🏛️', bg: 'linear-gradient(135deg,#ffedd5,#fed7aa)', title: t('schemes'), desc: language === 'hi' ? 'योजना पात्रता की जांच और आवेदन ट्रैकर' : language === 'te' ? 'పథకం అర్హత తనిఖీ & దరఖాస్తు ట్రాకర్' : language === 'ta' ? 'திட்ட தகுதி சரிபார்ப்பு மற்றும் விண்ணப்ப கண்காணிப்பு' : 'Eligibility check & application tracker', action: t('checkNow'), tag: language === 'hi' ? '3 नया' : language === 'te' ? '3 కొత్తవి' : language === 'ta' ? '3 புதியது' : '3 new' },
          { id: 'chatbot', icon: '🤖', bg: 'linear-gradient(135deg,#fce7f3,#f9a8d4)', title: t('chatbot'), desc: language === 'hi' ? 'हिंदी, तेलुगु, तमिल और अंग्रेजी में कुछ भी पूछें' : language === 'te' ? 'తెలుగు, హిందీ, తమిళం మరియు ఇంగ్లీషులో ఏదైనా అడగండి' : language === 'ta' ? 'தமிழ், இந்தி, தெலுங்கு மற்றும் ஆங்கிலத்தில் எது வேண்டுமானாலும் கேளுங்கள்' : 'Ask anything in Hindi, Telugu, Tamil & more', action: t('chatNow') },
        ].map((m, i) => (
          <div key={i} className="module-card" onClick={() => m.id && onNavigate(m.id)} tabIndex={0} role="button">
            <div className="module-icon-wrap" style={{ background: m.bg }}>{m.icon}</div>
            {m.tag && <div className="module-tag">{m.tag}</div>}
            <div className="module-title">{m.title}</div>
            <div className="module-desc">{m.desc}</div>
            <div className="module-action">→ {m.action}</div>
          </div>
        ))}
      </div>

      {/* Bottom Row */}
      <div className="bottom-row">
        <div className="chart-card">
          <div className="chart-header">
            <div className="section-title">{t('liveMarketPrices')}</div>
            <div className="tab-bar" style={{ width: 'auto', marginBottom: 0 }}>
              <button className="tab-btn active" style={{ fontSize: 11, padding: '4px 10px' }}>{language === 'hi' ? 'चावल' : language === 'te' ? 'వరి' : language === 'ta' ? 'நெல்' : 'Rice'}</button>
            </div>
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-dot" style={{ background: '#2d6a4f' }} />{language === 'hi' ? 'चावल (₹/q)' : language === 'te' ? 'వరి (₹/q)' : language === 'ta' ? 'நெல் (₹/q)' : 'Rice (₹/q)'}</span>
          </div>
          <MarketChart data={[1800, 1850, 1830, 1890, 1920, 1900, 1950, 1980, 2010, 1990, 2020, 2040, 2030, 2010, 2040, 2060, 2050, 2080, 2100]} />
        </div>

        <div className="weather-card">
          <div className="chart-header">
            <div className="section-title">{t('fiveDayForecast')}</div>
            <span style={{ fontSize: 12, color: 'var(--green)' }}>📍 {language === 'hi' ? 'हैदराबाद' : language === 'te' ? 'హైదరాబాద్' : language === 'ta' ? 'ஹைதராபாத்' : 'Hyderabad'}</span>
          </div>
          <div className="weather-main">
            <div style={{ fontSize: 40, marginBottom: 4 }}>⛅</div>

            <div className="weather-temp">32°C</div>
            <div className="weather-cond">Partly Cloudy</div>
          </div>
          <div className="weather-days">
            {[
              { day: 'Mon', icon: '⛅', temp: '32°' },
              { day: 'Tue', icon: '🌧️', temp: '28°' },
              { day: 'Wed', icon: '☀️', temp: '35°' },
              { day: 'Thu', icon: '⛅', temp: '31°' },
              { day: 'Fri', icon: '🌧️', temp: '27°' },
            ].map(d => (
              <div key={d.day} className="day-card">
                <div className="day-name">{d.day}</div>
                <div className="day-icon">{d.icon}</div>
                <div className="day-temp">{d.temp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// ─── CROP RECOMMENDATION PAGE ───────────────────────────────────
function CropPage() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const [n, setN] = useState(80)
  const [p, setP] = useState(45)
  const [k, setK] = useState(60)
  const [ph, setPh] = useState(6.5)
  const [temp, setTemp] = useState(28)
  const [hum, setHum] = useState(65)
  const [rainfall, setRainfall] = useState(150)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handlePredict = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('/api/crop/predict', {
        nitrogen: n,
        phosphorus: p,
        potassium: k,
        ph: ph,
        temperature: temp,
        humidity: hum,
        rainfall: rainfall
      })
      setResult(res.data)
    } catch (err) {
      console.error(err)
      setError('Prediction failed. Ensure API is running.')
    } finally {
      setLoading(false)
    }
  }

  const getOffset = (pct) => {
    const r = 52;
    const c = 2 * Math.PI * r;
    return c - (c * (pct || 0)) / 100;
  }

  return (
    <>
      <div className="section-title" style={{ fontSize: 18 }}>🌱 {t('crop')}</div>
      <div className="two-col">
        <div className="input-panel">
          <div className="form-label">{t('soilNutrientsParams')}</div>
          <div className="nutrient-row">
            <div className="nutrient-box">
              <div className="nutrient-name">{t('nitrogen')}</div>
              <div className="nutrient-val" style={{ color: '#16a34a' }}>{n}</div>
            </div>
            <div className="nutrient-box">
              <div className="nutrient-name">{t('phosphorus')}</div>
              <div className="nutrient-val" style={{ color: '#f59e0b' }}>{p}</div>
            </div>
            <div className="nutrient-box">
              <div className="nutrient-name">{t('potassium')}</div>
              <div className="nutrient-val" style={{ color: '#3b82f6' }}>{k}</div>
            </div>
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('nLabel')}</span><span>{n}</span></div>
            <input type="range" min="0" max="200" value={n} onChange={e => setN(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('pLabel')}</span><span>{p}</span></div>
            <input type="range" min="0" max="200" value={p} onChange={e => setP(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('kLabel')}</span><span>{k}</span></div>
            <input type="range" min="0" max="200" value={k} onChange={e => setK(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('phLevel')}</span><span>{ph.toFixed(1)}</span></div>
            <input type="range" min="4" max="9" step="0.1" value={ph} onChange={e => setPh(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('tempLabel')}</span><span>{temp}</span></div>
            <input type="range" min="10" max="50" value={temp} onChange={e => setTemp(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('humLabel')}</span><span>{hum}</span></div>
            <input type="range" min="20" max="100" value={hum} onChange={e => setHum(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('rainLabel')}</span><span>{rainfall}</span></div>
            <input type="range" min="30" max="300" value={rainfall} onChange={e => setRainfall(+e.target.value)} />
          </div>
          <button onClick={handlePredict} className="btn-primary">🔍 {t('getRecommendation')}</button>
        </div>

        <div className="result-panel">
          {error && <div style={{ color: 'var(--err)', fontSize: 13, marginBottom: 10 }}>{error}</div>}
          {loading && <div style={{ textAlign: 'center', padding: 40 }}>{t('runningAiModels')}</div>}
          {!result && !loading && (
            <div style={{ textAlign: 'center', color: 'var(--gray)', padding: '120px 10px' }}>
              {t('adjustInputsToAnalyze')}
            </div>
          )}
          {result && !loading && (
            <>
              <div className="form-label" style={{ textAlign: 'center' }}>{t('aiRecommendation')}</div>
              <div className="confidence-ring-wrap">
                <div className="confidence-ring">
                  <svg width="120" height="120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--green-pale)" strokeWidth="10" />
                    <circle cx="60" cy="60" r="52" fill="none" stroke="var(--green)" strokeWidth="10"
                      strokeDasharray="326.7" strokeDashoffset={getOffset(result.confidence)} strokeLinecap="round"
                      transform="rotate(-90 60 60)" />
                  </svg>
                  <div className="ring-text">
                    <span className="ring-pct">{result.confidence}%</span>
                    <span className="ring-label">{t('confidence')}</span>
                  </div>
                </div>
                <div className="crop-result-name">{result.emoji} {result.recommended_crop?.toUpperCase()}</div>
              </div>

              <div className="form-label">{t('alternativeCrops')}</div>
              <div className="alt-crops">
                {result.alternatives?.map((c, i) => (
                  <div key={i} className="alt-crop-row">
                    <span style={{ fontSize: 13, width: 90 }}>{c.emoji} {c.crop}</span>
                    <div className="alt-bar-wrap"><div className="alt-bar" style={{ width: `${c.confidence}%` }} /></div>
                    <span className="alt-pct">{c.confidence}%</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

// ─── DISEASE PAGE ───────────────────────────────────────────────
function DiseasePage() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const triggerDetection = async (selectedFile) => {
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const res = await axios.post('/api/disease/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to scan leaf image. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      triggerDetection(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null);
      triggerDetection(selectedFile);
    }
  };

  return (
    <>
      <div className="section-title" style={{ fontSize: 18 }}>🦠 {t('disease')}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div
          className="upload-zone"
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          tabIndex={0}
          role="button"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          {previewUrl ? (
            <img src={previewUrl} alt="Leaf preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          ) : (
            <>
              <div style={{ fontSize: 48 }}>📷</div>
              <div style={{ fontWeight: 600, color: 'var(--green)', fontSize: 14 }}>{t('dropLeafImage')}</div>
              <div style={{ fontSize: 12, color: 'var(--gray)' }}>{t('tapToCapture')}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button className="btn-sm btn-green" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>📁 {t('uploadBtn')}</button>
                <button className="btn-sm btn-outline" onClick={(e) => e.stopPropagation()}>📷 {t('cameraBtn')}</button>
              </div>
            </>
          )}
        </div>
        <div className="result-panel">
          <div className="form-label" style={{ marginBottom: 10 }}>{t('detectionResult')}</div>
          {error && <div style={{ color: 'var(--err)', fontSize: 13, padding: 10 }}>{error}</div>}
          {loading && <div style={{ textAlign: 'center', padding: 20 }}>{t('runningCnnClassification')}</div>}
          {!result && !loading && !error && (
            <div style={{ textAlign: 'center', color: 'var(--gray)', padding: 40 }}>
              {t('uploadLeafToDiagnose')}
            </div>
          )}
          {result && !loading && (
            <>
              <div style={{ background: 'var(--page-bg)', borderRadius: 10, padding: 14, marginBottom: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: result.is_healthy ? 'var(--green)' : '#dc2626', marginBottom: 4 }}>
                  🦠 {result.disease} ({result.scientific_name})
                </div>
                <span style={{
                  background: result.is_healthy ? 'var(--green-pale)' : '#fef2f2',
                  color: result.is_healthy ? 'var(--green)' : '#dc2626',
                  fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 500
                }}>
                  {result.severity_label} Severity · {result.confidence}% Match
                </span>
                <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 8, lineHeight: 1.6 }}>
                  {result.symptoms}
                </div>
              </div>
              <div className="form-label">{t('treatmentSteps')}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {result.treatment.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12 }}>
                    <span style={{ background: 'var(--green)', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div className="advice-banner" style={{ marginTop: 12, fontSize: 11 }}>
                🛡️ <strong>{t('preventionLabel')}:</strong> {result.prevention}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

// ─── SOIL PAGE ──────────────────────────────────────────────────
function SoilPage() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const [n, setN] = useState(80);
  const [p, setP] = useState(22);
  const [k, setK] = useState(60);
  const [ph, setPh] = useState(6.5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/soil/predict', {
        nitrogen: n,
        phosphorus: p,
        potassium: k,
        ph: ph
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Soil analysis failed. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const getOffsetForNutrient = (val, max = 100) => {
    const cap = Math.min(val, max);
    return 201 - (201 * cap) / max;
  };

  const getDials = () => {
    if (result) {
      return [
        { name: t('nitrogen'), val: `${result.nutrients.nitrogen.level} mg/kg`, color: result.nutrients.nitrogen.color, offset: getOffsetForNutrient(result.nutrients.nitrogen.level, 120), status: result.nutrients.nitrogen.status, cls: result.nutrients.nitrogen.cls },
        { name: t('phosphorus'), val: `${result.nutrients.phosphorus.level} mg/kg`, color: result.nutrients.phosphorus.color, offset: getOffsetForNutrient(result.nutrients.phosphorus.level, 80), status: result.nutrients.phosphorus.status, cls: result.nutrients.phosphorus.cls },
        { name: t('potassium'), val: `${result.nutrients.potassium.level} mg/kg`, color: result.nutrients.potassium.color, offset: getOffsetForNutrient(result.nutrients.potassium.level, 100), status: result.nutrients.potassium.status, cls: result.nutrients.potassium.cls },
        { name: t('phLevel'), val: result.nutrients.ph.level, color: result.nutrients.ph.color, offset: getOffsetForNutrient(result.nutrients.ph.level, 14), status: result.nutrients.ph.status, cls: result.nutrients.ph.cls },
      ];
    }
    return [
      { name: t('nitrogen'), val: '80 mg/kg', color: '#2d6a4f', offset: getOffsetForNutrient(80, 120), status: 'Optimal', cls: 'status-good' },
      { name: t('phosphorus'), val: '22 mg/kg', color: '#e63946', offset: getOffsetForNutrient(22, 80), status: 'Low', cls: 'status-low' },
      { name: t('potassium'), val: '60 mg/kg', color: '#f59e0b', offset: getOffsetForNutrient(60, 100), status: 'Moderate', cls: 'status-ok' },
      { name: t('phLevel'), val: '6.5', color: '#3b82f6', offset: getOffsetForNutrient(6.5, 14), status: 'Optimal', cls: 'status-good' },
    ];
  };

  const score = result ? result.health_score : 74;
  const healthLabel = result ? result.health_label : 'Good';
  const healthAdvice = result ? result.health_advice : 'Soil is in good condition. Low phosphorus needs attention.';
  const fertilizers = result ? result.fertilizers : [
    { name: "Single Super Phosphate (SSP)", dose: "50 kg/acre", when: "Before sowing", method: "Broadcast + mix", priority: "High" },
    { name: "Urea (Nitrogen)", dose: "40 kg/acre", when: "30 days after sowing", method: "Top dressing", priority: "Medium" },
    { name: "Muriate of Potash (MOP)", dose: "20 kg/acre", when: "At sowing", method: "Basal application", priority: "Medium" }
  ];

  return (
    <>
      <div className="section-title" style={{ fontSize: 18 }}>🪱 {t('soil')}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12, marginBottom: 12 }}>
        <div className="input-panel">
          <div className="form-label">{t('soilNutrientInputs')}</div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('nitrogen')} (mg/kg)</span><span>{n}</span></div>
            <input type="range" min="0" max="150" value={n} onChange={e => setN(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('phosphorus')} (mg/kg)</span><span>{p}</span></div>
            <input type="range" min="0" max="100" value={p} onChange={e => setP(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('potassium')} (mg/kg)</span><span>{k}</span></div>
            <input type="range" min="0" max="120" value={k} onChange={e => setK(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('phLevel')}</span><span>{ph.toFixed(1)}</span></div>
            <input type="range" min="3" max="11" step="0.1" value={ph} onChange={e => setPh(+e.target.value)} />
          </div>
          <button onClick={handleAnalyze} className="btn-primary">🪱 {t('analyzeSoilQuality')}</button>
        </div>

        <div className="soil-score-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>{t('soilHealthIndex')}</div>
          {loading ? (
            <div style={{ fontSize: 24, fontWeight: 500, margin: '20px 0' }}>{t('loading')}</div>
          ) : (
            <>
              <div className="soil-score-num">{score}</div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{t('outOf100')} ({healthLabel})</div>
              <div style={{ marginTop: 12, fontSize: 11, opacity: 0.85, maxWidth: 200, lineHeight: 1.4 }}>{healthAdvice}</div>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
        <div className="soil-gauges" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {getDials().map((g, idx) => (
            <div key={idx} className="gauge-card">
              <div className="gauge-wrap">
                <svg viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="var(--green-pale)" strokeWidth="8" />
                  <circle cx="40" cy="40" r="32" fill="none" stroke={g.color} strokeWidth="8"
                    strokeDasharray="201" strokeDashoffset={g.offset} strokeLinecap="round" transform="rotate(-90 40 40)" />
                  <text x="40" y="44" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--charcoal)" fontFamily="var(--font-data)">{g.val}</text>
                </svg>
              </div>
              <div className="gauge-name" style={{ minHeight: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{g.name}</div>
              <span className={`gauge-status ${g.cls}`}>{g.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fert-table" style={{ marginTop: 12 }}>
        <div className="section-title" style={{ marginBottom: 10 }}>{t('fertilizerRecs')}</div>
        {error && <div style={{ color: 'var(--err)', fontSize: 12 }}>{error}</div>}
        <table className="fert">
          <thead><tr><th>{t('fertilizerTh')}</th><th>{t('doseTh')}</th><th>{t('whenTh')}</th><th>{t('methodTh')}</th><th>{t('priorityTh')}</th></tr></thead>
          <tbody>
            {fertilizers.map((f, i) => (
              <tr key={i}>
                <td>{f.name}</td>
                <td>{f.dose}</td>
                <td>{f.when}</td>
                <td>{f.method}</td>
                <td>
                  <span className={`gauge-status ${f.priority === 'High' ? 'status-low' : f.priority === 'Medium' ? 'status-ok' : 'status-good'}`}>
                    {f.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ─── YIELD PAGE ─────────────────────────────────────────────────
function YieldPage() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const [state, setState] = useState('Telangana')
  const [crop, setCrop] = useState('Rice')
  const [area, setArea] = useState(5)
  const [rainfall, setRainfall] = useState(120)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handlePredict = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('/api/yield/predict', {
        state: state,
        crop: crop,
        area: area,
        rainfall: rainfall
      })
      setResult(res.data)
    } catch (err) {
      console.error(err)
      setError('Yield prediction failed. Check API connection.')
    } finally {
      setLoading(false)
    }
  }

  const defaultHistory = [
    { year: '2024', yield_per_acre: 23.2 },
    { year: '2023', yield_per_acre: 22.8 },
    { year: '2022', yield_per_acre: 21.5 },
    { year: '2021', yield_per_acre: 20.1 },
  ]
  const history = result ? result.history : defaultHistory;
  const totalYield = result ? result.total_yield : 122.5;
  const yieldPerAcre = result ? result.predicted_yield_per_acre : 24.5;
  const estimatedRevenue = result ? result.estimated_revenue : 257250;
  const tips = result ? result.tips : [
    "Optimal rainfall for Rice in Telangana is 100-200mm",
    "Use certified seeds for 10-15% higher yield",
    "Timely sowing increases yield by up to 20%"
  ];

  return (
    <>
      <div className="section-title" style={{ fontSize: 18 }}>📈 {t('yield')}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div className="input-panel">
          <div className="form-label" style={{ marginBottom: 8 }}>{t('predictionParams')}</div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('stateLabel')}</span></div>
            <select value={state} onChange={e => setState(e.target.value)} style={{ width: '100%', background: 'var(--page-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: 7, fontSize: 13, color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
              <option>Telangana</option>
              <option>Andhra Pradesh</option>
              <option>Punjab</option>
              <option>Maharashtra</option>
              <option>Uttar Pradesh</option>
            </select>
          </div>
          <div className="slider-row" style={{ marginTop: 10 }}>
            <div className="slider-label"><span>{t('cropLabel')}</span></div>
            <select value={crop} onChange={e => setCrop(e.target.value)} style={{ width: '100%', background: 'var(--page-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: 7, fontSize: 13, color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Maize</option>
              <option>Sugarcane</option>
              <option>Cotton</option>
            </select>
          </div>
          <div className="slider-row" style={{ marginTop: 10 }}>
            <div className="slider-label"><span>{t('areaLabel')}</span><span>{area}</span></div>
            <input type="range" min="1" max="50" value={area} onChange={e => setArea(+e.target.value)} />
          </div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('avgRainLabel')}</span><span>{rainfall}</span></div>
            <input type="range" min="50" max="300" value={rainfall} onChange={e => setRainfall(+e.target.value)} />
          </div>
          <button onClick={handlePredict} className="btn-primary">📈 {t('predictYieldBtn')}</button>
        </div>
        <div>
          <div className="yield-result">
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>{t('predictedYieldPerAcre')}</div>
            {loading ? (
              <div style={{ fontSize: 24, fontWeight: 500, margin: '20px 0' }}>{t('loading')}</div>
            ) : (
              <>
                <div className="yield-num">{yieldPerAcre}</div>
                <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>{t('quintalsPerAcre')}</div>
                <div style={{ marginTop: 12, fontSize: 12, opacity: 0.85 }}>
                  {t('totalHarvest')}: <strong>{totalYield} quintals</strong> on {area} acres.<br/>
                  {t('estimatedRevenue')}: <strong>₹{estimatedRevenue.toLocaleString('en-IN')}</strong>
                </div>
              </>
            )}
          </div>
          
          <div className="input-panel" style={{ marginTop: 12 }}>
            <div className="form-label">{t('historicalYieldTitle')}</div>
            {error && <div style={{ color: 'var(--err)', fontSize: 12 }}>{error}</div>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {history.map(y => (
                <div key={y.year} className="alt-crop-row">
                  <span style={{ fontSize: 12, width: 40, color: 'var(--gray)' }}>{y.year}</span>
                  <div className="alt-bar-wrap">
                    <div className="alt-bar" style={{ width: `${(y.yield_per_acre / 35) * 100}%` }} />
                  </div>
                  <span className="alt-pct" style={{ width: 40, textAlign: 'right' }}>{y.yield_per_acre}</span>
                </div>
              ))}
            </div>
          </div>
          
          {result && (
            <div className="advice-banner" style={{ marginTop: 12, fontSize: 11, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 600 }}>💡 {t('productionTips')}:</span>
              <ul style={{ margin: '4px 0 0 16px', padding: 0, listStyleType: 'disc' }}>
                {tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

// ─── MARKET PAGE ────────────────────────────────────────────────
function MarketPage() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const [crop, setCrop] = useState('Rice');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchMarketPrice = async (selectedCrop) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/market/predict', { crop: selectedCrop });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Market data fetch failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketPrice(crop);
  }, [crop]);

  const otherCrops = [
    { icon: '🌾', label: 'Rice', value: '₹2,100/q', sub: '↑ 2.1%', cls: 'kpi-up' },
    { icon: '🌿', label: 'Wheat', value: '₹2,050/q', sub: '↑ 0.8%', cls: 'kpi-up' },
    { icon: '🧅', label: 'Onion', value: '₹3,400/q', sub: '↓ 1.4%', cls: 'kpi-alert' },
    { icon: '🍅', label: 'Tomato', value: '₹2,650/q', sub: '↑ 3.2%', cls: 'kpi-up' },
  ];

  const getKPIs = () => {
    if (result) {
      const iconMap = { Rice: '🌾', Wheat: '🌿', Onion: '🧅', Tomato: '🍅', Maize: '🌽', Sugarcane: '🎋', Cotton: '☁️' };
      const currentCropKPI = {
        icon: iconMap[result.crop] || '🌱',
        label: result.crop,
        value: `${result.price_unit}${result.current_price.toLocaleString('en-IN')}/q`,
        sub: `${result.trend_direction === 'up' ? '↑' : result.trend_direction === 'down' ? '↓' : '→'} ${Math.abs(result.trend_pct)}%`,
        cls: result.trend_direction === 'up' ? 'kpi-up' : result.trend_direction === 'down' ? 'kpi-alert' : ''
      };
      
      return otherCrops.map(item => {
        if (item.label.toLowerCase() === result.crop.toLowerCase()) {
          return currentCropKPI;
        }
        return item;
      });
    }
    return otherCrops;
  };

  const mandiPrices = result ? result.mandi_prices : [
    { mandi: 'Begumpet APMC', distance: '12 km', price: 2180, recommendation: '✓ Best Price' },
    { mandi: 'Bowenpally',     distance: '18 km', price: 2100, recommendation: '' },
    { mandi: 'Kukatpally',     distance: '24 km', price: 2050, recommendation: '' }
  ];

  const history = result ? result.history_30_days : [18,20,19,21,22,20,21,23,22,21,20,22,24,23,22,21,23,25,24,22,21,23,22,24,25,23,22,21,23,24];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="section-title" style={{ fontSize: 18, margin: 0 }}>💹 {t('market')}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--gray)' }}>{t('selectCrop')}</span>
          <select value={crop} onChange={e => setCrop(e.target.value)} style={{ background: 'var(--card-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: '4px 8px', fontSize: 12, color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
            <option>Rice</option>
            <option>Wheat</option>
            <option>Onion</option>
            <option>Tomato</option>
            <option>Maize</option>
            <option>Sugarcane</option>
            <option>Cotton</option>
          </select>
        </div>
      </div>
      
      {error && <div style={{ color: 'var(--err)', fontSize: 13 }}>{error}</div>}
      
      <div className="kpi-row">
        {getKPIs().map(k => (
          <div key={k.label} className="kpi-card">
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className={`kpi-sub ${k.cls}`}>{k.sub}</div>
          </div>
        ))}
      </div>
      
      <div className="chart-card">
        <div className="chart-header">
          <div className="section-title">{crop} {t('priceTrendsTitle')}</div>
          {loading && <span style={{ fontSize: 11, color: 'var(--gray)' }}>{t('loading')}</span>}
        </div>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-dot" style={{ background: 'var(--green)' }} />
            {crop} {t('mandiPriceLabel')}
          </span>
        </div>
        <MarketChart data={history} />
      </div>
      
      <div className="input-panel">
        <div className="section-title" style={{ marginBottom: 10 }}>{t('nearestMandiPrices')} {crop}</div>
        <table className="fert">
          <thead>
            <tr>
              <th>{t('mandiNameTh')}</th>
              <th>{t('distanceTh')}</th>
              <th>{t('priceTh')}</th>
              <th>{t('compActionTh')}</th>
            </tr>
          </thead>
          <tbody>
            {mandiPrices.map((m, i) => (
              <tr key={i}>
                <td>{m.mandi}</td>
                <td>{m.distance}</td>
                <td style={{ color: m.recommendation ? '#16a34a' : 'inherit', fontWeight: m.recommendation ? 600 : 'inherit' }}>
                  ₹{m.price.toLocaleString('en-IN')}
                </td>
                <td>
                  {m.recommendation ? (
                    <span className="eligible-badge">{m.recommendation}</span>
                  ) : (
                    <span style={{ fontSize: 11, color: 'var(--gray)' }}>{t('averageRateLabel')}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ─── WEATHER PAGE ───────────────────────────────────────────────
function WeatherPage() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const [location, setLocation] = useState('Hyderabad');
  const [search, setSearch] = useState('Hyderabad');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (locName) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/weather/predict', { location: locName });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Weather forecast failed. Check API connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(search);
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      setSearch(location);
    }
  };

  const currentTemp = result ? result.current_temp : 32;
  const condition = result ? result.condition : 'Partly Cloudy';
  const humidity = result ? result.humidity : 42;
  const wind = result ? result.wind_speed : 18;
  const feelsLike = result ? result.feels_like : 35;
  const advice = result ? result.advice : '⚠️ Moderate heat expected. Irrigate crops early morning or late evening. Avoid midday spraying.';
  const forecast = result ? result.forecast : [
    { day: 'Monday', icon: '⛅', temp: '32°/24°', rain: '10%', advice: 'Good for field work' },
    { day: 'Tuesday', icon: '🌧️', temp: '28°/22°', rain: '80%', advice: 'Delay spraying' },
    { day: 'Wednesday', icon: '☀️', temp: '35°/25°', rain: '5%', advice: 'Irrigate early' },
    { day: 'Thursday', icon: '⛅', temp: '31°/23°', rain: '20%', advice: 'Ideal for sowing' },
    { day: 'Friday', icon: '🌧️', temp: '27°/21°', rain: '75%', advice: 'Ensure drainage' },
  ];

  const getConditionIcon = (cond) => {
    const c = cond.toLowerCase();
    if (c.includes('rain') || c.includes('drizzle')) return '🌧️';
    if (c.includes('storm') || c.includes('thunder')) return '⛈️';
    if (c.includes('cloudy') || c.includes('overcast')) return '⛅';
    if (c.includes('snow')) return '❄️';
    return '☀️';
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="section-title" style={{ fontSize: 18, margin: 0 }}>🌦️ {t('weather')}</div>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 6 }}>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder={t('searchLocationPlaceholder')}
            style={{ background: 'var(--card-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--charcoal)', outline: 'none' }}
          />
          <button type="submit" className="btn-sm btn-green" style={{ padding: '4px 10px' }}>{t('searchBtn')}</button>
        </form>
      </div>

      {error && <div style={{ color: 'var(--err)', fontSize: 13 }}>{error}</div>}

      <div className="weather-hero" style={{ background: condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('storm') ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)' : 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)' }}>
        {loading ? (
          <div style={{ fontSize: 20, padding: 30 }}>{t('fetchingWeatherLabel')}</div>
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 8 }}>{getConditionIcon(condition)}</div>
            <div className="w-temp-big">{currentTemp}°C</div>
            <div className="w-cond">{condition}</div>
            <div className="w-meta">
              <span>💧 {t('humidityLabel')}: {humidity}%</span>
              <span>🌬️ {t('windLabel')}: {wind} km/h</span>
              <span>🌡️ {t('feelsLikeLabel')}: {feelsLike}°C</span>
            </div>
          </>
        )}
      </div>
      
      {!loading && <div className="advice-banner">{advice}</div>}
      
      <div className="section-title">{t('fiveDayForecast')}</div>
      <div className="day-cards-row">
        {forecast.map(d => (
          <div key={d.day} className="day-card-full">
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6, color: 'var(--charcoal)' }}>{d.day}</div>
            <div style={{ fontSize: 32, marginBottom: 4 }}>{d.icon}</div>
            <div style={{ fontFamily: 'var(--font-data)', fontSize: 15, fontWeight: 500, color: 'var(--charcoal)' }}>{d.temp}</div>
            <div style={{ fontSize: 11, color: 'var(--blue)', marginTop: 4 }}>🌧️ {d.rain}</div>
            <div style={{ fontSize: 10, color: 'var(--gray)', marginTop: 6 }}>{d.advice}</div>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── CROP ROTATION PAGE ─────────────────────────────────────────
function RotationPage() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const [currentCrop, setCurrentCrop] = useState('Rice');
  const [soilType, setSoilType] = useState('Clay');
  const [season, setSeason] = useState('Kharif');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/rotation/predict', {
        current_crop: currentCrop,
        soil_type: soilType,
        season: season
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Rotation planning failed. Check API connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="section-title" style={{ fontSize: 18 }}>🔁 {t('rotation')}</div>
      <div className="two-col">
        <div className="input-panel">
          <div className="form-label" style={{ marginBottom: 8 }}>{t('rotationParams')}</div>
          <div className="slider-row">
            <div className="slider-label"><span>{t('currentCrop')}</span></div>
            <select value={currentCrop} onChange={e => setCurrentCrop(e.target.value)} style={{ width: '100%', background: 'var(--page-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: 7, fontSize: 13, color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Cotton</option>
              <option>Sugarcane</option>
              <option>Maize</option>
            </select>
          </div>
          <div className="slider-row" style={{ marginTop: 10 }}>
            <div className="slider-label"><span>{t('soilType')}</span></div>
            <select value={soilType} onChange={e => setSoilType(e.target.value)} style={{ width: '100%', background: 'var(--page-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: 7, fontSize: 13, color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
              <option>Clay</option>
              <option>Sandy</option>
              <option>Loamy</option>
              <option>Black Soil</option>
            </select>
          </div>
          <div className="slider-row" style={{ marginTop: 10 }}>
            <div className="slider-label"><span>{t('currentSeason')}</span></div>
            <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', background: 'var(--page-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: 7, fontSize: 13, color: 'var(--charcoal)', fontFamily: 'var(--font-body)' }}>
              <option>Kharif</option>
              <option>Rabi</option>
              <option>Zaid</option>
            </select>
          </div>
          <button onClick={handlePredict} className="btn-primary">🔁 {t('planRotationBtn')}</button>
        </div>

        <div className="result-panel">
          {error && <div style={{ color: 'var(--err)', fontSize: 13, marginBottom: 10 }}>{error}</div>}
          {loading && <div style={{ textAlign: 'center', padding: 20 }}>{t('generatingRotationLabel')}</div>}
          {!result && !loading && (
            <div style={{ textAlign: 'center', color: 'var(--gray)', padding: '80px 10px' }}>
              {t('selectParamsToPlan')}
            </div>
          )}
          {result && !loading && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span className="form-label" style={{ margin: 0 }}>{t('rotationTimeline')}</span>
                <span className="eligible-badge">Sustainability: {result.overall_sustainability_score}%</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {result.rotation_sequence.map((stage, idx) => (
                  <div key={idx} style={{ borderLeft: '3px solid var(--green)', paddingLeft: 12, position: 'relative' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--green)' }}>
                      {t('stageLabel')} {idx + 1}: {stage.crop} ({stage.duration})
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 2 }}>{stage.soil_health_impact}</div>
                    <div style={{ fontSize: 12, color: 'var(--charcoal)', marginTop: 4 }}>{stage.description}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <span style={{ fontSize: 10, color: 'var(--gray)' }}>{t('nitrogenReplenishment')}</span>
                      <div className="alt-bar-wrap" style={{ maxWidth: 80, height: 4 }}><div className="alt-bar" style={{ width: `${stage.nitrogen_fixation_pct}%` }} /></div>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-data)', color: 'var(--green)' }}>{stage.nitrogen_fixation_pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="advice-banner" style={{ marginTop: 14, fontSize: 11 }}>
                💡 {result.rotation_advice}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ─── SCHEMES PAGE ───────────────────────────────────────────────
function SchemesPage() {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const [state, setState] = useState('Telangana');
  const [crop, setCrop] = useState('Rice');
  const [landSize, setLandSize] = useState(2.5);
  const [category, setCategory] = useState('General');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheckSchemes = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/schemes/predict', {
        state: state,
        crop: crop,
        land_size: landSize,
        farmer_category: category
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch eligible schemes. Check API connection.');
    } finally {
      setLoading(false);
    }
  };

  const defaultSchemes = [
    { name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)', amount: '₹6,000/year', desc: 'Direct income support of ₹6,000 per year to farmer families with cultivable landholding.', eligible: true, steps: ['Register', 'eKYC', 'Verify', 'Receive'], category: 'Credit' },
    { name: 'Rythu Bandhu Scheme', amount: '₹10,000/acre', desc: 'Telangana state investment support for agriculture. Two seasons per year.', eligible: true, steps: ['Apply', 'Land Verify', 'Approve', 'Disburse'], category: 'Subsidy' },
    { name: 'PM Fasal Bima Yojana (PMFBY)', amount: 'Crop Insurance Cover', desc: 'Comprehensive crop insurance against natural calamities, pests & diseases at low premium rates.', eligible: false, steps: ['Enroll', 'Pay Premium', 'Coverage'], category: 'Insurance' },
  ];

  const schemes = result ? result.schemes : defaultSchemes;

  return (
    <>
      <div className="section-title" style={{ fontSize: 18 }}>🏛️ {t('schemes')}</div>
      <div className="schemes-layout">
        <div className="filter-panel" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="filter-title" style={{ margin: 0 }}>{t('farmerProfileFilterTitle')}</div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="filter-label" style={{ margin: '0 0 4px' }}>{t('stateLabel')}</span>
            <select className="filter-select" value={state} onChange={e => setState(e.target.value)}>
              <option>Telangana</option>
              <option>Andhra Pradesh</option>
              <option>Punjab</option>
              <option>Maharashtra</option>
              <option>Uttar Pradesh</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="filter-label" style={{ margin: '0 0 4px' }}>{t('cropLabel')}</span>
            <select className="filter-select" value={crop} onChange={e => setCrop(e.target.value)}>
              <option>Rice</option>
              <option>Wheat</option>
              <option>Maize</option>
              <option>Cotton</option>
              <option>Sugarcane</option>
              <option>Onion</option>
              <option>Tomato</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="filter-label" style={{ margin: '0 0 4px' }}>{language === 'hi' ? 'श्रेणी (Category)' : language === 'te' ? 'వర్గం (Category)' : language === 'ta' ? 'பிரிவு (Category)' : 'Category'}</span>
            <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
              <option>General</option>
              <option>Small/Marginal</option>
              <option>SC/ST</option>
              <option>Women Farmer</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="filter-label" style={{ margin: '0 0 4px' }}>{t('areaLabel')}: {landSize}</span>
            <input type="range" min="0.5" max="25" step="0.5" value={landSize} onChange={e => setLandSize(+e.target.value)} />
          </div>

          <button onClick={handleCheckSchemes} className="btn-primary" style={{ marginTop: 10 }}>{t('checkEligibility')}</button>
        </div>

        <div className="scheme-cards">
          {error && <div style={{ color: 'var(--err)', fontSize: 13 }}>{error}</div>}
          {loading && <div style={{ textAlign: 'center', padding: 20 }}>{t('verifyingSchemesLabel')}</div>}
          {!loading && schemes.map((s, idx) => (
            <div key={idx} className="scheme-card" style={{ opacity: s.eligible ? 1 : 0.6 }}>
              <div className="scheme-top">
                <div className="scheme-name" style={{ fontWeight: 600 }}>{s.name}</div>
                <div className="scheme-amount">{s.amount}</div>
              </div>
              <div className="scheme-desc">{s.desc}</div>
              
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <span className={`gauge-status ${s.category === 'Subsidy' ? 'status-good' : s.category === 'Insurance' ? 'status-ok' : 'status-good'}`} style={{ margin: 0, padding: '2px 8px' }}>
                  {s.category}
                </span>
                {s.eligible ? (
                  <span className="eligible-badge">{t('youAreEligible')}</span>
                ) : (
                  <span className="gauge-status status-low" style={{ background: '#fef2f2', color: 'var(--err)', margin: 0, padding: '2px 8px' }}>
                    {t('notEligible')}
                  </span>
                )}
              </div>

              {s.eligible && (
                <>
                  <div className="stepper" style={{ marginTop: 14 }}>
                    {s.steps.map((st, i) => (
                      <React.Fragment key={st}>
                        <span className={`step ${i === 0 ? 'done' : i === 1 ? 'current' : 'pending'}`}>{st}</span>
                        {i < s.steps.length - 1 && <span className="step-arrow">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="scheme-btns">
                    <button className="btn-sm btn-green" onClick={() => alert(`Redirecting to official portal for ${s.name}...`)}>{t('applyNow')}</button>
                    <button className="btn-sm btn-outline">{t('viewGuidelines')}</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── CHATBOT MARKDOWN RENDERERS ────────────────────────────────
function parseCodeMarkdown(text) {
  const parts = text.split('`');
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <code key={i} style={{
          background: 'rgba(0, 0, 0, 0.06)',
          padding: '2px 5px',
          borderRadius: '4px',
          fontFamily: 'var(--font-data)',
          fontSize: '11px',
          color: 'var(--green)',
          fontWeight: 500
        }}>
          {part}
        </code>
      );
    }
    return part;
  });
}

function parseInlineMarkdown(text) {
  const parts = text.split('**');
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i} style={{ fontWeight: 600 }}>{parseCodeMarkdown(part)}</strong>;
    }
    return parseCodeMarkdown(part);
  });
}

function RenderMessage({ text }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {lines.map((line, idx) => {
        if (line.trim() === '') return <div key={idx} style={{ height: '6px' }} />;
        
        // Headers
        if (line.startsWith('### ')) {
          return (
            <h4 key={idx} style={{
              fontSize: '13.5px',
              fontWeight: 700,
              marginTop: '8px',
              marginBottom: '2px',
              color: 'var(--green)'
            }}>
              {parseInlineMarkdown(line.slice(4))}
            </h4>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h3 key={idx} style={{
              fontSize: '14.5px',
              fontWeight: 700,
              marginTop: '10px',
              marginBottom: '4px',
              color: 'var(--green)'
            }}>
              {parseInlineMarkdown(line.slice(3))}
            </h3>
          );
        }
        if (line.startsWith('# ')) {
          return (
            <h2 key={idx} style={{
              fontSize: '16px',
              fontWeight: 700,
              marginTop: '12px',
              marginBottom: '6px',
              color: 'var(--green)'
            }}>
              {parseInlineMarkdown(line.slice(2))}
            </h2>
          );
        }

        // Bullet point
        const trimmed = line.trim();
        if (trimmed.startsWith('•') || trimmed.startsWith('*') || trimmed.startsWith('-')) {
          const content = trimmed.replace(/^[•\*\-]\s*/, '');
          return (
            <div key={idx} style={{
              display: 'flex',
              gap: '6px',
              paddingLeft: '8px',
              margin: '2px 0',
              fontSize: '13px',
              lineHeight: 1.4
            }}>
              <span style={{ color: 'var(--green)' }}>•</span>
              <div>{parseInlineMarkdown(content)}</div>
            </div>
          );
        }

        // Numbered list
        const numMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
        if (numMatch) {
          const num = numMatch[1];
          const content = numMatch[2];
          return (
            <div key={idx} style={{
              display: 'flex',
              gap: '6px',
              paddingLeft: '8px',
              margin: '2px 0',
              fontSize: '13px',
              lineHeight: 1.4
            }}>
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>{num}.</span>
              <div>{parseInlineMarkdown(content)}</div>
            </div>
          );
        }

        // Standard paragraph
        return (
          <p key={idx} style={{
            fontSize: '13px',
            lineHeight: 1.5,
            margin: '2px 0'
          }}>
            {parseInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
}

// ─── CHATBOT PAGE ───────────────────────────────────────────────
function ChatbotPage() {
  const { language } = useApp()
  const [messages, setMessages] = useState([])
  useEffect(() => {
    const welcomeText = {
      en: "Namaste! 🙏 I'm Krishi AI, your intelligent farming assistant. I can help with crop advice, disease identification, weather updates, and government schemes in Hindi, Telugu, Tamil, and English. How can I help you today?",
      hi: "नमस्ते! 🙏 मैं कृषक एआई हूं, आपका बुद्धिमान कृषि सहायक। मैं हिंदी, तेलुगु, तमिल और अंग्रेजी में फसल सलाह, बीमारी की पहचान, मौसम अपडेट और सरकारी योजनाओं में मदद कर सकता हूं। आज मैं आपकी क्या मदद कर सकता हूं?",
      te: "నమస్తే! 🙏 నేను కృషి AI, మీ తెలివైన వ్యవసాయ సహాయకుడిని. నేను తెలుగు, హిందీ, తమిళం మరియు ఇంగ్లీషులో పంట సలహా, వ్యాధి గుర్తింపు, వాతావరణ అప్‌డేట్లు మరియు ప్రభుత్వ పథకాలతో సహాయం చేయగలను. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
      ta: "வணக்கம்! 🙏 நான் கிரிஷி AI, உங்கள் அறிவார்ந்த விவசாய உதவியாளர். இந்தி, தெலுங்கு, தமிழ் மற்றும் ஆங்கிலத்தில் பயிர் ஆலோசனை, நோய் கண்டறிதல், வானிலை அறிவிப்புகள் மற்றும் அரசு திட்டங்களுக்கு நான் உதவ முடியும். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?"
    };
    setMessages([{ type: 'bot', text: welcomeText[language] || welcomeText['en'] }])
  }, [language])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEnd = useRef(null)

  const handleSend = async (textToSend) => {
    const query = textToSend || input
    if (!query.trim()) return

    setMessages(prev => [...prev, { type: 'user', text: query }])
    if (!textToSend) setInput('')
    setLoading(true)

    try {
      const historyCtx = messages.slice(-4).map(m => ({
        role: m.type === 'bot' ? 'assistant' : 'user',
        content: m.text
      }))

      const res = await axios.post('/api/chatbot/predict', {
        message: query,
        history: historyCtx
      })
      setMessages(prev => [...prev, { type: 'bot', text: res.data.response }])
    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Sorry, I am facing connectivity issues. Please verify that the backend API server is running.'
      }])
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div className="chat-wrap" style={{ flex: 1 }}>
        <div className="chat-header">
          <div className="chat-bot-info">
            <div className="chat-bot-avatar">🤖</div>
            <div>
              <div className="chat-bot-name">Krishi AI Assistant</div>
              <div className="chat-bot-status"><span className="status-dot" />Online</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <div className="icon-btn" onClick={() => alert('Krishi AI supports responses in English, Telugu, Hindi, Tamil, and Kannada.')}>🌐</div>
            <div className="icon-btn" onClick={() => {
              if (window.confirm('Reset chat conversation?')) {
                setMessages([{ type: 'bot', text: 'Namaste! 🙏 I\'m Krishi AI, your intelligent farming assistant. How can I help you today?' }])
              }
            }}>🗑️</div>
          </div>
        </div>
        <div className="chat-messages" style={{ overflowY: 'auto' }}>
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.type}`}>
              <div className="msg-avatar">{m.type === 'bot' ? '🤖' : 'N'}</div>
              <div className="msg-bubble" style={{ wordBreak: 'break-word' }}>
                <RenderMessage text={m.text} />
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg bot">
              <div className="msg-avatar">🤖</div>
              <div className="msg-bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEnd} />
        </div>
        <div className="quick-chips">
          {['🌾 What can this website do?', '🪱 Tell me about Soil Analysis', '🌦️ Explain Weather Forecast', '🏛️ PM-KISAN eligibility'].map(c => (
            <span key={c} className="chip" onClick={() => handleSend(c)}>{c}</span>
          ))}
        </div>
        <div className="chat-input-row">
          <input className="chat-input" placeholder="Ask anything about farming or the portal…" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()} />
          <button className="chat-send-btn" onClick={() => handleSend()}>➤</button>
        </div>
      </div>
    </div>
  )
}

// ─── PROFILE PAGE ───────────────────────────────────────────────
function ProfilePage({ user, onLogout, onProfileUpdate }) {
  const { language } = useApp()
  const t = (key) => translations[language]?.[key] || translations['en'][key] || key
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [state, setState] = useState(user?.state || 'Telangana');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/auth/history');
      setHistory(res.data);
    } catch (err) {
      print(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setState(user.state || 'Telangana');
      fetchHistory();
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/profile/update', { name, phone, state });
      onProfileUpdate(res.data);
      setEditing(false);
      setMsg(language === 'hi' ? 'प्रोफ़ाइल सफलतापूर्वक अपडेट की गई!' : language === 'te' ? 'ప్రొఫైల్ విజయవంతంగా అప్‌డేట్ చేయబడింది!' : language === 'ta' ? 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!' : 'Profile updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error(err);
      setMsg(language === 'hi' ? 'प्रोफ़ाइल अपडेट करने में विफल।' : language === 'te' ? 'ప్రొఫైల్ అప్‌డేట్ చేయడంలో విఫలమైంది.' : language === 'ta' ? 'சுயவிவரத்தை புதுப்பிக்க முடியவில்லை.' : 'Failed to update profile.');
    }
  };

  const formatActivityTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  };

  const getModuleTitle = (mod) => {
    const titles = {
      crop: '🌱 ' + t('crop'),
      soil: '🪱 ' + t('soil'),
      disease: '🦠 ' + t('disease'),
      yield: '📈 ' + t('yield'),
      rotation: '🔁 ' + t('rotation')
    };
    return titles[mod] || mod.toUpperCase();
  };

  const getModuleColor = (mod) => {
    const colors = {
      crop: 'var(--green)',
      soil: 'var(--gold)',
      disease: 'var(--err)',
      yield: 'var(--blue)',
      rotation: 'var(--green-light)'
    };
    return colors[mod] || 'var(--gray)';
  };

  const getBriefSummary = (item) => {
    try {
      const input = JSON.parse(item.input_data);
      const res = JSON.parse(item.result_data);
      if (item.module === 'crop') {
        const cropName = res.recommended_crop;
        return (language === 'hi' ? `अनुशंसित फसल: ${cropName} (${res.confidence}% विश्वास)` : language === 'te' ? `సిఫార్సు చేయబడిన పంట: ${cropName} (${res.confidence}% విశ్వాసం)` : language === 'ta' ? `பரிந்துரைக்கப்பட்ட பயிர்: ${cropName} (${res.confidence}% நம்பிக்கை)` : `Recommended Crop: ${res.recommended_crop} (${res.confidence}% confidence)`);
      }
      if (item.module === 'soil') {
        return (language === 'hi' ? `मृदा स्वास्थ्य सूचकांक: ${res.health_score}/100 (${res.health_label})` : language === 'te' ? `నేల ఆరోగ్య స్కోరు: ${res.health_score}/100 (${res.health_label})` : language === 'ta' ? `மண் சுகாதார மதிப்பெண்: ${res.health_score}/100 (${res.health_label})` : `Soil Health Score: ${res.health_score}/100 (${res.health_label})`);
      }
      if (item.module === 'disease') {
        return (language === 'hi' ? `रोग: ${res.disease} (${res.severity_label} गंभीरता)` : language === 'te' ? `వ్యాధి: ${res.disease} (${res.severity_label} తీవ్రత)` : language === 'ta' ? `நோய்: ${res.disease} (${res.severity_label} தீவிரம்)` : `Detected: ${res.disease} (${res.severity_label} severity)`);
      }
      if (item.module === 'yield') {
        return (language === 'hi' ? `पूर्वानुमानित उपज: ${res.predicted_yield_per_acre} क्विंटल/एकड़` : language === 'te' ? `అంచనా దిగుబడి: ${res.predicted_yield_per_acre} క్వింటాళ్లు/ఎకరా` : language === 'ta' ? `கணிக்கப்பட்ட விளைச்சல்: ${res.predicted_yield_per_acre} குவிண்டால்/ஏக்கர்` : `Predicted: ${res.predicted_yield_per_acre} q/acre`);
      }
      if (item.module === 'rotation') {
        return `Current: ${input.current_crop}. Recommended rotation sequence planned.`;
      }
      return 'Completed.';
    } catch (e) {
      return 'Completed.';
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <span style={{ fontSize: 48 }}>👤</span>
        <h2 style={{ marginTop: 10 }}>{t('farmerProfileFilterTitle')}</h2>
        <p style={{ color: 'var(--gray)', marginTop: 10, fontSize: 13 }}>{t('guestModeMsg')}</p>
        <p style={{ fontSize: 13, marginTop: 8, color: 'var(--gray)' }}>{t('guestModeDesc')}</p>
        <button onClick={onLogout} className="btn-primary" style={{ maxWidth: 200, margin: '20px auto 0' }}>{t('welcome')}</button>
      </div>
    );
  }

  const totalPredictions = history.length;
  const diseaseScans = history.filter(h => h.module === 'disease').length;
  const soilScans = history.filter(h => h.module === 'soil').length;
  
  let avgSoilScore = 'N/A';
  const soilRuns = history.filter(h => h.module === 'soil');
  if (soilRuns.length > 0) {
    const sum = soilRuns.reduce((acc, curr) => {
      try {
        return acc + JSON.parse(curr.result_data).health_score;
      } catch { return acc + 74; }
    }, 0);
    avgSoilScore = `${Math.round(sum / soilRuns.length)}/100`;
  }

  return (
    <>
      <div className="section-title" style={{ fontSize: 18 }}>👤 {t('profile')}</div>
      
      {msg && <div className="advice-banner" style={{ background: '#ecfdf5', borderColor: '#10b981', color: '#065f46', marginBottom: 12 }}>{msg}</div>}

      <div className="profile-hero">
        <div className="profile-avatar-big">{name.charAt(0).toUpperCase()}</div>
        <div style={{ flex: 1 }}>
          <div className="profile-name">{name}</div>
          <div className="profile-meta">
            📍 {state} · 📞 {phone || 'No phone set'} · 👤 Account: {user.username}
          </div>
        </div>
        <button onClick={() => setEditing(!editing)} className="btn-sm btn-outline" style={{ width: 'auto' }}>
          {editing ? t('cancel') : '✍️ ' + t('editProfile')}
        </button>
      </div>

      {editing && (
        <form onSubmit={handleUpdate} className="input-panel" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="form-label" style={{ margin: 0 }}>{t('editDetails')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--gray)' }}>{t('fullName')}</span>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', background: 'var(--page-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: 6, fontSize: 12, color: 'var(--charcoal)' }} />
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--gray)' }}>{t('phoneNumber')}</span>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', background: 'var(--page-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: 6, fontSize: 12, color: 'var(--charcoal)' }} />
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--gray)' }}>{t('stateLabel')}</span>
              <select value={state} onChange={e => setState(e.target.value)} style={{ width: '100%', background: 'var(--page-bg)', border: '0.5px solid var(--border)', borderRadius: 6, padding: 6, fontSize: 12, color: 'var(--charcoal)' }}>
                <option>Telangana</option>
                <option>Andhra Pradesh</option>
                <option>Punjab</option>
                <option>Maharashtra</option>
                <option>Uttar Pradesh</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn-primary" style={{ width: 140, marginTop: 4, padding: '6px 12px' }}>{t('saveChanges')}</button>
        </form>
      )}

      <div className="stats-strip">
        <div className="stat-box">
          <div className="stat-num">{totalPredictions}</div>
          <div className="stat-lbl">{t('totalReportsLabel')}</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{diseaseScans}</div>
          <div className="stat-lbl">{t('diseaseScansLabel')}</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{soilScans}</div>
          <div className="stat-lbl">{t('soilTestsLabel')}</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{avgSoilScore}</div>
          <div className="stat-lbl">{t('avgSoilScoreLabel')}</div>
        </div>
      </div>

      <div className="input-panel" style={{ marginTop: 12 }}>
        <div className="section-title" style={{ marginBottom: 10 }}>{t('farmingHistoryLogs')}</div>
        {loading && <div style={{ fontSize: 12, color: 'var(--gray)' }}>{t('loadingLogs')}</div>}
        {!loading && history.length === 0 && (
          <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--gray)', fontSize: 12 }}>
            {t('noActivityLogs')}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {!loading && history.map((h, i) => (
            <div key={h.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, borderBottom: i < history.length - 1 ? '0.5px solid var(--border)' : 'none', paddingBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: getModuleColor(h.module), marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--charcoal)' }}>{getModuleTitle(h.module)}</div>
                <div style={{ color: 'var(--gray)', fontSize: 12, marginTop: 2 }}>{getBriefSummary(h)}</div>
                <div style={{ fontSize: 10, color: 'var(--gray)', marginTop: 4 }}>{formatActivityTime(h.created_at)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── FLOATING CHATBOT WIDGET ───────────────────────────────────
function FloatingChatbotWidget({ language, user }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEnd = useRef(null)

  const welcomeText = {
    en: "Namaste! 🙏 I'm Krishi AI, your floating assistant. How can I help you today?",
    hi: "नमस्ते! 🙏 मैं आपका सहायक हूँ। आज मैं आपकी क्या मदद कर सकता हूँ?",
    te: "నమస్తే! 🙏 నేను కృషి AI, మీ సహాయకుడిని. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
    ta: "வணக்கம்! 🙏 நான் கிரிஷி AI, உங்கள் உதவியாளர். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?"
  };

  const widgetChips = {
    en: ['🌾 Site features', '🪱 Soil guide', '🌦️ Weather help', '🏛️ PM-KISAN'],
    hi: ['🌾 वेबसाइट सुविधाएँ', '🪱 मृदा गाइड', '🌦️ मौसम सहायता', '🏛️ पीएम-किसान'],
    te: ['🌾 సైట్ ఫీచర్లు', '🪱 మట్టి మార్గదర్శి', '🌦️ వాతావరణ సహాయం', '🏛️ పీఎం-కిసాన్'],
    ta: ['🌾 தளத்தின் அம்சங்கள்', '🪱 மண் வழிகாட்டி', '🌦️ வானிலை உதவி', '🏛️ பிரதம மந்திரி கிசான்']
  };

  const inputPlaceholder = {
    en: "Ask Krishi AI...",
    hi: "कृषक एआई से पूछें...",
    te: "కృషి AI ని అడగండి...",
    ta: "கிரிஷி AI-யிடம் கேளுங்கள்..."
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ type: 'bot', text: welcomeText[language] || welcomeText['en'] }]);
    }
  }, [language, isOpen])

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: query }]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const historyCtx = messages.slice(-4).map(m => ({
        role: m.type === 'bot' ? 'assistant' : 'user',
        content: m.text
      }));

      const res = await axios.post('/api/chatbot/predict', {
        message: query,
        history: historyCtx
      });
      setMessages(prev => [...prev, { type: 'bot', text: res.data.response }]);
    } catch (err) {
      console.error(err);
      const errorMsg = {
        en: 'Sorry, I am facing connectivity issues.',
        hi: 'क्षमा करें, मुझे कनेक्टिविटी समस्याओं का सामना करना पड़ रहा है।',
        te: 'కనెక్టివిటీ సమస్యలు ఉన్నాయి.',
        ta: 'இணைப்பு சிக்கல்கள் உள்ளன.'
      };
      setMessages(prev => [...prev, { type: 'bot', text: errorMsg[language] || errorMsg['en'] }]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, loading, isOpen]);

  if (!isOpen) {
    return (
      <button className="chat-widget-btn" onClick={() => setIsOpen(true)} aria-label="Open chat assistant">
        🤖
      </button>
    );
  }

  return (
    <>
      <div className="chat-widget-panel">
        <div className="chat-widget-header">
          <div className="chat-widget-title">🤖 {translations[language]?.chatbot || 'AI Chatbot'}</div>
          <button className="chat-widget-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="chat-widget-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-widget-msg ${m.type}`}>
              <div className="msg-avatar">{m.type === 'bot' ? '🤖' : 'U'}</div>
              <div className="msg-bubble">
                <RenderMessage text={m.text} />
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-widget-msg bot">
              <div className="msg-avatar">🤖</div>
              <div className="msg-bubble typing" style={{ padding: '10px 12px' }}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEnd} />
        </div>
        <div className="chat-widget-chips">
          {(widgetChips[language] || widgetChips['en']).map(c => (
            <span key={c} className="chip" onClick={() => handleSend(c)}>{c}</span>
          ))}
        </div>
        <div className="chat-widget-input-row">
          <input className="chat-widget-input" placeholder={inputPlaceholder[language] || inputPlaceholder['en']} value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()} />
          <button className="chat-widget-send-btn" onClick={() => handleSend()}>➤</button>
        </div>
      </div>
      <button className="chat-widget-btn open" onClick={() => setIsOpen(false)} aria-label="Close chat assistant">
        ✕
      </button>
    </>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────
export default function App() {
  const { language, setLanguage } = useApp()
  const [showLangDropdown, setShowLangDropdown] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(null)
  const [guestMode, setGuestMode] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const [entryView, setEntryView] = useState('landing') // 'landing', 'login', 'register'

  // Configure axios headers on token change
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
      setAuthChecking(true)
      axios.get('/api/auth/me')
        .then(res => {
          setUser(res.data)
          setGuestMode(false)
        })
        .catch(err => {
          console.error('Session expired or invalid:', err)
          handleLogout()
        })
        .finally(() => {
          setAuthChecking(false)
        })
    } else {
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
      setUser(null)
      setAuthChecking(false)
    }
  }, [token])

  const handleLogout = () => {
    setToken('')
    setUser(null)
    setGuestMode(false)
    setActivePage('dashboard')
    setEntryView('landing')
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage onNavigate={setActivePage} user={user} />
      case 'crop':      return <CropPage />
      case 'disease':   return <DiseasePage />
      case 'soil':      return <SoilPage />
      case 'yield':     return <YieldPage />
      case 'market':    return <MarketPage />
      case 'weather':   return <WeatherPage />
      case 'rotation':  return <RotationPage />
      case 'schemes':   return <SchemesPage />
      case 'chatbot':   return <ChatbotPage />
      case 'profile':   return <ProfilePage user={user} onLogout={handleLogout} onProfileUpdate={setUser} />
      default:          return <DashboardPage onNavigate={setActivePage} user={user} />
    }
  }

  // Loading spinner during auth check
  if (token && authChecking) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--page-bg)', fontFamily: 'var(--font-body)' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 32 }}>🌿</span>
          <div style={{ marginTop: 12, fontSize: 13, color: 'var(--gray)' }}>Restoring secure session connection...</div>
        </div>
      </div>
    );
  }

  // If not logged in and not in guest mode
  if (!token && !guestMode) {
    if (entryView === 'landing') {
      return (
        <LandingPage
          onLoginClick={() => setEntryView('login')}
          onRegisterClick={() => setEntryView('register')}
        />
      );
    }
    return (
      <AuthPage
        onAuthSuccess={(t, u) => { setToken(t); setUser(u); }}
        onGuestMode={() => setGuestMode(true)}
        defaultTab={entryView}
        onBackToHome={() => setEntryView('landing')}
      />
    );
  }

  const avatarLabel = user ? user.name.charAt(0).toUpperCase() : '?'

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => setActivePage('dashboard')} style={{ cursor: 'pointer' }}>
          <div className="nav-logo-icon">🌿</div>
          Bharat Krishi AI
        </div>
        <div className="nav-search">
          🔍 <span>{translations[language]?.searchPlaceholder || "Search crops, diseases, schemes..."}</span>
        </div>
        <div className="nav-right">
          <div className="weather-chip">32°C ⛅ {user?.state || (language === 'hi' ? 'हैदराबाद' : language === 'te' ? 'హైదరాబాద్' : language === 'ta' ? 'ஹைதராபாத்' : 'Hyderabad')}</div>
          <div className="ticker-wrap" aria-label="Live market prices">
            <div className="ticker-inner">
              <span className="ticker-item">🌾 {language === 'hi' ? 'चावल' : language === 'te' ? 'వరి' : language === 'ta' ? 'நெல்' : 'Rice'} ₹2,100 <span className="up">↑2.1%</span></span>
              <span className="ticker-item">🧅 {language === 'hi' ? 'प्याज' : language === 'te' ? 'ఉల్లిపాయ' : language === 'ta' ? 'வெங்காயம்' : 'Onion'} ₹3,400 <span className="down">↓1.4%</span></span>
              <span className="ticker-item">🌽 {language === 'hi' ? 'मक्का' : language === 'te' ? 'మొక్కజొన్న' : language === 'ta' ? 'సోளம்' : 'Maize'} ₹1,800 →</span>
              <span className="ticker-item">🍅 {language === 'hi' ? 'टमाटर' : language === 'te' ? 'టమోటా' : language === 'ta' ? 'தக்காளி' : 'Tomato'} ₹2,650 <span className="up">↑3.2%</span></span>
              <span className="ticker-item">🌾 {language === 'hi' ? 'गेहूं' : language === 'te' ? 'గోధుమ' : language === 'ta' ? 'கோதுமை' : 'Wheat'} ₹2,100 <span className="up">↑0.8%</span></span>
            </div>
          </div>
          <div className="bell" aria-label="Notifications">
            <span style={{ fontSize: 20, color: 'var(--gray)' }}>🔔</span>
            <div className="bell-badge">2</div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="lang-pill" onClick={() => setShowLangDropdown(!showLangDropdown)} style={{ cursor: 'pointer' }}>
              🌐 {language.toUpperCase()} ▾
            </div>
            {showLangDropdown && (
              <div className="lang-dropdown">
                <div className={`lang-dropdown-item ${language === 'en' ? 'active' : ''}`} onClick={() => { setLanguage('en'); setShowLangDropdown(false); }}>English</div>
                <div className={`lang-dropdown-item ${language === 'hi' ? 'active' : ''}`} onClick={() => { setLanguage('hi'); setShowLangDropdown(false); }}>हिंदी (Hindi)</div>
                <div className={`lang-dropdown-item ${language === 'te' ? 'active' : ''}`} onClick={() => { setLanguage('te'); setShowLangDropdown(false); }}>తెలుగు (Telugu)</div>
                <div className={`lang-dropdown-item ${language === 'ta' ? 'active' : ''}`} onClick={() => { setLanguage('ta'); setShowLangDropdown(false); }}>தமிழ் (Tamil)</div>
              </div>
            )}
          </div>
          <div className="avatar" onClick={() => setActivePage('profile')}>{avatarLabel}</div>
        </div>
      </nav>

      <div className="body-wrap">
        {/* SIDEBAR */}
        <aside className="sidebar" role="navigation">
          <div className="sidebar-tagline">{translations[language]?.navTagline || "Navigation"}</div>
          <div className="sidebar-section">
            {navItems.map(item => {
              const label = translations[language]?.[item.id] || item.label;
              return (
                <div
                  key={item.id}
                  className={`sidebar-item ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => setActivePage(item.id)}
                  role="menuitem"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setActivePage(item.id)}
                >
                  <span className="icon">{item.icon}</span> {label}
                </div>
              );
            })}
          </div>
          <div className="sidebar-bottom">
            {user ? (
              <div className="sidebar-item" onClick={handleLogout} style={{ color: 'var(--err)', fontWeight: 500 }}>
                <span className="icon">🚪</span> {translations[language]?.logout || "Logout"}
              </div>
            ) : (
              <div className="sidebar-item" onClick={() => { setGuestMode(false); setEntryView('login'); }} style={{ color: 'var(--green-light)', fontWeight: 600 }}>
                <span className="icon">👤</span> {translations[language]?.welcome || "Sign In / Register"}
              </div>
            )}
            <div className="sidebar-item" onClick={handleLogout} style={{ cursor: 'pointer' }}><span className="icon">⚙️</span> {language === 'hi' ? 'होम पेज' : language === 'te' ? 'హోమ్ పేజీ' : language === 'ta' ? 'முகப்புப்பக்கம்' : 'Home Page'}</div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main" id="main-content">
          {renderPage()}
        </main>
      </div>
      <FloatingChatbotWidget language={language} user={user} />
    </div>
  )
}
