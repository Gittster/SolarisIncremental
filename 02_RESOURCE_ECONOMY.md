# SOLARIS INCREMENTAL — Game Design Document
## Volume 2: Resource Economy & Player Agency

---

## Design Philosophy

### The Agency Problem in Incrementals
Most incremental games reduce to: *click the biggest number button*. Player decisions are illusory — there's always one optimal path and the game just hides it.

We avoid this with **Constraint Triad design**: every meaningful resource is in tension with exactly two others. Optimizing any one resource creates pressure on the other two. There is no globally optimal allocation — only situationally optimal ones. The player's job is to read the situation and respond.

### Three Types of Player Agency

| Type | What the Player Does | Feel |
|------|---------------------|------|
| **Logistics** | Routes cargo, schedules launches, manages transit queues | Puzzle / systems mastery |
| **Allocation** | Distributes workers, power, and attention across facilities | Portfolio management |
| **Prioritization** | Chooses which phase gate to push; accepts tradeoffs | Strategic narrative |

All three should be present in every phase. The *scale* changes — Phase 0 logistics is scheduling rockets; Phase 6 logistics is routing autonomous freighter networks across the Belt.

---

## Resource Architecture

Resources are organized in **four tiers** based on abstraction level:

```
TIER 1 — RAW          (physical stuff extracted from the environment)
TIER 2 — PROCESSED    (manufactured from raw resources)  
TIER 3 — OPERATIONAL  (running facilities and fleets)
TIER 4 — STRATEGIC    (civilization-scale outputs)
```

A resource's tier tells you roughly what phase it enters play and what kind of decision it drives.

---

## TIER 1 — Raw Resources

These are extracted directly from environments. Their production rate is location-dependent and cannot be improved by research alone — you must physically expand to new deposits.

### Earth & Orbit
| Resource | Source | Description |
|----------|--------|-------------|
| **Bulk Mass** | Earth surface | Steel, concrete, aluminum — the baseline industrial feedstock for launch infrastructure. Cheap but heavy — costs delta-v to lift. |
| **Rare Earth Elements (REE)** | Earth mines | Neodymium, dysprosium, europium — critical for electronics, magnets, sensors. Real scarcity driver on Earth. |
| **Hydrocarbons** | Earth extraction | Natural gas → methane for early propellant production. Phases out as off-world sources come online. |
| **Solar Flux** | Orbital position | Not "collected" directly — converts to Energy via solar arrays. Increases ~2x per AU inward from Earth, ~4x less per AU outward. |

### Lunar Resources
| Resource | Source | Description |
|----------|--------|-------------|
| **Regolith** | Lunar surface | Raw lunar soil. Seemingly useless, but is ~45% oxygen + silicon + metals by mass. The Moon's most abundant resource. |
| **Polar Ice** | Permanently Shadowed Regions (PSRs) | Water ice in PSR craters near poles. Source of all lunar propellant. Finite deposits — you can exhaust them. |
| **Helium-3** | Regolith (solar wind implanted) | Extremely diffuse (~10 ppb by mass). Requires processing vast regolith volumes. Long-arc fusion fuel resource. |
| **KREEP Terrain** | Specific lunar geological zones | Potassium, REE, Phosphorus-rich zones. Source of off-world rare earths — reduces Earth dependency. |

### Mars Resources
| Resource | Source | Description |
|----------|--------|-------------|
| **Atmospheric CO₂** | Mars atmosphere | Essentially unlimited. Feedstock for Sabatier propellant production. |
| **Subsurface Ice** | Mid-latitude deposits | Water ice accessible by drilling. Finite per deposit, but widespread. Critical for life support + propellant. |
| **Perchlorates** | Mars soil | Problematic contaminant in soil — must be processed out. But can be converted to oxidizer with correct chemistry. |
| **Basalt** | Mars crust | Excellent structural material. Basalt fiber composites viable for construction. Reduces Earth material imports. |

### Asteroid Belt Resources
| Resource | Source | Description |
|----------|--------|-------------|
| **Carbonaceous Material (C-type)** | C-type asteroids | Water, carbon compounds, organic molecules — life support feedstock. Ceres and outer Belt. |
| **Metallic Ore (M-type)** | M-type asteroids | Near-pure iron-nickel with platinum group metals. One medium M-type asteroid = Earth's platinum reserves for centuries. |
| **Silicate Rock (S-type)** | S-type asteroids | Silicon, magnesium, iron silicates. Inner Belt. Structural and solar panel manufacturing feedstock. |
| **Volatiles** | Outer Belt / Trojans | Ammonia, methane, nitrogen — essential for atmosphere and life support at scale. |

