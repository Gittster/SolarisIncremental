export type PhaseId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ResourceKey =
  | 'steel'
  | 'carbon'
  | 'aluminum'
  | 'silicon'
  | 'ree'
  | 'methalox'
  | 'cntCable'
  | 'avionics'
  | 'structural'
  | 'solarPanels'
  | 'lifeSupport'
  | 'rp';

export type OperationStatus = 'running' | 'mothballed' | 'available' | 'locked';

export interface OperationCount {
  running: number;
  mothballed: number;
}

export interface ResourceDelta {
  resource: ResourceKey;
  annualAmount: number;
}

export interface OperationDef {
  id: string;
  name: string;
  description: string;
  /** Scientific significance shown on hover */
  tooltip: string;
  category: 'extraction' | 'manufacturing' | 'rd';
  annualCostM: number;
  outputs: ResourceDelta[];
  inputs: ResourceDelta[];
  /** operation ids that must have ≥1 running */
  requires: string[];
  /** research id that must be completed before this can be built */
  requiresResearch?: string;
  unlocksAtPhase: PhaseId;
  maxInstances: number;
}

export interface ResearchDef {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  rpCost: number;
  /** other research ids that must be completed first */
  requires: string[];
  /** operation ids this unlocks */
  unlocks: string[];
}

export interface ModalData {
  id: string;
  type: 'intro' | 'research' | 'resource';
  title: string;
  subtitle?: string;
  body: string;
}

export interface GameState {
  currentPhase: PhaseId;
  gameMonth: number;
  lastTick: number;
  annualBudgetM: number;
  operationCounts: Record<string, OperationCount>;
  resources: Record<ResourceKey, number>;
  unlockedResearch: string[];
  seenIntro: boolean;
  pendingModals: ModalData[];
}
