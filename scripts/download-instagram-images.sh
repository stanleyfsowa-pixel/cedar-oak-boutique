#!/bin/bash

# Cedar & Oak Boutique - Instagram Image Downloader
# Semi-automated script for downloading Instagram images

echo "🎨 Cedar & Oak Instagram Image Downloader"
echo "=========================================="
echo ""

# Set up directories
IMAGES_DIR="/Users/stanleysowa3/cedar-oak-boutique/images"
DOWNLOADS_DIR="$HOME/Downloads"

echo "📸 Step 1: Opening Instagram in your browser..."
echo ""
sleep 2

# Open Instagram page
open "https://www.instagram.com/cedarandoakboutique/"

echo "✨ INSTRUCTIONS:"
echo ""
echo "1. Your Instagram page should now be open in Safari"
echo "2. Look at your 6 most recent posts (the first 6 images in the grid)"
echo "3. For EACH of the 6 posts:"
echo "   - Click on the post to open it full-size"
echo "   - Right-click on the image"
echo "   - Select 'Save Image As...'"
echo "   - Save to your Downloads folder with ANY name"
echo ""
echo "4. Once you've saved all 6 images, return here and press ENTER"
echo ""
read -p "Press ENTER when you've downloaded all 6 images... "

echo ""
echo "🔍 Looking for downloaded images in your Downloads folder..."
echo ""

# Find the 6 most recently downloaded JPG/JPEG files
cd "$DOWNLOADS_DIR"
RECENT_IMAGES=($(ls -t *.jpg *.jpeg *.JPG *.JPEG 2>/dev/null | head -6))

if [ ${#RECENT_IMAGES[@]} -lt 6 ]; then
    echo "⚠️  Warning: Found only ${#RECENT_IMAGES[@]} recent image files"
    echo "Expected 6 images. Make sure you downloaded 6 Instagram images."
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "✅ Found ${#RECENT_IMAGES[@]} recent image(s):"
for i in "${!RECENT_IMAGES[@]}"; do
    echo "   $((i+1)). ${RECENT_IMAGES[$i]}"
done
echo ""

read -p "Are these the correct Instagram images? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Cancelled. Please download the images and run this script again."
    exit 1
fi

echo ""
echo "📦 Processing images..."
echo ""

# Backup existing images
BACKUP_DIR="$IMAGES_DIR/backups/$(date +%Y-%m-%d_%H-%M-%S)"
mkdir -p "$BACKUP_DIR"

for i in {1..6}; do
    if [ -f "$IMAGES_DIR/instagram-$i.jpg" ]; then
        cp "$IMAGES_DIR/instagram-$i.jpg" "$BACKUP_DIR/"
        echo "   Backed up instagram-$i.jpg"
    fi
done

# Copy and rename images
for i in "${!RECENT_IMAGES[@]}"; do
    NUM=$((i+1))
    SOURCE="${RECENT_IMAGES[$i]}"
    TARGET="$IMAGES_DIR/instagram-$NUM.jpg"

    # Copy to images directory with correct name
    cp "$SOURCE" "$TARGET"
    echo "   ✅ Created instagram-$NUM.jpg"
done

echo ""
echo "🎉 SUCCESS! All images have been updated!"
echo ""
echo "📊 Summary:"
echo "   - Backed up old images to: $BACKUP_DIR"
echo "   - Updated 6 Instagram images (instagram-1.jpg through instagram-6.jpg)"
echo "   - Images are now in: $IMAGES_DIR"
echo ""
echo "🌐 Next Steps:"
echo "   1. Open your website to see the new images"
echo "   2. If deploying online, upload the updated images to your server"
echo ""
echo "💡 Tip: The downloaded images are still in your Downloads folder."
echo "   You can delete them if you want to clean up."
echo ""
