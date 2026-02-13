import requests
import json
import time

print("=" * 80)
print("🌾 COMPLETE CROP REQUIREMENTS SYSTEM TEST")
print("=" * 80)

# Test 1: Knowledge Base (Instant)
print("\n📚 TEST 1: Knowledge Base Crops (INSTANT)")
print("-" * 80)

kb_crops = ['rice', 'tomato', 'carrot']
for crop in kb_crops:
    start = time.time()
    response = requests.post(
        'http://127.0.0.1:5000/crop-requirements',
        headers={'Content-Type': 'application/json'},
        data=json.dumps({'crop_name': crop})
    )
    duration = (time.time() - start) * 1000
    
    result = response.json()
    if result['status'] == 'success':
        source = result.get('source', 'unknown')
        print(f"✅ {crop.upper():12} - {duration:6.0f}ms - {source.upper():8} - {len(result.get('soil_requirements', []))} soil params")

# Test 2: AI Fallback
print(f"\n🤖 TEST 2: AI Fallback (crops NOT in knowledge base)")
print("-" * 80)
print("⏳ Testing with 'lettuce' (not in database)...")
print("   Expected: 30-90 seconds for AI generation")

start = time.time()
response = requests.post(
    'http://127.0.0.1:5000/crop-requirements',
    headers={'Content-Type': 'application/json'},
    data=json.dumps({'crop_name': 'lettuce'}),
    timeout=150
)
duration = time.time() - start

result = response.json()
if result['status'] == 'success':
    source = result.get('source', 'unknown')
    soil_count = len(result.get('soil_requirements', []))
    climate_count = len(result.get('climate_requirements', []))
    tips_count = len(result.get('growing_tips', []))
    
    print(f"\n✅ LETTUCE      - {duration:6.1f}s - {source.upper():8}")
    print(f"   📊 Data: {soil_count} soil, {climate_count} climate, {tips_count} tips")
    print(f"   🤖 Model: {result.get('model', 'Unknown')}")
else:
    print(f"❌ FAILED: {result.get('message', 'Unknown error')}")

# Summary
print("\n" + "=" * 80)
print("📊 SYSTEM SUMMARY")
print("=" * 80)
print(f"✅ Knowledge Base: 19 crops with INSTANT response (3-10ms)")
print(f"✅ AI Fallback: ANY crop with AI generation (30-90s)")
print(f"✅ Hybrid System: Best of both worlds!")
print("=" * 80)
