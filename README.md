# Cedar & Oak Boutique Website

A modern, elegant website for Cedar & Oak Boutique in New Lenox, featuring a responsive design, Instagram integration, and event promotions.

## 🌐 Live Website
**https://stanleyfsowa-pixel.github.io/cedar-oak-boutique/**

### Deployment Status
- ✅ Deployed to GitHub Pages
- ✅ Custom event graphics (Paint Your Pet, Christmas Sip & See, Jewelry Pop-up, etc.)
- ✅ Instagram-style feed section
- ✅ Responsive mobile design
- ✅ Contact form integration

## 🌟 Features

### Core Pages
- **Homepage**: Hero section, in store now, upcoming events preview
- **About**: Business story, mission/values, team information, store details
- **Events**: Interactive calendar with FullCalendar integration
- **Contact**: Working contact form with validation, store information, services

### Key Functionality
- 📱 **Fully Responsive Design**: Optimized for desktop, tablet, and mobile
- 📅 **Interactive Events Calendar**: Easy-to-update event management system
- 📧 **Working Contact Forms**: Form validation and submission handling
- 🎨 **Professional Boutique Aesthetic**: Warm earth tones and elegant typography
- ♿ **Accessibility Features**: ARIA labels, proper heading hierarchy, keyboard navigation
- 🚀 **Performance Optimized**: Efficient loading and smooth animations

## 🎨 Design Features

### Color Palette
- **Primary**: `#8B5A2B` (Cedar Brown)
- **Secondary**: `#D4A574` (Oak Tan) 
- **Accent**: `#A0522D` (Warm Brown)
- **Light**: `#F5E6D3` (Cream)
- **Background**: `#FAF9F7` (Off-white)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Source Sans Pro (sans-serif)

### Interactive Elements
- Hover effects on buttons and cards
- Smooth scrolling navigation
- Loading animations
- Modal dialogs for event details
- Mobile-friendly navigation menu

## 📁 Project Structure

```
cedar-oak-boutique/
├── index.html              # Homepage
├── about.html              # About page
├── events.html             # Events calendar page
├── contact.html            # Contact page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js            # Core JavaScript functionality
│   └── calendar.js        # Calendar-specific features
├── images/                 # Image assets (add your photos here)
├── data/
│   └── events.json        # Events data
└── README.md              # This file
```

## 🛠️ Setup Instructions

1. **Clone or download** the project files to your web server
2. **Add your images** to the `images/` folder
3. **Update contact information** in all HTML files
4. **Customize events** in `data/events.json`
5. **Configure contact form** (see Contact Form Setup below)

## 📅 Managing Events

### Events Data Structure
Events are stored in `data/events.json`. Each event has the following structure:

```json
{
  "id": "unique-id",
  "title": "Event Title",
  "date": "YYYY-MM-DD",
  "time": "HH:MM" (24-hour format),
  "endTime": "HH:MM" (optional),
  "location": "Event Location",
  "description": "Event description",
  "category": "event-type",
  "featured": true/false
}
```

### Event Categories
- `fashion-show`: Fashion shows and runway events
- `shopping-event`: Special sales and shopping experiences
- `workshop`: Educational workshops and styling sessions
- `trunk-show`: Designer trunk shows
- `community`: Community events and fundraisers

### Adding New Events

1. **Open** `data/events.json`
2. **Add** new event object to the events array
3. **Save** the file
4. **Refresh** the website to see changes

### Example Event Entry
```json
{
  "id": "7",
  "title": "Spring Collection Launch",
  "date": "2024-04-15",
  "time": "18:00",
  "endTime": "20:00",
  "location": "Cedar & Oak Boutique",
  "description": "Join us for the exclusive launch of our spring collection featuring fresh colors and lightweight fabrics perfect for the season.",
  "category": "fashion-show",
  "featured": true
}
```

## 📧 Contact Form Setup

The contact form is configured to work with Formspree. To set it up:

