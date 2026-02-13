# 🌾 AI-Powered Crop Recommendation System

## Overview
A hybrid intelligent system combining instant knowledge base lookups with AI-powered analysis for comprehensive crop recommendations and requirements.

## Features

### 1. 🤖 AI Crop Recommendation (Find Best Crop)
- **Input**: Soil parameters (N, P, K, pH) + Climate data (temperature, humidity, rainfall)
- **Output**: Best crop recommendation with reasoning, yield potential, and growing tips
- **Technology**: Llama3.1 AI Model via Ollama
- **Response Time**: 30-60 seconds (AI analysis)

### 2. ⚡ Instant Crop Requirements (Crop Requirements)
- **Input**: Crop name
- **Output**: Complete growing requirements
- **Technology**: Hybrid System (Knowledge Base + AI Fallback)
- **Response Time**: 
  - 3-10ms for 19 crops in knowledge base (INSTANT)
  - 30-90s for other crops (AI generated)

## Knowledge Base Crops (19 Total)

### Field Crops (5)
1. Rice
2. Wheat
3. Maize
4. Cotton
5. Sugarcane

### Vegetables (10)
6. Tomato
7. Potato
8. Onion
9. Carrot
10. Broccoli
11. Cabbage
12. Cauliflower
13. Chilli
14. Cucumber
15. Pumpkin

### Fruits (4)
16. Banana
17. Mango
18. Grapes
19. Watermelon

## Information Provided

### Soil Requirements
- Nitrogen (N) range in kg/ha
- Phosphorus (P) range in kg/ha
- Potassium (K) range in kg/ha
- pH Level range
- Soil Type description

### Climate Requirements
- Temperature range (°C)
- Humidity range (%)
- Rainfall requirements (mm)
- Best growing season

### Growing Tips
- 3 practical tips for cultivation
- Spacing, irrigation, and management advice

### Harvest Information
- Growing duration (days)
- Best harvest timing
- Expected yield (tons/ha)

## System Architecture

```
User Input → Knowledge Base Check
              ↓
         Found? → YES → Instant Response (3-10ms)
              ↓
              NO → Llama3 AI → Generated Response (30-90s)
```

## Performance Metrics

| Metric | Knowledge Base | AI Fallback |
|--------|---------------|-------------|
| Response Time | 3-10ms | 30-90s |
| Accuracy | Pre-verified | AI Generated |
| Coverage | 19 crops | Any crop |
| Availability | Always | Requires Ollama |

## API Endpoints

### 1. POST /predict
Recommends best crop based on soil and climate conditions
```json
{
  "N": 90,
  "P": 42,
  "K": 43,
  "temperature": 20.87,
  "humidity": 82.0,
  "ph": 6.5,
  "rainfall": 202.93
}
```

### 2. POST /crop-requirements
Gets growing requirements for a specific crop
```json
{
  "crop_name": "tomato"
}
```

## Technology Stack

- **Backend**: Flask (Python)
- **AI Model**: Llama3.1 (via Ollama)
- **Knowledge Base**: Python dictionary (in-memory)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Theme**: Dark/Light mode support

## User Interface

### Tab-Based Navigation
1. **🌾 Find Best Crop**: Input conditions → Get recommendation
2. **📋 Crop Requirements**: Input crop name → Get requirements

### Features
- Real-time input validation
- Autocomplete suggestions
- Dark mode compatible
- Responsive design
- Loading indicators
- Source indication (Database vs AI)

## Benefits

✅ **Speed**: Instant results for common crops
✅ **Flexibility**: AI handles any crop not in database
✅ **Reliability**: Graceful fallback if AI unavailable
✅ **User-Friendly**: Clear visual feedback
✅ **Comprehensive**: Detailed agricultural information
✅ **Scalable**: Easy to add more crops to knowledge base

## Future Enhancements

- [ ] Add more crops to knowledge base
- [ ] Regional variations in requirements
- [ ] Seasonal recommendations
- [ ] Pest and disease information
- [ ] Market price integration
- [ ] Multi-language support

## Usage

1. Start Flask server: `python app.py`
2. Ensure Ollama is running with Llama3.1 model
3. Open: `http://127.0.0.1:5000/Crop Recommendation/templates/index.html`
4. Choose tab and enter information
5. Get instant or AI-powered results

---

**Status**: ✅ Production Ready
**Last Updated**: February 2026
**Version**: 2.0 (Hybrid System)
