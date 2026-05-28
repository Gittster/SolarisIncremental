import { useGameStore, selectAnnualRates } from '../store/gameStore';
import { ELEVATOR_COMPONENTS } from './MilestoneStrip';
import { InfoBox } from './InfoBox';
import type { ResourceKey } from '../types';

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 10_000)    return `${(n / 1_000).toFixed(1)}K`;
  return Math.floor(n).toLocaleString();
}

function calcETA(remaining: number, annualRate: number): string {
  if (remaining <= 0) return 'Complete';
  if (annualRate <= 0) return 'No production';
  const years = remaining / annualRate;
  const months = Math.round(years * 12);
  if (months < 1) return 'Less than 1 month';
  if (months === 1) return '1 month';
  if (months < 24) return `${months} months`;
  const y = Math.round(years * 10) / 10;
  return `${y} years`;
}

function barColor(pct: number): string {
  if (pct >= 100) return '#22C55E';
  if (pct >= 50)  return '#4A9EFF';
  if (pct >= 20)  return '#F59E0B';
  return '#EF4444';
}

function MilestoneRow({
  label, tooltip, current, target, annualRate, pct,
}: {
  label: string; tooltip: string; current: number;
  target: number; annualRate: number; pct: number;
}) {
  const remaining = Math.max(0, target - current);
  const eta = calcETA(remaining, annualRate);
  const color = barColor(pct);

  return (
    <div className="py-4 border-b border-border/40 last:border-b-0">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: color }} />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-body text-sm font-medium text-text-primary">{label}</span>
              <InfoBox content={tooltip} />
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-data text-[13px] tabular-nums" style={{ color }}>
            {Math.floor(pct)}%
          </div>
          <div className="font-data text-[10px] text-text-dim tabular-nums">
            {fmtNum(current)} / {target.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="h-1.5 bg-border/60 rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>

      <div className="flex items-center justify-between text-[10px] font-data tabular-nums">
        <span className="text-text-dim">
          Production:{' '}
          <span className={annualRate > 0 ? 'text-success' : 'text-text-dim'}>
            {annualRate > 0 ? `+${fmtNum(annualRate)}/yr` : 'None'}
          </span>
        </span>
        <span className={`${eta === 'Complete' ? 'text-success' : eta === 'No production' ? 'text-text-dim' : 'text-text-secondary'}`}>
          ETA: {eta}
        </span>
      </div>
    </div>
  );
}

export function ProjectsView() {
  const resources = useGameStore(s => s.resources);
  const rates     = useGameStore(selectAnnualRates);

  const progress = ELEVATOR_COMPONENTS.map(req => {
    const current = resources[req.resource as ResourceKey] ?? 0;
    const pct = Math.min(100, (current / req.target) * 100);
    const annualRate = rates[req.resource as ResourceKey] ?? 0;
    return { ...req, current, pct, annualRate };
  });

  const overallPct = Math.floor(
    progress.reduce((sum, p) => sum + p.pct, 0) / progress.length
  );

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Mission context card */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="font-data text-[9px] uppercase tracking-[0.2em] text-primary mb-2">
            Mission Context
          </div>
          <h2 className="font-display text-lg text-text-primary mb-3">
            Why now?
          </h2>
          <div className="space-y-3 text-[13px] font-body text-text-secondary leading-relaxed">
            <p>
              In March 2025, a joint MIT and National Carbon Research Institute team published results
              from a new plasma-assisted CVD process: bulk single-wall carbon nanotube yarn achieving
              48.3 GPa tensile strength. The theoretical minimum for a geosynchronous tether is
              around 50 GPa.
            </p>
            <p>
              For 130 years the space elevator existed only in theory. No material was strong enough.
              After the 2025 breakthrough, the gap closed to within striking distance for the first
              time in history. The International Space Elevator Consortium formed within 90 days.
            </p>
            <p>
              A completed elevator cuts the cost of reaching orbit from $10,000 per kilogram to
              roughly $50. That single number changes the economics of the entire solar system. The
              window is open. It will not stay open.
            </p>
          </div>
        </div>

        {/* Space Elevator project card */}
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          {/* Project header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-data text-[9px] uppercase tracking-[0.2em] text-primary mb-1">
                  Phase 0 Milestone Project
                </div>
                <h1 className="font-display text-2xl text-text-primary mb-1">Space Elevator</h1>
                <p className="font-body text-sm text-text-secondary">
                  A tether from Earth's equator to geosynchronous orbit at 36,000 km. Climber
                  vehicles ascend the cable at 200 km/h, delivering cargo at a fraction of rocket
                  costs.
                </p>
              </div>
              <div className="text-right shrink-0">
                <div
                  className="font-display text-4xl tabular-nums leading-none"
                  style={{ color: barColor(overallPct) }}
                >
                  {overallPct}%
                </div>
                <div className="font-body text-[11px] text-text-dim mt-1">complete</div>
              </div>
            </div>

            {/* Overall bar */}
            <div className="mt-4 h-2 bg-border/60 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${overallPct}%`, backgroundColor: barColor(overallPct) }}
              />
            </div>
          </div>

          {/* Component milestones */}
          <div className="px-6">
            <div className="font-body text-[10px] uppercase tracking-widest text-text-dim pt-4 pb-2">
              Required Components
            </div>
            {progress.map(p => (
              <MilestoneRow
                key={p.resource}
                label={p.label}
                tooltip={p.tooltip}
                current={p.current}
                target={p.target}
                annualRate={p.annualRate}
                pct={p.pct}
              />
            ))}
          </div>

          {/* What this unlocks */}
          <div className="px-6 py-4 bg-surface-raise border-t border-border">
            <div className="font-body text-[10px] uppercase tracking-widest text-text-dim mb-2">
              Completion Unlocks
            </div>
            <div className="flex items-center gap-2">
              <span className="font-data text-[10px] text-primary bg-primary/10 border border-primary/20 rounded px-2 py-0.5">
                Phase 1
              </span>
              <span className="font-body text-[12px] text-text-secondary">Low Earth Orbit operations</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
