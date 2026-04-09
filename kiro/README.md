# The Consistent Coders — Awwwards-Level Portfolio

A dark, cinematic portfolio website inspired by award-winning sites like byfrontyard.com, studiohazey.com, and designbybrandin.com. Features advanced GSAP animations, Three.js particle systems, smooth scroll interactions, and typography-first design.

## ✨ Key Features

- **Preloader**: Animated counter (0→100) with SVG stroke animation and circular clip-path reveal
- **Hero Section**: 2000-particle Three.js field with mouse interaction and typewriter effect
- **Custom Cursor**: Dot + ring with magnetic effects and smooth following
- **Barba.js Page Transitions**: Smooth clip-path wipe transitions between pages
- **Infinite Marquee**: Velocity-based speed control synced with scroll direction
- **Pinned Story Section**: Word-by-word text reveal with morphing Three.js sphere
- **3D Project Gallery**: Swiper coverflow with tilt effects and magnetic hover
- **Horizontal Scroll Showcase**: Full-width horizontal scrolling project gallery
- **Team Cards**: Clip-path reveal with parallax image movement
- **Contact Section**: Split-color hover effect with magnetic CTA button
- **Navigation**: Fixed nav with smooth page transitions

## 🎨 Design Principles

- Typography as primary design element (not boxes and cards)
- Bold flat color blocks (NO gradients in backgrounds)
- Generous whitespace with intentional asymmetry
- Animations with physical weight (overshoot, friction, spring easing)
- Surgical color usage (Teal #1D9E75, Purple #7F77DD, Coral #D85A30)
- Dark base (#0A0A0A) with restrained elegance

## 🚀 Tech Stack

- **Vite** - Lightning-fast build tool
- **GSAP 3** - ScrollTrigger for scroll-driven animations
- **Lenis** - Smooth scroll (lerp: 0.08)
- **Three.js r160** - Particle systems and WebGL
- **Barba.js v2** - Page transitions with clip-path wipes
- **SplitType** - Text splitting for word-by-word reveals
- **Swiper.js** - 3D coverflow gallery
- **Anime.js** - SVG stroke animations
- **Typed.js** - Typewriter effects
- **VanillaTilt.js** - Card tilt interactions

## 📦 Installation

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 🎯 Performance

- Target: 60fps on Intel i5 + GTX 1060
- Lighthouse score: >80
- GSAP context() for proper cleanup
- will-change optimizations
- Lazy-loaded Three.js scenes
- Mobile: Three.js disabled, GSAP animations retained

## 📱 Mobile Optimized

- Custom cursor disabled on touch devices
- Three.js canvas hidden on mobile
- Responsive typography with clamp()
- Touch-friendly navigation

## 🎨 Customization

See [SETUP.md](./SETUP.md) for detailed customization guide including:
- Changing colors and typography
- Adding real project images
- Updating team members
- Performance tuning
- Deployment instructions

## 🌐 Inspired By

- [byfrontyard.com](https://byfrontyard.com) - Energy, typography, micro interactions
- [sowieso.wero-wallet.eu](https://sowieso.wero-wallet.eu/nl-en/merchant) - Bold type, color, playfulness
- [studiohazey.com](https://studiohazey.com) - Dark, cinematic, scroll storytelling
- [designbybrandin.com](https://designbybrandin.com) - Personal portfolio, typography-first
- [mescubook.com](https://mescubook.com/work.html) - Dark, cinematic slide gallery
- [charly.graphics](https://charly.graphics) - Editorial bio reveal, restrained elegance

## 📄 License

MIT

## 🤝 Contributing

This is a portfolio template. Feel free to fork and customize for your own use.

---

Built with consistency. Shipped with confidence.