1. **Sign up** at [Formspree.io](https://formspree.io)
2. **Create** a new form
3. **Update** the form action in `contact.html`:
   ```html
   <form class="contact-form" id="contact-form" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
   ```
4. **Replace** `YOUR-FORM-ID` with your actual Formspree form ID

### Alternative Form Services
- **Netlify Forms**: If hosting on Netlify
- **EmailJS**: For client-side email sending
- **Custom Backend**: PHP, Node.js, or other server-side solutions

## 🖼️ Adding Images

Replace the image placeholders with actual photos:

1. **Add images** to the `images/` folder
2. **Update image sources** in HTML files
3. **Recommended image sizes**:
   - Logo: 200x200px
   - Hero background: 1920x1080px
   - Collection images: 400x300px
   - Team photos: 300x300px
   - Store photos: 600x400px

### Image Optimization Tips
- Use WebP format for better compression
- Compress images to reduce load times
- Use appropriate alt text for accessibility

## 🎨 Customization Guide

### Updating Colors
Edit the CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #8B5A2B;
    --secondary-color: #D4A574;
    --accent-color: #A0522D;
    /* Update these values to match your brand */
}
```

### Changing Fonts
1. **Update Google Fonts** link in HTML head sections
2. **Modify font-family** declarations in CSS
3. **Test across different devices** for compatibility

### Modifying Layout
- **Grid layouts**: Adjust `grid-template-columns` for different arrangements
- **Spacing**: Modify padding and margin values
- **Breakpoints**: Update media queries for responsive behavior

## 📱 Mobile Optimization

The website is fully responsive with:
- **Mobile-first approach**: Designed for mobile, enhanced for desktop
- **Touch-friendly**: Large tap targets and appropriate spacing
- **Optimized images**: Responsive images that scale appropriately
- **Fast loading**: Minimal dependencies and optimized code

## 🔧 Technical Features

### JavaScript Functionality
- **Mobile navigation**: Hamburger menu with smooth animations
- **Form validation**: Client-side validation with error handling
- **Calendar integration**: FullCalendar library for event display
- **Modal dialogs**: Event details in accessible modals
- **Smooth scrolling**: Enhanced navigation experience
- **Performance optimization**: Debounced scroll handlers and lazy loading

### SEO Features
- **Meta tags**: Proper title, description, and keywords
- **Open Graph**: Social media sharing optimization
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Fast loading**: Optimized code and assets

### Accessibility Features
- **ARIA labels**: Screen reader support
- **Keyboard navigation**: Full keyboard accessibility
- **Color contrast**: WCAG compliant color combinations
- **Focus indicators**: Clear focus states for interactive elements

## 🚀 Deployment Options

### GitHub Pages
1. **Upload** files to GitHub repository
2. **Enable** GitHub Pages in repository settings
3. **Access** site at `https://username.github.io/repository-name`

### Netlify
1. **Drag and drop** folder to Netlify
2. **Automatic** deployment and SSL
3. **Form handling** included with Netlify Forms

### Traditional Web Hosting
1. **Upload** files via FTP
2. **Configure** contact form backend
3. **Set up** SSL certificate

## 🔒 Security Considerations

- **Form validation**: Both client-side and server-side validation
- **Contact form**: Use trusted services like Formspree
- **HTTPS**: Always use SSL certificates
- **Regular updates**: Keep dependencies updated

## 📊 Analytics Setup

Add Google Analytics or other tracking:

1. **Create** analytics account
2. **Add tracking code** before closing `</head>` tag
3. **Configure** goals and conversions
4. **Monitor** website performance

## 🛠️ Maintenance

### Regular Tasks
- **Update events**: Add new events, remove past ones
- **Content updates**: Refresh about page, add new collections
- **Image updates**: Replace placeholder images with real photos
- **Form testing**: Regularly test contact forms
- **Performance monitoring**: Check loading speeds

### Monthly Tasks
- **Backup files**: Keep copies of all website files
- **Update content**: Refresh seasonal content
- **Check links**: Ensure all links work properly
- **Security updates**: Update any dependencies

## 📞 Support

For technical questions about this website template:
1. **Check documentation** above
2. **Review code comments** in files
3. **Test in different browsers** to isolate issues
4. **Contact your web developer** for custom modifications

## 📄 License

This website template is created specifically for Cedar & Oak Boutique. The code structure and design patterns can be adapted for similar boutique businesses with appropriate modifications.

---

**Built with ❤️ for Cedar & Oak Boutique**

*A professional website solution featuring modern design, interactive features, and easy content management.*