import { OPERATION_DEFS } from '../game/definitions';
import type { OperationDef } from '../types';
import { OperationCard } from './OperationCard';

const CATEGORY_LABELS: Record<string, string> = {
  extraction:    'Extraction',
  manufacturing: 'Manufacturing',
  rd:            'Research & Development',
};

const CATEGORY_ORDER = ['extraction', 'manufacturing', 'rd'];

function groupByCategory(defs: OperationDef[]): Record<string, OperationDef[]> {
  const groups: Record<string, OperationDef[]> = {};
  for (const d of defs) {
    if (!groups[d.category]) groups[d.category] = [];
    groups[d.category].push(d);
  }
  return groups;
}

export function OperationsView() {
  const groups = groupByCategory(OPERATION_DEFS);

  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-8">
      {CATEGORY_ORDER.map(cat => {
        const defs = groups[cat];
        if (!defs?.length) return null;
        return (
          <section key={cat}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-body text-[11px] uppercase tracking-widest text-text-dim">
                {CATEGORY_LABELS[cat]}
              </h2>
              <div className="flex-1 h-px bg-border/40" />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3">
              {defs.map(def => (
                <OperationCard key={def.id} def={def} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
