import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, ResourceKey, ModalData } from '../types';
import { INITIAL_STATE } from '../game/initialState';
import { OPERATIONS_BY_ID, OPERATION_DEFS, RESEARCH_BY_ID, RESEARCH_DEFS } from '../game/definitions';

interface GameActions {
  tick: (now: number) => void;
  buildOperation: (opId: string) => void;
  incrementActive: (opId: string) => void;
  decrementActive: (opId: string) => void;
  purchaseResearch: (researchId: string) => void;
  dismissModal: () => void;
  markIntroSeen: () => void;
  resetGame: () => void;
}

export type GameStore = GameState & GameActions;

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

function annualCostUsed(counts: GameState['operationCounts']): number {
  let total = 0;
  for (const [id, c] of Object.entries(counts)) {
    const def = OPERATIONS_BY_ID[id];
    if (def) total += def.annualCostM * c.active;
  }
  return total;
}

function computeAnnualRates(counts: GameState['operationCounts']): Record<ResourceKey, number> {
  const rates: Record<ResourceKey, number> = {
    steel: 0, carbon: 0, aluminum: 0, silicon: 0, ree: 0,
    methalox: 0, cntCable: 0, avionics: 0, structural: 0,
    solarPanels: 0, lifeSupport: 0, rp: 0,
  };
  for (const [id, c] of Object.entries(counts)) {
    if (c.active === 0) continue;
    const def = OPERATIONS_BY_ID[id];
    if (!def) continue;
    for (const o of def.outputs) rates[o.resource] += o.annualAmount * c.active;
    for (const inp of def.inputs)  rates[inp.resource] -= inp.annualAmount * c.active;
  }
  return rates;
}

function researchPrereqsMet(researchId: string, unlocked: string[]): boolean {
  const def = RESEARCH_BY_ID[researchId];
  return !def ? false : def.requires.every(r => unlocked.includes(r));
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      tick: (now: number) => {
        const state = get();
        const deltaMs  = Math.min(now - state.lastTick, 8 * 3600 * 1000);
        const deltaYrs = deltaMs / 1000 / 12; // 1 real second = 1 game month = 1/12 year

        const rates = computeAnnualRates(state.operationCounts);
        const resources = { ...state.resources };
        for (const [key, rate] of Object.entries(rates) as [ResourceKey, number][]) {
          resources[key] = Math.max(0, resources[key] + rate * deltaYrs);
        }

        const updates: Partial<GameState> = {
          lastTick: now,
          gameMonth: state.gameMonth + deltaMs / 1000,
          resources,
        };

        if (!state.seenIntro) {
          updates.seenIntro = true;
          updates.pendingModals = [
            ...state.pendingModals,
            {
              id: 'intro',
              type: 'intro',
              title: 'March 2025. The window has opened.',
              subtitle: 'Space Elevator Program, Phase 0: The Launchpad Problem',
              body: 'A joint team from MIT and the National Carbon Research Institute just published results that changed everything. Using a new plasma-assisted CVD process, they grew bulk single-wall carbon nanotube yarn achieving 48.3 GPa tensile strength. The theoretical minimum for a geosynchronous tether is around 50 GPa.\n\nFor 30 years, this number sat out of reach. After the 2025 breakthrough, it does not.\n\nThe International Space Elevator Consortium was formed within 90 days. Governments committed $8.4 billion per year in initial funding. The window is open, but it will not stay open. Other nations are watching.\n\nYour mandate: build the supply chain from the ground up, fund the remaining science, and deliver the tether. A space elevator cuts the cost of reaching orbit from $10,000 per kilogram to roughly $50. That single number unlocks the solar system.\n\nStart with what you have: a steel mine, a research lab, and time.',
            },
          ];
        }

        set(updates);
      },

      // Pay material build cost, add 1 to both built and active
      buildOperation: (opId: string) => {
        const state = get();
        if (!selectCanBuild(state, opId)) return;

        const def = OPERATIONS_BY_ID[opId];
        if (!def) return;

        // Deduct build cost materials
        const resources = { ...state.resources };
        for (const cost of def.buildCost) {
          resources[cost.resource] = (resources[cost.resource] ?? 0) - cost.amount;
        }

        const counts = { ...state.operationCounts };
        const current = counts[opId] ?? { built: 0, active: 0 };
        counts[opId] = { built: current.built + 1, active: current.active + 1 };

        set({ operationCounts: counts, resources });
      },

      // Activate one more idle unit (no material cost, just budget check)
      incrementActive: (opId: string) => {
        set(state => {
          const counts = { ...state.operationCounts };
          const current = counts[opId];
          if (!current || current.active >= current.built) return {};
          const def = OPERATIONS_BY_ID[opId];
          if (!def) return {};
          if (annualCostUsed(counts) + def.annualCostM > state.annualBudgetM) return {};
          counts[opId] = { ...current, active: current.active + 1 };
          return { operationCounts: counts };
        });
      },

      // Deactivate one running unit (always allowed, frees budget)
      decrementActive: (opId: string) => {
        set(state => {
          const counts = { ...state.operationCounts };
          const current = counts[opId];
          if (!current || current.active === 0) return {};
          counts[opId] = { ...current, active: current.active - 1 };
          return { operationCounts: counts };
        });
      },

      purchaseResearch: (researchId: string) => {
        const state = get();
        const def = RESEARCH_BY_ID[researchId];
        if (!def) return;
        if (state.unlockedResearch.includes(researchId)) return;
        if (!researchPrereqsMet(researchId, state.unlockedResearch)) return;
        if (state.resources.rp < def.rpCost) return;

        const modal: ModalData = {
          id: `research_${researchId}`,
          type: 'research',
          title: `Research Complete: ${def.name}`,
          subtitle: def.description,
          body: def.tooltip + (def.unlocks.length > 0
            ? `\n\nUnlocked: ${def.unlocks.map(id => OPERATIONS_BY_ID[id]?.name ?? id).join(', ')}`
            : ''),
        };

        set(s => ({
          resources: { ...s.resources, rp: s.resources.rp - def.rpCost },
          unlockedResearch: [...s.unlockedResearch, researchId],
          pendingModals: [...s.pendingModals, modal],
        }));
      },

      dismissModal: () => set(s => ({ pendingModals: s.pendingModals.slice(1) })),

      markIntroSeen: () => set({ seenIntro: true }),

      resetGame: () => set({ ...INITIAL_STATE, lastTick: Date.now() }),
    }),
    { name: 'solaris-v4', version: 1 },
  ),
);

