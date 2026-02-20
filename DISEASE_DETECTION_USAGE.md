# Disease Detection - Usage Guide

## The Issue Was: Timeout
The vision model (7.8 GB) takes 3-10 minutes to load and process images, especially on the first request. The previous timeout was too short.

## ✅ Fixed
- Increased backend timeout from 5 minutes to 10 minutes
- Added better progress indicators
- Improved error messages with console logging
- Created test script to verify functionality

## How to Use Disease Detection

### Step 1: Ensure Ollama is Running
```bash
# Check if Ollama is running
ollama list

# You should see:
# llama3.2-vision:latest
# llama3.1:latest
```

### Step 2: Test the Vision Model (Optional)
```bash
# Run the test script to warm up the model
python test_vision_simple.py

# This will take 3-5 minutes on first run
# Subsequent requests will be faster
```

### Step 3: Use the Disease Detection Page
1. Open `disease-prediction.html` in your browser
2. Click "Choose Image" and select a plant photo
3. Click "Analyze with AI"
4. **WAIT 3-10 MINUTES** - Do not close the page!
5. Watch the progress messages update every 20 seconds
6. View the detailed analysis when complete

## Important Notes

### ⏰ Timing Expectations
- **First request**: 5-10 minutes (model loads into memory)
- **Subsequent requests**: 2-5 minutes (model already loaded)
- **After Ollama restart**: Back to 5-10 minutes

### 💡 Tips for Best Results
1. Use clear, well-lit photos
2. Focus on affected plant parts (leaves, stems)
3. Keep image size under 2MB for faster upload
4. Be patient - the AI is doing complex analysis
5. Don't refresh or close the page during analysis

### 🔍 Debugging
If it's still not working:

1. **Check browser console** (F12 → Console tab)
   - Look for error messages
   - Check request timing

2. **Check Flask server logs**
   - Look for "Calling Ollama Vision API..."
   - Check for timeout or connection errors

3. **Test Ollama directly**
   ```bash
   python test_vision_simple.py
   ```

4. **Restart Ollama**
   ```bash
   # Stop Ollama
   # Then start it again
   ollama serve
   ```

## What the AI Analyzes
The vision model examines:
1. **Disease/Condition**: Identifies what's affecting the plant
2. **Severity**: Rates as Mild/Moderate/Severe
3. **Symptoms**: Describes visible issues
4. **Treatment**: Provides 2-3 practical solutions
5. **Prevention**: Suggests preventive measures

## Technical Details
- **Model**: llama3.2-vision:latest (7.8 GB)
- **Backend timeout**: 600 seconds (10 minutes)
- **Endpoint**: `/api/analyze-disease`
- **Method**: POST with base64 image
- **Response format**: JSON with analysis text

## Troubleshooting Common Issues

### "Analysis timeout"
- **Cause**: Model is loading or system is slow
- **Solution**: Wait and try again, or restart Ollama

### "Vision model not installed"
- **Cause**: Model not pulled
- **Solution**: `ollama pull llama3.2-vision:latest`

### "Cannot connect to Ollama"
- **Cause**: Ollama service not running
- **Solution**: Start Ollama with `ollama serve`

### No response after 10 minutes
- **Cause**: System resources exhausted
- **Solution**: 
  - Close other applications
  - Ensure 8GB+ RAM available
  - Try smaller image
  - Restart Ollama

## Performance Optimization

### To speed up analysis:
1. **Keep Ollama running** - Don't restart it
2. **Use smaller images** - Resize to 800x600 or less
3. **Warm up the model** - Run test script first
4. **Ensure adequate RAM** - 8GB minimum, 16GB recommended
5. **Close other apps** - Free up system resources

## Success Indicators
✅ Progress messages update every 20 seconds
✅ Console shows "Response received in X seconds"
✅ Analysis appears with disease details
✅ Download report button becomes available
