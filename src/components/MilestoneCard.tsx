import { useGameStore } from '../store/gameStore';

const PHASE_NAMES: Record<number, string> = {
  0: 'The Launchpad Problem',
  1: 'Low Earth Orbit Economy',
  2: 'The Cislunar Highway',
  3: 'The Lunar Industrial Base',
  4: 'The Mars Transit Architecture',
  5: 'The Martian Frontier',
  6: 'The Asteroid Belt Economy',
  7: 'Outer System Reach',
  8: 'The Dyson Increment',
};

const PHASE_GATES: Record<number, { name: string; context: string }> = {
  0: {
    name: 'Space Elevator',
    context: 'A cable from Earth\'s surface to geostationary orbit — no rocket needed.',
  },
  1: {
    name: 'Space Tug Network',
    context: 'Autonomous ion-drive vehicles for orbital transfer and cargo logistics.',
  },
  2: {
    name: 'Lunar Mass Driver',
    context: 'Electromagnetic launcher making lunar material export essentially free.',
  },
  3: {
    name: 'Phobos Shipyard',
    context: 'Phobos as the Mars system\'s orbital shipyard for outer solar system missions.',
  },
};

export function MilestoneCard() {
  const phase = useGameStore(s => s.currentPhase);
  const gate  = PHASE_GATES[phase] ?? PHASE_GATES[0];

  // Phase 0 starting progress — will be wired to real requirements later
  const progress = 0;

  return (
    <div className="bg-surface border-b border-border px-4 py-3">
      {/* Phase label */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-text-dim text-[10px] font-data uppercase tracking-widest">
          Phase {phase} · Phase Gate
        </span>
        <span className="text-text-dim text-[10px] font-body">
          {PHASE_NAMES[phase]}
        </span>
      </div>

      {/* Gate name + progress */}
      <div className="flex items-center justify-between mb-1">
        <span className="font-display text-text-primary text-base font-bold tracking-tight">
          {gate.name}
        </span>
        <span className="font-data text-text-secondary text-xs tabular-nums ml-2 shrink-0">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-border rounded-full overflow-hidden mb-1.5">
        <div
          className="h-full rounded-full bg-primary transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Context line */}
      <p className="text-text-dim text-[10px] font-body italic leading-tight">
        {gate.context}
      </p>
    </div>
  );
}
