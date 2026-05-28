import { useGameStore } from '../store/gameStore';
import { InfoBox } from './InfoBox';

export const ELEVATOR_COMPONENTS = [
  {
    resource: 'cntCable',
    label: 'CNT Cable',
    target: 1000,
    tooltip: 'The tether — the entire mission revolves around this. A single-wall CNT cable must run 36,000 km from the equatorial anchor to the geosynchronous counterweight. Required tensile strength: roughly 50 GPa. We are producing cable at near-specification for the first time in history.',
  },
  {
    resource: 'structural',
    label: 'Structural',
    target: 8000,
    tooltip: 'High-grade structural steel and aluminum components for the Earth anchor station, ocean platform, and geosynchronous counterweight module frame. The anchor must absorb 10 million tonnes of horizontal tether tension while resisting category-5 storm surge.',
  },
  {
    resource: 'avionics',
    label: 'Avionics',
    target: 600,
    tooltip: 'Radiation-hardened flight computers, IMUs, and command/telemetry systems for the climber vehicles and GEO station. Each unit undergoes 100 krad TID radiation testing and 1 million-cycle vibration qualification. Climbers traverse the Van Allen belts dozens of times per year.',
  },
  {
    resource: 'solarPanels',
    label: 'Solar Panels',
    target: 800,
    tooltip: 'Triple-junction GaInP/GaAs/Ge space photovoltaic arrays for the geosynchronous anchor station. At 270 W per square meter, achieving 500 MW continuous power requires roughly 1.85 square kilometers of panel area, assembled robotically in GEO over a 3-year construction window.',
  },
  {
    resource: 'lifeSupport',
    label: 'Life Support',
    target: 400,
    tooltip: 'ECLSS modules providing water recovery (93%+ loop closure), CO2 removal via Sabatier reactor, and atmosphere management for the permanent anchor station crew of 12-24. At GEO altitude, every kilogram of resupply costs roughly $20,000; full loop closure turns a $200 million per year consumables bill into $5 million.',
  },
] as const;

function barColor(pct: number): string {
  if (pct >= 100) return '#22C55E';
  if (pct >= 50)  return '#4A9EFF';
  if (pct >= 20)  return '#F59E0B';
  return '#EF4444';
}

export function MilestoneStrip() {
  const resources = useGameStore(s => s.resources);

  const progress = ELEVATOR_COMPONENTS.map(req => {
    const current = resources[req.resource as keyof typeof resources] ?? 0;
    const pct = Math.min(100, (current / req.target) * 100);
    return { ...req, current, pct };
  });

  const overallPct = Math.floor(
    progress.reduce((sum, p) => sum + p.pct, 0) / progress.length
  );

  return (
    <div className="bg-surface-raise border-b border-border shrink-0 px-6 py-2 flex items-center gap-6">
      {/* Label + info */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="font-data text-[10px] uppercase tracking-widest text-text-dim">Milestone</span>
        <span className="font-body text-xs font-medium text-text-secondary">Space Elevator</span>
        <InfoBox content="The space elevator has been theorized since 1895. Tsiolkovsky first proposed it; Arthur C. Clarke popularized it in The Fountains of Paradise (1979). The 2025 CNT breakthrough made it buildable for the first time. A completed elevator cuts the cost of reaching orbit from $10,000 per kilogram to roughly $50, changing the economics of the entire solar system." />
      </div>

      {/* Overall bar */}
      <div className="flex items-center gap-2 w-32 shrink-0">
        <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%`, backgroundColor: barColor(overallPct) }}
          />
        </div>
        <span className="font-data text-[11px] tabular-nums text-text-secondary w-6 text-right">
          {overallPct}%
        </span>
      </div>

      <div className="h-3 w-px bg-border" />

      {/* Per-component indicators */}
      <div className="flex items-center gap-5 flex-1">
        {progress.map(p => (
          <div key={p.resource} className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: barColor(p.pct) }}
            />
            <span className="font-body text-[10px] text-text-dim whitespace-nowrap">{p.label}</span>
            <span className="font-data text-[10px] tabular-nums" style={{ color: barColor(p.pct) }}>
              {Math.floor(p.pct)}%
            </span>
            <InfoBox content={p.tooltip} />
          </div>
        ))}
      </div>
    </div>
  );
}
