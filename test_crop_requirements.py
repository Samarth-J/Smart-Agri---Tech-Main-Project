import requests
import json

# Test data
test_crop = "tomato"

print(f"Testing Crop Requirements Feature for: {test_crop.upper()}")
print("=" * 60)

# Make request
response = requests.post(
    'http://127.0.0.1:5000/crop-requirements',
    headers={'Content-Type': 'application/json'},
    data=json.dumps({'crop_name': test_crop})
)

print(f"\nStatus Code: {response.status_code}")
result = response.json()

if result['status'] == 'success':
    print(f"\n✅ SUCCESS!")
    print(f"\n🌾 Crop: {result['crop'].upper()}")
    
    if result.get('soil_requirements'):
        print(f"\n🌱 Soil Requirements:")
        for req in result['soil_requirements']:
            print(f"   • {req}")
    
    if result.get('climate_requirements'):
        print(f"\n🌤️ Climate Requirements:")
        for req in result['climate_requirements']:
            print(f"   • {req}")
    
    if result.get('growing_tips'):
        print(f"\n💡 Growing Tips:")
        for tip in result['growing_tips']:
            print(f"   ✓ {tip}")
    
    if result.get('harvest_info'):
        print(f"\n🌾 Harvest Information:")
        for info in result['harvest_info']:
            print(f"   📅 {info}")
    
    print(f"\n🤖 Model Used: {result.get('model', 'Unknown')}")
else:
    print(f"\n❌ ERROR: {result.get('message', 'Unknown error')}")
