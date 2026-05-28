export type PhaseId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ResourceKey =
  | 'steel'
  | 'carbon'
  | 'aluminum'
  | 'silicon'
  | 'ree'         // rare earth elements
  | 'methalox'    // methane/LOX propellant
  | 'cntCable'    // carbon nanotube cable
  | 'avionics'
  | 'structural'
  | 'solarPanels'
  | 'lifeSupport'
  | 'rp';         // research points

export type OperationStatus = 'running' | 'mothballed' | 'available' | 'locked';

export interface OperationCount {
  running: number;
  mothballed: number;
}

export interface ResourceDelta {
  resource: ResourceKey;
  /** per-year amount (positive = output, negative = input) */
  annualAmount: number;
}

export interface OperationDef {
  id: string;
  name: string;
  description: string;
  category: 'extraction' | 'manufacturing' | 'rd';
  /** Annual cost in $M */
  annualCostM: number;
  outputs: ResourceDelta[];
  inputs: ResourceDelta[];
  /** op ids that must have ≥1 running before this can be built */
  requires: string[];
  /** phase that unlocks this operation */
  unlocksAtPhase: PhaseId;
  maxInstances: number;
}

export interface GameState {
  currentPhase: PhaseId;
  /** Game date in months since start (month 0 = Jan 2025) */
  gameMonth: number;
  /** Date.now() at the last tick */
  lastTick: number;

  /** Annual government appropriation, $M */
  annualBudgetM: number;

  /** How many of each operation are running / mothballed */
  operationCounts: Record<string, OperationCount>;

  /** Resource stockpiles */
  resources: Record<ResourceKey, number>;
}
