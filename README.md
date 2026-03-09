# MANGO® — Premium Mango Website..

A premium, Apple-style scroll-driven 3D product website for selling Carabao mangoes from Kanchanpur, Nepal. Built with pure HTML, CSS, and vanilla JavaScript, no frameworks, no dependencies...


## Project Structure

```
/
├── index.html        — Main HTML structure
├── style.css         — All styles (glassmorphism nav, 3D scene, sections)
├── script.js         — Scroll animation, canvas renderer, interactions
├── README.md         — This file
└── frame/            — 3D frame sequence (required)
    ├── ezgif-frame-001.png
    ├── ezgif-frame-002.png
    ├── ...
    └── ezgif-frame-080.png
```

## How the 3D Effect Works

The website uses a **scroll-driven frame sequence** technique — the same approach used on Apple product pages.....

1. 80 PNG frames of a rotating mango are preloaded into memory on page open.
2. A `<canvas>` element is fixed full-screen (`position: fixed`, `100vw × 100vh`) as the page background.
3. As the user scrolls through a `600vh` tall scroll spacer, the scroll progress (0–100%) is mapped to frame index (0–79).
4. Each frame is drawn to the canvas using `Math.max` cover-scaling so the mango fills the entire screen edge to edge.
5. Lerp smoothing (`currentFrame += (target - current) * 0.09`) gives the animation a weighted, cinematic feel.

The mango appears to rotate in full 3D purely through scroll — no WebGL, no Three.js required.

---

## Frame Folder Setup

The `frame/` folder is **not included** and must be added manually.

- Place exactly **80 PNG images** inside a folder named `frame/` in the same directory as `index.html`.
- Files must be named: `ezgif-frame-001.png` through `ezgif-frame-080.png` (zero-padded to 3 digits).
- Recommended resolution: **1080×1080px or higher** for sharp display on retina screens.
- Transparent background PNGs work best — the black canvas shows through behind the mango.

```
frame/
  ezgif-frame-001.png   ← first frame (front of mango)
  ezgif-frame-002.png
  ...
  ezgif-frame-080.png   ← last frame (completes rotation)
```

If the `frame/` folder is missing or frames fail to load, the canvas simply stays black — no errors, no broken layout.

---

## Features

**3D Scroll Experience**
- Full-screen canvas background playing 80 frames as you scroll
- 6 text panels fade in and out over the 3D scene as you progress through sections
- Gold progress bar along the bottom edge tracks scroll position
- Scroll hint indicator fades out once the user starts scrolling

**Glassmorphism Navbar**
- Floating pill navbar with `backdrop-filter: blur(28px)` frosted glass effect
- Displays location: **Kanchanpur, Nepal** with a gold pin icon
- Darkens subtly on scroll while maintaining the glass look
- Underline animation on nav link hover

**White Sections (after 3D scene)**
- Smooth black-to-white gradient transition from the 3D scene into the content sections
- Origin section with farm photo, Guinness Record float badge, and spec table
- Features grid (4 columns) — Fibreless Flesh, Brix 22+, Hand Graded, Cold Chain
- Shop section with 3 product cards — hover lift, image zoom, Add to Bag interaction
- Reviews section with star ratings
- Final CTA section with radial gold glow
- Dark footer

**Custom Cursor**
- Small gold dot cursor that snaps quickly
- Larger ring that lags behind for a premium trailing effect
- Both expand on hover over interactive elements

**Scroll Reveal**
- All content sections use `IntersectionObserver` to stagger-animate in on scroll
- Cards reveal with 90ms delay per index for a cascade effect

---

## Customization

### Changing the Location

In `index.html`, find the `.nav-location` element and update the text:

```html
<div class="nav-location">
    <svg ...></svg>
    <span>Your City, Country</span>
</div>
```

### Changing Colors

All colors are CSS variables at the top of `style.css`:

```css
:root {
    --white:   #ffffff;
    --off:     #f9f7f4;
    --border:  #e5dfd5;
    --text:    #0e0d0c;
    --muted:   #8a837a;
    --gold:    #d98f0e;       /* primary accent */
    --gold-lt: #f0aa2a;       /* lighter gold for gradients */
}
```

### Changing Product Prices / Names

All product cards are in `index.html` inside the `.shop-section`. Each card follows this structure:

```html
<div class="prod-card">
    <div class="prod-img">
        <img src="YOUR_IMAGE_URL" alt="Product Name">
        <span class="prod-tag">Label</span>
    </div>
    <div class="prod-info">
        <h3>Product Name</h3>
        <p>Description text.</p>
        <div class="prod-row">
            <span class="price">$00<sup>.00</sup></span>
            <button class="add-btn">Add to Bag +</button>
        </div>
    </div>
</div>
```

### Adjusting the Scroll Speed / Frame Count

In `script.js`, change `TOTAL` if you have a different number of frames:

```js
const TOTAL = 80; // change to match your frame count
```

The scroll spacer height (how long the 3D section lasts) is controlled in `style.css`:

```css
.scroll-spacer {
    height: 600vh; /* increase for slower rotation, decrease for faster */
}
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 76+ | Full |
| Safari 14+ | Full (`-webkit-backdrop-filter` applied) |
| Firefox 103+ | Full |
| Edge 79+ | Full |
| Mobile Chrome/Safari | Full (location + order button visible, nav links hidden) |

`backdrop-filter` is supported in all modern browsers. On older browsers the navbar falls back to a semi-transparent dark background gracefully.

---


## Local Development

No build step required. Simply open `index.html` in a browser.

> **Note:** Browsers block local file loading for security. If frames aren't showing, serve the project through a local server..

Then open `http://localhost:8000` in your browser.

---

## Credits

- Font: [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts
- Farm photography: [Unsplash](https://unsplash.com)
- Location: Kanchanpur, Nepal
- Product: Carabao Mango — Kanchanpur, Nepal
