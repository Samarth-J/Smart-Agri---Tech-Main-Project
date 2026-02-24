# How to Start the Flask Server

## Quick Start

### Option 1: Command Line
```bash
python app.py
```

The server will start on `http://localhost:5000`

### Option 2: Background Process
```bash
# Windows
start python app.py

# Or use Python directly
python app.py &
```

## Verify Flask is Running

### Check if server is responding:
```bash
curl http://localhost:5000/api/ollama-status
```

Should return JSON with Ollama status.

### Check Python processes:
```powershell
Get-Process | Where-Object {$_.ProcessName -like "*python*"}
```

### Check port 5000:
```powershell
netstat -ano | findstr :5000
```

## Common Issues

### Port 5000 already in use:
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Then restart Flask
python app.py
```

### Flask not auto-reloading:
- Stop Flask (Ctrl+C)
- Restart: `python app.py`
- Debug mode is enabled, so it should auto-reload on file changes

### Import errors:
```bash
# Install requirements
pip install flask flask-cors python-dotenv requests joblib numpy xgboost

# Or if you have requirements.txt
pip install -r requirements.txt
```

## Testing After Start

### Test Ollama connection:
```bash
curl http://localhost:5000/api/ollama-status
```

### Test quick disease analysis:
```bash
python test_quick_mode.py
```

### Test in browser:
1. Open `http://localhost:5000/disease-prediction.html`
2. Upload an image
3. Click "Quick General Guide"
4. Should respond in 30-60 seconds

## Expected Output

When Flask starts successfully, you should see:
```
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
 * Debugger is active!
```

## Troubleshooting

### Flask crashes immediately:
- Check for syntax errors: `python -m py_compile app.py`
- Check imports: Make sure all required packages are installed
- Check .env file: Make sure environment variables are set

### Flask runs but endpoints don't work:
- Check Flask logs in terminal
- Look for error messages
- Test with curl or Postman first
- Check CORS settings if accessing from browser

### Changes not reflecting:
- Flask debug mode should auto-reload
- If not, manually restart Flask
- Clear browser cache
- Check if you're editing the right file

## Production Deployment

For production, use a proper WSGI server:
```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

Or use waitress (Windows-friendly):
```bash
pip install waitress
waitress-serve --port=5000 app:app
```
