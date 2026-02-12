# app.py
from flask import Flask, request, jsonify, render_template
import google.generativeai as genai
import json
from flask_cors import CORS
import re
import os
from functools import wraps
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get API key from environment variable
API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyC4MuJYakQd4T-T74c6kfZ9KBpZNzukJ8Q')

# Input validation helper functions
def sanitize_input(text, max_length=255):
    """Sanitize text input"""
    if not isinstance(text, str):
        return ""
    # Remove potentially dangerous characters
    cleaned = re.sub(r'[<>"\']', '', text.strip())
    return cleaned[:max_length]

def validate_required_fields(required_fields):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            json_data = request.get_json()
            if not json_data:
                return jsonify({'error': 'Invalid JSON data'}), 400
            for field in required_fields:
                if field not in json_data or not str(json_data[field]).strip():
                    return jsonify({'error': f'Missing required field: {field}'}), 400
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def validate_user_data(data):
    """Validate user input data"""
    required_fields = ['pH', 'Temperature', 'Rainfall', 'Soil_Type', 'Season']
    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            return False, f"Missing required field: {field}"
    
    # Validate numeric fields
    try:
        ph = float(data.get('pH', 0))
        temp = float(data.get('Temperature', 0))
        rainfall = float(data.get('Rainfall', 0))
        
        if not (0 <= ph <= 14):
            return False, "pH must be between 0 and 14"
        if not (-10 <= temp <= 50):
            return False, "Temperature must be between -10°C and 50°C"
        if rainfall < 0:
            return False, "Rainfall cannot be negative"
            
    except (ValueError, TypeError):
        return False, "Invalid numeric values provided"
    
    return True, "Valid"

try:
    genai.configure(api_key=API_KEY)
    genai_model = genai.GenerativeModel('gemini-2.5-flash')
    print("Google AI Model initialized successfully.")
except Exception as e:
    print(f"Error initializing Google AI Model: {e}")
    genai_model = None

def get_ai_crop_recommendation(user_data):
    """Get AI-powered crop recommendation and farming guide"""
    
    # Sanitize user data before processing
    sanitized_data = {}
    for key, value in user_data.items():
        if isinstance(value, (int, float)):
            sanitized_data[key] = value
        else:
            sanitized_data[key] = sanitize_input(str(value), 100)

    # Try Gemini AI first
    if genai_model:
        try:
            # Create comprehensive prompt for Gemini
            prompt = f"""
            You are an expert agricultural AI assistant. Based on the following farm conditions, provide a comprehensive crop recommendation and farming guide.

            Farm Conditions:
            - Soil pH: {sanitized_data.get('pH', 'N/A')}
            - Temperature: {sanitized_data.get('Temperature', 'N/A')}°C
            - Rainfall: {sanitized_data.get('Rainfall', 'N/A')} mm
            - Soil Type: {sanitized_data.get('Soil_Type', 'N/A')}
            - Season: {sanitized_data.get('Season', 'N/A')}
            - Market Demand: {sanitized_data.get('Market_Demand', 'Medium')}
            - Current Fertilizer: {sanitized_data.get('Fertilizer_Used', 'None')}
            - Pest Issues: {sanitized_data.get('Pest_Issue', 'None')}
            - Irrigation Method: {sanitized_data.get('Irrigation_Method', 'Rainfed')}

            Please provide your response in the following JSON format:
            {{
                "crop": "Recommended crop name",
                "confidence": "High/Medium/Low",
                "guide": {{
                    "title": "Complete Growing Guide for [Crop Name]",
                    "timeline": "Detailed planting and harvesting timeline with specific months and duration",
                    "how_to_plant": "Step-by-step planting instructions including seed depth, spacing, and preparation",
                    "fertilizer": "Comprehensive fertilization schedule with specific NPK ratios and application timing",
                    "ideal_rainfall": "Water requirements, irrigation schedule, and rainfall recommendations",
                    "post_harvest": "Storage, processing, marketing, and value addition strategies"
                }},
                "additional_tips": [
                    "Practical farming tip 1",
                    "Practical farming tip 2",
                    "Practical farming tip 3"
                ],
                "expected_yield": "Expected yield per acre/hectare",
                "market_price": "Current market price range and best selling periods"
            }}

            Ensure all recommendations are practical, region-appropriate, and consider the specific conditions provided.
            """
            
            response = genai_model.generate_content(prompt)
            response_text = response.text.strip()
            
            # Clean and extract JSON from response
            start = response_text.find('{')
            end = response_text.rfind('}')
            
            if start != -1 and end != -1:
                json_str = response_text[start:end+1]
                ai_response = json.loads(json_str)
                print("✅ Gemini AI response received successfully")
                return ai_response
                
        except Exception as e:
            print(f"⚠️ Gemini AI failed: {str(e)}")
            # Fall through to intelligent fallback
    
    # Intelligent fallback system based on conditions
    return get_intelligent_fallback_recommendation(sanitized_data)

