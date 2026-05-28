# SOLARIS INCREMENTAL — Game Design Document
## Volume 3: Research Tree & Progression Mechanics

---

## Design Philosophy

### No Failure, Only Friction

There are no losing states in Solaris. The civilization always moves forward. But the *pace* of progress is entirely a function of player decisions — and the cost of bad decisions is felt as **momentum loss**, not punishment.

This maps to how real megaprojects work:
- The James Webb Space Telescope: 10 years planned, 25 years actual
- The International Space Station: on schedule for assembly, perpetually behind on science utilization
- The Space Shuttle: technically succeeded at everything, but cost 10x projections and crowded out other programs

The player experiences the same dynamic. Poor allocation doesn't blow up your base — it means your Mars window slips by 2 in-game years, your competitors (Earth's other agencies, corporate rivals) get there first, and you're playing catch-up instead of leading.

### The Schedule as Player-Owned Goal

The game never imposes a hard deadline. Instead:

1. **At the start of each Phase**, the player sets a *Target Completion Window* for the phase gate
2. The game calculates a **Projected Completion Date** based on current resource flows and research rates
3. The gap between Target and Projected is the **Slip Metric** — the primary feedback signal
4. Slip accumulates silently when you're neglecting a bottleneck; it shrinks when you correctly address it

This means the "schedule" is always legible, always the player's own ambition, and never punitive. Being behind feels bad because *you set the goal*. Getting back on track feels good because *you diagnosed the problem*.

---

## Technology Investment Model

Technologies are not binary unlocks. They exist on a **0–100 Investment Scale** with meaningful thresholds at each tier.

### Investment Tiers

```
0        25        50        75        100
|---------|---------|---------|---------|
Aware   Partial  Mature  Advanced  Mastery
```

| Tier | Investment | What It Means |
|------|-----------|---------------|
| **Aware (0–24)** | Basic research allocated | You know how it works; no practical benefit yet. Unlocks related research visibility. |
| **Partial (25–49)** | Prototype phase | First functional version. Roughly 40% efficiency of full potential. Significant drawbacks. |
| **Mature (50–74)** | Operational | Reliable, deployable technology. ~75% efficiency. Minor drawbacks remain. |
| **Advanced (75–99)** | Refined | Near-peak performance. Drawbacks eliminated. Enables next-tier research. |
| **Mastery (100)** | Full realization | Peak efficiency + unlocks synergy bonuses with related technologies |

### Why This Beats Binary Unlocks

**Problem with binary unlocks:** Players feel blocked until they hit a threshold, then instantly have full capability. No texture, no ramping. Creates "waiting for the unlock" gameplay.

**Investment model advantages:**
- A 25% invested ion drive is *usable but imperfect* — player can move forward with a cost/tradeoff
- Research allocation is a meaningful daily decision, not a one-time spend
- Mastery bonuses reward players who *deepen* rather than always chasing the next unlock
- Neglected technologies fall behind — not lost, but their investment level represents a real "debt" if that branch becomes critical later

### Research Momentum

Each technology has a **Momentum Score** (0–10) that modifies how quickly investment accumulates:

- Momentum builds when a technology is being *actively funded* for consecutive periods
- Momentum decays when funding is redirected elsewhere
- High momentum = accelerating returns (scientists are focused, getting results)
- Low momentum = diminishing returns (team distracted, losing context)

**The "context switching cost"** this creates is intentional — pivoting your research focus has a 1–2 cycle "spin-up" cost before the new direction accelerates. This makes switching feel meaningful rather than free.

---

## Research Tree Structure

The tree is organized into **Branches** that map to the resource economy pillars. Each branch has technologies that span multiple phases.

### Branch Overview

| Branch | Core Theme | Phase Range |
|--------|-----------|-------------|
| **Propulsion** | Moving things through space | 0–8 |
| **Materials** | What things are made of | 0–8 |
| **Power Systems** | Energy generation and storage | 0–8 |
| **Life Support** | Keeping humans alive away from Earth | 1–7 |
| **Automation & AI** | Reducing human attention requirements | 2–8 |
| **ISRU** | Making resources wherever you are | 1–7 |
| **Structures** | Building large things in space and on surfaces | 1–8 |
| **Communications** | Coordination across light-minute distances | 2–7 |
| **Planetary Science** | Understanding environments before using them | 1–6 |
| **Megastructures** | Civilization-scale engineering | 6–8 |

