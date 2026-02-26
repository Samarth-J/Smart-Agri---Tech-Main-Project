# AI Chatbot Troubleshooting Guide

## Issue: Chatbot Not Responding

### ✅ Backend is Working
The chat endpoint has been tested and is working correctly:
- Flask server is running on port 5000
- Ollama is connected with llama3.1:latest model
- `/chat` endpoint responds successfully
- Test shows proper AI responses

### 🔍 Common Issues & Solutions

#### 1. Opening HTML File Directly (Most Common Issue)
**Problem**: Opening `chat.html` directly from file explorer (file:// URL)

**Solution**: Access through Flask server
```
✅ Correct: http://localhost:5000/chat.html
❌ Wrong: file:///C:/path/to/chat.html
```

**How to Fix**:
1. Make sure Flask is running: `python app.py`
2. Open browser and go to: `http://localhost:5000/chat.html`
3. Or from main.html, click the chat link

#### 2. Flask Not Running
**Problem**: Flask server is not started

**Solution**:
```bash
# Start Flask
python app.py

# Should see:
# * Running on http://127.0.0.1:5000
```

#### 3. Ollama Not Running
**Problem**: Ollama service is not started

**Solution**:
```bash
# Check if Ollama is running
ollama list

# If not running, start it
ollama serve
```

#### 4. CORS Issues
**Problem**: Browser blocking requests due to CORS

**Solution**: Already configured in app.py
```python
CORS(app, resources={r"/*": {"origins": [...]}})
```

Make sure you're accessing from allowed origins:
- http://127.0.0.1:5500
- http://localhost:5500
- http://127.0.0.1:5001
- http://localhost:5001

#### 5. Browser Console Errors
**Problem**: JavaScript errors preventing chat from working

**Solution**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors:
   - Network errors → Check Flask is running
   - CORS errors → Access through Flask URL
   - 404 errors → Check endpoint URL

### 🧪 Testing Steps

#### Test 1: Check Flask Server
```bash
curl http://localhost:5000/api/ollama-status
```
Should return JSON with status: "connected"

#### Test 2: Test Chat Endpoint
```bash
python test_chat.py
```
Should return AI response about summer crops

#### Test 3: Test in Browser
1. Open: http://localhost:5000/chat.html
2. Type a message: "Hello"
3. Click Send
4. Should see typing indicator
5. Should receive AI response

### 📝 Correct Access Methods

#### From Main Dashboard
```
main.html → Click "AI Assistant" → Opens chat.html through Flask
```

#### Direct URL
```
http://localhost:5000/chat.html
```

#### From Index
```
index.html → Navigate to chat → Opens through Flask
```

### ⚠️ What NOT to Do

❌ Don't open chat.html by double-clicking the file
❌ Don't use file:// URLs
❌ Don't access without Flask running
❌ Don't use different ports than configured

### 🔧 Quick Fix Checklist

- [ ] Flask is running (`python app.py`)
- [ ] Ollama is running (`ollama serve`)
- [ ] Accessing via http://localhost:5000/chat.html
- [ ] Browser console shows no errors (F12)
- [ ] Network tab shows successful POST to /chat
- [ ] Response status is 200

### 📊 Expected Behavior

1. **User types message** → Message appears in chat
2. **Clicks Send** → "AgriBot is typing..." appears
3. **Wait 5-30 seconds** → AI response appears
4. **Response includes** → Formatted text with farming advice

### 🐛 Debug Mode

Add this to chat.js to see detailed logs:
```javascript
console.log('Sending to:', API_URL);
console.log('Message:', input);
console.log('Response:', data);
```

### 💡 Pro Tips

1. **First message takes longer** (model loading)
2. **Subsequent messages are faster** (model cached)
3. **Complex questions take longer** (more processing)
4. **Keep messages under 1000 characters**
5. **Check browser console for errors**

### 🎯 Success Indicators

✅ Typing indicator appears
✅ Response arrives within 30 seconds
✅ Response is relevant to question
✅ No console errors
✅ Can send multiple messages

### 📞 Still Not Working?

1. **Restart Flask**: Stop and start `python app.py`
2. **Restart Ollama**: Stop and start `ollama serve`
3. **Clear browser cache**: Ctrl+Shift+Delete
4. **Try different browser**: Chrome, Firefox, Edge
5. **Check firewall**: Allow port 5000

### 🔍 Advanced Debugging

#### Check Flask Logs
Look for:
```
127.0.0.1 - - [date] "POST /chat HTTP/1.1" 200 -
```

#### Check Ollama Logs
Look for:
```
time=... level=INFO msg="request completed"
```

#### Check Network Tab (F12)
- Request URL: http://localhost:5000/chat
- Method: POST
- Status: 200
- Response: JSON with "status": "success"

### ✅ Verified Working

The chatbot has been tested and confirmed working with:
- Message: "Hello, what crops are good for summer?"
- Response: Detailed list of summer crops
- Model: llama3.1:latest
- Response time: ~5 seconds

## Summary

The chatbot backend is fully functional. If it's not responding:
1. Make sure you're accessing through Flask (http://localhost:5000/chat.html)
2. Ensure Flask and Ollama are both running
3. Check browser console for errors
4. Use the test script to verify backend is working

The most common issue is opening the HTML file directly instead of through the Flask server!
