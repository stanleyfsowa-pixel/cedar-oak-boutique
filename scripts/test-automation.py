#!/usr/bin/env python3
"""
Test script for Instagram automation
Creates placeholder images to test the system
"""

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import requests

def create_test_images():
    """Create test Instagram images"""
    base_path = Path(__file__).parent.parent
    images_path = base_path / 'images'
    
    # Cedar & Oak brand colors
    colors = [
        '#2D4A32',  # Pine green
        '#8B5A2B',  # Cedar brown
        '#D4A574',  # Oak tan
        '#A0522D',  # Warm brown
        '#5A7C5E',  # Light pine
        '#F5E6D3'   # Cream
    ]
    
    for i in range(1, 7):
        # Create a 600x600 image
        img = Image.new('RGB', (600, 600), colors[i-1])
        draw = ImageDraw.Draw(img)
        
        # Try to use a font, fall back to default if not available
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 48)
        except:
            font = ImageFont.load_default()
        
        # Add text
        text = f"Instagram Post {i}\nCedar & Oak\nBoutique"
        
        # Get text size and center it
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        x = (600 - text_width) // 2
        y = (600 - text_height) // 2
        
        # Draw text with contrast
        text_color = 'white' if i <= 4 else 'black'
        draw.multiline_text((x, y), text, fill=text_color, font=font, align='center')
        
        # Save image
        filename = images_path / f'instagram-{i}.jpg'
        img.save(filename, 'JPEG', quality=95)
        print(f"Created test image: {filename}")

def main():
    """Main function"""
    print("Creating test Instagram images...")
    
    try:
        from PIL import Image, ImageDraw, ImageFont
        create_test_images()
        print("\n✅ Test images created successfully!")
        print("You can now view your website to see the test Instagram feed.")
        print("\nTo replace with real Instagram images, run:")
        print("  ./scripts/run-automation.sh")
        
    except ImportError:
        print("PIL (Pillow) not installed. Installing...")
        os.system("pip3 install Pillow")
        
        try:
            from PIL import Image, ImageDraw, ImageFont
            create_test_images()
            print("\n✅ Test images created successfully!")
        except ImportError:
            print("❌ Could not install PIL. Creating simple placeholder files...")
            
            # Fallback: create simple placeholder files
            base_path = Path(__file__).parent.parent
            images_path = base_path / 'images'
            
            for i in range(1, 7):
                filename = images_path / f'instagram-{i}.jpg'
                # Create empty file
                filename.touch()
                print(f"Created placeholder: {filename}")

if __name__ == "__main__":
    main()