### Outer System Resources
| Resource | Source | Description |
|----------|--------|-------------|
| **Jovian Hydrogen** | Jupiter atmosphere | Near-unlimited hydrogen for fusion fuel and reaction mass. The solar system's gas station. |
| **Jovian He-3** | Jupiter atmosphere | High-concentration source vs. lunar regolith. Unlocks full fusion economy. |
| **Europa Brine** | Europa subsurface ocean | Water + dissolved minerals. Also scientifically precious — introduces xenobiology resource chain. |
| **Solar Wind Particles** | Inner solar system | Near-Mercury — source of high-energy ion feedstock for some advanced processes. |

---

## TIER 2 — Processed Resources

Manufactured from Tier 1. These are the "working materials" of the civilization.

### Propellants
| Resource | Inputs | Use |
|----------|--------|-----|
| **LOX/Kerosene** | Hydrocarbons + Electrolysis | Early launch vehicles. Phases out by mid-game. |
| **LOX/LCH₄ (Methalox)** | CO₂ or CH₄ + Electrolysis | Core propellant for Starship-class vehicles. Producible on Mars (Sabatier). Main Phase 0–4 fuel. |
| **LOX/LH₂** | Water electrolysis | Higher Isp than methalox, but cryogenic challenge. Used in high-efficiency upper stages. |
| **Xenon / Krypton** | Atmospheric separation | Ion drive propellant. Essential for space tugs and autonomous cargo ships. |
| **Fusion Plasma** | He-3 + Deuterium | Phase 6+ drive fuel. Enormous Isp, low thrust — only viable with fusion reactor tech. |

### Structural Materials
| Resource | Inputs | Use |
|----------|--------|-----|
| **Processed Aluminum** | Regolith, bauxite | Structural frames, habitat shells, radiator panels. |
| **Steel / Iron Alloys** | M-type asteroid ore | Heavy structural components, ship hulls, pressure vessels. |
| **Silicon Carbide (SiC)** | Regolith + Carbon | High-temperature structural applications; nuclear reactor components. |
| **Carbon Fiber / CNT** | Carbonaceous asteroids + processing | Space elevator cable, lightweight structural components. Extremely high value/mass. |
| **Basalt Fiber Composite** | Mars/lunar basalt | In-situ structural material — reduces Earth imports for surface construction. |
| **Radiation Shielding Mass** | Polyethylene + water + regolith | Not exotic — just dense material. The boring but critical resource for outer system ops. |

### Electronics & Precision Components
| Resource | Inputs | Use |
|----------|--------|-----|
| **Semiconductor Wafers** | REE + Silicon + precision fab | Control systems, computers, sensors — required for every facility and ship. |
| **Solar Panel Arrays** | Silicon + Aluminum + precision fab | Power generation. Efficiency improves with research tiers. |
| **Optical Components** | Ultra-pure silica + precision fab | Comms arrays, telescopes, laser systems. |
| **Precision Actuators** | REE magnets + electronics | Robotics, attitude control, docking systems. |

### Life Support Consumables
| Resource | Inputs | Use |
|----------|--------|-----|
| **Oxygen (breathable)** | Water electrolysis / regolith processing | Life support. Every habitat has an O₂ consumption rate per population unit. |
| **Potable Water** | Ice + purification | Life support and industrial processes. |
| **Food** | Hydroponics + water + power | Closes the life support loop. Reduces cargo manifests dramatically once local production reaches self-sufficiency. |
| **Nitrogen** | Belt volatiles / Earth | Critical for atmospheric buffer in habitats. Often overlooked but essential. |
| **Medical Supplies** | Complex manufacturing chain | Population health. Affects worker efficiency and morale metrics. |

---

## TIER 3 — Operational Resources

These are not physical goods — they're *capacities* that enable production and logistics. Running out of an operational resource is a soft constraint that creates interesting decisions.

### Energy
The master resource. Everything converts to and from energy.

