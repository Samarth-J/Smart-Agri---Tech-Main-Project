import requests
import json
import time

# Test the disease detection endpoint with proper timeout
url = "http://localhost:5000/api/analyze-disease"

# Simple test image (1x1 red pixel)
test_data = {
    "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=="
}

print("Testing disease detection endpoint with full timeout...")
print(f"URL: {url}")
print(f"⏰ This will take 3-10 minutes. Please wait...")
print(f"Started at: {time.strftime('%H:%M:%S')}")

start_time = time.time()

try:
    response = requests.post(
        url,
        json=test_data,
        timeout=660  # 11 minutes timeout
    )
    
    elapsed = time.time() - start_time
    print(f"\n✅ Response received in {elapsed:.1f} seconds ({elapsed/60:.1f} minutes)")
    print(f"Response Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"Model: {result.get('model', 'unknown')}")
        print(f"\nAnalysis:")
        print(result.get('analysis', 'No analysis'))
    else:
        print(f"\n❌ Error Response:")
        print(json.dumps(response.json(), indent=2))
    
except requests.exceptions.Timeout:
    elapsed = time.time() - start_time
    print(f"\n❌ Request timed out after {elapsed:.1f} seconds ({elapsed/60:.1f} minutes)")
    print("The vision model is taking too long to respond")
except requests.exceptions.ConnectionError as e:
    print(f"\n❌ Connection error: {e}")
    print("Is Flask running on port 5000?")
except KeyboardInterrupt:
    elapsed = time.time() - start_time
    print(f"\n\n⚠️ Interrupted after {elapsed:.1f} seconds")
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