---

## BRANCH: Propulsion

The oldest constraint in space travel — how do you go faster with less fuel?

```
CHEMICAL PROPULSION
├── Staged Combustion Cycle (0→25)          [Phase 0]
│   └── Full-Flow Staged Combustion (25→75)  [Phase 0] → Starship-class efficiency
│       └── Methalox Mastery (75→100)        [Phase 1] → Unlocks Mars ISRU propellant
│
├── Cryogenic LH₂/LOX (0→50)               [Phase 0-1]
│   └── Zero-Boiloff Storage (50→100)        [Phase 1] → Propellant depot viability
│
ELECTRIC PROPULSION
├── Hall-Effect Thrusters (0→50)            [Phase 1]
│   └── High-Power Ion Drives (50→100)      [Phase 2] → Space tug fleets
│       └── Variable Specific Impulse (100) [Phase 3] → Megafreighter viability
│
NUCLEAR THERMAL
├── NTR Fundamentals (0→50)                 [Phase 3] → Requires: Reactor Tech 50+
│   └── NERVA-Derived NTR (50→75)           [Phase 3-4] → 90-day Earth-Mars transit
│       └── Bimodal NTR (75→100)            [Phase 4] → Dual power/propulsion use
│           └── NTR Mastery (100)           [Phase 4] → Unlocks: Fusion research visible
│
FUSION PROPULSION                           [Requires: NTR Mastery + He-3 Supply Established]
├── D-T Fusion Torch (0→50)                 [Phase 5-6] → High neutron flux, needs shielding
│   └── D-He3 Aneutronic Fusion (50→100)    [Phase 6] → Clean, efficient
│       └── Fusion Torch Mastery (100)      [Phase 7] → 30-day Belt transits; Jupiter viable

ADVANCED CONCEPTS (visible early, investable late)
├── Solar Sail Augmentation (0→75)          [Phase 4] → Free acceleration for cargo
│   └── Laser-Pushed Sails (75→100)        [Phase 6] → Autonomous Belt freighters
└── Antimatter Catalysis (0→100)           [Phase 8] → Very long research; endgame bonus
```

**Key Progression Story:**
The player starts with chemical rockets — brutally fuel-hungry but immediate. Every propulsion upgrade shifts the fundamental economics of space travel. The jump from chemical to nuclear thermal *feels* like a phase shift because it is one. Fusion doesn't "unlock" — it gradually becomes real as He-3 supply and engineering knowledge converge.

---

## BRANCH: Power Systems

Nothing happens without power. This branch determines the ceiling of everything else.

```
SOLAR POWER
├── Silicon PV Arrays (0→50)                [Phase 0-1] → Baseline power
│   ├── Multi-Junction PV (50→75)           [Phase 1] → 2x efficiency
│   │   └── Concentrating PV (75→100)      [Phase 2] → Viable to Mars orbit
│   └── In-Situ Solar Fabrication (50→100) [Phase 3] → Make panels on the Moon
│
├── Space Power Transmission (0→75)        [Phase 1] → Microwave SPS
│   └── Laser Power Beaming (75→100)       [Phase 4] → Higher precision, longer range
│
FISSION POWER
├── Kilopower-Class Reactors (0→50)        [Phase 3] → 10kW surface power
│   └── Megawatt Fission Plants (50→75)    [Phase 4] → Mars industrial power
│       └── Compact Fast Reactors (75→100) [Phase 5] → Ship-mounted fission
│           └── Fission Mastery (100)      [Phase 5] → Unlocks: Fusion power visible
│
FUSION POWER                               [Requires: Fission Mastery + He-3 supply]
├── D-T Fusion Reactor (0→50)              [Phase 6]
│   └── D-He3 Fusion Reactor (50→100)      [Phase 7] → Clean, ship-scalable
│       └── Fusion Power Mastery (100)     [Phase 7] → Unlocks: Dyson research
│
ENERGY STORAGE
├── Advanced Batteries (0→75)              [Phase 1-2]
│   └── Supercapacitor Arrays (75→100)     [Phase 3]
├── Flywheel Energy Storage (0→75)         [Phase 2]
└── Orbital Energy Storage (0→100)        [Phase 4] → Kinetic storage in orbit
```