| Resource | Description | Key Tension |
|----------|-------------|-------------|
| **Electrical Power (MW)** | Generated by solar arrays, RTGs, fission reactors, fusion plants. Consumed by everything. | The universal bottleneck — every upgrade also costs more power |
| **Power Grid Stability** | Ratio of peak demand to generation capacity. Below 100% = brownouts; below 70% = facility shutdowns | Forces you to build power ahead of demand, not reactively |
| **Energy Storage (MWh)** | Batteries, flywheels, orbital mirrors. Critical for lunar 14-day nights and Martian dust storms | The "buffer" resource — often underfunded until a crisis hits |
| **Transmission Efficiency** | Degrades with distance; improves with microwave/laser relay tech | Creates geographic optimization problems on large bodies |

### Labor & Cognitive Resources
| Resource | Description | Key Tension |
|----------|-------------|-------------|
| **Operator Hours** | Human attention — the scarcest resource. Each facility and fleet needs oversight allocation. | Core mobile-friendly mechanic: you are always choosing what to watch |
| **Crew Complement** | Headcount at each location. Constrained by habitat capacity and transit availability. | Can't expand without first expanding housing AND transport |
| **Specialist Ratings** | Engineers, scientists, medics, pilots — different specializations needed for different facilities | Creates a "hiring pipeline" mini-game; can't just buy specialists instantly |
| **Automation Level** | 0–5 scale per facility. Higher = less Operator Hours needed, but requires Semiconductor investment | The Phase 6+ unlock that lets you exceed human attention bandwidth |

### Logistics Capacity
| Resource | Description | Key Tension |
|----------|-------------|-------------|
| **Launch Slots** | Launch pads × usable launch windows. Can't exceed without more pads or waiting. | Forces queueing decisions: what goes up on this window? |
| **Cargo Manifest Capacity (t)** | Total mass capacity in transit at any given time | Prioritize crew consumables or construction materials? |
| **Orbital Parking Slots** | Station docking ports, orbital depot capacity. Finite per station. | Station must be expanded before new missions can be staged |
| **Propellant Reserves** | Fuel actually stockpiled at each node — not just production rate | Drawdown events (emergency resupply, stranded crew) create acute crises |
| **Transit Fleet Size** | Number of ships in operation. Each ship has a transit cycle time. | More ships = more flow, but each ship needs maintenance and crew |

### Research & Development
| Resource | Description | Key Tension |
|----------|-------------|-------------|
| **Research Points (RP)** | Generated by scientists + laboratories. Spent on tech tree nodes. | Allocating scientists to research vs. operations is a constant pull |
| **Experimental Data** | Collected by specialized probes and experiments at specific locations | Some technologies only unlock if you've actually *been* there |
| **Engineering Validation** | Prototype builds that prove concepts before full deployment | Some techs require physical prototypes, not just research — costs materials |
| **Breakthrough Potential** | Builds up with sustained research investment; triggers occasional multiplier events | Adds variance to research pace — sprint vs. steady investment strategies |

---

## TIER 4 — Strategic Resources

These are civilization-level outputs — not stockpiled, but *maintained*. They represent the state of your civilization.

| Resource | Description | How It's "Produced" |
|----------|-------------|---------------------|
| **Kardashev Rating** | Your civilization's energy utilization score. The game's macro progression bar. | Increases with total energy capture; milestone unlocks at K0.8, K0.9, K1.0, K1.5, K2.0 |
| **Supply Chain Resilience** | How many single points of failure exist in your logistics network | Maintained by building redundant routes and emergency stockpiles |
| **Population** | Total human population off-Earth. Drives demand AND provides labor. | Grows from migration + natural growth; constrained by habitat and life support |
| **Political Stability** | Earth's willingness to fund and support off-world expansion | Maintained by economic returns to Earth (SPS energy, asteroid metals) |
| **Scientific Prestige** | Reputation driving recruitment quality and research multipliers | Generated by discoveries, first-evers, landmark missions |
| **Autonomy Index** | How independent off-world settlements are from Earth supply chains | Rises as ISRU operations reduce Earth import dependency |

---

## The Constraint Triad System

Every major decision puts three resources in tension. Here are the core triads:

### Triad 1: The Expansion Trilemma
**Speed ↔ Safety ↔ Cost**
- Faster expansion → higher crew risk → higher insurance/medical costs
- Safer expansion → slower timeline → delayed revenue
- Cheaper expansion → lower redundancy → fragile supply chains
*Present in: Every phase gate decision*

