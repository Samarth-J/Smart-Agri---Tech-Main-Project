#!/usr/bin/env python3
"""
Debug script to test Gemini API integration
"""

import os
import sys
import json
from dotenv import load_dotenv

# Load environment variables from parent directory
load_dotenv('../.env')

def test_environment():
    """Test environment setup"""
    print("🔍 Testing Environment Setup")
    print("-" * 40)
    
    # Check API key
    api_key = os.getenv('GEMINI_API_KEY')
    if api_key:
        print(f"✅ API Key found: {api_key[:10]}...{api_key[-4:]}")
    else:
        print("❌ API Key not found in environment")
        return False
    
    return True

def test_gemini_import():
    """Test Gemini library import"""
    print("\n🔍 Testing Gemini Library Import")
    print("-" * 40)
    
    try:
        import google.generativeai as genai
        print("✅ google.generativeai imported successfully")
        return True
    except ImportError as e:
        print(f"❌ Failed to import google.generativeai: {e}")
        return False

def test_gemini_configuration():
    """Test Gemini API configuration"""
    print("\n🔍 Testing Gemini API Configuration")
    print("-" * 40)
    
    try:
        import google.generativeai as genai
        
        api_key = os.getenv('GEMINI_API_KEY')
        genai.configure(api_key=api_key)
        
        # Try to create a model
        model = genai.GenerativeModel('gemini-2.5-flash')
        print("✅ Gemini model created successfully")
        return model
    except Exception as e:
        print(f"❌ Failed to configure Gemini: {e}")
        return None

def test_simple_generation(model):
    """Test simple content generation"""
    print("\n🔍 Testing Simple Content Generation")
    print("-" * 40)
    
    if not model:
        print("❌ No model available for testing")
        return False
    
    try:
        # Simple test prompt
        prompt = "What is the best crop for sandy soil in summer season? Respond with just the crop name."
        
        response = model.generate_content(prompt)
        print(f"✅ AI Response: {response.text}")
        return True
    except Exception as e:
        print(f"❌ Failed to generate content: {e}")
        return False

def test_json_generation(model):
    """Test JSON format generation"""
    print("\n🔍 Testing JSON Format Generation")
    print("-" * 40)
    
    if not model:
        print("❌ No model available for testing")
        return False
    
    try:
        prompt = """
        Recommend a crop for these conditions and respond in JSON format:
        - Soil: Sandy
        - Season: Summer
        - pH: 6.5
        
        Response format:
        {
            "crop": "crop name",
            "confidence": "High/Medium/Low"
        }
        """
        
        response = model.generate_content(prompt)
        print(f"✅ AI JSON Response: {response.text}")
        
        # Try to parse as JSON
        try:
            # Extract JSON from response
            text = response.text.strip()
            start = text.find('{')
            end = text.rfind('}')
            if start != -1 and end != -1:
                json_str = text[start:end+1]
                parsed = json.loads(json_str)
                print(f"✅ JSON parsed successfully: {parsed}")
                return True
            else:
                print("⚠️ No JSON found in response")
                return False
        except json.JSONDecodeError as e:
            print(f"⚠️ JSON parsing failed: {e}")
            return False
            
    except Exception as e:
        print(f"❌ Failed to generate JSON content: {e}")
        return False

def main():
    """Main debug function"""
    print("🌱 AgriTech Crop Planner - Debug Test")
    print("=" * 50)
    
    # Run all tests
    tests_passed = 0
    total_tests = 5
    
    if test_environment():
        tests_passed += 1
    
    if test_gemini_import():
        tests_passed += 1
    
    model = test_gemini_configuration()
    if model:
        tests_passed += 1
    
    if test_simple_generation(model):
        tests_passed += 1
    
    if test_json_generation(model):
        tests_passed += 1
    
    print("\n" + "=" * 50)
    print(f"🎯 Test Results: {tests_passed}/{total_tests} tests passed")
    
    if tests_passed == total_tests:
        print("✅ All tests passed! Gemini integration should work.")
    else:
        print("❌ Some tests failed. Check the errors above.")
    
    return tests_passed == total_tests

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)