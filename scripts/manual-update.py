#!/usr/bin/env python3
"""
Manual Instagram Update Helper
Helps you organize downloaded Instagram images
"""

import os
import shutil
from pathlib import Path

def manual_update():
    """Guide user through manual update process"""
    base_path = Path(__file__).parent.parent
    images_path = base_path / 'images'
    downloads_path = Path.home() / 'Downloads'
    
    print("🎯 Manual Instagram Update Helper")
    print("=" * 40)
    print()
    print("📋 STEP 1: Download Instagram Images")
    print("1. Go to: https://www.instagram.com/cedarandoakboutique/")
    print("2. Right-click on your 6 most recent post images")
    print("3. Save them to your Downloads folder")
    print()
    
    print("📁 STEP 2: Check Downloads Folder")
    jpg_files = list(downloads_path.glob("*.jpg"))
    if jpg_files:
        print(f"Found {len(jpg_files)} JPG files in Downloads:")
        for i, file in enumerate(jpg_files[-10:], 1):  # Show last 10
            print(f"  {i}. {file.name}")
    else:
        print("  No JPG files found in Downloads folder")
    print()
    
    print("🔄 STEP 3: Auto-organize (if you want)")
    response = input("Do you want me to help organize the images? (y/n): ").lower()
    
    if response == 'y':
        if len(jpg_files) >= 6:
            # Take the 6 most recent files
            recent_files = sorted(jpg_files, key=lambda x: x.stat().st_mtime, reverse=True)[:6]
            
            print("\n📸 Copying images to website...")
            for i, file in enumerate(recent_files, 1):
                target = images_path / f'instagram-{i}.jpg'
                shutil.copy2(file, target)
                print(f"  ✅ Copied {file.name} → instagram-{i}.jpg")
            
            print(f"\n🎉 Successfully updated {len(recent_files)} Instagram images!")
            print("Your website will now show the new images.")
            
        else:
            print(f"\n❌ Need at least 6 images, but only found {len(jpg_files)}")
            print("Please download more images from Instagram first.")
    
    print("\n📱 STEP 4: Manual Instructions")
    print("If you prefer to do it manually:")
    print("1. Rename your downloaded images to:")
    for i in range(1, 7):
        print(f"   instagram-{i}.jpg (post #{i}, most recent first)")
    print(f"2. Move them to: {images_path}")
    print()
    
    print("🌐 STEP 5: Test Your Website")
    print(f"Open: file://{base_path}/index.html")
    print("Look for the 'Latest from Cedar & Oak' section")

if __name__ == "__main__":
    manual_update()