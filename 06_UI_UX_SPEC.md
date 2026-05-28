# SOLARIS INCREMENTAL — Game Design Document
## Volume 6: UI/UX Specification

---

## Design Language

### Aesthetic Direction
**Operational realism.** The UI should feel like a mission control dashboard crossed with a high-fidelity space agency planning tool. Not a game that looks like a game — a serious instrument that happens to be beautiful.

References:
- NASA/ESA mission control displays: dense but legible, dark backgrounds, purposeful color
- SpaceX Dragon touchscreen interface: clean, high-contrast, minimal chrome
- Real orbital mechanics software (STK, GMAT): functional beauty, not decorative

**Not:** Glowing neon sci-fi, cartoon iconography, gradients for decoration, anything that looks like a mobile game store shelf.

### Color System

```
BACKGROUND     #0A0E1A    Near-black with blue undertone — the void
SURFACE        #111827    Card and panel backgrounds
SURFACE-RAISE  #1C2333    Elevated elements, modals
BORDER         #2A3547    Subtle structure, never decorative

PRIMARY        #4A9EFF    Interaction, selection, progress — cool blue
SECONDARY      #64748B    Secondary text, labels, inactive states

SUCCESS        #22C55E    Surplus, on-track, nominal
WARNING        #F59E0B    Tight, approaching constraint
CRITICAL       #EF4444    Brownout, behind schedule, urgent
INACTIVE       #374151    Disabled states

TEXT-PRIMARY   #F1F5F9    Main readable text
TEXT-SECONDARY #94A3B8    Labels, metadata, context
TEXT-DIM       #475569    Timestamps, minor detail
```

### Typography

```
DISPLAY        "Geist Mono" or "Space Mono"   — Phase names, milestone titles, big numbers
BODY           "Inter" or "DM Sans"            — All readable text, facility names, descriptions  
DATA           "Geist Mono"                    — Resource numbers, percentages, coordinates
```

Numbers are always monospace. This prevents layout shift as values change and reinforces the "instrument panel" aesthetic.

### Spacing & Touch Targets
- Minimum tap target: 44×44pt (Apple HIG standard)
- Card padding: 16pt
- Section spacing: 24pt
- Bottom safe area: always respected — nothing important lives in the bottom 34pt on iPhone
- Thumb zone: primary actions always reachable one-handed in the bottom 60% of screen

---

## Screen Architecture

The game has **four top-level views**, navigated by a persistent bottom tab bar.

```
┌─────────────────────────────┐
│                             │
│         MAIN VIEW           │
│     (changes per tab)       │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  [MAP] [BASE] [RESEARCH] [▼]│  ← Bottom tab bar
└─────────────────────────────┘
```

| Tab | Icon | Purpose |
|-----|------|---------|
| **Map** | Solar system icon | Navigate between locations; see the full empire |
| **Base** | Facility icon | Manage the currently selected location |
| **Research** | Flask icon | Tech tree and research allocation |
| **Contracts** | Handshake icon | Active and available commercial contracts |

The **Milestone Card** is not a tab — it floats at the top of every view, always visible, always showing the current phase gate status.

---

## The Milestone Card

Persistent across all views. Approximately 80pt tall.

```
┌─────────────────────────────────────────────┐
│  PHASE 0 · PHASE GATE                       │
│  Space Elevator          [████████░░] 78%   │
│  ⚠ 3 months behind  ·  Carbon fiber: 40%   │
└─────────────────────────────────────────────┘
```

- **Phase label** (small, TEXT-SECONDARY): "PHASE 0 · PHASE GATE"
- **Milestone name** (DISPLAY font, TEXT-PRIMARY): "Space Elevator"
- **Progress bar**: fills left to right, color shifts SUCCESS → WARNING → CRITICAL as slip increases
- **Slip line** (small, WARNING or CRITICAL color): "3 months behind"
- **Primary bottleneck** (small, TEXT-SECONDARY): the single biggest blocker

Tap the card → expands to show full breakdown: all contributing factors, projected completion date, what would most improve the timeline. Tap again or swipe down to collapse.

The card is never hidden. On scroll, it compresses to just the progress bar + phase name (40pt). The information is always accessible.

---

## View 1: Map

The game's primary navigation surface. Also the most emotionally resonant view — this is where you see your civilization growing.

### Zoom Levels

**Level 1 — Solar System**
```
┌──────────────────────────────┐
│  [Milestone Card]            │
│                              │
│      ☀                       │
│    ·   ·  ◉ ← Earth          │
│   ·      ◎ ← Moon active     │
│          · ← Mars (locked)   │
│                              │
│  Your reach: Earth-Moon      │
│  Next: Cislunar Highway  →   │
└──────────────────────────────┘
```

