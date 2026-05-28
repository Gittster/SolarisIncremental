# SOLARIS INCREMENTAL — Game Design Document
## Volume 1: Progression Framework & Scientific Grounding

---

## Design Philosophy

**Core Premise:** You are humanity's infrastructure director across a 200-year civilizational arc. Every unlock must be *causally justified* — nothing appears because of a timer; things become possible because prerequisite physics, materials, and logistics have been solved.

**Scientific Foundation:** Progression is derived from:
- Tsiolkovsky's rocket equation (why Earth launch is so expensive)
- In-Situ Resource Utilization (ISRU) principles (why going anywhere else gets cheaper)
- The Kardashev Scale (civilization energy as the macro arc)
- Actual NASA/ESA roadmaps (Artemis, Mars Design Reference Architecture)
- Futurist literature: Zubrin's *The Case for Mars*, O'Neill's *The High Frontier*, Kim Stanley Robinson's *Mars trilogy* (design inspiration)

**The Iron Law of Space Logistics:**
> Every phase is gated by: Energy → Mass → Time → Complexity
> You cannot skip a gate. You can only solve it.

---

## Macro Phase Overview

| Phase | Name | Era | Location | Gate Concept |
|-------|------|-----|----------|--------------|
| 0 | The Launchpad Problem | 2025–2040 | Earth Surface | Escaping the gravity well economically |
| 1 | Low Earth Orbit Economy | 2035–2055 | LEO | Building orbital infrastructure |
| 2 | The Cislunar Highway | 2050–2070 | Earth-Moon System | Propellant depots & lunar resources |
| 3 | The Lunar Industrial Base | 2065–2090 | Moon Surface | First off-world manufacturing |
| 4 | The Mars Transit Architecture | 2085–2120 | Earth-Mars | Interplanetary logistics rhythms |
| 5 | The Martian Frontier | 2110–2160 | Mars Surface | Planetary settlement & terraforming precursors |
| 6 | The Asteroid Belt Economy | 2150–2220 | Main Belt | Abundance economics, Ceres as hub |
| 7 | Outer System Reach | 2200–2300 | Jupiter System | Nuclear propulsion, radiation mastery |
| 8 | The Dyson Increment | 2280–2400 | Inner Solar System | Megastructure construction begins |

---

## PHASE 0 — The Launchpad Problem
**Era:** Near-future Earth (2025–2040)
**Theme:** The rocket equation is civilization's tax. You are paying it.

### The Core Problem (Player Framing)
Launching 1 kg to LEO costs ~$1,000–$10,000 depending on vehicle. Every gram of propellant you burn to reach orbit is propellant you had to lift from the ground. This is the tyranny of the rocket equation: your fuel needs fuel.

### Key Unlocks & Their Scientific Justification

#### Tier 0.1 — Reusable Launch Vehicles
- **What:** Booster recovery, rapid reuse cycles (think: Falcon 9 → Starship cadence)
- **Why it unlocks next tier:** Drops $/kg from $5,000 → $100. Makes orbital assembly economical.
- **Mechanic suggestion:** Each reuse cycle reduces per-launch cost. Investment in turnaround time is a core early loop.

#### Tier 0.2 — Launch Site Network
- **What:** Equatorial launch sites (lower orbital insertion cost), offshore platforms, polar orbit sites
- **Why:** Launching from the equator gives you ~460 m/s of free velocity from Earth's rotation. That's ~5% of your delta-v budget for free.
- **Mechanic:** Unlock new site types that open specific orbital inclinations (polar = spy/weather sats, equatorial = GEO, etc.)

#### Tier 0.3 — Propellant Production Infrastructure
- **What:** Liquid oxygen/methane production plants, cryogenic storage, tanker fleets
- **Why:** Starship-class vehicles use methane (synthesizable from CO2 + H2O via Sabatier reaction). This same process works on Mars. Building the supply chain on Earth is the rehearsal.
- **Mechanic:** Introduces the *propellant economy* loop that will scale through every subsequent phase.

