# Barba.js Page Transitions Guide

## Overview

The site uses Barba.js v2 for smooth page transitions with clip-path animations. Two transition types are implemented:

1. **Circle Wipe** - Default transition with expanding/contracting circle
2. **Slide Wipe** - Alternative slide transition from left to right

## How It Works

### HTML Structure

Each page must have:
```html
<body data-barba="wrapper">
  <main data-barba="container" data-barba-namespace="page-name">
    <!-- Page content -->
  </main>
</body>
```

### Navigation Links

Regular links work automatically:
```html
<a href="/work.html">Work</a>
```

To prevent transition on same page:
```html
<a href="/work.html" data-barba-prevent="self">Work</a>
```

## Transition Types

### Circle Wipe (Default)

- Expands from center on leave
- Contracts to center on enter
- Duration: 0.8s each direction
- Easing: power4.inOut

### Slide Wipe

- Slides in from left
- Slides out to right
- Duration: 0.6s each direction
- Easing: power3.inOut

## Customization

### Change Transition Color

Edit `style.css`:
```css
.transition-layer {
  background: var(--teal); /* Change to any color */
}
```

### Add New Transition

In `main.js`, add to `barba.init()`:
```javascript
{
  name: 'fade',
  async leave(data) {
    await gsap.to(data.current.container, {
      opacity: 0,
      duration: 0.5
    });
  },
  async enter(data) {
    await gsap.from(data.next.container, {
      opacity: 0,
      duration: 0.5
    });
  }
}
```

### Custom Transition Per Link

Add `data-barba-transition` attribute:
```html
<a href="/work.html" data-barba-transition="slide-wipe">Work</a>
```

Then in `main.js`:
```javascript
{
  name: 'slide-wipe',
  custom: ({ trigger }) => {
    return trigger.dataset.barbaTransition === 'slide-wipe';
  },
  // ... transition code
}
```

## Page-Specific Animations

### Views Hook

Each page can have custom enter/leave logic:
```javascript
views: [
  {
    namespace: 'work',
    beforeEnter() {
      // Initialize work page specific animations
    },
    afterLeave() {
      // Cleanup work page
    }
  }
]
```

### Available Hooks

- `beforeOnce` - Before first page load
- `once` - First page load
- `afterOnce` - After first page load
- `beforeLeave` - Before leaving page
- `leave` - During leave transition
- `afterLeave` - After leaving page
- `beforeEnter` - Before entering new page
- `enter` - During enter transition
- `afterEnter` - After entering new page

## Integration with Lenis & GSAP

The transitions automatically:
- Reset scroll position to top
- Kill all ScrollTrigger instances
- Reinitialize animations on new page
- Update cursor hover elements

## Troubleshooting

### Transitions not working

1. Check all pages have `data-barba="wrapper"` and `data-barba="container"`
2. Verify namespace is unique per page
3. Ensure script is loaded on all pages

### Animations not resetting

Make sure `initAnimations()` is called in the `enter` hook:
```javascript
async enter(data) {
  // ... transition code
  initAnimations(); // Reinitialize
}
```

### ScrollTrigger conflicts

Kill all triggers before transition:
```javascript
ScrollTrigger.getAll().forEach(trigger => trigger.kill());
```

## Performance Tips

1. Use `will-change: transform` on transition layer
2. Keep transition duration under 1s
3. Use hardware-accelerated properties (transform, opacity)
4. Avoid animating layout properties (width, height, margin)

## Examples

### Vertical Wipe
```javascript
{
  name: 'vertical-wipe',
  async leave(data) {
    await gsap.to('.transition-layer', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 0.6
    });
  },
  async enter(data) {
    await gsap.to('.transition-layer', {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      duration: 0.6
    });
  }
}
```

### Scale Transition
```javascript
{
  name: 'scale',
  async leave(data) {
    await gsap.to(data.current.container, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5
    });
  },
  async enter(data) {
    await gsap.from(data.next.container, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5
    });
  }
}
```

## Resources

- [Barba.js Documentation](https://barba.js.org/)
- [GSAP Clip-Path Examples](https://greensock.com/docs/v3/GSAP/CorePlugins/CSSPlugin)
- [CSS Clip-Path Generator](https://bennettfeely.com/clippy/)
