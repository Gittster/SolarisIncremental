import { OPERATION_DEFS } from '../game/definitions';
import type { OperationDef } from '../types';
import { useGameStore, selectOperationStatus } from '../store/gameStore';
import { OperationCard } from './OperationCard';

const CATEGORY_LABELS: Record<string, string> = {
  extraction:    'Extraction',
  manufacturing: 'Manufacturing',
  rd:            'Research and Development',
};

const CATEGORY_ORDER = ['extraction', 'manufacturing', 'rd'];

export function OperationsView() {
  const operationCounts  = useGameStore(s => s.operationCounts);
  const unlockedResearch = useGameStore(s => s.unlockedResearch);
  const currentPhase     = useGameStore(s => s.currentPhase);

  // Compute status for each op using current store state (not via selector hook inside map)
  const storeState = useGameStore(s => s);

  const visibleByCategory: Record<string, OperationDef[]> = {};
  const lockedCountByCategory: Record<string, number> = {};

  for (const def of OPERATION_DEFS) {
    const status = selectOperationStatus(storeState, def.id);
    if (!visibleByCategory[def.category]) {
      visibleByCategory[def.category] = [];
      lockedCountByCategory[def.category] = 0;
    }
    if (status === 'locked') {
      lockedCountByCategory[def.category]++;
    } else {
      visibleByCategory[def.category].push(def);
    }
  }

  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-8">
      {CATEGORY_ORDER.map(cat => {
        const defs = visibleByCategory[cat] ?? [];
        const lockedCount = lockedCountByCategory[cat] ?? 0;
        if (defs.length === 0 && lockedCount === 0) return null;
        return (
          <section key={cat}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-body text-[11px] uppercase tracking-widest text-text-dim">
                {CATEGORY_LABELS[cat]}
              </h2>
              <div className="flex-1 h-px bg-border/40" />
            </div>

            {defs.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3 items-start">
                {defs.map(def => (
                  <OperationCard key={def.id} def={def} />
                ))}
              </div>
            ) : null}

            {lockedCount > 0 && (
              <div className={`font-body text-[11px] text-text-dim italic ${defs.length > 0 ? 'mt-3' : ''}`}>
                {lockedCount} more {lockedCount === 1 ? 'operation' : 'operations'} locked behind research
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
