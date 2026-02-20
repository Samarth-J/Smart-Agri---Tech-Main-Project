import requests
import base64
import json

# Test if Ollama vision is working
OLLAMA_BASE_URL = "http://localhost:11434"

# Create a simple test with a tiny image (1x1 pixel red)
# This is a 1x1 red pixel PNG in base64
test_image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=="

print("Testing Ollama Vision API...")
print(f"Base URL: {OLLAMA_BASE_URL}")

# Test 1: Check if Ollama is running
try:
    response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
    if response.status_code == 200:
        models = response.json().get('models', [])
        print(f"✅ Ollama is running")
        print(f"Available models: {[m['name'] for m in models]}")
        
        # Check if vision model exists
        has_vision = any('vision' in m['name'] for m in models)
        if has_vision:
            print("✅ Vision model found")
        else:
            print("❌ Vision model NOT found")
            print("Run: ollama pull llama3.2-vision:latest")
            exit(1)
    else:
        print(f"❌ Ollama returned status {response.status_code}")
        exit(1)
except Exception as e:
    print(f"❌ Cannot connect to Ollama: {e}")
    exit(1)

# Test 2: Try vision analysis
print("\nTesting vision analysis with test image...")
payload = {
    "model": "llama3.2-vision:latest",
    "prompt": "What do you see in this image? Describe it briefly.",
    "images": [test_image],
    "stream": False,
    "options": {
        "temperature": 0.3,
        "num_predict": 100,
    }
}

try:
    print("Sending request to Ollama...")
    print("⚠️ First request may take 3-5 minutes as the model loads into memory...")
    response = requests.post(
        f"{OLLAMA_BASE_URL}/api/generate",
        json=payload,
        timeout=600  # 10 minutes for first load
    )
    
    print(f"Response status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Vision analysis successful!")
        print(f"Response: {result.get('response', 'No response')}")
    else:
        print(f"❌ Vision analysis failed")
        print(f"Error: {response.text}")
        
except requests.exceptions.Timeout:
    print("❌ Request timeout - vision model might be loading")
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