- Bodies you have assets on: **bright, labeled, tappable**
- Bodies you've unlocked but not developed: **dim, labeled, tappable**
- Bodies beyond current phase: **very dim, no label** (visible but unreachable — creates pull)
- Active transit routes shown as faint arcing lines between bodies
- Pinch out from a body → zoom out to solar system level
- Tap a body → zoom into Body Level

**Level 2 — Body View**
```
┌──────────────────────────────┐
│  [Milestone Card]            │
│                              │
│  ← MOON                      │
│                              │
│  [Near Side]  [Polar]        │  ← Region tabs
│                              │
│  ┌──────────┐ ┌──────────┐   │
│  │ Base Cmd │ │ Ice Mine │   │  ← Facility cards
│  │ nominal  │ │ 73% eff  │   │
│  └──────────┘ └──────────┘   │
│                              │
│  ┌──────────┐ ┌──────────┐   │
│  │ + Build  │ │ + Build  │   │  ← Empty slots
│  └──────────┘ └──────────┘   │
└──────────────────────────────┘
```

- Back arrow returns to Solar System level
- Region tabs if the body has multiple explorable zones
- Facility cards in a 2-column grid
- Empty build slots clearly marked
- Tap a facility card → Facility Detail sheet slides up

---

## View 2: Base (Facility Management)

Shows detailed state of the **currently selected location**. Defaults to your most active location.

### Resource Bar
At the top below the Milestone Card, a horizontal strip showing the three resource categories:

```
┌─────────────────────────────────────────────┐
│  ⚡ 847 MW  [██████████░░] +12/s  SURPLUS   │
│  📦 Materials  14,280     +340/hr            │
│  🔬 Research   2,140      +85/hr             │
└─────────────────────────────────────────────┘
```

