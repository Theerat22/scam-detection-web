---
name: Scam Detection
description: Thai university message-checking prototype; preserves the supplied mobile Figma design.
colors:
  pink: "#D9577D"
  accent: "#A72F55"
  pink-soft: "#FCECF1"
  ink: "#29212A"
  muted: "#71646C"
  surface: "#F7F4F6"
  line: "#E9E1E5"
  danger: "#AF2944"
  danger-soft: "#FFF0F2"
  green: "#246F56"
  green-soft: "#EAF5EF"
  board: "#F3E9EE"
  white: "#FFFFFF"
typography:
  headline:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Thai, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: "39px"
  title:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Thai, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: "27px"
  body:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Thai, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  helper:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Thai, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: "20px"
  score:
    fontFamily: "IBM Plex Sans, IBM Plex Sans Thai, sans-serif"
    fontSize: "46px"
    fontWeight: 600
    lineHeight: "69px"
rounded:
  label: "8px"
  control: "12px"
  card: "16px"
  shell: "24px"
spacing:
  tight: "4px"
  small: "8px"
  control: "12px"
  stack: "16px"
  status: "20px"
  gutter: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "13px 16px"
    height: "52px"
  button-secondary:
    backgroundColor: "{colors.pink-soft}"
    textColor: "{colors.accent}"
    rounded: "{rounded.card}"
    padding: "13px 16px"
    height: "52px"
  input-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "16px"
  source-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.card}"
    padding: "16px"
  navigation:
    backgroundColor: "{colors.white}"
    height: "88px"
  comparison-label:
    backgroundColor: "{colors.danger-soft}"
    textColor: "{colors.danger}"
    rounded: "{rounded.label}"
    padding: "8px"
  safe-status:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.green}"
    rounded: "{rounded.card}"
    padding: "20px"
  category-row:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "12px"
---

# Design System: Scam Detection

## Overview

**Creative North Star: "The quiet student safety tool"**

Preserve the supplied mobile Figma world: a quiet Thai student safety tool with white surfaces, pink identity, compact cards and clear next actions. The implemented interface pairs concise Thai copy with IBM Plex typography and uses semantic green or danger red to distinguish mock findings.

This document records the implemented source, not a redesign. The supplied Figma file remains visual authority. Analysis, notifications, statistics and university connections are simulations; their visual presentation must keep that status legible.

**Key Characteristics:**
- A 390px mobile composition with 24px content gutters.
- Soft rectangular surfaces, mostly 16px corners, with little structural shadow.
- Thai-first typography, deep pink actions and explicit simulated-data labels.

