import { useGameStore, selectBudgetUsed, selectAnnualRates, selectOperationStatus } from '../store/gameStore';
import { OPERATION_DEFS } from '../game/definitions';
import type { ResourceKey } from '../types';

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000)    return `${(n / 1_000).toFixed(1)}K`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(2)}K`;
  return Math.floor(n).toLocaleString();
}

function fmtRate(annualRate: number): string {
  if (annualRate === 0) return '';
  const sign = annualRate >= 0 ? '+' : '';
  if (Math.abs(annualRate) >= 1_000_000) return `${sign}${(annualRate / 1_000_000).toFixed(1)}M/yr`;
  if (Math.abs(annualRate) >= 10_000)    return `${sign}${(annualRate / 1_000).toFixed(1)}K/yr`;
  return `${sign}${Math.round(annualRate).toLocaleString()}/yr`;
}

const RESOURCE_GROUPS: { label: string; items: { key: ResourceKey; name: string }[] }[] = [
  {
    label: 'Raw Materials',
    items: [
      { key: 'steel',    name: 'Steel' },
      { key: 'carbon',   name: 'Carbon' },
      { key: 'aluminum', name: 'Aluminum' },
      { key: 'silicon',  name: 'Silicon' },
      { key: 'ree',      name: 'REE' },
      { key: 'methalox', name: 'Methalox' },
    ],
  },
  {
    label: 'Manufactured',
    items: [
      { key: 'cntCable',    name: 'CNT Cable' },
      { key: 'avionics',    name: 'Avionics' },
      { key: 'structural',  name: 'Structural' },
      { key: 'solarPanels', name: 'Solar Panels' },
      { key: 'lifeSupport', name: 'Life Support' },
    ],
  },
  {
    label: 'Research',
    items: [
      { key: 'rp', name: 'Research Points' },
    ],
  },
];

export function ResourcePanel() {
  const resources  = useGameStore(s => s.resources);
  const budgetM    = useGameStore(s => s.annualBudgetM);
  const budgetUsed = useGameStore(selectBudgetUsed);
  const rates      = useGameStore(selectAnnualRates);
  const storeState = useGameStore(s => s);

  const budgetPct  = Math.min(100, (budgetUsed / budgetM) * 100);
  const budgetFree = budgetM - budgetUsed;

  // A resource is visible if it has stockpile, has a rate, or any producing op is not locked
  function isVisible(key: ResourceKey): boolean {
    if ((resources[key] ?? 0) > 0) return true;
    if ((rates[key] ?? 0) !== 0) return true;
    return OPERATION_DEFS.some(op =>
      op.outputs.some(o => o.resource === key) &&
      selectOperationStatus(storeState, op.id) !== 'locked'
    );
  }

  return (
    <aside className="w-64 shrink-0 bg-surface border-r border-border flex flex-col overflow-y-auto">

      {/* Budget */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-body text-[11px] uppercase tracking-widest text-text-dim">
            Annual Budget
          </span>
          <span className="font-data text-[11px] tabular-nums text-text-secondary">
            ${budgetM.toLocaleString()}M
          </span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden mb-1.5">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${budgetPct}%`,
              backgroundColor: budgetPct > 90 ? '#EF4444' : budgetPct > 75 ? '#F59E0B' : '#4A9EFF',
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-data tabular-nums">
          <span className="text-text-dim">
            Used: <span className="text-text-secondary">${budgetUsed.toLocaleString()}M</span>
          </span>
          <span className={budgetFree < budgetM * 0.1 ? 'text-warning' : 'text-success'}>
            Free: ${budgetFree.toLocaleString()}M
          </span>
        </div>
      </div>

      {/* Resource groups */}
      <div className="flex-1 p-3 space-y-4">
        {RESOURCE_GROUPS.map(group => {
          const visibleItems = group.items.filter(({ key }) => isVisible(key));
          if (visibleItems.length === 0) return null;
          return (
            <div key={group.label}>
              <div className="font-body text-[10px] uppercase tracking-widest text-text-dim mb-1.5 px-1">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {visibleItems.map(({ key, name }) => {
                  const amount = resources[key] ?? 0;
                  const rate   = rates[key] ?? 0;
                  const rateStr = fmtRate(rate);
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded px-2 py-1 hover:bg-surface-raise transition-colors duration-150"
                    >
                      <span className={`font-body text-[11px] ${amount > 0 || rate !== 0 ? 'text-text-secondary' : 'text-text-dim'}`}>
                        {name}
                      </span>
                      <div className="flex flex-col items-end">
                        <span className={`font-data text-[11px] tabular-nums ${amount > 0 ? 'text-text-primary' : 'text-text-dim'}`}>
                          {fmtNum(amount)}
                        </span>
                        {rateStr && (
                          <span className={`font-data text-[9px] tabular-nums ${rate > 0 ? 'text-success' : 'text-critical'}`}>
                            {rateStr}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