---

## BRANCH: ISRU (In-Situ Resource Utilization)

The most strategically important branch. Every ISRU technology directly reduces the supply chain load from Earth and increases Autonomy Index.

```
LUNAR ISRU
├── Regolith Oxygen Extraction (0→50)      [Phase 2] → MOXIE-derived
│   └── High-Rate Electrolysis (50→100)    [Phase 3] → Industrial O₂ output
│
├── Polar Ice Mining (0→50)                [Phase 2]
│   └── Subsurface Ice Access (50→100)     [Phase 3] → Deeper, richer deposits
│       └── Closed Water Loop (100)        [Phase 3] → Near-zero water loss rate
│
└── Regolith Metal Extraction (0→100)      [Phase 3] → Al, Si, Ti from dirt
    └── In-Situ Solar Fabrication          [Synergy unlock with Power Systems]
│
MARS ISRU
├── Sabatier Propellant Production (0→50)  [Phase 4] → CO₂+H₂→CH₄+H₂O
│   └── Optimized Sabatier Loop (50→100)   [Phase 5] → High-rate methalox output
│       └── Sabatier Mastery (100)         [Phase 5] → Mars fully propellant-independent
│
├── Atmospheric Processing (0→75)          [Phase 4] → N₂, Ar extraction
│   └── Perchlorate Remediation (75→100)   [Phase 5] → Soil safe for food production
│
└── Martian Regolith Construction (0→100) [Phase 5] → Basalt composites, sintered brick
│
ASTEROID ISRU
├── C-Type Water Extraction (0→75)         [Phase 5]
│   └── Volatile Capture (75→100)          [Phase 6] → NH₃, CH₄ from outer Belt
│
├── M-Type Metal Refining (0→100)          [Phase 6] → Platinum group metals
│   └── Zero-G Casting (100)              [Phase 6] → Structural metal in space
│
└── Autonomous ISRU Drones (0→100)        [Phase 6] → Requires: Automation 75+
```

---

## BRANCH: Automation & AI

This is the branch that changes *how you play*, not just what numbers you produce. Higher automation levels transform the logistics puzzle from direct management to policy design.

```
ROBOTICS
├── Teleoperated Systems (0→50)            [Phase 1] → Human-in-the-loop remote ops
│   └── Supervised Autonomy (50→75)        [Phase 3] → AI handles routine; flags exceptions
│       └── Full Task Autonomy (75→100)    [Phase 5] → Operates independently
│
LOGISTICS AI
├── Manifest Optimization (0→50)           [Phase 2] → AI suggests cargo priorities
│   └── Route Optimization (50→75)         [Phase 4] → AI manages depot refill routing
│       └── Network Autonomy (75→100)      [Phase 6] → AI runs entire logistics network
│           └── Network Mastery (100)      [Phase 6] → Unlocks: Self-replication research
│
FACILITY AI
├── Process Monitoring (0→50)              [Phase 2] → Alerts on bottlenecks
│   └── Predictive Maintenance (50→75)     [Phase 4] → Reduces downtime events
│       └── Self-Optimizing Facilities (75→100) [Phase 6] → Facilities tune themselves
│
SELF-REPLICATION                           [Requires: Network Mastery + Materials 100]
├── Seed Factory Concepts (0→50)           [Phase 7] → Small factory can build copies
│   └── Exponential Replication (50→100)  [Phase 8] → Von Neumann factory chains
│       └── Dyson Construction Fleet (100) [Phase 8] → Enables Dyson Swarm
```

**Automation Level** as a game variable:
- Level 0–2: Player directly manages most decisions
- Level 3–4: Player sets policies; AI executes routine tasks
- Level 5: Player sets strategic direction; AI manages everything else
- The experience of playing Phase 8 should feel fundamentally different from Phase 0 — not because the mechanics changed, but because *your role changed*

---

## Stall Patterns & Recovery Paths

This is the core of the "no failure, just friction" design. Each stall pattern is a recognizable situation with a legible cause and a defined recovery path.