#### Tier 0.4 — Space Elevator (PHASE GATE)
- **What:** A cable from equatorial surface to GEO (35,786 km) with climber vehicles
- **Why it's the phase gate:** Reduces launch cost to ~$10/kg (electrical energy only, no propellant). This is a phase-change unlock — it doesn't just speed things up, it breaks the economic model of rocketry.
- **Scientific basis:** Requires carbon nanotube or graphene tether with tensile strength >130 GPa (currently ~100 GPa in lab settings, projected manufacturable at scale by ~2040–2060 in optimistic scenarios). The counterweight station at GEO becomes the first permanent orbital node.
- **Hard requirement before unlock:** Must have: reusable vehicles operational + orbital station (construction platform) + materials research investment milestones
- **Mechanic:** This is the most expensive single structure in Phase 0. Building it transforms the entire economy — all subsequent launch costs from Earth plummet.

---

## PHASE 1 — Low Earth Orbit Economy
**Era:** 2035–2055
**Theme:** The ocean has a port. Orbit needs one too.

### The Core Problem
LEO is 400 km up, but delta-v to anywhere beyond LEO is expensive from there too. You need: staging points, fuel, assembly capacity, and a reason to be in space that pays for itself.

### Key Unlocks

#### Tier 1.1 — Orbital Station (Modular)
- **What:** Pressurized habitat modules, docking ports, power arrays
- **Why:** Assembly of interplanetary vessels in microgravity avoids structural mass penalties of building for a gravity well. No vehicle launched from Earth needs to survive 1G structural loads.
- **Basis:** ISS proved the assembly concept. Next-gen stations are commercial (Axiom, Orbital Reef concepts).

#### Tier 1.2 — Solar Power Satellites (SPS)
- **What:** Large photovoltaic arrays in GEO, microwave power transmission to Earth
- **Why:** In GEO you get ~8x more sunlight than the ground average. SPS is the first orbital infrastructure that pays for itself via energy export.
- **Mechanic:** Introduces the *energy currency* that scales across the whole game. Energy is the resource that unlocks everything.

#### Tier 1.3 — Orbital Propellant Depot
- **What:** Cryogenic storage tanks in LEO, supplied by tanker launches
- **Why:** Separates launch (getting fuel to orbit) from departure (using fuel to go somewhere). A ship traveling to the Moon doesn't need to carry all its propellant from Earth's surface.
- **Mechanic:** Depot fill level becomes a gating resource for all deep-space missions. Introduces supply chain management.

#### Tier 1.4 — In-Space Manufacturing (Prototype)
- **What:** Microgravity crystal growth, vacuum-sintered alloys, zero-g fiber optics
- **Why:** Some materials are genuinely better made in microgravity (certain pharma proteins, high-purity fiber optic preforms). This is the economic justification for early orbital industry.
- **Mechanic:** Unlocks rare material types that boost research rates — creates pull-demand for more orbital infrastructure.

#### Tier 1.5 — Space Tug Network (PHASE GATE)
- **What:** Autonomous ion-propelled vehicles for orbital transfer, satellite servicing, debris removal
- **Why it's the phase gate:** The cislunar economy can't function without reusable orbital logistics vehicles. You need something to move cargo from LEO → LLO without burning expensive chemical propellant every time.
- **Basis:** Ion drives (e.g., Hall-effect thrusters) have Isp ~3,000s vs chemical ~450s. Low thrust, long burn — fine for cargo, not passengers. This distinction matters for game mechanics.

---

## PHASE 2 — The Cislunar Highway
**Era:** 2050–2070
**Theme:** The Moon is eight times farther than LEO but requires only ~25% more delta-v. That's the deal.

### The Core Problem
Earth-Moon L1/L2 Lagrange points are gravitational balance positions where minimal fuel keeps you "parked." The Near Rectilinear Halo Orbit (NRHO) around the Moon is the staging ground. From NRHO you can reach lunar surface, lunar orbit, or deep space for minimal delta-v.

### Key Unlocks

#### Tier 2.1 — Lunar Gateway Station
- **What:** Small station in NRHO, serves as logistics hub, communication relay, propellant cache
- **Why:** NRHO is accessible from both Earth and lunar surface with low delta-v. It's the "truck stop" of the inner solar system.
- **Basis:** NASA's actual Artemis architecture includes this.

