#!/usr/bin/env python3
"""
Crop Planner Startup Script
Enhanced with Gemini AI Integration
"""

import os
import sys
import subprocess
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import flask
        import google.generativeai
        import flask_cors
        from dotenv import load_dotenv
        print("✅ All dependencies are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Installing required packages...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
            print("✅ Dependencies installed successfully")
            return True
        except subprocess.CalledProcessError:
            print("❌ Failed to install dependencies")
            return False

def check_api_key():
    """Check if Gemini API key is configured"""
    from dotenv import load_dotenv
    load_dotenv('../.env')  # Load from parent directory
    
    api_key = os.getenv('GEMINI_API_KEY')
    if api_key and api_key != 'your_api_key_here':
        print("✅ Gemini API key is configured")
        return True
    else:
        print("⚠️  Gemini API key not found or not configured")
        print("The system will use fallback responses if AI fails")
        return False

def main():
    """Main startup function"""
    print("🌱 Starting AgriTech Crop Planner with Gemini AI")
    print("=" * 50)
    
    # Check current directory
    current_dir = Path.cwd()
    if current_dir.name != 'Crop_Planning':
        print("❌ Please run this script from the Crop_Planning directory")
        sys.exit(1)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Check API key
    check_api_key()
    
    print("\n🚀 Starting Flask server...")
    print("📍 Server will be available at: http://localhost:5003")
    print("🔗 Direct access: http://localhost:5003/")
    print("\n💡 Tips:")
    print("   - Fill out all form fields for best AI recommendations")
    print("   - The AI provides comprehensive farming guides")
    print("   - Press Ctrl+C to stop the server")
    print("=" * 50)
    
    # Start the Flask app
    try:
        from app import app
        app.run(host='0.0.0.0', port=5003, debug=True)
    except KeyboardInterrupt:
        print("\n👋 Crop Planner stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()