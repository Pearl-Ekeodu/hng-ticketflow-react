# Ticket App Design Specification

## Overview
This document ensures complete design consistency across React, Vue.js, and Twig implementations.

---

## Color Palette

### Primary Colors
- **Primary**: `#4F46E5` (Indigo) - Main brand color for buttons, links, hero
- **Secondary**: `#7C3AED` (Purple) - Accent for gradients, highlights
- **Accent**: `#2563EB` (Blue) - Additional accent for variety

### Status Colors
- **Open**: `#10B981` (Green) - Background: `#D1FAE5`
- **In Progress**: `#F59E0B` (Amber) - Background: `#FEF3C7`
- **Closed**: `#6B7280` (Gray) - Background: `#E5E7EB`

### Neutral Colors
- **Background**: `#F9FAFB` (Light Gray)
- **Card Background**: `#FFFFFF` (White)
- **Text Primary**: `#111827` (Dark Gray)
- **Text Secondary**: `#6B7280` (Medium Gray)
- **Border**: `#E5E7EB` (Light Gray)

---

## Typography

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Font Sizes
- **Hero Title**: 48px (3rem)
- **Page Title**: 36px (2.25rem)
- **Section Title**: 24px (1.5rem)
- **Body**: 16px (1rem)
- **Small**: 14px (0.875rem)
- **Tiny**: 12px (0.75rem)

### Font Weights
- **Normal**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

---

## Layout

### Container
- **Max Width**: 1440px
- **Horizontal Centering**: `margin: 0 auto`
- **Padding**: 24px on desktop, 16px on mobile

### Spacing Scale
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px
- **3XL**: 64px
- **4XL**: 96px

### Grid System
- **Desktop**: 3-4 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column (stacked)

---

## Components

### Cards
- **Background**: White (`#FFFFFF`)
- **Border Radius**: 16px
- **Shadow**: `0 4px 6px rgba(0,0,0,0.1)`
- **Padding**: 32px
- **Hover Effect**: Lift up 2px, increase shadow

### Buttons
- **Primary Button**:
  - Background: `#4F46E5`
  - Text: White
  - Padding: 16px 32px
  - Border Radius: 12px
  - Hover: Darken to `#4338CA`, lift 1px

- **Secondary Button**:
  - Background: White
  - Text: `#4F46E5`
  - Border: 2px solid `#4F46E5`
  - Same padding and radius

### Input Fields
- **Border**: 1px solid `#E5E7EB`
- **Border Radius**: 8px
- **Padding**: 12px 16px
- **Focus**: Border color `#4F46E5`, shadow `0 0 0 3px rgba(79,70,229,0.1)`
- **Error**: Border color `#EF4444`

### Status Badges
- **Shape**: Pill (fully rounded)
- **Padding**: 4px 16px
- **Font Size**: 14px
- **Font Weight**: Medium (500)

---

## Hero Section

### Structure
- **Height**: 600px on desktop, 500px on tablet, 400px on mobile
- **Background**: Gradient from primary to secondary with wavy SVG at bottom
- **Decorative Circle**: Large circle (400px) positioned top-right, 50% opacity overlap

### Wave SVG
- **Position**: Absolute bottom of hero
- **Height**: 200px
- **Colors**: Gradient matching hero (3 layers for depth)

### Content Layout
- **Title**: Centered, 48px, bold, white
- **Description**: Centered, 18px, white with 80% opacity, max-width 600px
- **Buttons**: Centered flex row, gap 16px

---

## Page-Specific Layouts

### Landing Page
1. **Hero Section** (wavy background, decorative circle)
2. **Features Section** (3 cards in grid, box shadows)
3. **CTA Section** (centered with button)
4. **Footer** (links, copyright)

### Auth Pages (Login/Signup)
- **Centered Card**: Max-width 480px, shadow-xl
- **Decorative Circles**: 2 circles in background (top-left, bottom-right)
- **Form Fields**: Stacked vertically, 16px gap

### Dashboard
- **Stats Grid**: 3 cards in row (desktop), stacked (mobile)
- **Each Card**: Icon, number (large), label
- **Navigation**: Button to ticket management

### Ticket Management
- **Header**: Title + "Create New" button (space-between)
- **Ticket List**: Grid of cards, 2 columns (desktop), 1 column (mobile)
- **Each Ticket Card**: Title, status badge, description excerpt, action buttons

---

## Decorative Elements

### Required Elements
1. **Hero Section**: 1 large decorative circle (top-right)
2. **Auth Pages**: 2 medium decorative circles (corners)
3. **Ticket Cards**: Box-shaped with shadows and rounded corners

### Circle Specifications
- **Large**: 400px diameter, 15% opacity, positioned 50% outside viewport
- **Medium**: 300px diameter, 12% opacity
- **Colors**: Gradient from primary/secondary to transparent

---

## Responsive Breakpoints

- **Desktop**: ≥ 1024px (full layout, 3-4 columns)
- **Tablet**: 768px - 1023px (2 columns, adjusted spacing)
- **Mobile**: < 768px (1 column, stacked, smaller text)

### Mobile Adaptations
- Reduce hero height to 400px
- Stack all grid items vertically
- Reduce padding to 16px
- Hamburger menu for navigation
- Reduce font sizes by 10-20%

---

## Animations & Transitions

### Hover Effects
- **Cards**: `transform: translateY(-2px)`, increase shadow (200ms ease)
- **Buttons**: `transform: translateY(-1px)`, darken background (200ms ease)

### Page Transitions
- **Route Changes**: Fade in 300ms

### Loading States
- **Skeleton Screens**: Gray pulse animation for cards
- **Spinners**: Rotating circle, primary color

### Micro-interactions
- **Form Focus**: Smooth border color change (150ms)
- **Status Badge**: Subtle scale on hover (1.05)
- **Delete Confirmation**: Modal slide up from bottom (300ms)

---

## Accessibility

### Requirements
- **Contrast Ratio**: Minimum 4.5:1 for text
- **Focus States**: Visible outline (3px solid, primary color)
- **Alt Text**: All decorative SVGs marked with `aria-hidden="true"`
- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`
- **Keyboard Navigation**: All interactive elements accessible via Tab
- **ARIA Labels**: Buttons, form fields, status indicators

---

## Dark Mode (Optional Enhancement)

### Color Adjustments
- **Background**: `#111827` → `#1F2937`
- **Card**: `#1F2937`
- **Text**: `#F9FAFB`
- **Border**: `#374151`
- **Maintain status colors** (adjust brightness slightly)

---

## File Structure
```
shared-assets/
├── wave-hero.svg (wavy background)
├── decorative-circle-1.svg (large circle)
├── decorative-circle-2.svg (medium circle)
├── design-tokens.css (all CSS variables)
├── DESIGN_SPEC.md (this file)
└── mockups/ (screenshots for reference)
```

---

## Implementation Checklist

- [ ] Import Inter font from Google Fonts
- [ ] Import design-tokens.css in all 3 versions
- [ ] Use wave-hero.svg in hero section
- [ ] Place decorative circles per spec
- [ ] Ensure max-width 1440px on all pages
- [ ] Test responsive breakpoints
- [ ] Verify status color consistency
- [ ] Check accessibility with axe DevTools
- [ ] Validate keyboard navigation
- [ ] Test on Chrome, Firefox, Safari

---

**Version**: 1.0  
**Last Updated**: October 24, 2025  
**Maintainer**: HNG Stage 2 Project

