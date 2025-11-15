#!/usr/bin/env python3
"""
Instagram Web Scraper for Cedar & Oak Boutique
Alternative method using instaloader (no API required)
"""

import os
import sys
import shutil
from datetime import datetime
from pathlib import Path

try:
    import instaloader
    INSTALOADER_AVAILABLE = True
except ImportError:
    INSTALOADER_AVAILABLE = False
    print("instaloader not installed. Install with: pip install instaloader")

class InstagramScraper:
    def __init__(self):
        self.base_path = Path(__file__).parent.parent
        self.images_path = self.base_path / 'images'
        self.temp_path = self.base_path / 'temp'
        self.username = 'cedarandoakboutique'
        
    def setup_directories(self):
        """Create necessary directories"""
        self.temp_path.mkdir(exist_ok=True)
        
    def scrape_posts(self):
        """Scrape Instagram posts using instaloader"""
        if not INSTALOADER_AVAILABLE:
            print("Please install instaloader: pip install instaloader")
            return False
        
        print(f"Scraping Instagram posts from @{self.username}")
        
        # Create instaloader instance
        L = instaloader.Instaloader(
            download_videos=False,
            download_video_thumbnails=False,
            download_geotags=False,
            download_comments=False,
            save_metadata=False,
            compress_json=False
        )
        
        try:
            # Get profile
            profile = instaloader.Profile.from_username(L.context, self.username)
            
            # Download recent posts
            posts = []
            for post in profile.get_posts():
                if len(posts) >= 6:
                    break
                    
                if not post.is_video:  # Only images
                    posts.append(post)
            
            # Download images to temp directory
            temp_downloads = self.temp_path / 'downloads'
            temp_downloads.mkdir(exist_ok=True)
            
            for i, post in enumerate(posts, 1):
                try:
                    # Download post
                    L.download_post(post, target=str(temp_downloads))
                    
                    # Find the downloaded image
                    post_files = list(temp_downloads.glob(f"{post.date_utc.strftime('%Y-%m-%d_%H-%M-%S')}_UTC*.jpg"))
                    if post_files:
                        source_file = post_files[0]
                        target_file = self.images_path / f'instagram-{i}.jpg'
                        
                        # Copy to website images directory
                        shutil.copy2(source_file, target_file)
                        print(f"Updated instagram-{i}.jpg")
                        
                except Exception as e:
                    print(f"Error downloading post {i}: {e}")
            
            # Cleanup temp directory
            shutil.rmtree(temp_downloads, ignore_errors=True)
            
            print(f"Successfully updated {len(posts)} Instagram images")
            return True
            
        except Exception as e:
            print(f"Error scraping Instagram: {e}")
            return False
    
    def run(self):
        """Main execution method"""
        print("Starting Instagram scraper...")
        self.setup_directories()
        
        if self.scrape_posts():
            print("Instagram update completed successfully!")
            return True
        else:
            print("Instagram update failed!")
            return False

def main():
    scraper = InstagramScraper()
    scraper.run()

if __name__ == "__main__":
    main()