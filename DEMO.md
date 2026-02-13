# 🌾 AgriTech Crop System - Live Demo

## How to Use

### 1. Start the System
```bash
# Make sure Ollama is running with llama3.1:latest
# Then start Flask server
python app.py
```

### 2. Open in Browser
```
http://127.0.0.1:5000/Crop Recommendation/templates/index.html
```

## Demo Scenarios

### Scenario 1: Find Best Crop for Your Land
**Use Case**: "I have land with specific soil and climate. What should I grow?"

1. Click **"🌾 Find Best Crop"** tab
2. Enter your parameters:
   - Nitrogen: 90
   - Phosphorus: 42
   - Potassium: 43
   - Temperature: 20.87°C
   - Humidity: 82%
   - pH: 6.5
   - Rainfall: 202.93mm
3. Click **"🌿 Predict Crop"**
4. Wait 30-60 seconds
5. Get AI recommendation with:
   - Best crop name
   - Reasoning why it's suitable
   - Yield potential
   - Growing tips

**Expected Result**: Rice (High yield potential)

---

### Scenario 2: Get Requirements for Common Crop (INSTANT)
**Use Case**: "I want to grow tomatoes. What do I need?"

1. Click **"📋 Crop Requirements"** tab
2. Type: "tomato"
3. Click **"📋 Get Requirements"**
4. Get **INSTANT** response (5-10ms) with:
   - Soil requirements (N, P, K, pH, soil type)
   - Climate requirements (temp, humidity, rainfall, season)
   - Growing tips (3 practical tips)
   - Harvest info (duration, timing, yield)

**Expected Result**: Instant detailed guide

---

### Scenario 3: Get Requirements for Uncommon Crop (AI)
**Use Case**: "I want to grow spinach. What do I need?"

1. Click **"📋 Crop Requirements"** tab
2. Type: "spinach"
3. Click **"📋 Get Requirements"**
4. See message: "🤖 AI Analyzing..."
5. Wait 60-90 seconds
6. Get AI-generated response with:
   - All same information as common crops
   - Note: "🤖 AI Generated - not in knowledge base"

**Expected Result**: Detailed AI-generated guide

---

## Quick Test Commands

### Test Knowledge Base (Instant)
```bash
python -c "import requests, json; r = requests.post('http://127.0.0.1:5000/crop-requirements', headers={'Content-Type': 'application/json'}, data=json.dumps({'crop_name': 'rice'})); print(r.json())"
```

### Test AI Fallback
```bash
python test_ai_fallback.py
```

### Test Complete System
```bash
python test_complete_system.py
```

## Available Crops in Knowledge Base

### Field Crops (5)
- Rice ⚡
- Wheat ⚡
- Maize ⚡
- Cotton ⚡
- Sugarcane ⚡

### Vegetables (10)
- Tomato ⚡
- Potato ⚡
- Onion ⚡
- Carrot ⚡
- Broccoli ⚡
- Cabbage ⚡
- Cauliflower ⚡
- Chilli ⚡
- Cucumber ⚡
- Pumpkin ⚡

### Fruits (4)
- Banana ⚡
- Mango ⚡
- Grapes ⚡
- Watermelon ⚡

⚡ = Instant response (3-10ms)

## Tips for Best Experience

### For Instant Results
- Use crops from the knowledge base list above
- Type exact names (case-insensitive)
- Use autocomplete suggestions

### For AI-Generated Results
- Any crop name works
- Be patient (60-90 seconds)
- More specific names work better
- Examples: "lettuce", "spinach", "kale", "radish"

### For Best Crop Recommendation
- Enter accurate soil test values
- Use local climate data
- Consider seasonal variations
- Review all suggestions carefully

## Troubleshooting

### "AI service timeout"
- Check if Ollama is running
- Verify llama3.1:latest model is installed
- Try a crop from knowledge base instead

### "Crop not found"
- Check spelling
- Try autocomplete suggestions
- Use common crop names

### Slow Response
- Knowledge base crops: Should be <100ms
- AI crops: Expected 60-90 seconds
- If slower, check Ollama performance

## Success Indicators

✅ Knowledge Base working: Response in <100ms
✅ AI Fallback working: Response in 60-90s with "AI Generated" badge
✅ Dark mode working: Toggle switches themes
✅ Tabs working: Can switch between features
✅ Autocomplete working: Suggestions appear while typing

---

**Ready to Demo!** 🎉

The system is fully operational and ready for demonstration or production use.
