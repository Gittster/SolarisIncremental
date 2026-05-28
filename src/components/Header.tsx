import { useGameStore } from '../store/gameStore';

const PHASE_NAMES: Record<number, string> = {
  0: 'The Launchpad Problem',
  1: 'Low Earth Orbit',
  2: 'Cislunar Space',
  3: 'Lunar Surface',
  4: 'Mars Transit',
  5: 'Mars Surface',
  6: 'Belt Mining',
  7: 'Outer Planets',
  8: 'Interstellar',
};

function formatDate(gameMonth: number): string {
  const totalMonths = Math.floor(gameMonth);
  const year = 2025 + Math.floor(totalMonths / 12);
  const month = totalMonths % 12;
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${MONTHS[month]} ${year}`;
}

export function Header() {
  const phase = useGameStore(s => s.currentPhase);
  const gameMonth = useGameStore(s => s.gameMonth);

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center px-6 gap-6 shrink-0">
      <div className="flex items-center gap-3">
        <span className="font-display text-primary text-lg tracking-widest uppercase">
          Solaris
        </span>
        <span className="text-border text-lg">·</span>
        <span className="font-body text-text-secondary text-sm">
          Phase {phase}
        </span>
        <span className="font-body text-text-dim text-sm">—</span>
        <span className="font-body text-text-secondary text-sm">
          {PHASE_NAMES[phase]}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <span className="font-data text-text-dim text-xs tabular-nums">
          {formatDate(gameMonth)}
        </span>
      </div>
    </header>
  );
}
