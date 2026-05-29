import type { GameState, ResourceKey } from '../types';

const ZERO_RESOURCES: Record<ResourceKey, number> = {
  steel: 0, carbon: 0, aluminum: 0, silicon: 0, ree: 0,
  methalox: 0, cntCable: 0, avionics: 0, structural: 0,
  solarPanels: 0, lifeSupport: 0, rp: 0,
};

export const INITIAL_STATE: GameState = {
  currentPhase: 0,
  gameMonth: 0,
  lastTick: Date.now(),
  annualBudgetM: 8400,
  operationCounts: {
    steel_mine:   { built: 1, active: 1 },
    research_lab: { built: 1, active: 1 },
  },
  resources: { ...ZERO_RESOURCES, steel: 1200, rp: 120 },
  unlockedResearch: [],
  seenIntro: false,
  pendingModals: [],
};
