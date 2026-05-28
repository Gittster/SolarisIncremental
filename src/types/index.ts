export type PhaseId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ResourceType = 'energy' | 'materials' | 'rp';

export type AlertLevel = 'none' | 'warning' | 'critical';

export type CrewRole = 'engineer' | 'scientist' | 'pilot' | 'specialist';

export interface FacilityIO {
  resource: ResourceType;
  /** Base rate per second at 100% efficiency. Energy in MW, others in units/s. */
  rate: number;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  /** 0–100, recomputed each tick from crew ratio */
  efficiency: number;
  inputs: FacilityIO[];
  outputs: FacilityIO[];
  crewRequired: number;
  crewAssigned: number;
  isActive: boolean;
  alertLevel: AlertLevel;
  alertMessage: string;
}

export interface CrewMember {
  id: string;
  name: string;
  role: CrewRole;
  /** facility id, or null for standby */
  assignedTo: string | null;
}

export interface EnergyState {
  /** Total MW currently generated across all facilities */
  generation: number;
  /** Total MW currently drawn by all facilities */
  draw: number;
}

export interface StockpileResource {
  amount: number;
  cap: number;
  /** Net units per second after efficiency; recomputed each tick */
  rate: number;
}

export interface GameState {
  currentPhase: PhaseId;
  /** Cumulative in-game seconds elapsed */
  gameTime: number;
  /** Date.now() at the last tick */
  lastTick: number;

  energy: EnergyState;
  materials: StockpileResource;
  rp: StockpileResource;

  facilities: Facility[];
  crew: CrewMember[];
}
