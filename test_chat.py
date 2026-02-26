import requests
import json

# Test the chat endpoint
url = "http://localhost:5000/chat"

test_message = {
    "message": "Hello, what crops are good for summer?"
}

print("Testing chat endpoint...")
print(f"URL: {url}")
print(f"Message: {test_message['message']}")

try:
    response = requests.post(
        url,
        json=test_message,
        timeout=120
    )
    
    print(f"\nResponse Status: {response.status_code}")
    print(f"Response Headers: {dict(response.headers)}")
    
    if response.status_code == 200:
        data = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"Status: {data.get('status')}")
        print(f"Model: {data.get('model')}")
        print(f"\nBot Response:")
        print(data.get('message', 'No message'))
    else:
        print(f"\n❌ Error Response:")
        print(json.dumps(response.json(), indent=2))
        
except requests.exceptions.Timeout:
    print("\n❌ Request timed out")
except requests.exceptions.ConnectionError as e:
    print(f"\n❌ Connection error: {e}")
    print("Is Flask running on port 5000?")
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
