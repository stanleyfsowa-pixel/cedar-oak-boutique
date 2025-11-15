# Instagram Automation Setup Guide
**Cedar & Oak Boutique Website - Automated Instagram Integration**

## Overview
This system automatically updates your website with the 6 most recent Instagram posts from @cedarandoakboutique. It includes two methods:

1. **Instagram API Method** (Recommended) - Official API
2. **Web Scraping Method** (Backup) - No API required

## Quick Start

### Method 1: Simple Web Scraping (No API Setup Required)

1. **Install Python dependencies:**
   ```bash
   cd /Users/stanleysowa3/cedar-oak-boutique
   python3 -m pip install requests instaloader
   ```

2. **Run the automation:**
   ```bash
   ./scripts/run-automation.sh
   ```

3. **Schedule automatic updates (optional):**
   ```bash
   # Edit crontab
   crontab -e
   
   # Add this line to run every 6 hours
   0 */6 * * * /Users/stanleysowa3/cedar-oak-boutique/scripts/run-automation.sh
   ```

### Method 2: Instagram API Setup (More Reliable)

1. **Get Instagram API Access:**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create an app
   - Add Instagram Basic Display product
   - Get your access token and user ID

2. **Update configuration:**
   ```bash
   # Edit the config file
   nano config/instagram-config.json
   
   # Add your credentials:
   {
     "instagram": {
       "access_token": "YOUR_ACTUAL_ACCESS_TOKEN",
       "user_id": "YOUR_INSTAGRAM_USER_ID"
     }
   }
   ```

3. **Run the automation:**
   ```bash
   ./scripts/run-automation.sh
   ```

## Files Created

```
cedar-oak-boutique/
├── scripts/
│   ├── instagram-automation.py    # Main automation script
│   ├── instagram-scraper.py       # Backup scraping method
│   └── run-automation.sh          # Shell script runner
├── config/
│   └── instagram-config.json      # Configuration file
├── logs/                           # Automation logs (created automatically)
└── temp/                          # Temporary download directory
```

## How It Works

1. **Fetches** the 6 most recent Instagram posts
2. **Downloads** the images as `instagram-1.jpg` through `instagram-6.jpg`
3. **Backs up** old images to `images/backups/`
4. **Updates** your website automatically
5. **Logs** all activity for monitoring

## Website Integration

The website is already configured to display these images in the "Latest from Cedar & Oak" section. The automation updates:

- `images/instagram-1.jpg` (most recent post)
- `images/instagram-2.jpg`
- `images/instagram-3.jpg`
- `images/instagram-4.jpg`
- `images/instagram-5.jpg`
- `images/instagram-6.jpg` (6th most recent post)

## Automation Schedule Options

### Option 1: Cron Job (Mac/Linux)
```bash
# Every 6 hours
0 */6 * * * /Users/stanleysowa3/cedar-oak-boutique/scripts/run-automation.sh

# Every day at 9 AM
0 9 * * * /Users/stanleysowa3/cedar-oak-boutique/scripts/run-automation.sh

# Every 2 hours during business hours (9 AM - 6 PM)
0 9-18/2 * * * /Users/stanleysowa3/cedar-oak-boutique/scripts/run-automation.sh
```

### Option 2: Manual Execution
```bash
# Run once manually
./scripts/run-automation.sh

# Run with specific method
python3 scripts/instagram-scraper.py
```

## Troubleshooting

### Common Issues:

1. **"instaloader not found"**
   ```bash
   pip3 install instaloader
   ```

2. **"Permission denied"**
   ```bash
   chmod +x scripts/run-automation.sh
   ```

3. **"Python 3 not found"**
   - Install Python 3 from [python.org](https://python.org)

4. **Instagram rate limiting**
   - Reduce frequency in cron job
   - Use API method instead of scraping

### Check Logs:
```bash
tail -f logs/instagram-automation.log
```

## Manual Instagram Update

If automation fails, you can manually update images:

1. Download 6 recent Instagram images
2. Rename them to `instagram-1.jpg` through `instagram-6.jpg`
3. Place them in the `images/` directory
4. Images should be square (1:1 aspect ratio) for best display

## Security Notes

- Keep your Instagram API credentials secure
- Don't commit `config/instagram-config.json` with real credentials to version control
- The scraping method is more likely to break if Instagram changes their website

## Support

If you need help:
1. Check the log file: `logs/instagram-automation.log`
2. Run manually to see error messages: `python3 scripts/instagram-scraper.py`
3. Ensure your Instagram account is public for scraping method