#### Tier 2.2 — Lunar Telecommunications Network
- **What:** Relay satellites for continuous far-side and polar coverage
- **Why:** The Moon's rotation is tidally locked. Far side has no Earth line-of-sight. Any far-side operations need relay satellites.
- **Mechanic:** Unlocks polar and far-side regions on the Moon map.

#### Tier 2.3 — Cislunar Propellant Economy
- **What:** Water electrolysis facilities on the Moon → LOX/LH2 → shipped to Gateway depot
- **Why:** If lunar ice exists in polar permanently shadowed regions (PSRs) — confirmed by LCROSS, 2009 — it can be cracked into rocket propellant. This means the Moon fuels everything beyond it.
- **Mechanic:** This is the game's first *off-world resource loop*. Shifts the propellant supply chain off Earth permanently. Massive efficiency unlock.

#### Tier 2.4 — Lunar Lander Fleet (Reusable)
- **What:** Reusable surface-to-orbit landers based at Gateway
- **Why:** Reusability in lunar context is harder (lunar surface has no atmosphere for aerobraking) but critical for economics. Propellant cost per trip must be covered by resource value returned.

---

## PHASE 3 — The Lunar Industrial Base
**Era:** 2065–2090
**Theme:** The Moon is not a destination. It's a quarry.

### The Core Problem
The Moon has: no atmosphere, 1/6 gravity, 2-week day/night cycles, hard vacuum, and vast mineral resources including titanium, aluminum, silicon, and potentially helium-3. These are manufacturing advantages, not just challenges.

### Key Unlocks

#### Tier 3.1 — Regolith Processing Plants
- **What:** Electrolytic oxygen extraction from lunar regolith (MOXIE-derived, scaled up)
- **Why:** Lunar regolith is ~45% oxygen by mass. Electrolyze it → oxygen (propellant oxidizer + life support) + metal residue. You're mining air and fuel from dirt.
- **Basis:** NASA's MOXIE experiment on Perseverance Mars rover proved this concept.

#### Tier 3.2 — Solar Array Manufacturing
- **What:** In-situ silicon PV panel production from lunar regolith
- **Why:** Silicon is abundant in lunar regolith. Manufacturing solar panels on the Moon and launching them to orbit (low lunar gravity = cheap launch) is far more efficient than launching them from Earth.
- **Mechanic:** Introduces *orbital energy export* at scale. Powers everything in Phase 4+.

#### Tier 3.3 — Lunar Mass Driver (PHASE GATE)
- **What:** Electromagnetic rail launcher on the lunar surface that launches processed material to L2 or directly to LEO
- **Why it's the phase gate:** Lunar escape velocity is 2.38 km/s vs Earth's 11.2 km/s. A mass driver needs no propellant — just electricity (from the solar arrays you now manufacture). This makes bulk material export from the Moon essentially free.
- **Basis:** Gerard K. O'Neill's original L5 colony concept relied on lunar mass drivers. The physics is mature; the engineering is the challenge.
- **Hard requirement:** Must have solar manufacturing at scale + regolith processing operational + power grid built.
- **Mechanic:** Unlocks "bulk material" resource streams that feed orbital construction in Phase 4+.

#### Tier 3.4 — Lunar Habitat Expansion
- **What:** Underground habitats (lava tubes), radiation shielding, closed-loop life support
- **Why:** Lunar lava tubes are ~100m wide naturally and provide radiation and micrometeorite shielding. They're the most pragmatic settlement architecture.
- **Basis:** JAXA/NASA confirmed lava tube existence via SELENE/Kaguya mission (2017).

#### Tier 3.5 — Helium-3 Extraction (Long Research)
- **What:** Solar wind implanted He-3 in regolith, harvested by thermal extraction
- **Why:** He-3 is a fusion fuel for aneutronic fusion reactors (if fusion is achieved). The Moon has ~1 million tons of it in the regolith. Earth has almost none.
- **Game note:** This is a very long research project that pays off in Phase 6+ when fusion drives become available. Plant the seed early.

---

