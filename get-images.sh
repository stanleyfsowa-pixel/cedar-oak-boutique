#!/bin/bash

# Cedar & Oak Boutique Logo Downloader Script
# This script helps download the Instagram profile picture

echo "Cedar & Oak Boutique Logo Downloader"
echo "====================================="
echo ""

# Check if images directory exists
if [ ! -d "images" ]; then
    echo "Creating images directory..."
    mkdir images
fi

echo "To get the Instagram logo, you have several options:"
echo ""
echo "1. Manual Download (Recommended):"
echo "   - Go to: https://www.instagram.com/cedarandoakboutique/"
echo "   - Right-click the profile picture"
echo "   - Save as 'images/logo.png'"
echo ""
echo "2. Using curl (if you have the direct image URL):"
echo "   - curl -o images/logo.png [DIRECT_IMAGE_URL]"
echo ""
echo "3. Using a profile picture service:"
echo "   - Visit: https://instadp.com/"
echo "   - Enter: cedarandoakboutique"
echo "   - Download and save to images/logo.png"
echo ""

# Check if logo already exists
if [ -f "images/logo.png" ] || [ -f "images/logo.jpg" ]; then
    echo "✅ Logo file found in images directory!"
    echo ""
    echo "Current logo files:"
    ls -la images/logo.* 2>/dev/null || echo "No logo files found"
else
    echo "❌ No logo file found. Please download the logo first."
    echo ""
    echo "Expected location: images/logo.png or images/logo.jpg"
fi

echo ""
echo "Once you have the logo file, run this script again to verify,"
echo "then let Claude update the website code to integrate it properly."