export type TabId = 'map' | 'base' | 'research' | 'contracts';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const TABS: Tab[] = [
  { id: 'map',       label: 'Map',       icon: '◎' },
  { id: 'base',      label: 'Base',      icon: '▦' },
  { id: 'research',  label: 'Research',  icon: '⬡' },
  { id: 'contracts', label: 'Contracts', icon: '⊟' },
];

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
}

export function BottomTabBar({ active, onChange }: Props) {
  return (
    <nav className="shrink-0 bg-surface border-t border-border">
      <div className="flex">
        {TABS.map(tab => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={[
                'flex-1 flex flex-col items-center justify-center gap-0.5',
                'py-2.5 min-h-[52px] transition-colors duration-150',
                isActive
                  ? 'text-primary'
                  : 'text-text-dim hover:text-text-secondary active:text-text-primary',
              ].join(' ')}
            >
              <span
                className="text-lg leading-none"
                style={{ fontFamily: 'monospace' }}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] font-body uppercase tracking-wider">
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
