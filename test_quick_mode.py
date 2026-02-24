import requests
import json
import time

# Test the quick mode (text-based) disease detection
url = "http://localhost:5000/api/analyze-disease"

# Test with quick mode (use_vision: false)
test_data = {
    "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==",
    "use_vision": False  # Use quick text-based mode
}

print("Testing Quick Guide Mode (text-based)...")
print(f"URL: {url}")
print(f"⚡ This should respond in 30-60 seconds...")
print(f"Started at: {time.strftime('%H:%M:%S')}")

start_time = time.time()

try:
    response = requests.post(
        url,
        json=test_data,
        timeout=120  # 2 minutes should be plenty
    )
    
    elapsed = time.time() - start_time
    print(f"\n✅ Response received in {elapsed:.1f} seconds")
    print(f"Response Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"Status: {result.get('status')}")
        print(f"Model: {result.get('model')}")
        print(f"Mode: {result.get('mode')}")
        print(f"\nAnalysis Preview (first 500 chars):")
        analysis = result.get('analysis', 'No analysis')
        print(analysis[:500] + "..." if len(analysis) > 500 else analysis)
    else:
        print(f"\n❌ Error Response:")
        print(json.dumps(response.json(), indent=2))
    
except requests.exceptions.Timeout:
    elapsed = time.time() - start_time
    print(f"\n❌ Request timed out after {elapsed:.1f} seconds")
except requests.exceptions.ConnectionError as e:
    print(f"\n❌ Connection error: {e}")
    print("Is Flask running on port 5000?")
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
