# Fish Token's Site Resources (FTS) Documentation

## PLEASE NOTE: THIS HAS NOT BEEN UPDATED FOR THE LATEST VERSION!

Welcome to the documentation for **FTS**, a personal utility library designed for smooth, high-performance web development.

---

## 🚀 Installation

### CDN

Include the library in your HTML (above other scripts):

```html
<script src="https://niche-site.netlify.app/js/lib/fts.js"></script>
```

### Local

Download `fts.js` and include it:

```html
<script src="path/to/fts.js"></script>
```

---

## 🛠️ Namespaces

### FTS.math

Mathematical utilities and interpolation.

- `random(min, max)`: Random integer (inclusive).
- `snap(val, step)`: Snaps value to nearest step.
- `clamp(val, min, max)`: Clamps value between range.
- `lerp(a, b, t)`: Linear interpolation.
- `map(v, iMin, iMax, oMin, oMax)`: Map value between ranges.
- `dist(p1, p2)`: Euclidean distance.

### FTS.ui

Interactive UI components.

- `cookiePopup(options)`: Customizable cookie consent banner.
- `onVisible(el, fn, threshold)`: Execute callback when element is visible.

### FTS.visual

Visual effects and notifications.

- `banner(options)`: High-quality toast notification.
- `overlay(options)`: Full-screen modal overlay.
- `parseColor(str)`: Parse color strings to RGBA.
- `randomColor(fmt)`: Generate random colors.

### FTS.time

Time and date handling.

- `format(date, fmt)`: Format dates with templates.
- `relative(date)`: Get relative time strings.
- `sleep(ms)`: Async delay.

### FTS.dom

DOM manipulation and storage.

- `$(s, root)`: Element selector.
- `$$(s, root)`: Multiple element selector.
- `create(tag, opts)`: Create element with attributes.
- `on(el, ev, cb)`: Event listener.
- `off(el, ev, cb)`: Remove listener.
- `storage.set(k, v)`: LocalStorage wrapper.
- `cookie.set(k, v, days)`: Cookie wrapper.
- `fadeIn(el, duration)` / `fadeOut(el, duration)`: Fade effects.

### FTS.net

Network and validation.

- `request(options)`: Fetch wrapper with retries.
- `validate.email(s)`: Email validation.
- `validate.url(s)`: URL validation.
- `detectAdblock()`: Advanced adblock detection.

### FTS.device

Device and platform metrics.

- `getPlatform()`: OS detection.
- `isMobile()`: Mobile check.
- `getMetrics()`: Viewport and hardware stats.

### FTS.fun

Easter eggs and random fun.

- `stronghold(...)`: Triangulation logic.
- `getJoke()`: Random programmer joke.
- `screenShake(intensity, duration)`: Shake the screen.

---

## ⚓ Public API

Available directly on `FTS`:

- `$(s, root)`: Select single element.
- `$$(s, root)`: Select all matching elements.
- `isLocal()`: Check if running locally.

---

## 📜 Branding & Reference

Site enhanced by **Fish Token**.
Reference: [https://niche-site.netlify.app/](https://niche-site.netlify.app/)

---
