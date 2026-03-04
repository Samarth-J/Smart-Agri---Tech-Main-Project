import os
import re

# List of HTML files to update
html_files = [
    'index.html',
    'main.html',
    'about.html',
    'login.html',
    'register.html',
    'chat.html',
    'weather.html',
    'disease-prediction.html',
    'shopkeeper.html',
    'farmer.html',
    'buyer-dashboard.html',
    'organic.html',
    'feed-back.html',
    'cropCalendar.html',
    'crop-yield-input.html',
]

responsive_link = '<link rel="stylesheet" href="responsive.css" />'

for html_file in html_files:
    if not os.path.exists(html_file):
        print(f"⚠️  Skipping {html_file} - file not found")
        continue
    
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if responsive.css is already included
        if 'responsive.css' in content:
            print(f"✅ {html_file} - already has responsive.css")
            continue
        
        # Find the </head> tag and insert before it
        if '</head>' in content:
            content = content.replace('</head>', f'  {responsive_link}\n</head>')
            
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"✅ {html_file} - added responsive.css")
        else:
            print(f"⚠️  {html_file} - no </head> tag found")
    
    except Exception as e:
        print(f"❌ {html_file} - error: {e}")

print("\n✅ Done! Responsive CSS has been added to all HTML files.")
print("📱 Your website is now mobile-friendly!")
