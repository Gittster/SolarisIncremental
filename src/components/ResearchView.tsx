import { useGameStore, selectCanPurchaseResearch } from '../store/gameStore';
import { RESEARCH_DEFS, OPERATIONS_BY_ID } from '../game/definitions';
import type { ResearchDef } from '../types';
import { InfoBox } from './InfoBox';

function fmtNum(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toLocaleString();
}

function ResearchCard({ def }: { def: ResearchDef }) {
  const rp = useGameStore(s => s.resources.rp);
  const unlockedResearch = useGameStore(s => s.unlockedResearch);
  const purchaseResearch = useGameStore(s => s.purchaseResearch);
  const canPurchase = useGameStore(s => selectCanPurchaseResearch(s, def.id));

  const completed  = unlockedResearch.includes(def.id);
  const prereqsMet = def.requires.every(r => unlockedResearch.includes(r));
  const affordable = rp >= def.rpCost;
  const locked     = !prereqsMet;

  const unlockedOps = def.unlocks.map(id => OPERATIONS_BY_ID[id]).filter(Boolean);

  return (
    <div
      className={[
        'bg-surface rounded-lg border p-4 flex flex-col gap-3 transition-all duration-200',
        completed ? 'border-success/40 bg-success/5' : '',
        locked ? 'border-border/20 opacity-40' : 'border-border',
        !completed && !locked ? 'hover:border-border/80' : '',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              completed ? 'bg-success' : locked ? 'bg-border/40' : affordable ? 'bg-primary' : 'bg-warning'
            }`} />
            <span className="font-body text-[13px] font-medium text-text-primary">
              {def.name}
            </span>
          </div>
          <p className="font-body text-[11px] text-text-dim leading-snug">{def.description}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="text-right">
            <div className="font-data text-[12px] tabular-nums text-text-secondary">
              {fmtNum(def.rpCost)} RP
            </div>
            {!completed && !locked && (
              <div className={`font-data text-[9px] tabular-nums ${affordable ? 'text-success' : 'text-warning'}`}>
                have {fmtNum(Math.floor(rp))}
              </div>
            )}
          </div>
          <InfoBox content={def.tooltip} />
        </div>
      </div>

      {/* Unlocks */}
      {unlockedOps.length > 0 && (
        <div className="space-y-0.5">
          <div className="font-body text-[9px] uppercase tracking-wider text-text-dim mb-1">
            Unlocks
          </div>
          {unlockedOps.map(op => (
            <div key={op!.id} className="flex items-center gap-1.5">
              <span className="text-primary text-[10px]">+</span>
              <span className="font-body text-[11px] text-text-secondary">{op!.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Prerequisites */}
      {def.requires.length > 0 && (
        <div className="space-y-0.5 border-t border-border/40 pt-1.5">
          {def.requires.map(reqId => {
            const reqDef = RESEARCH_DEFS.find(r => r.id === reqId);
            const met = unlockedResearch.includes(reqId);
            return (
              <div key={reqId} className="flex items-center gap-1.5">
                <span className={`text-[10px] ${met ? 'text-success' : 'text-text-dim'}`}>
                  {met ? 'v' : 'o'}
                </span>
                <span className={`font-body text-[11px] ${met ? 'text-text-secondary' : 'text-text-dim'}`}>
                  {reqDef?.name ?? reqId}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Action */}
      <div className="mt-auto pt-1">
        {completed ? (
          <div className="flex items-center gap-1.5 text-success">
            <span className="text-[11px]">v</span>
            <span className="font-body text-[11px]">Completed</span>
          </div>
        ) : (
          <button
            onClick={() => purchaseResearch(def.id)}
            disabled={!canPurchase}
            className={[
              'w-full py-1.5 px-3 rounded text-[12px] font-body font-medium border transition-all duration-150 active:scale-[0.98]',
              canPurchase
                ? 'bg-primary text-bg border-transparent hover:bg-primary/80 shadow-[0_0_10px_rgba(74,158,255,0.2)]'
                : 'bg-surface-raise text-text-dim border-border cursor-not-allowed',
            ].join(' ')}
          >
            {locked ? 'Locked' : `Research — ${fmtNum(def.rpCost)} RP`}
          </button>
        )}
      </div>
    </div>
  );
}

function getTier(defId: string, memo: Map<string, number> = new Map()): number {
  if (memo.has(defId)) return memo.get(defId)!;
  const def = RESEARCH_DEFS.find(r => r.id === defId);
  if (!def || def.requires.length === 0) { memo.set(defId, 0); return 0; }
  const tier = 1 + Math.max(...def.requires.map(r => getTier(r, memo)));
  memo.set(defId, tier);
  return tier;
}

export function ResearchView() {
  const memo = new Map<string, number>();
  const tiers: ResearchDef[][] = [];
  for (const def of RESEARCH_DEFS) {
    const tier = getTier(def.id, memo);
    if (!tiers[tier]) tiers[tier] = [];
    tiers[tier].push(def);
  }

  const tierLabels = ['Foundational', 'Applied', 'Advanced', 'Cutting Edge'];

  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-8">
      {tiers.map((defs, tier) => (
        <section key={tier}>
          <div className="flex items-center gap-3 mb-4">
            <div className="font-data text-[9px] uppercase tracking-[0.15em] text-primary/70 bg-primary/10 border border-primary/20 rounded px-2 py-0.5">
              {tierLabels[tier] ?? `Tier ${tier}`}
            </div>
            <div className="flex-1 h-px bg-border/40" />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-3 items-start">
            {defs.map(def => (
              <ResearchCard key={def.id} def={def} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