### Stall Pattern 1: The Power Ceiling
**Symptoms:** Multiple facilities showing "insufficient power" status. Production rates declining. Research rate dropping as scientists operate in reduced-power conditions.

**What happened:** You expanded infrastructure faster than power generation. Classic mistake when the Moon's 14-day night hits with inadequate storage, or when a Martian dust storm runs longer than your battery reserves.

**Recovery paths:**
- **Fast:** Temporarily shut down low-priority facilities to free power (costs production, buys time)
- **Medium:** Accelerate Energy Storage investment — batteries, flywheels
- **Strategic:** Invest in In-Situ Solar Fabrication so new power doesn't require Earth launches

**Slip consequence:** Phase gate delayed ~6–18 months game-time depending on severity.

---

### Stall Pattern 2: The Crew Bottleneck
**Symptoms:** New facilities built but showing low efficiency. Research stagnating. Operator Hours resource in the red.

**What happened:** You built faster than you staffed. Facilities at 40% efficiency because there aren't enough specialist crews to run them.

**Recovery paths:**
- **Fast:** Reallocate existing crew from lower-priority to higher-priority facilities (creates a different bottleneck)
- **Medium:** Launch a crew transport to deliver specialists from Earth or another base
- **Strategic:** Invest in Automation branch — reduces Operator Hours requirement per facility
- **Long-term:** Expand habitat capacity so off-world population can grow organically

**Slip consequence:** Output at ~60% potential; research rate degraded. Cascades into propellant production if crew shortage hits extraction facilities.

---

### Stall Pattern 3: The Propellant Drought
**Symptoms:** Mission queue building up. Ships fueled and ready but depot at critical levels. Transit routes showing "suspended."

**What happened:** Mission tempo outpaced propellant production, or a supply route disruption drew down reserves.

**Recovery paths:**
- **Fast:** Suspend non-critical transit missions; let depot rebuild
- **Medium:** Increase tanker launch cadence (costs Launch Slots)
- **Strategic:** Invest in ISRU propellant production at destination nodes — reduce Earth dependency
- **Emergency lever:** High-energy non-Hohmann transfer to deliver propellant fast (expensive but clears the logjam)

**Slip consequence:** All missions delayed. If a crew rotation is pending, crew welfare metrics decline. Cascades into morale → productivity.

---

### Stall Pattern 4: The Research Plateau
**Symptoms:** Projected Completion Date for phase gate is drifting forward. One or two technologies clearly blocking the gate but investment momentum has been elsewhere.

**What happened:** Player has been allocating research broadly rather than pushing toward the gate requirement. Or pivoted research to handle a different crisis, and never pivoted back.

**Recovery paths:**
- **Fast:** Redirect research points toward the bottleneck technology
- **Cost:** Momentum decay on the deprioritized branches — they'll need a spin-up period to regain pace
- **Strategic:** Some technologies have *synergy shortcuts* — a Mastery in a related field gives a 25% investment bonus to the bottleneck tech. Worth identifying.

**The interesting decision:** When you're 60% toward the phase gate but also 40% toward a powerful Mastery bonus in another branch — do you push for the gate or complete the branch? The gate gets you to the next phase; the Mastery makes the current phase much more efficient. Both are right answers depending on your situation.

---

### Stall Pattern 5: The Logistics Tangle
**Symptoms:** Resources are being produced but not arriving where they're needed. Facilities showing "input shortage" despite adequate upstream production. Transit queue growing.

**What happened:** The logistics network has a routing inefficiency. Too many routes through a single depot node, or a transit fleet too small for the cargo volume, or cargo priority rules set wrong.

**Recovery paths:**
- **Fast:** Manually reprioritize the transit queue (direct intervention)
- **Medium:** Expand depot capacity at the congested node
- **Strategic:** Build an alternate route that bypasses the bottleneck node
- **AI-assisted:** If Manifest Optimization research is mature, let the AI suggest route rebalancing

**Why this is the most satisfying stall to solve:** It requires the player to trace the resource flow, identify the specific node causing the tangle, and design a structural solution. This is logistics puzzle gameplay at its best.

---

## The Focus-Switch Mechanic

When a player recognizes a stall and wants to switch focus, the transition has three phases:

