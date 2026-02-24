import requests

OLLAMA_BASE_URL = "http://localhost:11434"

# Test with llama3.1:latest
payload = {
    "model": "llama3.1:latest",
    "prompt": "Say hello in one sentence.",
    "stream": False
}

print("Testing Ollama with llama3.1:latest...")
try:
    response = requests.post(
        f"{OLLAMA_BASE_URL}/api/generate",
        json=payload,
        timeout=30
    )
    
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"✅ Success!")
        print(f"Response: {result.get('response', 'No response')}")
    else:
        print(f"❌ Error: {response.text}")
except Exception as e:
    print(f"❌ Exception: {e}")
