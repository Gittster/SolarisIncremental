# SOLARIS INCREMENTAL — Game Design Document
## Volume 4: Core Mechanics & Session Loop

---

## The Four-Verb Loop

Every interaction in the game maps to one of four verbs:

```
GATHER → RESEARCH → ASSIGN → UNLOCK
```

- **Gather:** Resources accumulate from facilities you've built
- **Research:** Spend research points to improve technology investment levels
- **Assign:** Direct resources, crew, and attention toward priorities
- **Unlock:** Phase gates open new locations, facilities, and possibilities

Nothing in the game sits outside these four verbs. If a mechanic can't be described as one of them, it doesn't belong.

---

## The Horizon Principle

The player should always be able to answer two questions at a glance:

1. **What am I building toward?** — The current phase gate, always visible
2. **What's blocking me?** — The current primary bottleneck, always surfaced

These two pieces of information live permanently in the UI. Everything else is detail.

The phase gate is displayed as a **Milestone Card** — a persistent banner showing:
- The target (e.g., "Space Elevator")
- A single progress bar (composite of all required inputs)
- The two or three things currently limiting that progress
- A real-world context line (e.g., *"A cable from Earth's surface to geostationary orbit — no rocket needed"*)

The real-world line is there because it makes the milestone feel *earned*, not arbitrary. You're not unlocking a game mechanic. You're building a real thing.

---

## Resource Model (Simplified)

Three resource categories. That's it.

### 1. Materials
Physical stuff. Produced by facilities, consumed by construction and missions.

Displayed as a single **Materials** number in early phases, subdividing into specific types (Propellant, Metals, Volatiles, Electronics) only when the distinction actually matters for a decision.

The player never sees a resource that isn't currently relevant to something they can do.

### 2. Energy
The universal constraint. Every facility has a power draw. Total generation vs. total draw is always visible. When generation exceeds draw, surplus goes to research acceleration.

Simple visual: a power meter. Green = surplus. Yellow = tight. Red = brownout (some facilities throttled automatically, life support always protected).

### 3. Research Points (RP)
Generated passively by your science facilities and population. Spent by assigning them to technology branches. Unspent RP accumulates up to a soft cap — encourages regular engagement without punishing absence.

---

## Session Structure

### The Idle Layer
The game runs while you're away. Facilities produce. Research accumulates. Ships transit. You return to a world that has moved forward.

**Idle is never frustrating** because:
- Nothing bad happens while you're away
- You always return to *more* than you left with
- The most interesting decisions (what to build next, where to assign crew, which tech to push) require your attention — they wait for you

### A 5-Minute Session
- Check the Milestone Card — is progress moving?
- Spend accumulated RP on the most relevant technology
- Address any bottleneck alerts
- Queue one construction project or mission
- Done

### A 30-Minute Session
- Review the full resource pipeline
- Optimize a logistics route or cargo manifest
- Make a strategic research allocation decision
- Plan the next phase gate push
- Review what's coming in the next phase (the "horizon beyond the horizon")

Both session lengths feel complete. The 5-minute session is never a waste. The 30-minute session is never overwhelming.

---

## Construction

Building a facility requires:
1. **Materials** — consumed on build
2. **Energy allocation** — ongoing draw added to your power budget
3. **Crew assignment** — specialists assigned to operate it

That's the full cost model. No build time queues to babysit. Construction completes at the start of your next meaningful session (scaled to how long you've been away, with a minimum of a few minutes for very short absences).

### Facility Cards
Each facility is a card showing:
- What it produces
- What it consumes
- Current efficiency (0–100%)
- The single biggest thing limiting its efficiency

Tap the card → see the full detail. The overview is always clean.

---

## Crew Assignment

Crew are your most interesting resource because they're finite and multi-purpose.

Each crew member has a **role**: Engineer, Scientist, Pilot, or Specialist (medical, geological, etc.)

