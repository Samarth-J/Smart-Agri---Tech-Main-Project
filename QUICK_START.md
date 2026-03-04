# 🚀 AgriTech - Quick Start Guide

## Get Started in 3 Steps!

### Step 1: Activate Virtual Environment
```bash
.venv\Scripts\activate
```

### Step 2: Start Flask Server
```bash
python app.py
```

### Step 3: Open Your Browser
Navigate to: **http://localhost:5000**

---

## 🎯 Quick Access Links

Once the server is running, access these features:

### Main Pages
- **Homepage**: http://localhost:5000/
- **Dashboard**: http://localhost:5000/main.html
- **About**: http://localhost:5000/about.html
- **Login**: http://localhost:5000/login.html
- **Register**: http://localhost:5000/register.html

### Smart Features
- **🌤️ Weather Check**: http://localhost:5000/weather.html
  - 3D animated weather visualization
  - City autocomplete (40+ Indian cities)
  - Air Quality Index (AQI)
  - Detailed forecasts

- **🦠 Disease Detection**: http://localhost:5000/disease-prediction.html
  - Upload crop images
  - AI-powered analysis
  - Treatment recommendations
  - Quick mode (60s) or Full analysis (3-10 min)

- **💬 AI Chatbot**: http://localhost:5000/chat.html
  - Ask farming questions
  - Crop recommendations
  - Agricultural advice
  - Powered by Ollama AI

- **👷 Labour Scheduling**: http://localhost:5000/labour.html
  - Schedule farm workers
  - Set alerts and reminders
  - Track labour costs
  - News updates

- **📅 Crop Calendar**: http://localhost:5000/cropCalendar.html
  - Plan crop schedules
  - Track planting dates
  - Harvest reminders

### ML-Powered Tools
- **🌾 Crop Recommendation**: http://localhost:5000/Crop%20Recommendation/templates/index.html
  - Input soil parameters
  - Get crop suggestions
  - ML-based predictions

- **📊 Yield Prediction**: http://localhost:5000/Crop%20Yield%20Prediction/crop_yield_app/templates/index.html
  - Predict crop yields
  - XGBoost model
  - State-wise data

- **🤖 Crop Planner**: http://localhost:5000/Crop_Planning/templates/cropplan.html
  - AI-powered planning
  - Gemini API integration
  - Personalized recommendations

---

## 📱 Mobile Testing

### Test on Your Phone
1. Find your computer's IP address:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.100)

2. On your phone's browser, visit:
   ```
   http://YOUR_IP_ADDRESS:5000
   ```
   Example: http://192.168.1.100:5000

3. Make sure your phone and computer are on the same WiFi network!

---

## 🔧 Troubleshooting

### Flask Server Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process if needed
taskkill /PID <process_id> /F

# Try again
python app.py
```

### Chatbot Not Responding
1. Make sure Ollama is running:
   ```bash
   ollama list
   ```
   Should show: llama3.1:latest

2. Access through Flask server (http://localhost:5000/chat.html)
   NOT directly (file:///...)

3. Check console for errors (F12 in browser)

### Disease Detection Not Working
1. Verify vision model is installed:
   ```bash
   ollama list
   ```
   Should show: llama3.2-vision:latest

2. If not installed:
   ```bash
   ollama pull llama3.2-vision:latest
   ```

3. Use Quick Mode first (faster, 60-70 seconds)

### Weather Page Issues
1. Check internet connection (uses external API)
2. Clear browser cache
3. Try different city names
4. Check browser console for errors

---

## 🎨 Features Overview

### ✅ Fully Responsive
- Works on mobile, tablet, desktop
- Touch-optimized (44px+ buttons)
- No horizontal scrolling
- Fluid typography
- WCAG AA accessible

### ✅ AI-Powered
- Ollama chatbot (llama3.1)
- Vision analysis (llama3.2-vision)
- Gemini crop planning
- ML crop recommendations
- XGBoost yield predictions

### ✅ Beautiful UI
- Purple-pink gradients
- Glass-morphism effects
- 3D weather animations
- Smooth transitions
- Modern design

### ✅ Comprehensive
- Weather forecasting
- Disease detection
- Labour management
- Crop planning
- Yield prediction
- AI assistance

---

## 📚 Documentation

### For Detailed Information
- `PROJECT_STATUS.md` - Complete system status
- `RESPONSIVE_DESIGN.md` - Responsive design guide
- `CHATBOT_TROUBLESHOOTING.md` - Chatbot help
- `DISEASE_DETECTION_FINAL.md` - Disease detection guide
- `CROP_SYSTEM_SUMMARY.md` - Crop systems overview

### For Testing
- `test_chat.py` - Test chatbot backend
- `test_vision_simple.py` - Test vision model
- `chat-test.html` - Frontend diagnostics

---

## 🎯 Common Tasks

### Add a New Page
1. Create HTML file in root directory
2. Add responsive.css link:
   ```html
   <link rel="stylesheet" href="responsive.css" />
   ```
3. Test on mobile and desktop

### Update Styles
1. Edit `responsive.css` for global changes
2. Edit page-specific CSS for local changes
3. Test across breakpoints (320px, 480px, 768px, 1024px)

### Add New Route
1. Edit `app.py`
2. Add route function:
   ```python
   @app.route('/new-page')
   def new_page():
       return render_template('new-page.html')
   ```
3. Restart Flask server

---

## 🚀 Performance Tips

### For Faster Loading
- Images are optimized
- CSS is minified
- JavaScript is deferred
- Caching is enabled

### For Better Mobile Experience
- Use WiFi for first load
- Enable browser caching
- Close unused tabs
- Update browser to latest version

---

## 🎉 You're All Set!

Your AgriTech platform is ready to use. Start the Flask server and explore all the features!

**Need Help?**
- Check `PROJECT_STATUS.md` for system overview
- Read `CHATBOT_TROUBLESHOOTING.md` for chatbot issues
- Review `RESPONSIVE_DESIGN.md` for mobile tips

**Happy Farming! 🌾**

---

**Last Updated**: March 5, 2026
**Version**: 2.0
