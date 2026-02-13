import requests
import json
import time

# Test with a crop NOT in knowledge base
test_crop = "spinach"  # Not in our 19-crop database

print(f"Testing AI Fallback for: {test_crop.upper()}")
print("=" * 70)
print("This crop is NOT in knowledge base, should use Llama3 AI...")
print("Expected time: 30-90 seconds")
print("-" * 70)

start = time.time()

try:
    response = requests.post(
        'http://127.0.0.1:5000/crop-requirements',
        headers={'Content-Type': 'application/json'},
        data=json.dumps({'crop_name': test_crop}),
        timeout=150  # 2.5 minutes timeout
    )
    
    end = time.time()
    duration = end - start
    
    print(f"\n⏱️  Response time: {duration:.1f} seconds")
    print("-" * 70)
    
    result = response.json()
    
    if result['status'] == 'success':
        print(f"✅ SUCCESS!")
        print(f"\n🌾 Crop: {result['crop']}")
        print(f"📊 Source: {result.get('source', 'unknown').upper()}")
        print(f"🤖 Model: {result.get('model', 'Unknown')}")
        
        if result.get('soil_requirements'):
            print(f"\n🌱 Soil Requirements ({len(result['soil_requirements'])} items):")
            for req in result['soil_requirements'][:3]:  # Show first 3
                print(f"   • {req}")
        
        if result.get('climate_requirements'):
            print(f"\n🌤️  Climate Requirements ({len(result['climate_requirements'])} items):")
            for req in result['climate_requirements'][:3]:  # Show first 3
                print(f"   • {req}")
        
        if result.get('growing_tips'):
            print(f"\n💡 Growing Tips ({len(result['growing_tips'])} items):")
            for tip in result['growing_tips']:
                print(f"   ✓ {tip}")
        
        if result.get('harvest_info'):
            print(f"\n🌾 Harvest Info ({len(result['harvest_info'])} items):")
            for info in result['harvest_info']:
                print(f"   📅 {info}")
        
        print("\n" + "=" * 70)
        print("✨ AI Fallback is WORKING!")
        
    else:
        print(f"❌ ERROR: {result.get('message', 'Unknown error')}")
        print("\n" + "=" * 70)
        print("⚠️  AI Fallback FAILED")

except requests.exceptions.Timeout:
    print(f"\n❌ Request timed out after {time.time() - start:.1f} seconds")
    print("⚠️  Ollama might be slow or not responding")
except Exception as e:
    print(f"\n❌ Error: {e}")
    print("⚠️  Check if Flask server and Ollama are running")