def get_intelligent_fallback_recommendation(data):
    """Intelligent fallback recommendation system"""
    
    # Extract key parameters
    ph = float(data.get('pH', 7.0))
    temp = float(data.get('Temperature', 25.0))
    rainfall = float(data.get('Rainfall', 500.0))
    soil_type = data.get('Soil_Type', 'Loamy').lower()
    season = data.get('Season', 'Monsoon').lower()
    
    # Crop recommendation logic based on conditions
    crop_recommendations = {
        'monsoon': {
            'rice': {'ph_range': (5.5, 7.0), 'temp_range': (20, 35), 'rainfall_min': 1000, 'soils': ['clay', 'loamy']},
            'sugarcane': {'ph_range': (6.0, 8.0), 'temp_range': (20, 30), 'rainfall_min': 750, 'soils': ['clay', 'loamy']},
            'cotton': {'ph_range': (5.8, 8.0), 'temp_range': (21, 30), 'rainfall_min': 500, 'soils': ['black', 'loamy']},
            'maize': {'ph_range': (6.0, 7.5), 'temp_range': (21, 27), 'rainfall_min': 600, 'soils': ['loamy', 'sandy']}
        },
        'winter': {
            'wheat': {'ph_range': (6.0, 7.5), 'temp_range': (10, 25), 'rainfall_min': 300, 'soils': ['loamy', 'clay']},
            'barley': {'ph_range': (6.0, 7.5), 'temp_range': (12, 25), 'rainfall_min': 250, 'soils': ['loamy', 'sandy']},
            'mustard': {'ph_range': (6.0, 7.5), 'temp_range': (10, 25), 'rainfall_min': 200, 'soils': ['loamy', 'sandy']},
            'peas': {'ph_range': (6.0, 7.0), 'temp_range': (10, 20), 'rainfall_min': 300, 'soils': ['loamy', 'clay']}
        },
        'summer': {
            'tomato': {'ph_range': (6.0, 7.0), 'temp_range': (20, 30), 'rainfall_min': 400, 'soils': ['loamy', 'sandy']},
            'cucumber': {'ph_range': (6.0, 7.0), 'temp_range': (18, 30), 'rainfall_min': 350, 'soils': ['loamy', 'sandy']},
            'okra': {'ph_range': (6.0, 7.5), 'temp_range': (25, 35), 'rainfall_min': 300, 'soils': ['loamy', 'sandy']},
            'watermelon': {'ph_range': (6.0, 7.0), 'temp_range': (20, 30), 'rainfall_min': 400, 'soils': ['sandy', 'loamy']}
        }
    }
    
    # Find best crop match
    season_crops = crop_recommendations.get(season, crop_recommendations['monsoon'])
    best_crop = None
    best_score = 0
    
    for crop, requirements in season_crops.items():
        score = 0
        
        # pH compatibility
        if requirements['ph_range'][0] <= ph <= requirements['ph_range'][1]:
            score += 3
        elif abs(ph - sum(requirements['ph_range'])/2) < 1:
            score += 1
            
        # Temperature compatibility
        if requirements['temp_range'][0] <= temp <= requirements['temp_range'][1]:
            score += 3
        elif abs(temp - sum(requirements['temp_range'])/2) < 5:
            score += 1
            
        # Rainfall compatibility
        if rainfall >= requirements['rainfall_min']:
            score += 2
        elif rainfall >= requirements['rainfall_min'] * 0.8:
            score += 1
            
        # Soil compatibility
        if soil_type in requirements['soils']:
            score += 2
            
        if score > best_score:
            best_score = score
            best_crop = crop
    
    # Default fallback
    if not best_crop:
        best_crop = 'mixed vegetables'
    
    # Determine confidence based on score
    confidence = 'High' if best_score >= 8 else 'Medium' if best_score >= 5 else 'Low'
    
    # Generate comprehensive guide
    guides = {
        'rice': {
            'timeline': 'Plant: June-July (Monsoon) | Harvest: November-December (120-150 days)',
            'how_to_plant': 'Prepare nursery beds, sow seeds in puddle fields, transplant 25-30 day old seedlings with 20x15 cm spacing',
            'fertilizer': 'Apply 120:60:40 kg NPK per hectare. Basal dose at transplanting, top dress nitrogen in 2-3 splits',
            'ideal_rainfall': 'Requires 1000-1200mm water. Maintain 2-5cm standing water during vegetative growth',
            'post_harvest': 'Dry to 14% moisture, store in cool dry place. Market timing: December-January for best prices'
        },
        'wheat': {
            'timeline': 'Plant: November-December (Rabi) | Harvest: March-April (120-150 days)',
            'how_to_plant': 'Sow seeds 2-3cm deep with 20-23cm row spacing. Seed rate: 100-125 kg/hectare',
            'fertilizer': 'Apply 120:60:40 kg NPK per hectare. Full P&K at sowing, nitrogen in 2-3 splits',
            'ideal_rainfall': 'Requires 300-400mm water. 4-6 irrigations at critical growth stages',
            'post_harvest': 'Harvest at physiological maturity, dry to 12% moisture. Store in moisture-proof containers'
        },
        'tomato': {
            'timeline': 'Plant: February-March (Summer) | Harvest: May-June (90-120 days)',
            'how_to_plant': 'Raise seedlings in nursery, transplant 4-6 week old seedlings with 60x45 cm spacing',
            'fertilizer': 'Apply 150:100:100 kg NPK per hectare. Weekly liquid fertilizer during fruiting',
            'ideal_rainfall': 'Requires 400-600mm water. Drip irrigation recommended for water efficiency',
            'post_harvest': 'Harvest at breaker stage, store at 12-15°C. Market within 7-10 days for best returns'
        }
    }
    
    guide = guides.get(best_crop, {
        'timeline': f'Optimal planting season: {season.title()}. Consult local agricultural extension for specific timing',
        'how_to_plant': 'Follow standard agricultural practices for your region. Prepare soil, select quality seeds, maintain proper spacing',
        'fertilizer': 'Use balanced NPK fertilizer based on soil test recommendations. Apply organic matter for soil health',
        'ideal_rainfall': 'Ensure adequate water supply through irrigation. Monitor soil moisture regularly',
        'post_harvest': 'Proper harvesting, drying, and storage are crucial. Time marketing for best prices'
    })
    
    return {
        "crop": best_crop.title(),
        "confidence": confidence,
        "guide": {
            "title": f"Complete Growing Guide for {best_crop.title()}",
            "timeline": guide['timeline'],
            "how_to_plant": guide['how_to_plant'],
            "fertilizer": guide['fertilizer'],
            "ideal_rainfall": guide['ideal_rainfall'],
            "post_harvest": guide['post_harvest']
        },
        "additional_tips": [
            "Regular soil testing helps optimize fertilizer use",
            "Monitor weather forecasts for irrigation planning",
            "Integrated pest management reduces chemical dependency",
            "Crop rotation maintains soil fertility",
            "Market research helps in crop selection"
        ],
        "expected_yield": "Varies based on management practices and local conditions",
        "market_price": "Check local market rates and seasonal trends",
        "fallback": True,
        "note": "This recommendation is generated using agricultural best practices. For AI-powered recommendations, configure a valid Gemini API key."
    }

