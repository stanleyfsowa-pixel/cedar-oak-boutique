# Calendar Management Guide

This guide explains how to manage events on the Cedar & Oak Boutique website.

## 📅 Quick Start

All events are stored in `data/events.json`. To add, edit, or remove events, simply modify this file and refresh the website.

## 📝 Adding New Events

1. **Open** `data/events.json` in a text editor
2. **Add** a new event object to the events array
3. **Save** the file
4. **Refresh** the website to see changes

### Event Template
```json
{
  "id": "unique-id-here",
  "title": "Event Name",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "endTime": "HH:MM",
  "location": "Cedar & Oak Boutique",
  "description": "Event description goes here",
  "category": "event-type",
  "featured": true
}
```

### Field Explanations

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `id` | ✅ | Unique identifier | `"holiday-2023"` |
| `title` | ✅ | Event name | `"Holiday Shopping Event"` |
| `date` | ✅ | Event date | `"2023-12-15"` |
| `time` | ⚪ | Start time (24hr) | `"18:00"` |
| `endTime` | ⚪ | End time (24hr) | `"20:00"` |
| `location` | ✅ | Event location | `"Cedar & Oak Boutique"` |
| `description` | ✅ | Event details | `"Special discounts and..."` |
| `category` | ✅ | Event type | `"shopping-event"` |
| `featured` | ✅ | Show on homepage | `true` or `false` |

## 🏷️ Event Categories

Use these categories for consistent styling:

- **`fashion-show`** - Fashion shows and runway events (Cedar brown)
- **`shopping-event`** - Sales and shopping experiences (Oak tan)
- **`workshop`** - Educational sessions (Warm brown)
- **`trunk-show`** - Designer showcases (Gold brown)
- **`community`** - Community events and fundraisers (Custom)

## ✏️ Editing Existing Events

1. **Find** the event in `data/events.json`
2. **Modify** the desired fields
3. **Save** the file
4. **Refresh** the website

## 🗑️ Removing Events

1. **Locate** the event object in the array
2. **Delete** the entire event object (including braces)
3. **Remove** the trailing comma if it's the last item
4. **Save** the file

## 📋 Example Events

### Fashion Show
```json
{
  "id": "fall-fashion-2023",
  "title": "Fall Fashion Show",
  "date": "2023-10-28",
  "time": "18:00",
  "endTime": "20:00",
  "location": "Cedar & Oak Boutique",
  "description": "Join us for an exclusive preview of our fall collection featuring warm layers, cozy textures, and rich autumn colors.",
  "category": "fashion-show",
  "featured": true
}
```

### Shopping Event
```json
{
  "id": "holiday-shopping-2023",
  "title": "Holiday Shopping Event",
  "date": "2023-11-25",
  "time": "10:00",
  "endTime": "19:00",
  "location": "Cedar & Oak Boutique",
  "description": "Black Friday deals with 30% off select items and complimentary gift wrapping service.",
  "category": "shopping-event",
  "featured": true
}
```

### Workshop
```json
{
  "id": "styling-workshop-winter",
  "title": "Winter Styling Workshop",
  "date": "2023-12-02",
  "time": "14:00",
  "endTime": "16:00",
  "location": "Cedar & Oak Boutique",
  "description": "Learn professional styling techniques for winter layering and create versatile cold-weather looks.",
  "category": "workshop",
  "featured": false
}
```

## 🎯 Featured Events

- Set `"featured": true` to display events on the homepage
- Only 2 featured events will show on the homepage
- Featured events appear first in the list

## ⏰ Time Format

- Use 24-hour format: `"18:00"` for 6:00 PM
- Time is optional - omit for all-day events
- End time is optional - events default to 2 hours if not specified

## 📅 Date Format

- Always use `YYYY-MM-DD` format
- Examples: `"2023-12-25"`, `"2024-01-15"`
- Past events will not show on the calendar

## 🔄 Managing Recurring Events

For recurring events, create separate entries:

```json
{
  "id": "first-friday-nov",
  "title": "First Friday Fashion",
  "date": "2023-11-03",
  "time": "17:00",
  "endTime": "21:00",
  "location": "Cedar & Oak Boutique",
  "description": "Monthly first Friday shopping event with refreshments.",
  "category": "shopping-event",
  "featured": false
},
{
  "id": "first-friday-dec",
  "title": "First Friday Fashion",
  "date": "2023-12-01",
  "time": "17:00",
  "endTime": "21:00",
  "location": "Cedar & Oak Boutique",
  "description": "Monthly first Friday shopping event with refreshments.",
  "category": "shopping-event",
  "featured": false
}
```

## 🚨 Common Mistakes

### ❌ Invalid JSON
```json
{
  "id": "test-event",
  "title": "Test Event",
  // Missing comma here
  "date": "2023-12-01"
  "time": "18:00", // Extra comma here,
}
```

### ✅ Valid JSON
```json
{
  "id": "test-event",
  "title": "Test Event",
  "date": "2023-12-01",
  "time": "18:00"
}
```

### Validation Tips
1. **Use a JSON validator** online to check your file
2. **Copy the structure** from existing events
3. **Watch for commas** - every field except the last needs one
4. **Use quotes** around all text values

## 🛠️ Troubleshooting

### Events Not Showing
1. Check JSON syntax with an online validator
2. Ensure the date is in the future
3. Verify the file is saved properly
4. Clear browser cache and refresh

### Calendar Not Loading
1. Check browser console for JavaScript errors
2. Verify `events.json` file exists and is accessible
3. Ensure proper JSON formatting

### Styling Issues
1. Verify category names match predefined options
2. Check that all required fields are present
3. Ensure no extra characters in field values

## 📱 Testing Your Changes

1. **Save** the events.json file
2. **Open** the website in a browser
3. **Navigate** to the Events page
4. **Verify** new events appear correctly
5. **Test** event details by clicking on calendar events
6. **Check** homepage for featured events

## 💾 Backup Strategy

1. **Keep a backup** of your events.json file
2. **Use version control** (Git) if possible
3. **Export events** using the calendar management functions
4. **Regular backups** before major changes

## 🔧 Advanced Features

The calendar system includes several advanced features accessible through the browser console:

### Export All Events
```javascript
CalendarManager.exportEvents();
```

### Import Events from File
```javascript
// Select file input or drag & drop
CalendarManager.importEvents(file);
```

### Filter by Category
```javascript
CalendarManager.filterEventsByCategory('fashion-show');
```

### Search Events
```javascript
CalendarManager.searchEvents('holiday');
```

### Generate iCal File
```javascript
CalendarManager.generateICalFile();
```

## 📞 Getting Help

### Before Making Changes
1. **Back up** your current events.json file
2. **Test changes** on a copy first
3. **Validate JSON** before saving

### If Something Goes Wrong
1. **Restore** from backup
2. **Check browser console** for error messages
3. **Use JSON validator** to find syntax errors
4. **Contact your web developer** for complex issues

### Resources
- [JSON Validator](https://jsonlint.com/)
- [Date Format Guide](https://www.w3.org/TR/NOTE-datetime)
- [Time Format Reference](https://en.wikipedia.org/wiki/24-hour_clock)

---

**Remember**: Always test your changes before important events, and keep backups of your working events.json file!