### Triad 2: The Energy Triangle
**Production ↔ Storage ↔ Transmission**
- More production but no storage → brownouts during night cycles or storms
- More storage but poor transmission → stranded energy at source
- Better transmission but low production → efficient delivery of not-enough
*Present in: Phase 1 onward; acute on the Moon (14-day nights) and Mars (dust storms)*

### Triad 3: The Propellant Dilemma
**Stockpile ↔ Mission Tempo ↔ Production Capacity**
- Large stockpile = safety buffer but production capacity tied up building excess
- High mission tempo burns reserves faster than production refills
- More production capacity = more facilities = more power draw = energy crunch
*Present in: Phase 0 onward; never fully "solved"*

### Triad 4: The Crew Allocation Problem
**Operations ↔ Research ↔ Expansion**
- More crew on operations → higher output → slower research
- More crew on research → faster tech → slower current production
- More crew on expansion → unlocks future capacity → present bottleneck
*Present in: Phase 1 onward; the core session-to-session decision*

### Triad 5: The Autonomy Trade-off
**Control ↔ Efficiency ↔ Resilience**
- Full human control → maximum responsiveness, low throughput (attention bottleneck)
- Full automation → high throughput, but failures cascade without human oversight
- Balanced hybrid → moderate at everything; never optimal, but never fragile
*Present in: Phase 5 onward; becomes the dominant tension in Phase 6+*

---

## Logistics Puzzle Design

The logistics system is where *player skill* manifests. It should feel like solving a supply chain puzzle with real physical constraints.

### The Pipeline Model
Every resource flows through a four-stage pipeline:

```
[EXTRACT] → [PROCESS] → [STORE] → [SHIP] → [CONSUME]
```

A bottleneck at any stage creates a cascade. The player's job is to identify and clear the bottleneck — not just upgrade everything uniformly.

**Example:** Your Lunar base has high polar ice extraction but low oxygen output.
- Check pipeline: Extraction ✓ | Electrolysis capacity? ← BOTTLENECK
- Option A: Build more electrolyzers (costs power + REE for components)
- Option B: Ship raw water ice to orbit for processing there (costs launch slots + transit time)
- Option C: Reduce ice extraction rate to match processing capacity (accept slower growth)
Each is valid in different strategic situations.

### Transfer Windows as Logistics Events
For Mars and beyond, launch windows aren't just flavor — they're hard logistics puzzles.

**Earth-Mars Window (every ~26 months):**
- You have a 2-3 week window to launch
- Mass budget is fixed by vehicle fleet capacity
- Must decide: crew rotation OR cargo OR new equipment — you can't maximize all three
- Cargo manifest is a genuine prioritization problem
- Miss the window: wait 26 months or use a high-energy (expensive) non-Hohmann transfer

**Mechanic suggestion:** A "Manifest Builder" interface where the player drags cargo types into a limited-capacity ship manifest. Different cargo weights, urgency ratings, and criticality levels. Solving the manifest well provides efficiency bonuses.

### Depot Network Optimization
As the empire grows, propellant depots at key nodes (LEO, Gateway, LLO, Phobos, Ceres) must be kept above minimum threshold levels.

**The network state can be:**
- **Nominal:** All depots above 60% — missions proceed normally
- **Tight:** 30–60% — increased mission cost; slower tempo
- **Critical:** Below 30% — emergency rationing; some routes suspended
- **Stranded:** A ship in transit without destination depot coverage = crisis event

The player doesn't micromanage individual tanker runs — they set *priority levels* and *routing rules* for each depot. The system executes. But wrong rules create crises. This is the "policy not micromanagement" approach to logistics.

### Failure Modes as Interesting Problems

These aren't punishments — they're puzzles:

| Failure Mode | Cause | Player Response |
|---|---|---|
| **Stranded Mission** | Ship ran out of propellant en route | Dispatch rescue tanker; redesign route margins |
| **Habitat CO₂ Crisis** | Scrubber failure or overoccupancy | Emergency resupply launch; crew evacuation protocol |
| **Power Brownout** | Demand exceeded generation on 14-day lunar night | Prioritize life support; shed non-essential loads; build storage |
| **Manifest Overflow** | Too much cargo queued, launch window closing | Triage: crew needs first, then what's most strategically valuable |
| **Supply Route Disruption** | Solar storm damages transit ship | Reroute through backup path; draw down emergency reserves |
| **Research Stall** | Scientists reassigned to operations during crisis | Decide: accept research slowdown or risk the crisis deepening |

