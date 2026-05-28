import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, ResourceKey, ModalData } from '../types';
import { INITIAL_STATE } from '../game/initialState';
import { OPERATIONS_BY_ID, OPERATION_DEFS, RESEARCH_BY_ID, RESEARCH_DEFS } from '../game/definitions';

interface GameActions {
  tick: (now: number) => void;
  buildOperation: (opId: string) => void;
  mothballOperation: (opId: string) => void;
  reactivateOperation: (opId: string) => void;
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
    if (def) total += def.annualCostM * c.running;
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
    if (c.running === 0) continue;
    const def = OPERATIONS_BY_ID[id];
    if (!def) continue;
    for (const o of def.outputs) rates[o.resource] += o.annualAmount * c.running;
    for (const inp of def.inputs) rates[inp.resource] -= inp.annualAmount * c.running;
  }
  return rates;
}

function researchIsUnlocked(researchId: string, unlockedResearch: string[]): boolean {
  const def = RESEARCH_BY_ID[researchId];
  if (!def) return false;
  return def.requires.every(req => unlockedResearch.includes(req));
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
        const deltaMs = Math.min(now - state.lastTick, 8 * 3600 * 1000);
        const deltaYears = deltaMs / 1000 / 12;

        const rates = computeAnnualRates(state.operationCounts);
        const resources = { ...state.resources };
        for (const [key, rate] of Object.entries(rates) as [ResourceKey, number][]) {
          resources[key] = Math.max(0, resources[key] + rate * deltaYears);
        }

        const updates: Partial<GameState> = {
          lastTick: now,
          gameMonth: state.gameMonth + deltaMs / 1000,
          resources,
        };

        // Trigger intro modal on first tick
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

      buildOperation: (opId: string) => {
        const state = get();
        const def = OPERATIONS_BY_ID[opId];
        if (!def) return;

        const counts = { ...state.operationCounts };
        const current = counts[opId] ?? { running: 0, mothballed: 0 };
        if (current.running + current.mothballed >= def.maxInstances) return;
        if (annualCostUsed(counts) + def.annualCostM > state.annualBudgetM) return;
        if (def.requiresResearch && !state.unlockedResearch.includes(def.requiresResearch)) return;
        for (const reqId of def.requires) {
          if ((counts[reqId]?.running ?? 0) === 0) return;
        }

        counts[opId] = { ...current, running: current.running + 1 };
        set({ operationCounts: counts });
      },

      mothballOperation: (opId: string) => {
        set(state => {
          const counts = { ...state.operationCounts };
          const current = counts[opId];
          if (!current || current.running === 0) return {};
          counts[opId] = { running: current.running - 1, mothballed: current.mothballed + 1 };
          return { operationCounts: counts };
        });
      },

      reactivateOperation: (opId: string) => {
        set(state => {
          const counts = { ...state.operationCounts };
          const current = counts[opId];
          if (!current || current.mothballed === 0) return {};
          const def = OPERATIONS_BY_ID[opId];
          if (!def) return {};
          if (annualCostUsed(counts) + def.annualCostM > state.annualBudgetM) return {};
          counts[opId] = { running: current.running + 1, mothballed: current.mothballed - 1 };
          return { operationCounts: counts };
        });
      },

      purchaseResearch: (researchId: string) => {
        const state = get();
        const def = RESEARCH_BY_ID[researchId];
        if (!def) return;
        if (state.unlockedResearch.includes(researchId)) return;
        if (!researchIsUnlocked(researchId, state.unlockedResearch)) return;
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

        set(state => ({
          resources: { ...state.resources, rp: state.resources.rp - def.rpCost },
          unlockedResearch: [...state.unlockedResearch, researchId],
          pendingModals: [...state.pendingModals, modal],
        }));
      },

      dismissModal: () => {
        set(state => ({ pendingModals: state.pendingModals.slice(1) }));
      },

      markIntroSeen: () => set({ seenIntro: true }),

      resetGame: () => set({ ...INITIAL_STATE, lastTick: Date.now() }),
    }),
    { name: 'solaris-v3', version: 1 },
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

export function selectCanBuild(state: GameState, opId: string): boolean {
  const def = OPERATIONS_BY_ID[opId];
  if (!def) return false;
  if (def.unlocksAtPhase > state.currentPhase) return false;
  if (def.requiresResearch && !state.unlockedResearch.includes(def.requiresResearch)) return false;
  const counts = state.operationCounts;
  const current = counts[opId] ?? { running: 0, mothballed: 0 };
  if (current.running + current.mothballed >= def.maxInstances) return false;
  if (annualCostUsed(counts) + def.annualCostM > state.annualBudgetM) return false;
  for (const reqId of def.requires) {
    if ((counts[reqId]?.running ?? 0) === 0) return false;
  }
  return true;
}

export function selectOperationStatus(state: GameState, opId: string) {
  const def = OPERATIONS_BY_ID[opId];
  if (!def) return 'locked' as const;
  if (def.unlocksAtPhase > state.currentPhase) return 'locked' as const;
  if (def.requiresResearch && !state.unlockedResearch.includes(def.requiresResearch)) return 'locked' as const;
  const counts = state.operationCounts[opId] ?? { running: 0, mothballed: 0 };
  if (counts.running > 0) return 'running' as const;
  if (counts.mothballed > 0) return 'mothballed' as const;
  return 'available' as const;
}

export function selectCanPurchaseResearch(state: GameState, researchId: string): boolean {
  const def = RESEARCH_BY_ID[researchId];
  if (!def) return false;
  if (state.unlockedResearch.includes(researchId)) return false;
  if (!researchIsUnlocked(researchId, state.unlockedResearch)) return false;
  return state.resources.rp >= def.rpCost;
}

export { RESEARCH_DEFS, RESEARCH_BY_ID };
