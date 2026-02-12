#!/usr/bin/env python3
"""
List available Gemini models
"""

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv('../.env')

def list_available_models():
    """List all available Gemini models"""
    try:
        api_key = os.getenv('GEMINI_API_KEY')
        genai.configure(api_key=api_key)
        
        print("🔍 Available Gemini Models:")
        print("-" * 40)
        
        models = genai.list_models()
        for model in models:
            print(f"✅ {model.name}")
            if hasattr(model, 'supported_generation_methods'):
                methods = model.supported_generation_methods
                if 'generateContent' in methods:
                    print(f"   📝 Supports generateContent")
                else:
                    print(f"   ❌ Does not support generateContent")
            print()
            
    except Exception as e:
        print(f"❌ Error listing models: {e}")

if __name__ == "__main__":
    list_available_models()