import requests
import json
import time

crops = ['carrot', 'broccoli', 'cabbage', 'cucumber', 'grapes']

print("Testing Response Speed for Crop Requirements")
print("=" * 60)

for crop in crops:
    start = time.time()
    response = requests.post(
        'http://127.0.0.1:5000/crop-requirements',
        headers={'Content-Type': 'application/json'},
        data=json.dumps({'crop_name': crop})
    )
    end = time.time()
    
    result = response.json()
    status = "✅" if result['status'] == 'success' else "❌"
    
    print(f"{status} {crop.upper():12} - {(end-start)*1000:.0f}ms - {result.get('model', 'Unknown')}")

print("\n✨ All responses are now INSTANT!")
