#!/bin/bash

# Instagram Automation Runner for Cedar & Oak Boutique
# This script runs the Instagram automation and can be scheduled with cron

# Set the working directory to the project root
cd "$(dirname "$0")/.."

# Log file
LOG_FILE="logs/instagram-automation.log"
mkdir -p logs

# Function to log messages
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log_message "Starting Instagram automation..."

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    log_message "ERROR: Python 3 is not installed"
    exit 1
fi

# Check if virtual environment exists, create if not
if [ ! -d "venv" ]; then
    log_message "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install required packages
log_message "Installing/updating required packages..."
pip install -q requests instaloader

# Try the API method first, fall back to scraping
log_message "Attempting Instagram API method..."
if python3 scripts/instagram-automation.py; then
    log_message "API method successful"
else
    log_message "API method failed, trying scraper method..."
    if python3 scripts/instagram-scraper.py; then
        log_message "Scraper method successful"
    else
        log_message "ERROR: Both automation methods failed"
        exit 1
    fi
fi

# Deactivate virtual environment
deactivate

log_message "Instagram automation completed successfully"

# Optional: Restart web server if using one
# systemctl restart nginx  # Uncomment if using nginx
# systemctl restart apache2  # Uncomment if using apache