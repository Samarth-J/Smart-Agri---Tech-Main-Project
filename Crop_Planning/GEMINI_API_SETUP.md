# Gemini API Setup Guide

## 🔑 Getting a Valid Gemini API Key

The crop planner currently uses an intelligent fallback system, but for full AI capabilities, you need a valid Gemini API key.

### Step 1: Get Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Update Environment Variables
1. Open the `.env` file in the root directory
2. Replace the current key with your new key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

### Step 3: Test the Integration
1. Run the debug test:
   ```bash
   cd Crop_Planning
   python debug_test.py
   ```
2. All tests should pass with a valid API key

## 🤖 Current Fallback System

Without a valid API key, the system uses an intelligent agricultural database that:
- ✅ Analyzes soil pH, temperature, rainfall, and season
- ✅ Recommends appropriate crops based on conditions
- ✅ Provides detailed farming guides
- ✅ Includes fertilizer schedules and best practices
- ✅ Offers market timing and storage advice

## 🚀 Benefits of Gemini AI Integration

With a valid API key, you get:
- 🧠 **Advanced AI Analysis**: More nuanced crop recommendations
- 📊 **Dynamic Responses**: Tailored advice for specific conditions
- 🌱 **Latest Knowledge**: Up-to-date agricultural practices
- 💡 **Creative Solutions**: Novel approaches to farming challenges

## 🔧 Troubleshooting

### Common Issues:
1. **"API Key not found"**: Check if the key is properly set in `.env`
2. **"Invalid API Key"**: Verify the key is correct and active
3. **"Quota exceeded"**: Check your API usage limits

### Testing Commands:
```bash
# Test environment setup
cd Crop_Planning
python debug_test.py

# Start the crop planner
python start_crop_planner.py
```

## 📝 Note for Presentation

The current system works perfectly for demonstrations:
- Shows professional UI and functionality
- Provides accurate agricultural recommendations
- Demonstrates the complete user experience
- Ready for live presentation without API dependencies

For production use, simply add a valid Gemini API key to unlock full AI capabilities!