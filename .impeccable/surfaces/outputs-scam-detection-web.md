---
version: 1
slug: "outputs-scam-detection-web"
primary_target: "outputs/scam-detection-web"
related_targets: []
---

# Scam Detection web application

Mode: Operate. Implement the current Figma world, not a redesign.

Source: Figma 2DI44d3YnJjiyhJCdxj4Aa; home2:89, result2:95, check2:99, settings2:111, reports58:154, references2:97, image2:101, history2:109, alert2:91, pattern58:158. High fidelity design contexts and screenshots saved under work/web-figma-context-* and web-figma-extra-*.

User decisions: Next.js + TypeScript + Tailwind; IBM Plex Sans; Lucide/external component libraries encouraged. Real image input, mock analysis. Interactive library graph, polished loader and score count-up. Concise copy.

Keep the phone composition at390px on desktop and fluid up to480px mobile. No invented dashboard desktop redesign. Exact Figma palette, 24px content inset, 16px panels, 52px buttons, 88px bottom navigation. Permitted additions are functional states: real file input, mock outcome selection, focus/hover, chart tooltips, uploads, feedback form, real switches and reduced-motion behavior.

Acceptance: production build and TypeScript pass; meaningful browser tests cover text+image checks, report graph, settings and alerts, history, references, narrow width; one batched desktop/mobile visual comparison against Figma then one correction pass as needed; independent finish review; document implementation in app directory.

Data disclosure: mock scores and messages; no real AI/OCR/SMS/email; actual user image stays in-browser. Latest completed example week19–25Oct2026.