// ---------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------

export function selectBudgetUsed(state: GameState): number {
  return annualCostUsed(state.operationCounts);
}

export function selectAnnualRates(state: GameState): Record<ResourceKey, number> {
  return computeAnnualRates(state.operationCounts);
}

/** True if the player can pay material cost and has budget for +1 active unit */
export function selectCanBuild(state: GameState, opId: string): boolean {
  const def = OPERATIONS_BY_ID[opId];
  if (!def) return false;
  if (def.unlocksAtPhase > state.currentPhase) return false;
  if (def.requiresResearch && !state.unlockedResearch.includes(def.requiresResearch)) return false;

  const counts = state.operationCounts;
  const current = counts[opId] ?? { built: 0, active: 0 };
  if (current.built >= def.maxInstances) return false;
  // New unit starts active — check budget
  if (annualCostUsed(counts) + def.annualCostM > state.annualBudgetM) return false;
  // Check op prerequisites
  for (const reqId of def.requires) {
    if ((counts[reqId]?.active ?? 0) === 0) return false;
  }
  // Check material build cost
  for (const cost of def.buildCost) {
    if ((state.resources[cost.resource] ?? 0) < cost.amount) return false;
  }
  return true;
}

/** True if an idle built unit can be activated (budget check only) */
export function selectCanActivate(state: GameState, opId: string): boolean {
  const def = OPERATIONS_BY_ID[opId];
  if (!def) return false;
  const counts = state.operationCounts;
  const current = counts[opId] ?? { built: 0, active: 0 };
  if (current.active >= current.built) return false;
  return annualCostUsed(counts) + def.annualCostM <= state.annualBudgetM;
}

export function selectOperationStatus(state: GameState, opId: string) {
  const def = OPERATIONS_BY_ID[opId];
  if (!def) return 'locked' as const;
  if (def.unlocksAtPhase > state.currentPhase) return 'locked' as const;
  if (def.requiresResearch && !state.unlockedResearch.includes(def.requiresResearch)) return 'locked' as const;
  const counts = state.operationCounts[opId] ?? { built: 0, active: 0 };
  if (counts.active > 0) return 'active' as const;
  if (counts.built > 0)  return 'idle' as const;
  return 'available' as const;
}

export function selectCanPurchaseResearch(state: GameState, researchId: string): boolean {
  const def = RESEARCH_BY_ID[researchId];
  if (!def) return false;
  if (state.unlockedResearch.includes(researchId)) return false;
  if (!researchPrereqsMet(researchId, state.unlockedResearch)) return false;
  return state.resources.rp >= def.rpCost;
}

export { RESEARCH_DEFS, RESEARCH_BY_ID };
