import { useGameStore } from '../store/gameStore';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

function fmtNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 10_000)    return (n / 1_000).toFixed(1) + 'K';
  return Math.floor(n).toLocaleString();
}

/** Convert internal /s rate → display /hr string */
function fmtRate(ratePerSecond: number): string {
  const hr = ratePerSecond * 3600;
  if (Math.abs(hr) < 1) return '< 1/hr';
  const sign = hr >= 0 ? '+' : '';
  if (Math.abs(hr) >= 1_000_000) return `${sign}${(hr / 1_000_000).toFixed(1)}M/hr`;
  if (Math.abs(hr) >= 10_000)    return `${sign}${(hr / 1_000).toFixed(1)}K/hr`;
  return `${sign}${Math.round(hr).toLocaleString()}/hr`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function EnergyRow() {
  const { generation, draw } = useGameStore(s => s.energy);
  const net       = generation - draw;
  const utilPct   = generation > 0 ? Math.min(100, (draw / generation) * 100) : 0;
  const surplus   = net >= 0;
  const tight     = generation > 0 && net / generation < 0.15;

  const statusLabel = net > 0.05 ? 'SURPLUS' : net < -0.05 ? 'BROWNOUT' : 'NOMINAL';
  const statusColor = net > 0.05 ? 'text-success' : net < -0.05 ? 'text-critical' : 'text-warning';
  const barColor    = net > 0.05
    ? 'bg-success'
    : tight
    ? 'bg-warning'
    : net < -0.05
    ? 'bg-critical'
    : 'bg-primary';

  return (
    <div className="flex items-start gap-3">
      {/* Icon + label */}
      <div className="flex items-center gap-1.5 w-20 shrink-0 pt-0.5">
        <span className="text-text-dim text-sm">⚡</span>
        <span className="text-text-secondary text-xs uppercase tracking-wider font-body">Energy</span>
      </div>

      {/* Bar + numbers */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-data text-text-primary text-sm tabular-nums">
            {generation.toFixed(1)} MW
          </span>
          <span className={`font-data text-xs tabular-nums ${statusColor}`}>
            {statusLabel}
          </span>
        </div>

        {/* Utilization bar */}
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${utilPct}%` }}
          />
        </div>

        <div className="flex justify-between mt-1">
          <span className="text-text-dim text-xs font-data tabular-nums">
            draw {draw.toFixed(1)} MW
          </span>
          <span className={`text-xs font-data tabular-nums ${surplus ? 'text-success' : 'text-critical'}`}>
            {net >= 0 ? '+' : ''}{net.toFixed(1)} MW
          </span>
        </div>
      </div>
    </div>
  );
}

interface StockRowProps {
  icon: string;
  label: string;
  amount: number;
  rate: number;
  rateColor: string;
}

function StockRow({ icon, label, amount, rate, rateColor }: StockRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 w-20 shrink-0">
        <span className="text-text-dim text-sm">{icon}</span>
        <span className="text-text-secondary text-xs uppercase tracking-wider font-body">{label}</span>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <span className="font-data text-text-primary text-sm tabular-nums">
          {fmtNumber(amount)}
        </span>
        <span className={`font-data text-xs tabular-nums ${rateColor}`}>
          {fmtRate(rate)}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ResourceBar
// ---------------------------------------------------------------------------

export function ResourceBar() {
  const materials = useGameStore(s => s.materials);
  const rp        = useGameStore(s => s.rp);

  return (
    <div className="bg-surface border-b border-border px-4 py-3 space-y-3">
      <EnergyRow />

      <StockRow
        icon="📦"
        label="Materials"
        amount={materials.amount}
        rate={materials.rate}
        rateColor={materials.rate > 0 ? 'text-success' : 'text-text-dim'}
      />

      <StockRow
        icon="🔬"
        label="Research"
        amount={rp.amount}
        rate={rp.rate}
        rateColor={rp.rate > 0 ? 'text-primary' : 'text-text-dim'}
      />
    </div>
  );
}
