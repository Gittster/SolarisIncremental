import { useGameStore } from '../store/gameStore';

export type TabId = 'operations' | 'research';

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
  const total = Math.floor(gameMonth);
  const year = 2025 + Math.floor(total / 12);
  const month = total % 12;
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${MONTHS[month]} ${year}`;
}

interface Props {
  activeTab: TabId;
  onTabChange: (t: TabId) => void;
}

export function Header({ activeTab, onTabChange }: Props) {
  const phase = useGameStore(s => s.currentPhase);
  const gameMonth = useGameStore(s => s.gameMonth);
  const rp = useGameStore(s => s.resources.rp);
  const unlockedResearch = useGameStore(s => s.unlockedResearch);

  // Show a dot on Research tab when affordable research is available
  const researchAvailable = false; // computed downstream; simple indicator for now

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center px-6 gap-6 shrink-0">
      {/* Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="font-display text-primary text-base tracking-widest uppercase">
          Solaris
        </span>
        <span className="text-border">·</span>
        <span className="font-body text-text-dim text-xs">
          Ph.{phase} — {PHASE_NAMES[phase]}
        </span>
      </div>

      {/* Tab nav */}
      <nav className="flex items-center gap-1 ml-4">
        {(['operations', 'research'] as TabId[]).map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={[
              'px-4 py-1.5 rounded text-[12px] font-body capitalize transition-all duration-150',
              activeTab === tab
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'text-text-dim hover:text-text-secondary hover:bg-surface-raise border border-transparent',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Right side: date + RP */}
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="font-data text-[10px] text-text-dim uppercase tracking-wider">RP</span>
          <span className="font-data text-[12px] tabular-nums text-text-secondary">
            {Math.floor(rp).toLocaleString()}
          </span>
        </div>
        <span className="font-data text-text-dim text-xs tabular-nums">
          {formatDate(gameMonth)}
        </span>
      </div>
    </header>
  );
}