Evidence: `PRODUCT.md`, `app/globals.css`, `components/scam-app.tsx`, `components/ui.tsx` and `components/report-chart.tsx`. Reference: [supplied Figma](https://www.figma.com/design/2DI44d3YnJjiyhJCdxj4Aa). Source-based documentation; final browser QA was blocked by security policy. Earlier check/report screenshots are partial evidence only. No pixel-perfect validation is claimed.

## Colors

Pink identifies the product; deep pink gives actions and selected labels stronger contrast. Neutral surfaces are slightly warm.

- **Brand pink** (`pink`): logo accents, checked switches, loading progress and selected report bars.
- **Deep pink** (`accent`): primary button fills, links, active tabs and focus outlines.
- **Soft pink** (`pink-soft`): secondary buttons, selected rows, loading and risk-score surfaces.
- **Ink / muted**: main copy and secondary explanations respectively.
- **White / surface / line / board**: phone canvas, quiet cards, separators and desktop surround.
- **Danger / danger-soft**: risk findings and warning panels.
- **Green / green-soft**: the home empty-risk state and mock safe findings.

The selected report bar uses brand pink; unselected bars use `line`. Green communicates the current finding, while nearby copy must preserve the limits of mock analysis.

## Typography

Use locally served IBM Plex Sans first, with IBM Plex Sans Thai for Thai glyphs. Latin brand text, times, scores and counts use IBM Plex Sans first and tabular numerals. Preserve Thai shaping and breathing room.

- Screen titles: 26px / 39px, weight 600.
- Screen header and status headings: 20px / 30px, weight 600.
- Section titles: 18px / 27px, weight 600.
- Body: 16px / 24px, weight 400; action labels weight 500.
- Helper copy: 13px / 20px; small disclaimers: 11px / 17px.
- Mock score: 46px / 69px, weight 600; result heading: 22px / 33px.

## Layout

Desktop uses a selectable hardware frame that fits the window; the app fills the selected device viewport and scrolls within its screen. Other larger touch surfaces keep the centered 390px white app with a minimum height of 844px and 24px corners. At widths up to 480px, the stage loses padding and the phone fills available width, has square outer corners and a minimum height of `100svh`.

Content uses 24px horizontal gutters, 16px vertical padding and 16px stacked gaps. Below 360px, content and brand gutters become 20px; score and report text compact selectively. The simulated status bar is 44px; home header is at least 60px and interior headers are 72px.

Bottom navigation has four equal columns, is sticky at the bottom, and is at least 88px high with safe-area padding. Quick actions form two equal columns with a 12px gap. Reports tighten the vertical rhythm to 8px and use a 130px chart canvas; four text buttons provide another way to select a week. Let content scroll rather than clipping it to the reference height.

## Elevation & Depth

Most screens use flat tonal layering and occasional 1px borders. Buttons and settings switches deliberately have no shadow. Reserve shadows for temporary overlays, the simulated phone notification, scanner illustration, image-remove button and chart tooltip.

- Dialog: `0 18px 60px #29212a29`, over `#29212a66` backdrop.
- Toast: `0 6px 22px #29212a25`.
- Simulated notification: `0 8px 24px #4d1a331f`.
- Chart tooltip: `0 6px 18px #29212a18`.

## Shapes

Cards, primary actions and status panels generally use 16px corners. Navigation items, input tabs, upload targets and category rows use 12px. Comparison labels use 8px; the desktop phone and dialog use 24px. Icons are lightweight Lucide outlines, commonly 16–24px, with status illustrations larger. Keep label-and-icon pairs intact.

## Components

- **Buttons:** full width, minimum 52px high, 13px × 16px padding. Primary uses deep pink and white; secondary uses soft pink and deep pink. Hover darkens the fill; primary active moves down 1px. Disabled actions use muted text on `surface` and do not move.
- **Text input:** a 16px-padded surface card with 13px label and transparent textarea; minimum textarea height 144px. Upload uses the same outer card language, a dashed 12px-radius target and a real in-memory preview. Drag-over adds an accent outline and soft pink background.
- **Navigation:** four equal icon-and-label items, muted by default and deep pink at weight 600 when active. Hover uses `surface`.
- **Source card:** a 16px-padded vertical stack containing a muted category label, source title and deep pink external-link line; the whole card is interactive. Source context does not verify a sender.
- **Chips and filters:** comparison labels use semantic red/green tints. History filters use neutral fills with soft-pink active state. Preserve accompanying text.
- **Status and results:** green home panel pairs an icon with the empty-risk message. Result score cards use soft pink/danger or soft green/green; warnings, evidence and disclaimers remain separate readable blocks.
- **Reports:** selected bars are pink and the first category row is soft pink. Week arrows, bars and week buttons select the same mock week; boundary arrows disable.
- **Feedback:** Radix Dialog supplies modal semantics; toast confirms local setting changes. Feedback success explicitly remains a simulation.

All interactive controls inherit a 3px deep pink `:focus-visible` outline with 4px offset. Hover transitions are typically 150–180ms. Motion serves screen changes, mock analysis progress, score changes and chart entry; reduced-motion media rules shorten CSS motion and the chart disables animation through `useReducedMotion`.

## Do's and Don'ts

### Do
- Do preserve the supplied Figma composition and concise Thai voice.
- Do use deep pink for primary actions and pink for brand marks and selected chart bars.
- Do keep mock-analysis labels, uncertainty copy and contextual source links visible.
- Do retain keyboard focus indicators and reduced-motion behavior.

### Don’t
- Don’t widen desktop into a new dashboard layout.
- Don’t present mock scores, source matches or report totals as verified findings.
- Don’t use green alone to communicate a safe state; retain text and icons.
- Don’t add decorative gradients or structural card shadows to the established flat surfaces.

## Desktop device preview

On desktop (1024px and above with hover and a fine pointer), `da-frame-set` wraps the app in a selectable iPhone Pro, iPhone, Samsung Galaxy or Samsung Galaxy Ultra. The preview fits the available window and scrolls within the phone screen. The selection persists locally. Touch devices keep the regular app layout.