## PHASE 4 — The Mars Transit Architecture
**Era:** 2085–2120
**Theme:** Mars doesn't wait. Launch windows are every 26 months. Miss one and you wait two years.

### The Core Problem
Earth-Mars is not a fixed distance — it varies from 54.6M km to 401M km. Hohmann transfer orbits take 6–9 months. The *synodic period* (time between optimal launch windows) is ~26 months. This isn't a game convenience — it's orbital mechanics and the game must respect it.

### Key Unlocks

#### Tier 4.1 — Interplanetary Transit Vessels
- **What:** Large cycler or sprint-trajectory ships built in LEO/lunar orbit
- **Design:** Nuclear thermal propulsion (NTP) reduces transit time to ~90 days. Chemical takes ~180 days. Distinction matters for crew radiation dose and consumables.
- **Basis:** NTP is proven (NERVA program, 1960s). Specific impulse ~900s vs chemical ~450s.

#### Tier 4.2 — Aldrin Cycler Network
- **What:** Permanent spacecraft in Earth-Mars cycler orbits — they never stop, you rendezvous with them
- **Why:** Buzz Aldrin's cycler concept puts the heavy infrastructure (habitat, radiation shielding, life support) on a permanent orbit. You only need small, cheap transfer vehicles to reach the cycler.
- **Mechanic:** Cyclers become a passive resource — once funded, they run. But they require maintenance missions and resupply rendezvous missions to keep running. Management challenge.

#### Tier 4.3 — Mars Aerobraking Infrastructure
- **What:** Standardized aeroshell designs, orbital refueling at Mars, reusable entry systems
- **Why:** Mars has a thin atmosphere (~1% of Earth). Useful for aerobraking (saves propellant) but not for parachutes alone. Every landing needs a propulsive phase too.

#### Tier 4.4 — Deep Space Communication Network
- **What:** Relay satellites at Earth-Sun L4/L5, Mars communication orbiters
- **Why:** Mars has communication blackouts during solar conjunction (when Sun is between Earth and Mars) lasting ~2 weeks. Relay sats at L4/L5 provide partial mitigation.
- **Mechanic:** Communication delay is a core mechanic here (3–22 minute one-way delay). Introduces *autonomous operations* research tree — Martian assets need to self-manage.

---

## PHASE 5 — The Martian Frontier
**Era:** 2110–2160
**Theme:** Mars is the first place humanity becomes multi-planetary. It's also the beginning of planetary engineering.

### Key Unlocks

#### Tier 5.1 — ISRU at Scale (Sabatier Reaction)
- **What:** Atmospheric CO2 + subsurface water ice → CH4 + O2 propellant
- **Why:** Mars atmosphere is 95% CO2. Water ice confirmed at poles and mid-latitudes. Sabatier reaction produces methane rocket fuel in-situ. **Mars fuels Mars missions.**
- **Basis:** This is the centerpiece of Elon Musk's Mars architecture and Zubrin's Mars Direct.

#### Tier 5.2 — Nuclear Fission Surface Power
- **What:** Kilopower/KRUSTY-derived fission reactors for continuous base power
- **Why:** Mars receives ~43% of Earth's solar flux. Dust storms can last months (see: Opportunity rover's death). Solar is insufficient for a serious industrial base. Fission is the answer.
- **Basis:** NASA's Kilopower project tested a 10kW fission reactor in 2018.

#### Tier 5.3 — Terraforming Precursors (Long Research)
- **What:** Atmospheric thickening via greenhouse gas release (perfluorocarbons), polar ice sublimation, dark material dusting
- **Why:** Not "terraforming" yet — just beginning the centuries-long process. Raising Mars's atmospheric pressure from 600 Pa to even 30,000 Pa (still unbreathable but survivable with just an oxygen mask) takes ~100 years with aggressive intervention.
- **Mechanic:** This is a multi-century background process. Start it in Phase 5, see first results in Phase 7-8.

