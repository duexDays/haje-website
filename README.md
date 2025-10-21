# Haje Company Website

This is the official company website for Haje, an AI-powered clothing repair and customization service.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Based on Haje app's design system with Poppins font
- **Smooth Animations**: FullPage.js integration for seamless scrolling
- **Brand Consistency**: Uses Haje's official colors and styling

## Design System

### Colors
- **Background**: #FBFAF7 (Light beige)
- **Primary**: #004830 (Dark green)
- **Accent**: #2F8F5B (Medium green)
- **Text**: #2C2716 (Dark brown)
- **Card Background**: #F6F5F1 (Light card background)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## File Structure

```
website/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Main stylesheet with Haje design system
├── script/
│   └── script.js       # JavaScript functionality
├── images/
│   ├── logo_text_no_bg.png  # Haje logo
│   ├── order.png            # Order step icon
│   ├── pickup.png           # Pickup step icon
│   ├── chat.png             # Chat step icon
│   ├── repair.png           # Repair step icon
│   └── delivery.png         # Delivery step icon
├── video/
│   └── main_1.mp4      # Hero background video
└── README.md           # This file
```

## Sections

1. **Hero Section**: Main landing area with video background
2. **About Section**: Company information and mission
3. **Services Section**: List of services offered
4. **How It Works**: Step-by-step process explanation

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (ES6+)
- FullPage.js for smooth scrolling
- Font Awesome for icons
- Google Fonts (Poppins)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

This website is designed to be easily deployable to any static hosting service:

- **Netlify**: Drag and drop the entire folder
- **Vercel**: Connect to Git repository
- **GitHub Pages**: Push to repository and enable Pages
- **AWS S3**: Upload files to S3 bucket with static hosting
- **Any web server**: Upload files to public directory

## Local Development

1. Clone or download the website files
2. Open `index.html` in a web browser
3. For development with live reload, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## Customization

### Colors
Update the CSS variables in `css/styles.css`:
```css
:root {
  --haje-background: #FBFAF7;
  --haje-primary: #004830;
  --haje-accent: #2F8F5B;
  /* ... other variables */
}
```

### Content
Edit the HTML content in `index.html` to update:
- Company name and branding
- Service descriptions
- Contact information
- Any text content

### Images
Replace images in the `images/` folder:
- Update logo: `images/logo_text_no_bg.png`
- Update step icons: `images/order.png`, `images/pickup.png`, etc.
- Update background video: `video/main_1.mp4`

## Performance

- Optimized images and video
- Minified CSS and JavaScript (for production)
- Lazy loading for better performance
- Responsive images for different screen sizes

## SEO

- Semantic HTML structure
- Meta tags for social sharing
- Alt text for images
- Proper heading hierarchy

## License

© 2025 Haje. All rights reserved.
