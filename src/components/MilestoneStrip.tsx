import { useGameStore } from '../store/gameStore';
import { Tooltip } from './Tooltip';

const ELEVATOR_COMPONENTS = [
  {
    resource: 'cntCable',
    label: 'CNT Cable',
    target: 1000,
    unit: 'km',
    tooltip: 'The tether — the entire mission revolves around this. A single-wall CNT cable must run 36,000 km from the equatorial anchor to the geosynchronous counterweight. Required tensile strength: ~50 GPa. We are producing cable at near-specification for the first time in history. Target: 1,000 km of primary tether stock.',
  },
  {
    resource: 'structural',
    label: 'Structural',
    target: 8000,
    unit: 't',
    tooltip: 'High-grade structural steel and aluminium components for the Earth anchor station, ocean platform, and geosynchronous counterweight module frame. The anchor must absorb 10 million tonnes of horizontal tether tension while resisting category-5 storm surge. Target: 8,000 tonnes of fabricated structural components.',
  },
  {
    resource: 'avionics',
    label: 'Avionics',
    target: 600,
    unit: 'units',
    tooltip: 'Radiation-hardened flight computers, IMUs, and command/telemetry systems for the climber vehicles and GEO station. Each unit undergoes 100 krad TID radiation testing and 10⁶-cycle vibration qualification. Climbers will traverse the Van Allen belts dozens of times per year — avionics failures are unacceptable. Target: 600 qualified units.',
  },
  {
    resource: 'solarPanels',
    label: 'Solar Panels',
    target: 800,
    unit: 'arrays',
    tooltip: 'Triple-junction GaInP/GaAs/Ge space photovoltaic arrays for the geosynchronous anchor station. At 270 W/m², achieving 500 MW continuous power requires ~1.85 km² of panel area — assembled robotically in GEO. Power drives station-keeping, climber drive systems, life support, and communications. Target: 800 panel arrays.',
  },
  {
    resource: 'lifeSupport',
    label: 'Life Support',
    target: 400,
    unit: 'modules',
    tooltip: 'ECLSS modules providing water recovery (93%+ loop closure), CO₂ removal via Sabatier reactor, and N₂/O₂ atmosphere management for the permanent anchor station crew of 12–24. At GEO altitude, every kilogram of resupply costs ~$20,000 — full loop closure turns a $200M/yr consumables bill into $5M/yr. Target: 400 life support modules.',
  },
] as const;

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1 bg-border/60 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

function barColor(pct: number): string {
  if (pct >= 100) return '#22C55E';
  if (pct >= 50)  return '#4A9EFF';
  if (pct >= 20)  return '#F59E0B';
  return '#EF4444';
}

export function MilestoneStrip() {
  const resources = useGameStore(s => s.resources);

  const progress = ELEVATOR_COMPONENTS.map(req => {
    const current = resources[req.resource] ?? 0;
    const pct = Math.min(100, (current / req.target) * 100);
    return { ...req, current, pct };
  });

  const overallPct = Math.floor(
    progress.reduce((sum, p) => sum + p.pct, 0) / progress.length
  );

  return (
    <div className="bg-surface-raise border-b border-border shrink-0">
      {/* ── Summary row ── */}
      <div className="flex items-center px-6 h-10 gap-4">
        <Tooltip
          content="The Space Elevator is the gateway to affordable access to space. A tether from Earth's equator to a geosynchronous counterweight at 36,000 km would allow climber vehicles to carry cargo to orbit for ~$50/kg — 100× cheaper than rockets. Tsiolkovsky first proposed it in 1895. Carbon nanotubes are the only known material strong enough to build it."
          side="bottom"
        >
          <div className="flex items-center gap-2 cursor-default">
            <span className="font-data text-[10px] uppercase tracking-widest text-text-dim">
              Milestone
            </span>
            <span className="font-body text-xs font-medium text-text-secondary">
              Space Elevator
            </span>
          </div>
        </Tooltip>

        <div className="flex items-center gap-2 w-36">
          <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${overallPct}%`, backgroundColor: barColor(overallPct) }}
            />
          </div>
          <span className="font-data text-[11px] tabular-nums text-text-secondary w-7 text-right">
            {overallPct}%
          </span>
        </div>

        <div className="h-3.5 w-px bg-border ml-1" />

        {/* Component mini-pills */}
        <div className="flex items-center gap-4">
          {progress.map(p => (
            <Tooltip key={p.resource} content={p.tooltip} side="bottom">
              <div className="flex items-center gap-1.5 cursor-default">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: barColor(p.pct) }}
                />
                <span className="font-body text-[10px] text-text-dim whitespace-nowrap">
                  {p.label}
                </span>
                <span className="font-data text-[10px] tabular-nums" style={{ color: barColor(p.pct) }}>
                  {Math.floor(p.pct)}%
                </span>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* ── Per-component progress bars ── */}
      <div className="grid grid-cols-5 gap-3 px-6 pb-3">
        {progress.map(p => (
          <Tooltip key={p.resource} content={p.tooltip} side="bottom">
            <div className="space-y-1 cursor-default">
              <div className="flex items-center justify-between">
                <span className="font-body text-[10px] text-text-dim">{p.label}</span>
                <span className="font-data text-[9px] tabular-nums text-text-dim">
                  {Math.floor(p.current).toLocaleString()}/{p.target.toLocaleString()}
                </span>
              </div>
              <ProgressBar pct={p.pct} color={barColor(p.pct)} />
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