#### Tier 5.4 — Phobos/Deimos Capture & Development (PHASE GATE)
- **What:** Mining and manufacturing on Mars's moons; Phobos as orbital shipyard
- **Why it's the phase gate:** Phobos orbits Mars at just 6,000 km altitude, completing an orbit every 7.6 hours. Escape velocity from Phobos is ~11 m/s — you can launch material from it with a thrown baseball. It becomes the Mars system's mass driver and shipyard for outer solar system missions.
- **Scientific basis:** Phobos is likely a captured C-type asteroid — carbonaceous, water-bearing, raw material for everything.

---

## PHASE 6 — The Asteroid Belt Economy
**Era:** 2150–2220
**Theme:** Scarcity was a planetary phenomenon. The Belt ends it.

### The Core Problem
The asteroid belt contains more material than humanity could use in millennia. But it's diffuse — asteroids are not close together. Average distance between significant asteroids is ~1 million km. You need efficient, autonomous logistics.

### Key Unlocks

#### Tier 6.1 — Autonomous Mining Drones
- **What:** Self-guided extraction robots, AI-managed ore processing, automated mass drivers
- **Why:** Communication delay to the Belt is 3–30 minutes. Real-time human control is impossible. Everything must be autonomous.
- **Mechanic:** Introduces *automation level* as a key resource. Higher automation = more output per operator, but requires massive upfront research investment.

#### Tier 6.2 — Ceres as Industrial Hub
- **What:** Water ice on Ceres (confirmed by Dawn mission), manufacturing base, deep space refueling
- **Why:** Ceres is the largest body in the Belt (~940 km diameter), has confirmed water, and sits at a useful gravitational point. Its low escape velocity (0.51 km/s) makes material export cheap.
- **Mechanic:** Ceres becomes the "city" of the Belt — all logistics routes pass through or near it.

#### Tier 6.3 — Solar Sails + Ion Freighters
- **What:** Large low-acceleration autonomous cargo ships for Belt-to-inner-system runs
- **Why:** For non-time-critical bulk cargo, low-thrust high-Isp drives (ion + solar sail combinations) minimize propellant cost at the expense of transit time (months to years per run).
- **Mechanic:** Introduces the *trade route* concept. You designate routes; ships run them automatically. Managing queue depth and transit timing becomes a logistics puzzle.

#### Tier 6.4 — Fusion Torch Ships (PHASE GATE)
- **What:** Compact fusion drives (D-He3 aneutronic, using He-3 mined from the Moon/Jupiter atmosphere) enabling fast (~30-day) Earth-Belt transits
- **Why it's the phase gate:** The outer solar system is unreachable at chemical or ion-drive speeds on human timescales. Fusion drives change the equation. D-He3 fusion produces minimal neutron radiation — critical for spacecraft design.
- **Hard requirement:** He-3 research tree from Phase 3 must be complete. Fusion engineering research must be complete.
- **Mechanic:** Transforms outer system from "possible" to "practical." Also retroactively speeds up all inner system logistics.

---

## PHASE 7 — Outer System Reach
**Era:** 2200–2300
**Theme:** Jupiter's moons have more liquid water than all of Earth. That's the prize.

### Key Unlocks

#### Tier 7.1 — Radiation Hardening Technology
- **What:** Active magnetic shielding, radiation-hardened electronics, biological countermeasures
- **Why:** Jupiter's radiation belts are lethal. Io receives 3,600 rem/day. Without radiation solutions, the Jovian system is uninhabitable.

#### Tier 7.2 — Europa/Ganymede Ocean Access
- **What:** Drilling through Europa's ice shell (~10-30 km) to subsurface ocean
- **Why:** Europa's ocean has more liquid water than Earth. Heat from tidal flexing keeps it liquid. If life exists in the solar system beyond Earth, here is the most likely location.
- **Mechanic:** Introduces *xenobiological survey* — a long research track with potentially civilization-altering implications.

#### Tier 7.3 — Jupiter Atmospheric Mining
- **What:** Atmospheric scooping of hydrogen, helium-3 from Jupiter's upper atmosphere
- **Why:** Jupiter contains ~10% of its mass as helium (the whole solar system does). He-3 abundance is ~1 part per million, but Jupiter has a lot of atmosphere. This is the ultimate fusion fuel supply.
- **Mechanic:** Introduces the largest resource numbers in the game. Jupiter is the abundance inflection point.

