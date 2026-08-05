# STARBOARD — design plan

One unforgettable thing: **the constellation sky**. Everything else is quiet, disciplined, enterprise-legible.

## Tokens
Midnight `--ink #0A0E1E` (never pure black) · panels `--deep #111736` with a radial vignette deep→ink behind the sky · text `--starlight #F7F4EC` · brand `--gold #E8B84B` (brass; large text + accents only) · health: `--aurora #4FD8C4` / `--amber #F2A65A` / `--ember #E4586B` · secondary `--muted #8A93C9`.

## Type
- **Fraunces Variable** (display): wordmark = black weight, gold. View titles + program names = light *italic*, optical size high, SOFT/WONK pushed — storybook, not default serif.
- **Inter Variable** (everything else): body 14–15px; eyebrows = 11px uppercase, tracking 0.14em, muted; all data `tabular-nums`.

## Layout
64px header (wordmark + asterism, view switcher, timezone strip, EN/ES, About) over a full-bleed sky. Sky view is full-viewport: KPI strip floating top, filters top-right, legend bottom-left. Other views: `max-w-6xl` centered, panels `--deep`, 1px hairline `rgba(138,147,201,.18)`, radius 12px, generous padding.

## What makes it not-a-template (self-check)
- Status language is **light, not pills**: star-dots with glow (steady gold-green, slow amber pulse, tight ember flicker) reused in RAID severity, milestone states, RAG tables.
- Constellation motif carried down: asterism logomark, milestone timeline as lit stars, dependency edges as constellation lines.
- Composer output is a **letter-style card**, not a modal blob.
- Steering prints as a real document (white, ink text, no sky).

## Motion
One orchestrated load sequence per view (stagger fade/rise 12px). Hover micro-interactions. Ambient starfield (~140 stars, sine twinkle, slight parallax). Nothing else moves. `prefers-reduced-motion`: static field, fades only, no fireworks/shooting stars.

## Quality floor
375px responsive, visible focus rings, AA contrast, semantic HTML, zero console errors.
