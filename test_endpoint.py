import requests
import json

# Test the disease detection endpoint
url = "http://localhost:5000/api/analyze-disease"

# Simple test with minimal data
test_data = {
    "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg=="
}

print("Testing disease detection endpoint...")
print(f"URL: {url}")
print(f"Sending POST request...")

try:
    response = requests.post(
        url,
        json=test_data,
        timeout=10
    )
    
    print(f"\nResponse Status: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    print(f"\nResponse Body:")
    print(json.dumps(response.json(), indent=2))
    
except requests.exceptions.Timeout:
    print("❌ Request timed out (expected for vision model)")
    print("This is normal - vision model takes 3-10 minutes")
except requests.exceptions.ConnectionError as e:
    print(f"❌ Connection error: {e}")
    print("Is Flask running on port 5000?")
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
