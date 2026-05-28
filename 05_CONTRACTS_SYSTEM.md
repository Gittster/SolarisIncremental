# SOLARIS INCREMENTAL — Game Design Document
## Volume 5: Commercial Contracts System

---

## Design Intent

The contracts system is the game's primary **active play layer**. It rewards presence without requiring it.

- **Passive play:** Your program advances at baseline pace. Contracts you ignore resolve automatically at reduced terms, or expire quietly.
- **Active play:** You negotiate contracts, time them strategically, and stack their bonuses to meaningfully accelerate progress.

The emotional feel is **program director**, not micromanager. You're deciding what your agency builds in-house vs. what you hand to a commercial partner. That's a real decision real space agencies make constantly — and it has real tradeoffs.

---

## The Core Mechanic

### Contract Offer Flow

```
OFFER APPEARS → REVIEW TERMS → NEGOTIATE (optional) → ACCEPT / DECLINE / IGNORE
```

1. A **Contract Card** surfaces in your notification tray
2. You review what the partner wants and what they'll deliver
3. You can accept as-is, negotiate one term, or decline
4. If ignored long enough, it either expires or auto-resolves at baseline (worse) terms
5. Accepted contracts run for a defined duration, then pay out

### The Tradeoff Structure

Every contract has exactly this shape:

```
PARTNER gives you:  [Long-term benefit]
YOU give partner:   [Short-term resource or capacity cost]
DURATION:           [How long the dip lasts before payoff begins]
```

The player's decision is always: *can I absorb this dip right now, and is the payoff worth it given where I am in the phase?*

That's a genuine strategic question. Taking a propellant production dip when you're three months from a Mars launch window is a bad call. Taking it right after a successful window with 18 months until the next one is smart timing.

---

## Contract Categories

### Category 1 — Launch Services
**What it is:** You allocate launch capacity to a commercial partner for a period. They use your infrastructure to launch their payloads.

**Short-term cost:** Reduced launch slots available for your own missions. Transit queue may back up.

**Long-term benefit:** Revenue returned as Materials or Electronics (they pay in kind, not cash). Also builds the partner's **Reputation** with you, unlocking better future contracts.

**Real-world analog:** NASA purchasing Falcon 9 launches from SpaceX, or leasing pad time at Cape Canaveral to commercial operators.

**Example contract:**
> *Orbital Dynamics Co. requests 3 launch slots over the next 6 months for a constellation deployment. In return: 800 units of precision electronics components on delivery.*

---

### Category 2 — Facility Construction
**What it is:** A commercial partner builds a facility on your behalf, faster than you could build it in-house, but you cede some operational control.

**Short-term cost:** Materials and a crew complement tied up in partner liaison roles. Facility output is split — partner takes a percentage for a defined period.

**Long-term benefit:** Facility built significantly faster than your current construction rate. After the revenue-share period, you own it fully.

**Real-world analog:** Commercial companies building and operating ISS modules (Axiom), or a private firm constructing a lunar propellant depot on contract.

**Example contract:**
> *Helios Construction proposes building your Lunar Electrolysis Plant in 4 months (vs. your current 11-month estimate). Terms: 30% of oxygen output goes to Helios for 18 months post-completion. After that, full ownership transfers to you.*

---

### Category 3 — Research Partnerships
**What it is:** A commercial or academic partner embeds their team in your research program, accelerating a specific technology branch.

**Short-term cost:** Some of your research output is directed toward their priorities, not yours. The partner's research agenda may not perfectly align with your phase gate needs.

**Long-term benefit:** Significant acceleration on a specific technology. Partner may also bring **Experimental Data** from their own missions that you'd otherwise need to gather yourself.

**Real-world analog:** NASA/ESA joint research programs, university partnerships, commercial R&D contracts.

**Example contract:**
> *Artemis University Research Consortium offers to co-invest in your Sabatier Process research. Their team accelerates the branch by 40% for 8 months. In exchange, 25% of your RP generation is directed to their materials science agenda during that period.*

---

### Category 4 — Supply Agreements
**What it is:** A commercial partner becomes a supplier of a specific resource, reducing your need to produce it in-house.

