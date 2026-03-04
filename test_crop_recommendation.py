import requests

# Test crop recommendation endpoint
url = "http://localhost:5000/predict"

# Test data
test_data = {
    'N': 90,
    'P': 42,
    'K': 43,
    'temperature': 20.8,
    'humidity': 82.0,
    'ph': 6.5,
    'rainfall': 202.9
}

print("Testing crop recommendation endpoint...")
print(f"URL: {url}")
print(f"Data: {test_data}")

try:
    response = requests.post(
        url,
        data=test_data,  # Using form data, not JSON
        timeout=120
    )
    
    print(f"\nResponse Status: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"Crop: {result.get('crop', 'N/A')}")
        print(f"Reason: {result.get('reason', 'N/A')}")
        print(f"Yield: {result.get('yield_potential', 'N/A')}")
        print(f"Tips: {result.get('tips', [])}")
        print(f"Model: {result.get('model', 'N/A')}")
    else:
        print(f"\n❌ Error Response:")
        print(response.text)
        
except requests.exceptions.Timeout:
    print("❌ Request timed out")
except requests.exceptions.ConnectionError as e:
    print(f"❌ Connection error: {e}")
    print("Is Flask running on port 5000?")
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