Color codes as defined. Generation rate shown always. Tap any resource → pipeline view (where it comes from, where it goes, what's limiting it).

### Facility Grid

2-column card grid. Each facility card:

```
┌────────────────────┐
│ ELECTROLYSIS PLANT │
│ ━━━━━━━━━━━━━━━━   │  ← Efficiency bar (88%)
│ → 240 O₂/hr        │  ← Primary output
│ ← 180 H₂O + 85 MW │  ← Inputs consumed
│                    │
│ ⚠ Crew: 2/4       │  ← Active alert if any
└────────────────────┘
```

- No alert: card border is BORDER color, quiet
- Warning state: card border WARNING color, subtle pulse
- Critical state: card border CRITICAL color, steady glow

Tap card → **Facility Sheet** slides up from bottom:
- Full input/output breakdown
- Crew assignment (drag crew slots)
- Upgrade options if available
- "What's limiting this?" — one plain-English sentence

### Crew Panel
Swipe right on Base view → Crew roster for this location. Assignable via drag. Each crew member shows: name, role icon, current assignment, efficiency contribution.

---

## View 3: Research

### Layout
```
┌──────────────────────────────┐
│  [Milestone Card]            │
│                              │
│  Research Points: 2,140  +85/hr
│  [Allocate RP  ▼]           │
│                              │
│  BRANCHES                    │
│  ┌────────┐ ┌────────┐      │
│  │PROPUL- │ │ POWER  │      │
│  │SION    │ │SYSTEMS │      │
│  │██████░ │ │████░░░ │      │
│  │  68%   │ │  52%   │      │
│  └────────┘ └────────┘      │
│  ┌────────┐ ┌────────┐      │
│  │ ISRU   │ │AUTOMAT-│      │
│  │        │ │  ION   │      │
│  │███░░░░ │ │██░░░░░ │      │
│  │  38%   │ │  24%   │      │
│  └────────┘ └────────┘      │
└──────────────────────────────┘
```

Each branch card shows:
- Branch name
- Overall investment level (average of all technologies within)
- Color: how much RP is currently allocated here

Tap a branch → **Branch Detail** slides up:
- List of technologies within the branch
- Each technology shows its 0–100 investment bar
- Current momentum indicator (arrow up/down/flat)
- Prerequisite chain visible — locked techs shown with what unlocks them
- Tap a technology → allocate/deallocate RP with a simple slider

### RP Allocation
A persistent "Allocate RP" button opens a **simple pie chart interface** — drag slices to redistribute RP between branches. Satisfying, visual, takes 10 seconds. Not a spreadsheet.

---

## View 4: Contracts

```
┌──────────────────────────────┐
│  [Milestone Card]            │
│                              │
│  ACTIVE  (2)                 │
│  ┌──────────────────────┐   │
│  │ Helios Construction  │   │
│  │ Lunar Plant · 4mo    │   │
│  │ [████████░░] 78 days │   │
│  └──────────────────────┘   │
│                              │
│  AVAILABLE  (3)              │
│  ┌──────────────────────┐   │
│  │ 🚀 Orbital Dynamics  │   │
│  │ Launch Services      │   │
│  │ Give: 3 launch slots │   │
│  │ Get: 800 Electronics │   │
│  │ [Review]  [Decline]  │   │
│  └──────────────────────┘   │
│                              │
│  ┌──────────────────────┐   │
│  │ 🔬 Artemis Uni.      │   │
│  │ Research Partnership │   │
│  │ Give: 25% RP · 8mo   │   │
│  │ Get: +40% Propulsion │   │
│  │ [Review]  [Decline]  │   │
│  └──────────────────────┘   │
└──────────────────────────────┘
```

Active contracts show a progress bar and time remaining. Available contracts show the give/get in plain language — no jargon. 

Tap "Review" → **Contract Sheet** slides up with full terms, negotiation option, and strategic context: *"Note: This reduces your launch capacity. Your next Mars window is in 14 months — consider timing."* (The game reads your situation and flags relevant concerns. It doesn't tell you what to do.)

---

## Session Entry Screen

When the player returns after being away, before any other UI:

```
┌──────────────────────────────┐
│                              │
│  Welcome back.               │
│  You were away 6 hours.      │
│                              │
│  While you were gone:        │
│                              │
│  ✓  Space Elevator: +8%      │
│  ✓  Propulsion research      │
│     reached Mature tier      │
│  ⚠  Lunar depot at 31%      │
│     (approaching critical)   │
│                              │
│  [Continue →]                │
│                              │
└──────────────────────────────┘
```

- Maximum 4 items. What progressed, what needs attention.
- No fanfare. No "YOU EARNED 500 COINS." Just a clean report.
- Tapping an item navigates directly to the relevant view.
- "Continue" goes to Map view.

This screen is the game's **daily handshake** — acknowledges your absence, orients you to the current state, respects your time.

---

## Manifest Screen (Launch Windows)

Appears as a modal when a launch window opens. The game's primary active decision moment.

```
┌──────────────────────────────┐
│  MARS LAUNCH WINDOW          │
│  Opens in 3 days · 18 days   │
│                              │
│  SHIP CAPACITY: 48t / 48t    │
│  [████████████████████] FULL │
│                              │
│  MANIFESTED                  │
│  ┌──────────────────────┐   │
│  │ Crew Rotation  · 8t  │   │  ← Drag to remove
│  │ Medical Supplies · 2t│   │
│  │ Fission Components·12t   │
│  │ Methalox Feedstock·18t   │
│  │ Spare Parts    · 8t  │   │
│  └──────────────────────┘   │
│                              │
│  WAITING                     │
│  ┌──────────────────────┐   │
│  │ + Science Equipment  │   │  ← Drag up to manifest
│  │   6t  ·  Priority 3  │   │
│  │ + Habitat Module     │   │
│  │   22t · Priority 2   │   │
│  └──────────────────────┘   │
│                              │
│  [Launch] [Save for Later]   │
└──────────────────────────────┘
```

Drag items between Waiting and Manifested. Capacity bar fills in real time. Cargo items show their priority rating (set by the player in logistics settings) — a reminder of what *you* decided was important.

The game doesn't tell you what's right. It shows you the situation and lets you decide.

---

## Microinteractions & Animation Principles

**Philosophy:** Animation communicates state change, not excitement.

| Interaction | Animation |
|-------------|-----------|
| Resource increasing | Number ticks up smoothly, no flash |
| Resource critical | Subtle red pulse on the indicator, not the whole screen |
| Facility completing | Card border briefly brightens, then settles |
| Phase gate unlocking | Full-screen moment (see below) |
| Contract arriving | Badge on Contracts tab, no interrupt |
| Navigation transition | Slide (not fade) — reinforces spatial model |
| Zoom in on map | Smooth scale + translate toward tapped body |
| Sheet sliding up | Spring physics, feels physical |

**Phase Unlock Moment** — the one time the game is allowed to be cinematic:
- Full screen goes dark
- The milestone name appears in DISPLAY font, large, centered
- A single line of real-world context fades in below
- A subtle particle effect (stars, not confetti)
- 2 seconds, then fades to the new phase content
- Cannot be interrupted — this moment earns its 2 seconds

---

## Accessibility

- All critical information conveyed by text AND color (never color alone)
- Minimum contrast ratio 4.5:1 for all text
- Dynamic Type supported — layouts reflow for larger text sizes
- Haptic feedback on: contract acceptance, phase unlock, critical alerts
- All interactive elements have accessibility labels

---

## What the UI Never Does

- Never shows a popup ad or interstitial
- Never shows a "rate this app" prompt during gameplay
- Never uses red badges for anything non-critical (notifications inflation)
- Never requires scrolling to find primary actions
- Never shows more than 4 alerts simultaneously — triage and surface the most important
- Never auto-plays audio without permission

---

*Document version 1.0 — UI/UX Specification*
*Prerequisites: 01, 02, 03, 04, 05*
*This document set is complete. Ready for Claude Code implementation.*
