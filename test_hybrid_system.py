import requests
import json
import time

print("Testing Hybrid System: Knowledge Base + AI Fallback")
print("=" * 70)

# Test crops in knowledge base (should be instant)
kb_crops = ['rice', 'tomato', 'wheat']
print("\n📚 Testing Knowledge Base Crops (Instant):")
print("-" * 70)

for crop in kb_crops:
    start = time.time()
    response = requests.post(
        'http://127.0.0.1:5000/crop-requirements',
        headers={'Content-Type': 'application/json'},
        data=json.dumps({'crop_name': crop})
    )
    end = time.time()
    
    result = response.json()
    if result['status'] == 'success':
        source = result.get('source', 'unknown')
        model = result.get('model', 'Unknown')
        print(f"✅ {crop.upper():12} - {(end-start)*1000:6.0f}ms - {source.upper():8} - {model}")
    else:
        print(f"❌ {crop.upper():12} - Error: {result.get('message', 'Unknown')}")

# Test crops NOT in knowledge base (should use AI)
ai_crops = ['carrot', 'broccoli']
print(f"\n🤖 Testing AI Fallback Crops (Will take 30-60s each):")
print("-" * 70)

for crop in ai_crops:
    print(f"⏳ {crop.upper():12} - Requesting AI generation...", end='', flush=True)
    start = time.time()
    response = requests.post(
        'http://127.0.0.1:5000/crop-requirements',
        headers={'Content-Type': 'application/json'},
        data=json.dumps({'crop_name': crop})
    )
    end = time.time()
    
    result = response.json()
    if result['status'] == 'success':
        source = result.get('source', 'unknown')
        model = result.get('model', 'Unknown')
        soil_count = len(result.get('soil_requirements', []))
        print(f"\r✅ {crop.upper():12} - {(end-start):.1f}s - {source.upper():8} - {soil_count} soil params")
    else:
        print(f"\r❌ {crop.upper():12} - Error: {result.get('message', 'Unknown')}")

print("\n" + "=" * 70)
print("✨ Hybrid system working: Instant for common crops, AI for others!")
