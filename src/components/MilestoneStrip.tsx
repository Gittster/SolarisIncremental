import { useGameStore } from '../store/gameStore';

// Space Elevator requirements (Phase 0 goal)
const ELEVATOR_REQUIREMENTS = [
  { resource: 'cntCable',    label: 'CNT Cable',    target: 1000 },
  { resource: 'structural',  label: 'Structural',   target: 8000 },
  { resource: 'avionics',    label: 'Avionics',     target: 600  },
  { resource: 'solarPanels', label: 'Solar Panels', target: 800  },
  { resource: 'lifeSupport', label: 'Life Support', target: 400  },
];

export function MilestoneStrip() {
  const resources = useGameStore(s => s.resources);

  const progress = ELEVATOR_REQUIREMENTS.map(req => ({
    ...req,
    current: resources[req.resource as keyof typeof resources] ?? 0,
    pct: Math.min(100, ((resources[req.resource as keyof typeof resources] ?? 0) / req.target) * 100),
  }));

  const overallPct = Math.floor(
    progress.reduce((sum, p) => sum + p.pct, 0) / progress.length
  );

  // find the bottleneck (lowest pct)
  const bottleneck = [...progress].sort((a, b) => a.pct - b.pct)[0];

  return (
    <div className="h-12 bg-surface-raise border-b border-border flex items-center px-6 gap-6 shrink-0">
      <div className="flex items-center gap-2">
        <span className="font-data text-[10px] uppercase tracking-widest text-text-dim">
          Milestone
        </span>
        <span className="font-body text-xs text-text-secondary">
          Space Elevator
        </span>
      </div>

      <div className="flex items-center gap-1 flex-1 max-w-md">
        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <span className="font-data text-[11px] tabular-nums text-primary w-8 text-right">
          {overallPct}%
        </span>
      </div>

      {bottleneck.pct < 100 && (
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="text-warning">⚠</span>
          <span className="font-body text-text-dim">Bottleneck:</span>
          <span className="font-data text-warning">{bottleneck.label}</span>
          <span className="font-data text-text-dim tabular-nums">
            {Math.floor(bottleneck.current).toLocaleString()}/{bottleneck.target.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
