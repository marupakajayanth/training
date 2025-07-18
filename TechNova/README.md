# TechNova Internal Knowledge Portal

## Overview
This is a static, responsive internal knowledge portal for TechNova Solutions, designed to centralize onboarding resources, documentation, and team introductions for new employees.

## Structure
- **index.html**: Main HTML file with semantic structure, navigation, and all content sections.
- **styles.css**: External CSS file for layout, color theme, responsiveness, and accessibility.
- **/images**: Folder for local images (team profiles, office photo, etc.).
- **/media**: Folder for local video and audio files (intro video, podcast, captions).

## Features & Design Choices
- **Semantic HTML5**: Uses `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` for clear structure.
- **Sticky Navigation**: Fixed top navigation bar with anchor links for smooth section jumps.
- **Active Section Highlight**: Uses CSS pseudo-classes for hover/focus and :target for active section.
- **Company Introduction**: Structured headings, unordered and ordered lists, and a local image with alt text.
- **Resource Table**: Styled table with zebra striping, hover effects, and clear links.
- **Team Cards**: Responsive Flexbox layout for team member profiles using `<figure>` and `<figcaption>`.
- **Multimedia**: Embedded video (with captions) and audio (with transcript/summary).
- **Newsletter Signup**: Accessible form with labels, ARIA attributes, and HTML5 validation.
- **Meta & SEO**: Includes charset, viewport, and description meta tags for SEO and device compatibility.
- **CSS Variables**: Color theme and spacing use CSS variables for easy customization.
- **Responsive Design**: Media queries adapt layout for mobile, tablet, and desktop. Navigation collapses on mobile.

## Accessibility
- All images have meaningful `alt` text.
- Proper heading hierarchy for screen readers.
- ARIA attributes (e.g., `role="navigation"`, `aria-label`) for improved accessibility.
- Landmarks (`<main>`, `<nav>`, `<footer>`) for assistive technologies.
- Form fields use labels and required attributes.

## How to Use
1. Place all images (e.g., `office.jpg`, `alex.jpg`, etc.) in the `/images` folder.
2. Place video (`intro.mp4`), captions (`intro-captions.vtt`), and audio (`welcome-podcast.mp3`) in the `/media` folder.
3. Open `index.html` in a browser to view the portal.

## Responsiveness
- Tested on mobile (<600px), tablet (600–1024px), and desktop (>1024px).
- All sections stack vertically on small screens.
- Navigation bar adapts to a vertical stack on mobile.

## Screenshots
*Add screenshots of the portal on different devices here (optional).* 