---

## Resource Progression Arc

How the *dominant* resource concern shifts across phases — giving each era a distinct feel:

| Phase | Dominant Constraint | Secondary Constraint | What "Solving" Looks Like |
|-------|--------------------|--------------------|--------------------------|
| 0 | **$/kg to orbit** | Hydrocarbon supply | Space elevator operational |
| 1 | **Power generation** | Orbital parking capacity | SPS network producing surplus |
| 2 | **Propellant** | Launch windows | Cislunar propellant self-sufficiency |
| 3 | **Crew headcount** | Regolith processing throughput | Lunar industrial base self-sustaining |
| 4 | **Transit time** | Manifest capacity | Cycler network operational |
| 5 | **Energy (fission)** | Water ice reserves | Sabatier loop fully closed on Mars |
| 6 | **Automation level** | Communication delay | Autonomous Belt operations |
| 7 | **Radiation shielding** | He-3 extraction rate | Jovian system habitable |
| 8 | **Self-replication rate** | Solar collection efficiency | First Dyson ring complete |

---

## Mobile UX Considerations for Resources

Given the mobile-first design constraint:

**Visibility Rules:**
- Never display more than 6 resources simultaneously on the main screen
- Resources not currently bottlenecking should be summarized, not listed
- Color code: green (surplus), yellow (nominal), orange (tight), red (critical)
- Critical resources pulse / animate to draw attention without being obnoxious

**Interaction Model:**
- Tap a resource → see its full pipeline (where it comes from, where it goes)
- Long-press a resource → quick allocation menu
- Swipe between "Overview" and "Logistics" views
- Pinch-zoom on the solar system map to navigate between location layers

**Cognitive Load Management:**
- New resources are introduced one at a time, always with a brief "what this is for" tooltip
- The game should never dump 5 new resources on the player at once
- Each phase introduces resources gradually over its arc, not all at unlock

---

## Resource Interdependency Map (Summary)

```
SOLAR FLUX
    ↓
POWER (MW) ────────────────────────────────────────┐
    │                                               │
    ├→ ELECTROLYSIS → LOX + LH₂/LCH₄ (propellant) │
    ├→ REGOLITH PROCESSING → O₂ + METALS           │
    ├→ SEMICONDUCTOR FAB → ELECTRONICS              │
    ├→ SABATIER REACTION → LCH₄ (Mars)             │
    └→ ION DRIVES → XENON consumption              │
                                                    │
RAW ORE/REGOLITH                                   │
    ↓                                              │
PROCESSED METALS ──→ STRUCTURES + SHIPS ←──────────┘
    ↓                              ↓
CARBON FIBER/CNT ──→ SPACE ELEVATOR CABLE
    
POLAR ICE / SUBSURFACE WATER
    ↓
WATER → ELECTROLYSIS → PROPELLANT + O₂
      → LIFE SUPPORT → POPULATION GROWTH
      → HYDROPONICS → FOOD PRODUCTION

POPULATION
    ↓
OPERATOR HOURS → FACILITY EFFICIENCY
    ↓
RESEARCH POINTS → TECH TREE PROGRESS
    ↓
AUTOMATION LEVEL → REDUCES OPERATOR HOURS NEEDED (loop closes)

HE-3 (lunar/jovian) ──→ FUSION FUEL ──→ FUSION DRIVES
                                      ──→ POWER SURPLUS (endgame)
```

---

## Next Design Documents Needed

This document defines *what* resources exist and *how* they interact. The next documents should specify:

- **`03_RESEARCH_TREE.md`** — Technology unlocks that transform resource relationships
- **`04_MECHANICS_DESIGN.md`** — Session loop, idle behavior, how decisions are surfaced to the player
- **`05_UI_UX_SPEC.md`** — How resource state is communicated on a 6-inch mobile screen

---

*Document version 1.0 — Resource Economy & Player Agency*
*Prerequisite: 01_PROGRESSION_DESIGN.md*
*Ready for: Claude Code implementation planning*