**Short-term cost:** An upfront Materials payment to establish the supply chain. A small ongoing resource fee (partner's margin).

**Long-term benefit:** Steady supply of that resource without requiring your own facility, crew, or power allocation. Frees up capacity for higher-priority work.

**Real-world analog:** NASA purchasing oxygen from Air Products rather than running its own gas plants, or buying solar panels from a commercial manufacturer.

**Example contract:**
> *Pacific Cryogenics will supply your LEO depot with 500 units of liquid oxygen per month. Setup cost: 1,200 Materials. Ongoing fee: 50 Materials/month. Duration: Indefinite (cancellable with 2-month notice).*

The indefinite supply agreement is a *strategic commitment* — you're trading flexibility for reliability. Cancelling it means re-building in-house capacity, which takes time.

---

### Category 5 — Crew Augmentation
**What it is:** Commercial crews supplement your roster at a specific location.

**Short-term cost:** Temporary reduction in another resource (usually Materials or Propellant — you're paying for their transport and life support).

**Long-term benefit:** Temporary but significant crew boost at a location. Useful for pushing through a bottleneck without permanently expanding your habitat capacity.

**Real-world analog:** Commercial astronaut programs, contractor crews on ISS, private mission specialists.

**Example contract:**
> *Frontier Crew Services can deploy a 4-person engineering team to your Lunar Base for 6 months. Transit cost: 300 Propellant. Their presence increases facility efficiency at the base by 35% for the contract duration.*

---

### Category 6 — Expeditions (Active Play Focus)
**What it is:** A commercial partner proposes a joint expedition to a new location — one you haven't reached yet. They do the heavy lifting; you provide a resource contribution and active oversight during the mission.

**Short-term cost:** Resource contribution + your active attention during a 5–10 minute mission window.

**Long-term benefit:** Experimental Data from the new location (unlocking research you couldn't otherwise access), plus a stake in whatever resources the expedition finds.

**Real-world analog:** Commercial lunar landing services (Astrobotic, Intuitive Machines), private Mars precursor missions.

**This is the primary active play contract type.** The expedition plays out as a short interactive sequence — a few key decisions, not a minigame. Do you push deeper into the lava tube or play it safe? Deploy the full sensor array or conserve power for the return? Low-stakes decision tree, high narrative texture.

**Example contract:**
> *Nova Robotics proposes a joint survey of Lunar PSR Crater 7 — a permanently shadowed region with ice deposits. Your contribution: 600 Materials for their rover deployment. Your role: 3 key decisions during the 8-month mission. Outcome: Experimental Data on subsurface ice depth + shared claim on the deposit.*

---

## Partner Roster

Partners evolve across phases, reflecting the real commercial space ecosystem scaling up over time.

### Phase 0–2: Near-Future Commercial Space
| Partner | Specialty | Real-World Flavor |
|---------|-----------|-------------------|
| **Orbital Dynamics Co.** | Launch services, satellite deployment | SpaceX / Rocket Lab |
| **Helios Construction** | Orbital and surface construction | Bechtel-in-space |
| **Pacific Cryogenics** | Propellant supply and storage | Industrial gas meets aerospace |
| **Artemis University Consortium** | Research partnerships | MIT / Caltech-style |
| **Frontier Crew Services** | Commercial crew augmentation | Axiom Space |

### Phase 3–5: Interplanetary Industry
| Partner | Specialty | Real-World Flavor |
|---------|-----------|-------------------|
| **Lunar Extraction Ltd.** | Regolith processing, ISRU | Mining company gone orbital |
| **Nova Robotics** | Autonomous systems, expeditions | Boston Dynamics meets JPL |
| **RedPath Transit** | Mars logistics, cycler operations | Shipping company, interplanetary |
| **Solaris Energy Corp.** | Power infrastructure, SPS | Energy utility, solar system scale |
| **Deep Horizon Science** | Planetary research, data brokerage | Science-as-a-service |

### Phase 6–8: Solar System Scale
| Partner | Specialty | Real-World Flavor |
|---------|-----------|-------------------|
| **Belt Industrial Collective** | Asteroid ISRU, autonomous mining | Consortium of Belt operators |
| **Jovian Systems Group** | Outer system logistics, He-3 | Energy megacorp |
| **Ceres Fabrication Works** | In-space manufacturing at scale | The Boeing of the Belt |
| **Dyson Engineering Consortium** | Megastructure design and construction | The partner that builds the endgame with you |

Partner **Reputation** accumulates across contracts. Higher reputation = better terms, more valuable contracts, and eventually — **Strategic Partnerships**: permanent bonuses that represent deep, long-term collaboration.

---

## Negotiation

When a contract arrives, you can negotiate **one term** before accepting:

- Push the duration shorter (smaller dip window)
- Push the payoff higher (better return, but partner may decline)
- Request a different payment type (you need Electronics, not Materials)
- Defer the start date (useful for timing around launch windows)

Partner acceptance of negotiation depends on your Reputation with them. Low reputation = they rarely budge. High reputation = they'll often accommodate.

Negotiation is a single tap + a choice from 3–4 options. Not a complex system — just enough to make accepting-as-is feel like a choice, not a default.

---

## Contract Timing Strategy

This is where active play creates genuine skill expression:

**Good timing:**
- Take a propellant dip 18+ months before a launch window
- Accelerate a research branch just before you need it for a phase gate push
- Use a crew augmentation contract to sprint through a construction backlog

**Bad timing:**
- Take a launch slot dip right before a Mars window
- Accept a facility construction contract when your power budget is already tight
- Take a research redirection contract when you're 80% through a critical tech

The game doesn't tell you these are bad timings — the Slip Metric will just start drifting. Experienced players will learn to read the contract calendar against their phase gate timeline. That's the skill layer.

---

## Integration with the Four-Verb Loop

| Verb | How Contracts Touch It |
|------|----------------------|
| **Gather** | Supply agreements add resource streams; expedition contracts unlock new deposits |
| **Research** | Research partnerships accelerate specific branches |
| **Assign** | Crew augmentation and facility construction change what you're assigning and where |
| **Unlock** | Expedition contracts provide Experimental Data gating certain research |

Contracts don't add a fifth verb — they enrich all four.

---

## Passive Resolution

If the player ignores a contract offer:

- **After 48 real-world hours:** The contract offer expires and is replaced by a new one
- Some contracts have a **Auto-Accept at Baseline** option — the system accepts a watered-down version automatically (smaller payoff, same cost). Player can turn this off per contract category in settings.
- No notification spam. One gentle indicator that contract offers are waiting. Player checks when they want to.

This ensures passive players still benefit from the system — just not as efficiently as active players who time and negotiate their contracts well.

---

*Document version 1.0 — Commercial Contracts System*
*Prerequisites: 01, 02, 03, 04*
*Next: 06_UI_UX_SPEC.md*
