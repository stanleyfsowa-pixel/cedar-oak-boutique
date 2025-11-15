#!/usr/bin/env python3
"""
Instagram Automation Script for Cedar & Oak Boutique Website
Fetches the 6 most recent Instagram posts and updates the website
"""

import requests
import json
import os
import shutil
from datetime import datetime
import time
from pathlib import Path

class InstagramAutomation:
    def __init__(self, config_file='config/instagram-config.json'):
        """Initialize with configuration"""
        self.config = self.load_config(config_file)
        self.base_path = Path(__file__).parent.parent
        self.images_path = self.base_path / 'images'
        
    def load_config(self, config_file):
        """Load Instagram API configuration"""
        try:
            with open(config_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Config file {config_file} not found. Creating template...")
            self.create_config_template(config_file)
            return {}
    
    def create_config_template(self, config_file):
        """Create a configuration template"""
        os.makedirs(os.path.dirname(config_file), exist_ok=True)
        template = {
            "instagram": {
                "access_token": "YOUR_INSTAGRAM_ACCESS_TOKEN_HERE",
                "user_id": "YOUR_INSTAGRAM_USER_ID_HERE",
                "api_version": "v18.0"
            },
            "backup_method": {
                "use_web_scraping": True,
                "instagram_username": "cedarandoakboutique"
            },
            "settings": {
                "update_interval_hours": 6,
                "backup_old_images": True,
                "image_quality": "high"
            }
        }
        
        with open(config_file, 'w') as f:
            json.dump(template, f, indent=4)
        
        print(f"Created config template at {config_file}")
        print("Please update with your Instagram API credentials")
    
    def fetch_instagram_posts_api(self):
        """Fetch posts using Instagram Basic Display API"""
        if not self.config.get('instagram', {}).get('access_token'):
            print("Instagram API not configured. Using backup method...")
            return self.fetch_instagram_posts_backup()
        
        access_token = self.config['instagram']['access_token']
        user_id = self.config['instagram']['user_id']
        
        # Instagram Basic Display API endpoint
        url = f"https://graph.instagram.com/{user_id}/media"
        params = {
            'fields': 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp',
            'limit': 6,
            'access_token': access_token
        }
        
        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            
            posts = []
            for item in data.get('data', []):
                if item.get('media_type') in ['IMAGE', 'CAROUSEL_ALBUM']:
                    posts.append({
                        'id': item['id'],
                        'image_url': item['media_url'],
                        'permalink': item['permalink'],
                        'caption': item.get('caption', ''),
                        'timestamp': item['timestamp']
                    })
            
            return posts[:6]  # Ensure we only get 6 posts
            
        except requests.exceptions.RequestException as e:
            print(f"API request failed: {e}")
            return self.fetch_instagram_posts_backup()
    
    def fetch_instagram_posts_backup(self):
        """Backup method using web scraping (simplified)"""
        print("Using backup method for Instagram posts...")
        
        # This is a simplified backup - in production you'd use:
        # - instaloader library
        # - selenium for web scraping
        # - or manual image updates
        
        username = self.config.get('backup_method', {}).get('instagram_username', 'cedarandoakboutique')
        
        # For now, return placeholder data
        # In production, implement actual scraping here
        posts = []
        for i in range(1, 7):
            posts.append({
                'id': f'placeholder_{i}',
                'image_url': f'https://via.placeholder.com/600x600/2D4A32/FFFFFF?text=Instagram+Post+{i}',
                'permalink': f'https://instagram.com/p/placeholder_{i}',
                'caption': f'Cedar & Oak Boutique - Post {i}',
                'timestamp': datetime.now().isoformat()
            })
        
        return posts
    
    def download_image(self, url, filename):
        """Download image from URL"""
        try:
            response = requests.get(url, stream=True)
            response.raise_for_status()
            
            filepath = self.images_path / filename
            with open(filepath, 'wb') as f:
                shutil.copyfileobj(response.raw, f)
            
            print(f"Downloaded: {filename}")
            return True
            
        except requests.exceptions.RequestException as e:
            print(f"Failed to download {filename}: {e}")
            return False
    
    def backup_existing_images(self):
        """Backup existing Instagram images"""
        if not self.config.get('settings', {}).get('backup_old_images', True):
            return
        
        backup_dir = self.images_path / 'backups' / datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        backup_dir.mkdir(parents=True, exist_ok=True)
        
        for i in range(1, 7):
            old_file = self.images_path / f'instagram-{i}.jpg'
            if old_file.exists():
                shutil.copy2(old_file, backup_dir / f'instagram-{i}.jpg')
        
        print(f"Backed up existing images to: {backup_dir}")
    
    def update_website_images(self, posts):
        """Update website with new Instagram images"""
        self.backup_existing_images()
        
        for i, post in enumerate(posts, 1):
            filename = f'instagram-{i}.jpg'
            
            if self.download_image(post['image_url'], filename):
                print(f"Updated {filename} with post from {post['timestamp']}")
            else:
                print(f"Failed to update {filename}")
    
    def create_post_metadata(self, posts):
        """Create metadata file for Instagram posts"""
        metadata = {
            'last_updated': datetime.now().isoformat(),
            'posts': posts
        }
        
        metadata_file = self.base_path / 'data' / 'instagram-posts.json'
        metadata_file.parent.mkdir(exist_ok=True)
        
        with open(metadata_file, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        print(f"Created metadata file: {metadata_file}")
    
    def run_update(self):
        """Main method to run the Instagram update"""
        print(f"Starting Instagram update at {datetime.now()}")
        print("=" * 50)
        
        # Fetch posts
        posts = self.fetch_instagram_posts_api()
        
        if not posts:
            print("No posts retrieved. Aborting update.")
            return False
        
        print(f"Retrieved {len(posts)} Instagram posts")
        
        # Update website
        self.update_website_images(posts)
        
        # Create metadata
        self.create_post_metadata(posts)
        
        print("=" * 50)
        print(f"Instagram update completed at {datetime.now()}")
        return True

def main():
    """Main function"""
    automation = InstagramAutomation()
    
    if len(os.sys.argv) > 1 and os.sys.argv[1] == '--setup':
        print("Setting up Instagram automation...")
        automation.create_config_template('config/instagram-config.json')
        return
    
    automation.run_update()

if __name__ == "__main__":
    main()