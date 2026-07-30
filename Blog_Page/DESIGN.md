---
name: Institutional Global Trade
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#3e4946'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#6e7a76'
  outline-variant: '#bdc9c5'
  surface-tint: '#006b5c'
  primary: '#005e51'
  on-primary: '#ffffff'
  primary-container: '#097969'
  on-primary-container: '#a3feea'
  inverse-primary: '#7cd7c3'
  secondary: '#5b5f63'
  on-secondary: '#ffffff'
  secondary-container: '#e0e2e8'
  on-secondary-container: '#616569'
  tertiary: '#515353'
  on-tertiary: '#ffffff'
  tertiary-container: '#6a6b6b'
  on-tertiary-container: '#eceded'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#98f3df'
  primary-fixed-dim: '#7cd7c3'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#005045'
  secondary-fixed: '#e0e2e8'
  secondary-fixed-dim: '#c4c6cc'
  on-secondary-fixed: '#181c20'
  on-secondary-fixed-variant: '#44474b'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  section-gap: 5rem
  component-padding: 1rem
---

## Brand & Style

The visual identity of the design system is anchored in **Corporate / Modern** principles with a focus on institutional reliability and global scale. It targets high-level B2B decision-makers in the international agricultural sector.

The aesthetic balance is achieved through:
- **Institutional Trust:** Deep, saturated greens paired with metallic accents to evoke stability and premium quality.
- **Precision:** Clean grid lines and generous whitespace reflecting the meticulous nature of global logistics and quality control.
- **Geometric Sophistication:** Subtle, technical patterns inspired by trading routes and geometric crop patterns, used as watermarks or border accents.
- **Professionalism:** High-contrast layouts that prioritize information density and clarity for complex international trade data.

## Colors

The palette is designed to project authority and premium craftsmanship.

- **Royal Emerald (#097969):** The primary signature color, representing growth, agriculture, and high-end positioning. Used for primary actions and key brand moments.
- **Metallic Silver (#8E9196):** Used for subtle borders, secondary text, and technical accents. It bridges the gap between the organic green and the crystalline white.
- **Crystalline White:** The primary background color, used in gradients with soft silver to create a "polished" look.
- **Neutral / Deep Onyx (#1A1C1B):** Used for primary typography to ensure maximum legibility and a grounded feel.

Gradients should be applied sparingly, mimicking the sheen of brushed metal or the clarity of polished glass (e.g., `linear-gradient(135deg, #FFFFFF 0%, #F5F7F6 100%)`).

## Typography

This design system utilizes a dual-font strategy to balance character with utility.

- **Montserrat (Headlines):** Chosen for its geometric precision and professional weight. It feels "established" and architectural.
- **Inter (Body/UI):** Optimized for readability in data-heavy contexts, such as logistics forms and product specifications.

**Scaling Rules:**
Large display sizes use tighter letter spacing to maintain a "prestige" look. Labels and captions utilize increased letter spacing and uppercase styling for a technical, "ledger-like" appearance appropriate for global trade.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy to maintain an institutional and structured feel.

- **Desktop:** 12-column grid with a 1280px max-width.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px margins.

The spacing rhythm is based on a **base-8 scale**, but emphasizes vertical airiness between sections (80px - 120px) to allow the high-end imagery and technical details to breathe. Grid lines are occasionally rendered as subtle 1px silver strokes (#E2E4E3) to emphasize the "institutional" structure.

## Elevation & Depth

Visual hierarchy is established through **Low-contrast outlines** and **Tonal layers**. 

- **Planes:** Surfaces are primarily flat or use very soft, elongated ambient shadows (0% - 5% opacity) to avoid a "cheap" floating effect.
- **Hairline Borders:** Key containers use 1px solid silver or light emerald strokes to define boundaries.
- **Metallic Depth:** Secondary layers may use a subtle linear gradient to simulate a satin metal finish, providing depth without the use of traditional drop shadows.
- **Glass Accents:** For the sticky navbar, a 20px backdrop-blur with a 90% white tint provides a modern, crystalline feel that keeps the focus on content.

## Shapes

The shape language is **Soft** but precise. 

- **Radius:** A consistent 0.25rem (4px) radius is applied to standard UI elements like buttons and input fields to maintain a professional, slightly sharp edge.
- **Product Containers:** Larger cards use 0.5rem (8px) for a subtle modern touch.
- **Icons:** Should be monolinear, utilizing 1.5px or 2px stroke weights to match the "institutional" typography.

## Components

### Navigation & Global
- **Sticky Navbar:** 80px height, crystalline white blur background. Include a top-tier "utility bar" for the multi-language switcher and global trade hours.
- **Language Switcher:** A clean dropdown using flag icons and ISO codes, styled with a silver hairline border.
- **WhatsApp Floater:** Positioned bottom-right. A circular Emerald icon (#097969) with a soft pulse animation to indicate live availability.

### Interaction Elements
- **Primary Button:** Solid Royal Emerald background, white Montserrat Bold text. No shadow, 4px corner radius.
- **Secondary Button:** 1px Silver border with Royal Emerald text. High-state hover: Emerald background.
- **B2B Inquiry Forms:** Input fields use a "top-label" layout. Bottom-borders only or subtle light grey frames. Focused states use a 2px Royal Emerald bottom stroke.

### Content Display
- **Product Cards:** Minimalist. Large high-res photography at the top, followed by technical specs (Origin, Grade, Capacity) in a tight Inter Label-md style.
- **FAQ Accordions:** Clean horizontal dividers. Use the Emerald color for the "+" and "-" icons to guide the eye.
- **Geometric Accents:** Use 1px stroke patterns of interlocking circles or global longitude/latitude lines as background watermarks in the footer and hero sections.