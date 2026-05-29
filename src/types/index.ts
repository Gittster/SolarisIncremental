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

export type OperationStatus = 'active' | 'idle' | 'available' | 'locked';

export interface OperationCount {
  /** Total units constructed (paid for with materials) */
  built: number;
  /** Units currently running and consuming annual budget */
  active: number;
}

export interface ResourceDelta {
  resource: ResourceKey;
  annualAmount: number;
}

/** One-time material cost to construct one unit of an operation */
export interface BuildCost {
  resource: ResourceKey;
  amount: number;
}

export interface OperationDef {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  category: 'extraction' | 'manufacturing' | 'rd';
  /** Annual operating cost per active unit, $M */
  annualCostM: number;
  /** One-time material cost to construct one unit */
  buildCost: BuildCost[];
  outputs: ResourceDelta[];
  inputs: ResourceDelta[];
  requires: string[];
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
  requires: string[];
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
