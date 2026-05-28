import { GameState } from '../types';

/**
 * Phase 0 starting state — The Launchpad Problem.
 *
 * Deliberate design choices:
 *  - Solar Array at 100% (1/1 crew) — demonstrates healthy state
 *  - Propellant Plant at 50% (1/2 crew) — demonstrates WARNING state
 *  - Research Complex at 100% (2/2 crew) — demonstrates healthy state
 *  - Launch Complex offline, 0 crew — demonstrates CRITICAL state
 *
 * Energy balance: +10 MW gen, −4.5 MW draw (propellant 50% + research) = +5.5 MW surplus
 * Materials rate: 1,200/hr × 50% = 600/hr at game start
 * RP rate: 120/hr at game start
 */
export const initialGameState: GameState = {
  currentPhase: 0,
  gameTime: 0,
  lastTick: 0,

  energy: { generation: 0, draw: 0 },

  materials: { amount: 800,  cap: 500_000, rate: 0 },
  rp:        { amount: 120,  cap: 100_000, rate: 0 },

  facilities: [
    {
      id: 'solar-array-1',
      name: 'Solar Array',
      description: 'Ground-mounted photovoltaic arrays. Baseline power for all operations.',
      efficiency: 100,
      inputs: [],
      outputs: [{ resource: 'energy', rate: 10 }],  // 10 MW
      crewRequired: 1,
      crewAssigned: 1,
      isActive: true,
      alertLevel: 'none',
      alertMessage: '',
    },
    {
      id: 'propellant-plant-1',
      name: 'Propellant Plant',
      description: 'Produces LOX/methane methalox propellant for launch operations.',
      efficiency: 50,
      inputs:  [{ resource: 'energy',    rate: 5 }],          // −5 MW
      outputs: [{ resource: 'materials', rate: 1200 / 3600 }], // 1,200/hr @ 100%
      crewRequired: 2,
      crewAssigned: 1,
      isActive: true,
      alertLevel: 'warning',
      alertMessage: 'Crew: 1/2',
    },
    {
      id: 'research-complex-1',
      name: 'Research Complex',
      description: 'Scientists advancing reusable launch vehicle technology.',
      efficiency: 100,
      inputs:  [{ resource: 'energy', rate: 2 }],           // −2 MW
      outputs: [{ resource: 'rp',     rate: 120 / 3600 }],  // 120/hr @ 100%
      crewRequired: 2,
      crewAssigned: 2,
      isActive: true,
      alertLevel: 'none',
      alertMessage: '',
    },
    {
      id: 'launch-complex-1',
      name: 'Launch Complex A',
      description: 'Primary orbital launch facility. Awaiting full crew assignment.',
      efficiency: 0,
      inputs:  [{ resource: 'energy', rate: 3 }], // −3 MW when active
      outputs: [],
      crewRequired: 4,
      crewAssigned: 0,
      isActive: false,
      alertLevel: 'critical',
      alertMessage: 'No crew assigned',
    },
  ],

  crew: [
    { id: 'crew-1', name: 'Chen, M.',       role: 'engineer',   assignedTo: 'solar-array-1'      },
    { id: 'crew-2', name: 'Rodriguez, E.',  role: 'engineer',   assignedTo: 'propellant-plant-1' },
    { id: 'crew-3', name: 'Okafor, A.',     role: 'scientist',  assignedTo: 'research-complex-1' },
    { id: 'crew-4', name: 'Kim, S.',        role: 'scientist',  assignedTo: 'research-complex-1' },
  ],
};