@app.route('/')
def home():
    return render_template('cropplan.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Validate content type
        if not request.is_json:
            return jsonify({'error': 'Content-Type must be application/json'}), 400
        
        json_data = request.get_json()
        
        # Validate user data
        is_valid, message = validate_user_data(json_data)
        if not is_valid:
            return jsonify({'error': message}), 400
        
        # Get AI recommendation
        ai_response = get_ai_crop_recommendation(json_data)
        
        if 'error' in ai_response:
            return jsonify({'error': ai_response['error']}), 500
            
        return jsonify({
            'success': True,
            'crop': ai_response.get('crop', 'Unknown'),
            'confidence': ai_response.get('confidence', 'Medium'),
            'guide': ai_response.get('guide', {}),
            'additional_tips': ai_response.get('additional_tips', []),
            'expected_yield': ai_response.get('expected_yield', 'N/A'),
            'market_price': ai_response.get('market_price', 'N/A'),
            'is_fallback': ai_response.get('fallback', False)
        })

    except Exception as e:
        app.logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': 'Prediction failed. Please try again.'}), 500

# Health check endpoint
@app.route('/health')
def health_check():
    return jsonify({
        'status': 'healthy',
        'gemini_configured': genai_model is not None,
        'api_key_present': bool(API_KEY)
    })

# Global error handlers
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'error': 'Bad request'}), 400

@app.errorhandler(500)
def internal_error(error):
    app.logger.error(f"Internal error: {str(error)}")
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    print(f"Starting Crop Planner with Gemini API...")
    print(f"API Key configured: {'Yes' if API_KEY else 'No'}")
    app.run(port=5003, debug=True)