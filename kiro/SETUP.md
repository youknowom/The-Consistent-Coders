# Setup Guide

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:3000

## Customization Guide

### Colors
Edit CSS variables in `style.css`:
```css
:root {
  --dark: #0A0A0A;
  --teal: #1D9E75;
  --purple: #7F77DD;
  --coral: #D85A30;
  --white: #FFFFFF;
}
```

### Typography
The site uses Geist font from Google Fonts. To use Neue Haas Grotesk Display (as specified):
1. Purchase/download the font
2. Add to `/public/fonts/`
3. Update `style.css`:
```css
@font-face {
  font-family: 'Neue Haas Grotesk Display';
  src: url('/fonts/NeueHaasDisplay-Bold.woff2') format('woff2');
  font-weight: 700;
}
```

### Content

#### Projects
Edit the project cards in `index.html` (lines ~90-140):
- Replace placeholder colors with actual project images
- Update project names, tags, and years
- Add real project screenshots to `/public/images/`

#### Team Members
Update team cards in `index.html` (lines ~150-180):
- Change names and roles
- Add GitHub profile links
- Customize card count (currently 5)

#### About Text
Modify the story text in `index.html` (line ~75):
```html
<p class="about-text">
  Your custom story here...
</p>
```

### Performance Optimization

1. **Images**: Use WebP format, lazy load with:
```html
<img loading="lazy" src="image.webp" alt="description">
```

2. **Three.js**: Adjust particle count in `main.js`:
```javascript
for (let i = 0; i < 2000; i++) { // Reduce for lower-end devices
```

3. **Mobile**: Three.js is disabled on mobile automatically

### Adding Real Images

Replace placeholder project backgrounds:
```html
<!-- Before -->
<div class="project-image" style="background: #1D9E75;"></div>

<!-- After -->
<div class="project-image" style="background: url('/images/project1.jpg') center/cover;"></div>
```

### Deployment

Build for production:
```bash
npm run build
```

Deploy the `dist` folder to:
- Vercel: `vercel deploy`
- Netlify: Drag & drop `dist` folder
- GitHub Pages: Push `dist` to `gh-pages` branch

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Cursor not showing
- Check if `cursor: none` is applied to body
- Verify JavaScript is loading

### Animations stuttering
- Reduce particle count
- Check GPU acceleration
- Disable Three.js on lower-end devices

### Fonts not loading
- Verify Google Fonts link in `<head>`
- Check network tab for font loading errors
- Use font-display: swap for better performance

## Next Steps

1. Add real project images
2. Connect contact form to backend
3. Add project detail pages with Barba.js transitions
4. Implement Curtains.js image distortion on hover
5. Add analytics (Google Analytics, Plausible, etc.)
6. Optimize images with next-gen formats
7. Add meta tags for SEO
8. Create favicon and social share images
