# 📱 Responsive Quick Reference Card

## Breakpoints
```
320px  → Small Mobile
375px  → Mobile (iPhone)
768px  → Tablet
1024px → Desktop
1440px → Large Desktop
1920px → Extra Large
```

## Device Behavior

| Feature | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Navigation | 🍔 Hamburger | 🍔 Hamburger | 📋 Full Menu |
| Columns | 1 | 2 | 3-4 |
| Touch Targets | 48px | 48px | Auto |
| Custom Cursor | ❌ Hidden | ❌ Hidden | ✅ Visible |
| Smooth Scroll | ❌ Native | ❌ Native | ✅ Lenis |
| Animations | ⚡ Reduced | ✅ Full | ✅ Full |

## Quick Test
```bash
1. F12 (DevTools)
2. Ctrl+Shift+M (Device Mode)
3. Select Device
4. Test!
```

## Files
- `responsive.css` - All responsive styles
- `mobileOptimizations.ts` - Mobile utilities
- `MOBILE_TESTING_GUIDE.md` - Testing guide

## Common Fixes
```css
/* No horizontal scroll */
body { overflow-x: hidden; }

/* Touch targets */
button { min-height: 48px; }

/* Prevent zoom */
input { font-size: 16px; }

/* Viewport fix */
min-height: calc(var(--vh, 1vh) * 100);
```

## Status
✅ Mobile (320px - 767px)
✅ Tablet (768px - 1023px)
✅ Desktop (1024px+)
✅ All animations work
✅ Touch optimized
✅ Performance optimized

## Test Checklist
- [ ] Navigation works
- [ ] Text readable
- [ ] Buttons tappable
- [ ] No horizontal scroll
- [ ] Forms usable
- [ ] Images scale
- [ ] Animations smooth

**Ready to Ship! 🚀**
