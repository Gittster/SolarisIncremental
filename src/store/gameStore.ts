import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameState, ResourceKey } from '../types';
import { INITIAL_STATE } from '../game/initialState';
import { OPERATIONS_BY_ID, OPERATION_DEFS } from '../game/definitions';

interface GameActions {
  tick: (now: number) => void;
  buildOperation: (opId: string) => void;
  mothballOperation: (opId: string) => void;
  reactivateOperation: (opId: string) => void;
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

/** Net annual amounts per resource from all running operations */
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
    for (const o of def.outputs) {
      rates[o.resource] += o.annualAmount * c.running;
    }
    for (const inp of def.inputs) {
      rates[inp.resource] -= inp.annualAmount * c.running;
    }
  }
  return rates;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      // ------------------------------------------------------------------
      // tick — called every ~500 ms. 1 real second = 1 game month.
      // ------------------------------------------------------------------
      tick: (now: number) => {
        const state = get();
        const deltaMs = Math.min(now - state.lastTick, 8 * 3600 * 1000);
        const deltaYears = deltaMs / 1000 / 12; // 1 real second = 1 game month = 1/12 year

        const rates = computeAnnualRates(state.operationCounts);
        const resources = { ...state.resources };
        for (const [key, rate] of Object.entries(rates) as [ResourceKey, number][]) {
          resources[key] = Math.max(0, resources[key] + rate * deltaYears);
        }

        const deltaMonths = deltaMs / 1000;
        set({
          lastTick: now,
          gameMonth: state.gameMonth + deltaMonths,
          resources,
        });
      },

      // ------------------------------------------------------------------
      // buildOperation — start one more instance of an operation
      // ------------------------------------------------------------------
      buildOperation: (opId: string) => {
        const state = get();
        const def = OPERATIONS_BY_ID[opId];
        if (!def) return;

        const counts = { ...state.operationCounts };
        const current = counts[opId] ?? { running: 0, mothballed: 0 };
        const totalInstances = current.running + current.mothballed;
        if (totalInstances >= def.maxInstances) return;

        const costUsed = annualCostUsed(counts) + def.annualCostM;
        if (costUsed > state.annualBudgetM) return;

        counts[opId] = { ...current, running: current.running + 1 };
        set({ operationCounts: counts });
      },

      // ------------------------------------------------------------------
      // mothballOperation — suspend one running instance (free, instant)
      // ------------------------------------------------------------------
      mothballOperation: (opId: string) => {
        set(state => {
          const counts = { ...state.operationCounts };
          const current = counts[opId];
          if (!current || current.running === 0) return {};
          counts[opId] = {
            running: current.running - 1,
            mothballed: current.mothballed + 1,
          };
          return { operationCounts: counts };
        });
      },

      // ------------------------------------------------------------------
      // reactivateOperation — bring one mothballed instance back online
      // ------------------------------------------------------------------
      reactivateOperation: (opId: string) => {
        set(state => {
          const counts = { ...state.operationCounts };
          const current = counts[opId];
          if (!current || current.mothballed === 0) return {};

          const def = OPERATIONS_BY_ID[opId];
          if (!def) return {};
          const costUsed = annualCostUsed(counts) + def.annualCostM;
          if (costUsed > state.annualBudgetM) return {};

          counts[opId] = {
            running: current.running + 1,
            mothballed: current.mothballed - 1,
          };
          return { operationCounts: counts };
        });
      },

      // ------------------------------------------------------------------
      resetGame: () => set({ ...INITIAL_STATE, lastTick: Date.now() }),
    }),
    {
      name: 'solaris-v2',
      version: 1,
    },
  ),
);

// ---------------------------------------------------------------------------
// Derived selectors (call outside store to avoid stale closure)
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

  const counts = state.operationCounts;
  const current = counts[opId] ?? { running: 0, mothballed: 0 };
  if (current.running + current.mothballed >= def.maxInstances) return false;

  const costAfter = annualCostUsed(counts) + def.annualCostM;
  if (costAfter > state.annualBudgetM) return false;

  for (const reqId of def.requires) {
    const req = counts[reqId];
    if (!req || req.running === 0) return false;
  }
  return true;
}

export function selectOperationStatus(state: GameState, opId: string) {
  const def = OPERATIONS_BY_ID[opId];
  if (!def) return 'locked' as const;
  if (def.unlocksAtPhase > state.currentPhase) return 'locked' as const;

  const counts = state.operationCounts[opId] ?? { running: 0, mothballed: 0 };
  if (counts.running > 0) return 'running' as const;
  if (counts.mothballed > 0) return 'mothballed' as const;
  return 'available' as const;
}

export function selectAllOperationDefs() {
  return OPERATION_DEFS;
}