Assignment is drag-and-drop. Crew can be assigned to:
- **Facilities** (improve efficiency)
- **Research** (generate RP)
- **Missions** (enable transit and operations)
- **Standby** (reserve pool — they still contribute a small passive bonus)

The interesting decision is always: *pull a scientist from research to fix a production bottleneck, or accept the slower research pace?*

Maximum crew at any location is capped by habitat capacity. Building more habitat is always a meaningful investment.

---

## The Logistics Layer

### Routes, Not Trips
You don't manage individual cargo runs. You establish **routes** between nodes.

A route has:
- **Source** (where cargo originates)
- **Destination** (where it's needed)
- **Priority** (1–5, determines how much of your transit fleet services it)
- **Cargo type** (what it carries)

The fleet handles execution. You design the network; the game runs it.

When something goes wrong — a depot runs low, a route gets congested — you get an alert and adjust the priority or add a route. That's the logistics puzzle: reading the network state and tuning the rules, not micromanaging individual ships.

### Launch Windows
For Mars and beyond, launch windows are the one timing constraint that creates genuine decision pressure.

**The Manifest:** When a window opens, you get a **Manifest Screen** — a simple drag interface showing available cargo and your ship capacity. You fill the manifest. What doesn't fit waits 26 months.

This is the game's primary *acute decision moment*. Everything else is steady-state management. The manifest is time-pressured, capacity-constrained, and genuinely consequential. It should feel like packing for an expedition where you can't come back for two years.

### Communication Delay (Phase 4+)
Once you have Mars assets, orders take minutes to arrive. This is represented simply:

- Actions on Mars assets have a **Confirm Delay** (scales with current Earth-Mars distance)
- During the delay, the action is queued and visible
- You can cancel before it executes

It's not punishing — it's atmospheric. It makes Mars feel *far away* in a way no number can.

---

## Progression Unlock Flow

Phase gates open with a **Unlock Moment** — a brief full-screen event that:
- Names what you've built
- Shows a single real-world reference image or diagram (stylized)
- States what it changes: *"The Space Elevator reduces Earth launch costs by 98%. The solar system just got closer."*
- Then opens the new phase content

No cutscenes. No long text. Just the milestone, the meaning, and forward.

New phases introduce resources and mechanics **one at a time**, always in context of something you're trying to do. The game never dumps a new system on you — it surfaces it when it's relevant.

---

## The Slip Metric (Simplified)

At the top of the Milestone Card: a single line.

```
Space Elevator — On Track  ✓
Space Elevator — 4 months behind  ⚠
Space Elevator — 14 months behind  ✕
```

Tap it → see why. A simple breakdown: *"Bottleneck: Carbon fiber production at 40% required rate. Cause: Insufficient energy allocation to processing facilities."*

Two taps from anywhere in the game to the root cause of your delay. That's the standard.

---

## What Gets Cut

Things common in incrementals that this game deliberately excludes:

| Mechanic | Why Excluded |
|----------|-------------|
| Prestige resets | Contradicts the civilizational arc — you don't restart humanity |
| Random loot / gacha | Undermines the logistics-as-puzzle design |
| Offline punishment | Never punish absence |
| Energy timers (wait X minutes) | Idle accumulation replaces this cleanly |
| Excessive currencies | Three resource categories, enforced |
| Mandatory ads / interrupts | Breaks the "thinking space" quality of the game |
| Combat | Not this game |

---

## Tone

The game is quiet and purposeful. It doesn't celebrate you constantly. It doesn't have a mascot. It doesn't say "AMAZING COMBO" when you assign crew well.

What it does:
- Surface genuinely interesting real-world context at milestone moments
- Let the scale speak for itself (you will eventually be harvesting Jupiter's atmosphere)
- Reward sustained attention with visible, meaningful progress
- Feel like you're running something real

The emotional register is closer to a well-designed city builder or a spaceflight sim than a typical mobile incremental. Calm, deep, satisfying.

---

*Document version 1.0 — Core Mechanics & Session Loop*
*Prerequisites: 01, 02, 03*
*Next: 05_UI_UX_SPEC.md*