#### Tier 7.4 — Trojan Asteroid Colonization
- **What:** Jupiter Trojans at L4/L5 — primitive, carbon-rich asteroids with useful materials
- **Why:** Jupiter Trojan points are gravitationally stable. L4/L5 objects stay there forever. They're platforms for outer-system operations.

---

## PHASE 8 — The Dyson Increment
**Era:** 2280–2400
**Theme:** You're not building a sphere. You're building the first ring. Then another. Then a swarm.

### The Core Problem
A Dyson Sphere is not one object — it's a civilization-scale project measured in decades. A *Dyson Swarm* (independent solar power satellites in a coordinated shell) is the physically plausible version. Each unit is manufacturable. The aggregate is staggering.

### Key Unlocks

#### Tier 8.1 — Self-Replicating Robotic Factories
- **What:** Von Neumann probes at small scale — factories that can build copies of themselves from asteroid material
- **Why:** No human workforce can build a Dyson Swarm. Only exponential self-replication gets you there. First demonstrated at small scale in the Belt before scaling.
- **Mechanic:** Introduces *exponential production curves* — the game's endgame economy is fundamentally different in character from Phase 0.

#### Tier 8.2 — Mercury Industrial Complex
- **What:** Mercury's surface for solar power harvesting, raw material (iron, nickel, sulfur), extreme manufacturing
- **Why:** Mercury receives ~11x Earth's solar flux. Its surface temperature swings are extreme but manageable in polar craters. It's the ideal site for energy-intensive manufacturing.

#### Tier 8.3 — First Dyson Ring
- **What:** 100 solar power satellites in coordinated solar orbit, microwaving power inward to civilization
- **Why:** One ring is 0.0001% of a full swarm but is proof-of-concept at civilization scale. Energy output dwarfs anything else in the game.
- **Mechanic:** This is a Kardashev 1 → Kardashev 2 transition moment. The game's fundamental resource (energy) enters an entirely new order of magnitude.

#### Tier 8.4 — Dyson Swarm (Endgame)
- **What:** Thousands of units → tens of thousands → covering meaningful fraction of solar output
- **Why:** This is the civilization's Type II Kardashev endpoint. You capture a meaningful percentage of the Sun's 3.8 × 10²⁶ watts of output.
- **Mechanic:** The game doesn't "end" here — but this is the final quantitative goal. Beyond this, gameplay shifts to optimization, aesthetics, and story resolution.

---

## Cross-Cutting Mechanics (Summary)

These mechanics run through all phases and need detailed design docs:

| Mechanic | Description | Phase Introduced |
|----------|-------------|-----------------|
| **Propellant Economy** | Fuel is manufactured, stored, shipped. Supply chains matter. | Phase 0 |
| **Launch Windows** | Planetary alignments gate departure timing | Phase 4 |
| **Communication Delay** | Light-speed comms mean remote assets need autonomy | Phase 4 |
| **Energy Currency** | Everything converts to power; energy is the master resource | Phase 1 |
| **Automation Level** | Human operators → partial automation → full autonomy | Phase 6 |
| **Research Trees** | Technology that requires prerequisite tech, not just time | All phases |
| **Population & Habitat** | Off-world population creates demand AND labor supply | Phase 3+ |
| **Trade Routes** | Cargo ships on scheduled runs; queue and manifest management | Phase 6 |

---

## Next Design Documents Needed

1. **`02_RESOURCE_ECONOMY.md`** — Full resource graph: what produces what, conversion rates, storage constraints
2. **`03_RESEARCH_TREE.md`** — Complete tech tree with prerequisites, durations, and unlock effects
3. **`04_MECHANICS_DESIGN.md`** — Idle/incremental loop design, session play, mobile UX considerations
4. **`05_UI_UX_SPEC.md`** — Screen layout, information hierarchy, visual language
5. **`06_NARRATIVE_EVENTS.md`** — Discovery events, crises, historical echoes that give the timeline texture

---

*Document version 1.0 — Progression Framework*
*Ready for: Claude Code implementation planning*
