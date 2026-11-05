<<<<<<< HEAD
# Portfolio
# Gaurav Gavali — Developer Portfolio

A production-grade, high-performance portfolio website built for **Gaurav Gavali** (Software Developer, Web & App Developer, SaaS Builder, and Full-Stack Engineer).

Featuring a **deep space dark aesthetic**, glassmorphism cards, glowing neon gradients, interactive vanilla canvas particle systems, smooth custom cursor tracking, animated progress bars, stat counters, 3D card tilt physics, and mobile-first responsive architecture.

---

## 🚀 Live Preview & How to Run

Because this project is built with standard semantic **HTML5**, **CSS3**, and **vanilla JavaScript** (no node modules, webpack, or build steps required), you can open and run it immediately!

### Option 1: Direct File Opening
Double-click `index.html` in Finder or your file manager to open it directly in Google Chrome, Safari, Firefox, or Edge.

### Option 2: Live Server in VS Code (Recommended)
1. Open the folder `/Users/gauravgavali/Downloads/Krushna Collection/` in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The site will launch on `http://127.0.0.1:5500/index.html` with instant live reload on file edits.

### Option 3: Python Local Server
Run this command in your terminal from this folder:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📁 File Structure

```
Krushna Collection/
├── index.html       # Semantic single-page HTML layout
├── styles.css       # Complete CSS design system, variables & keyframe animations
├── script.js        # Canvas particles, cursor tracking, observers & interactive logic
└── README.md        # Documentation and customization guide
```

---

## 🎨 Design System & Theming

All theme colors and dimensions are organized in `styles.css` under the `:root` pseudo-class:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `--bg-primary` | `#0a0a0f` | Deep navy/black background |
| `--bg-secondary` | `#0f0f18` | Dark layer background |
| `--bg-card` | `rgba(18, 18, 30, 0.65)` | Glassmorphic card surface |
| `--accent-purple` | `#7c3aed` | Vibrant neon purple |
| `--accent-blue` | `#3b82f6` | Electric blue |
| `--accent-cyan` | `#06b6d4` | Radiant cyan accent |
| `--text-primary` | `#f8fafc` | Crisp white typography |
| `--font-heading` | `'Space Grotesk'` | Headings font (Google Font) |
| `--font-body` | `'Inter'` | Body text font (Google Font) |

To tweak any color scheme or gradient, simply change the hex code in `:root` inside `styles.css`.

---

## 🛠️ How to Customize Your Portfolio

### 1. Update Bio and Name
Open `index.html`:
- Search for `Gaurav Gavali` to adjust your displayed title, logo monogram, or branding.
- Search for `<section class="section about-section"` to edit the personal bio paragraphs and key focus areas.

### 2. Update Typewriter Roles
Open `script.js` around line 180 and update the `roles` array:
```javascript
const roles = [
  'Software Developer',
  'Web Developer',
  'App Developer',
  'SaaS Builder',
  'Full Stack Engineer'
];
```

### 3. Adjust Stats Counters
In `index.html` within `<div class="stats-row">`, update the `data-target` numbers to match your real statistics:
```html
<span class="stat-counter" data-target="5">0</span><span class="stat-plus">+</span>
```
The counter will automatically count up smoothly to this target number when scrolled into view.

### 4. Customize Skills & Progress Percentages
In `index.html` under `<section class="section skills-section"`:
```html
<span class="skill-percentage">95%</span>
<div class="skill-bar-fill" data-progress="95"></div>
```
Simply edit both the text percentage and the `data-progress` attribute (from 0 to 100). The animated bar will automatically fill to that length on scroll.

### 5. Adding Real Projects (Replacing Placeholders)
In `index.html` under `<section class="section work-section"`:
- Replace project titles, descriptions, and tag pills.
- Remove the `btn-disabled` class and `data-tooltip` attribute when ready to link your actual GitHub repositories or live URLs:
```html
<!-- Before -->
<button class="btn btn-sm btn-disabled" data-tooltip="Launching Soon">View Project</button>

<!-- After (Live link) -->
<a href="https://yourproject.com" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
  <span>View Project</span>
</a>
```

### 6. Connect Real Social Links
Search for `class="social-icon-link"` or `class="social-btn"` in `index.html` and replace `href="#"` with your genuine profile links:
- GitHub: `href="https://github.com/yourusername"`
- LinkedIn: `href="https://linkedin.com/in/yourusername"`
- Twitter / X: `href="https://twitter.com/yourusername"`

### 7. Connect Contact Form to Your Email
The form in `index.html` currently simulates an interactive submit with validation and success feedback. To receive genuine email inquiries from visitors, you can connect it with **Formspree** or **Web3Forms**:

#### Using Formspree (Free & Easy):
1. Create a free account at [Formspree.io](https://formspree.io).
2. Create a form and copy your endpoint ID (e.g. `https://formspree.io/f/mqkvnxyz`).
3. In `index.html`, add `action="https://formspree.io/f/mqkvnxyz"` and `method="POST"` to `<form id="contactForm">`.

---

## 🌟 Included Animations & Features

- **High-Tech Preloader Screen**: Animated monogram spinner with progress track that cleanly fades out on window load.
- **Custom Glowing Cursor**: Reactive cyan dot with an interpolated lagging purple ring that scales up on clickable elements.
- **Scroll Progress Bar**: Real-time reading indicator at the top of the viewport.
- **Directional Smart Navbar**: Automatically adds backdrop blur when scrolled down, slides out of view on downward scroll, and reappears on upward scroll.
- **Active Section Spy**: Highlights active nav link as you navigate through different sections.
- **Interactive Particle Network Canvas**: Dynamic floating dots that connect with delicate neon lines and react to mouse movements.
- **3D Card Tilt Physics**: Interactive perspective tilt on service cards that follows the user's cursor.
- **Floating 3D Background Shapes**: Keyframe-animated triangles, circles, and code glyphs.
- **Smooth Number Counter**: Cubic-eased numerical animation for experience, completed projects, and happy clients.
- **One-Click Email Copying**: Interactive clipboard copy button with dynamic tooltip status.
- **Fully Responsive**: Mobile-first drawer navigation with animated hamburger morphing.

---

## 📄 License
This project is open-source and customizable for personal or commercial portfolio use.
Copyright © 2024–Present Gaurav Gavali. All rights reserved.
>>>>>>> f0ed529 (Initial commit)
