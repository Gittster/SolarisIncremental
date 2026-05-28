import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AlertLevel, Facility, GameState } from '../types';
import { initialGameState } from '../game/initialState';

interface GameActions {
  tick: (now: number) => void;
  toggleFacility: (facilityId: string) => void;
  assignCrew: (crewId: string, facilityId: string | null) => void;
  resetGame: () => void;
}

export type GameStore = GameState & GameActions;

// ---------------------------------------------------------------------------
// Pure helpers (no side-effects, no store access)
// ---------------------------------------------------------------------------

function computeEfficiency(f: Facility): number {
  if (!f.isActive) return 0;
  if (f.crewRequired === 0) return 100;
  if (f.crewAssigned === 0) return 0;
  return Math.min(100, Math.round((f.crewAssigned / f.crewRequired) * 100));
}

function computeAlert(
  f: Facility,
  efficiency: number,
  powerBrownout: boolean,
): { alertLevel: AlertLevel; alertMessage: string } {
  if (!f.isActive) return { alertLevel: 'critical', alertMessage: 'Offline' };
  if (efficiency === 0) return { alertLevel: 'critical', alertMessage: 'No crew assigned' };
  if (efficiency < 50)  return { alertLevel: 'critical', alertMessage: `Crew: ${f.crewAssigned}/${f.crewRequired}` };
  if (efficiency < 100) return { alertLevel: 'warning',  alertMessage: `Crew: ${f.crewAssigned}/${f.crewRequired}` };
  if (powerBrownout && f.inputs.some(i => i.resource === 'energy'))
    return { alertLevel: 'warning', alertMessage: 'Power constrained' };
  return { alertLevel: 'none', alertMessage: '' };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialGameState,

      // ------------------------------------------------------------------
      // tick — called every ~500 ms by GameLoop
      // ------------------------------------------------------------------
      tick: (now: number) => {
        const state = get();

        if (state.lastTick === 0) {
          set({ lastTick: now });
          return;
        }

        // Cap delta at 8 hours so returning players aren't flooded
        const deltaMs = Math.min(now - state.lastTick, 8 * 3600 * 1000);
        const deltaS  = deltaMs / 1000;

        let totalGeneration = 0;
        let totalDraw       = 0;
        let matRate         = 0;
        let rpRate          = 0;

        // First pass — compute efficiency & aggregate resource flows
        const pass1 = state.facilities.map(f => {
          const efficiency = computeEfficiency(f);
          const eff = efficiency / 100;

          if (f.isActive) {
            for (const o of f.outputs) {
              if (o.resource === 'energy')    totalGeneration += o.rate * eff;
              if (o.resource === 'materials') matRate         += o.rate * eff;
              if (o.resource === 'rp')        rpRate          += o.rate * eff;
            }
            for (const i of f.inputs) {
              if (i.resource === 'energy') totalDraw += i.rate * eff;
            }
          }

          return { ...f, efficiency };
        });

        // Energy ratio — if < 1 we have a brownout; throttle dependent output
        const energyRatio = totalDraw > 0
          ? Math.min(1, totalGeneration / totalDraw)
          : 1;

        if (energyRatio < 1) {
          matRate *= energyRatio;
          rpRate  *= energyRatio;
        }

        const brownout = energyRatio < 1;

        // Second pass — resolve alerts with brownout knowledge
        const updatedFacilities = pass1.map(f => {
          const { alertLevel, alertMessage } = computeAlert(f, f.efficiency, brownout);
          return { ...f, alertLevel, alertMessage };
        });

        set({
          lastTick:  now,
          gameTime:  state.gameTime + deltaS,
          facilities: updatedFacilities,
          energy: { generation: totalGeneration, draw: totalDraw },
          materials: {
            ...state.materials,
            rate:   matRate,
            amount: Math.min(state.materials.cap, state.materials.amount + matRate * deltaS),
          },
          rp: {
            ...state.rp,
            rate:   rpRate,
            amount: Math.min(state.rp.cap, state.rp.amount + rpRate * deltaS),
          },
        });
      },

      // ------------------------------------------------------------------
      // toggleFacility — activate / deactivate a facility
      // ------------------------------------------------------------------
      toggleFacility: (facilityId: string) => {
        set(state => ({
          facilities: state.facilities.map(f =>
            f.id === facilityId ? { ...f, isActive: !f.isActive } : f,
          ),
        }));
      },

      // ------------------------------------------------------------------
      // assignCrew — move a crew member to a facility (or to standby)
      // ------------------------------------------------------------------
      assignCrew: (crewId: string, facilityId: string | null) => {
        set(state => {
          const crew = state.crew.map(c => {
            if (c.id !== crewId) return c;
            return { ...c, assignedTo: facilityId };
          });

          const member = state.crew.find(c => c.id === crewId);
          const facilities = state.facilities.map(f => {
            let count = f.crewAssigned;
            if (member?.assignedTo === f.id) count--;          // remove from old slot
            if (facilityId          === f.id) count++;          // add to new slot
            return { ...f, crewAssigned: Math.max(0, count) };
          });

          return { crew, facilities };
        });
      },

      // ------------------------------------------------------------------
      // resetGame — wipe to initial state (dev utility)
      // ------------------------------------------------------------------
      resetGame: () => set({ ...initialGameState, lastTick: Date.now() }),
    }),
    {
      name:    'solaris-v1',
      version: 1,
    },
  ),
);
