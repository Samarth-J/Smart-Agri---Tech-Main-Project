import requests

# Test data
test_data = {
    'N': 90,
    'P': 42,
    'K': 43,
    'temperature': 20.87,
    'humidity': 82.00,
    'ph': 6.50,
    'rainfall': 202.93
}

print("Testing AI-Powered Crop Recommendation with Llama3...")
print(f"Input: {test_data}\n")

# Make request
response = requests.post('http://127.0.0.1:5000/predict', data=test_data)

print(f"Status Code: {response.status_code}")
result = response.json()

if result['status'] == 'success':
    print(f"\n✅ SUCCESS!")
    print(f"🌾 Recommended Crop: {result['crop'].upper()}")
    print(f"\n💡 Reason: {result.get('reason', 'N/A')}")
    print(f"\n📊 Yield Potential: {result.get('yield_potential', 'N/A')}")
    
    if result.get('tips'):
        print(f"\n🌱 Growing Tips:")
        for i, tip in enumerate(result['tips'], 1):
            print(f"   {i}. {tip}")
    
    print(f"\n🤖 Model Used: {result.get('model', 'Unknown')}")
else:
    print(f"\n❌ ERROR: {result.get('message', 'Unknown error')}")