### 1. Diagnosis (0–1 sessions)
The game surfaces the stall via the Slip Metric and bottleneck indicators. The player reads the situation. No game mechanic — just information design doing its job.

### 2. Reallocation (1–2 cycles)
Redirecting resources, crew, and research points toward the new priority. During this period:
- New focus area: **+20% investment rate** (urgency bonus)
- Deprioritized areas: **momentum decay** starts (–5% per cycle until momentum stabilizes at a lower level)
- Transition cost: One cycle of lower overall efficiency as the system adjusts

### 3. Acceleration (2–5 cycles)
New focus area gaining momentum. Player sees Projected Completion Date begin to correct. The feedback loop closes — good decision visibly rewarded.

**This cycle should feel like:** recognizing a problem, making a call, watching it work. The same satisfaction as debugging a program or solving a logistics puzzle.

---

## Cross-Branch Synergy Bonuses

Technologies from different branches combine for bonuses when both reach threshold investment levels. These are discoverable, not shown upfront — part of the game's depth.

| Synergy Pair | Threshold | Bonus |
|-------------|-----------|-------|
| High-Power Ion Drives + Route Optimization AI | Both 75+ | Autonomous cargo routes: 30% lower propellant consumption |
| Sabatier Mastery + Closed Water Loop | Both 100 | Mars water cycle fully closed: removes water as a constraint |
| In-Situ Solar Fabrication + Regolith Metal Extraction | Both 75+ | Lunar factory can self-expand: 20% build rate bonus |
| Fusion Propulsion + D-He3 Fusion Reactor | Both 75+ | Shared fuel production: fusion ships and power plants use same supply |
| Full Task Autonomy + Predictive Maintenance | Both 75+ | Self-healing facilities: 50% reduction in downtime events |
| Self-Replicating Factories + Exponential Replication | Both 100 | Dyson construction rate: exponential scaling begins |
| NTR Bimodal + Kilopower Mastery | Both 100 | Nuclear-electric ships: combined propulsion + power plant |
| Concentrating PV + Laser Power Beaming | Both 75+ | Power can be directed at ships in transit: beam propulsion experiments |

These synergies reward players who invest *broadly* in a branch before moving on, rather than always chasing the frontier of a single branch. They're the "ah-ha" moments that make the research tree feel alive.

---

## Experimental Data Gate

Some technologies require *Experimental Data* from physical presence at a location — they can't be researched from Earth alone. This gates certain branches behind actual exploration:

| Technology | Data Required | Source |
|-----------|--------------|--------|
| Subsurface Ice Access | Lunar polar drilling data | Must have drilled in a PSR |
| Perchlorate Remediation | Martian soil samples | Must have Mars surface operations |
| C-Type Water Extraction | Asteroid rendezvous data | Must have dispatched a Belt survey probe |
| Europa Ocean Brine Chemistry | Ocean borehole data | Must have drilled through Europa's ice |
| Jupiter Atmospheric Sampling | Atmospheric probe data | Must have deployed a Jovian descent probe |

This mechanic ensures the player *actually goes to these places* rather than researching everything from LEO. It creates a natural push to send exploratory missions ahead of the main expansion — scouts before settlers.

---

## Research Pacing Reference

Approximate real-time investment to reach each technology tier, assuming moderate research allocation (not focused sprint):

| Investment Level | Approx. Sessions | Feel |
|----------------|-----------------|------|
| 0 → Aware (25) | 1–2 sessions | Quick win, visible early |
| 25 → Partial (50) | 3–5 sessions | Working prototype |
| 50 → Mature (75) | 6–10 sessions | Operational technology |
| 75 → Advanced (100) | 10–20 sessions | Long-term investment payoff |
| Mastery bonuses | Variable | Reward for sustained focus |

**Sprint scenario:** Full research focus on a single technology — approximately 60% faster than above. Costs momentum in other branches.

**Neglect scenario:** Technology receiving minimal investment — momentum decays to near zero. Progress at ~20% of normal rate. The investment is never lost, but the branch is essentially paused.

---

*Document version 1.0 — Research Tree & Progression Mechanics*
*Prerequisites: 01_PROGRESSION_DESIGN.md, 02_RESOURCE_ECONOMY.md*
*Ready for: Claude Code implementation planning*
