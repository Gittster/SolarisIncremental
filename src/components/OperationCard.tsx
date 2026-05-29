import type { OperationDef, BuildCost } from '../types';
import {
  useGameStore, selectBudgetUsed, selectCanBuild,
  selectCanActivate, selectOperationStatus,
} from '../store/gameStore';
import { OPERATIONS_BY_ID, RESEARCH_BY_ID } from '../game/definitions';
import { InfoBox } from './InfoBox';

interface Props {
  def: OperationDef;
}

function fmtAmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000)    return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

const RES_LABEL: Record<string, string> = {
  steel: 'Steel', carbon: 'Carbon', aluminum: 'Aluminum', silicon: 'Silicon',
  ree: 'REE', methalox: 'Methalox', cntCable: 'CNT Cable', avionics: 'Avionics',
  structural: 'Structural', solarPanels: 'Solar Panels', lifeSupport: 'Life Support', rp: 'RP',
};

function BuildCostRow({ cost, have }: { cost: BuildCost; have: number }) {
  const ok = have >= cost.amount;
  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-[10px] shrink-0 ${ok ? 'text-success' : 'text-text-dim'}`}>
        {ok ? '✓' : '○'}
      </span>
      <span className={`font-data text-[11px] tabular-nums ${ok ? 'text-text-secondary' : 'text-text-dim'}`}>
        {fmtAmt(cost.amount)} {RES_LABEL[cost.resource] ?? cost.resource}
      </span>
      {!ok && (
        <span className="font-data text-[9px] text-text-dim tabular-nums ml-auto">
          have {fmtAmt(Math.floor(have))}
        </span>
      )}
    </div>
  );
}

function IncrementButton({ label, onClick, disabled }: {
  label: string; onClick: () => void; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'w-7 h-7 rounded flex items-center justify-center text-sm font-body font-medium',
        'border transition-all duration-100 active:scale-95 select-none',
        disabled
          ? 'border-border/40 text-border cursor-not-allowed'
          : 'border-border text-text-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/5',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

export function OperationCard({ def }: Props) {
  const counts           = useGameStore(s => s.operationCounts[def.id] ?? { built: 0, active: 0 });
  const status           = useGameStore(s => selectOperationStatus(s, def.id));
  const canBuild         = useGameStore(s => selectCanBuild(s, def.id));
  const canActivate      = useGameStore(s => selectCanActivate(s, def.id));
  const budgetUsed       = useGameStore(selectBudgetUsed);
  const annualBudget     = useGameStore(s => s.annualBudgetM);
  const allCounts        = useGameStore(s => s.operationCounts);
  const resources        = useGameStore(s => s.resources);
  const unlockedResearch = useGameStore(s => s.unlockedResearch);
  const buildOperation      = useGameStore(s => s.buildOperation);
  const incrementActive     = useGameStore(s => s.incrementActive);
  const decrementActive     = useGameStore(s => s.decrementActive);

  const isActive    = status === 'active';
  const isIdle      = status === 'idle';
  const isAvailable = status === 'available';

  const hasBuilt   = counts.built > 0;
  const idleCount  = counts.built - counts.active;
  const displayMult = counts.active > 0 ? counts.active : 0;
  const atMax = counts.built >= def.maxInstances;

  const researchDef  = def.requiresResearch ? RESEARCH_BY_ID[def.requiresResearch] : null;
  const researchDone = def.requiresResearch ? unlockedResearch.includes(def.requiresResearch) : true;

  // Check whether each op prerequisite is met
  const opPrereqsMet = def.requires.every(id => (allCounts[id]?.active ?? 0) > 0);

  // Affordable build cost check per material
  const buildCostItems = def.buildCost.map(cost => ({
    cost,
    have: resources[cost.resource] ?? 0,
    ok: (resources[cost.resource] ?? 0) >= cost.amount,
  }));
  const buildCostOk = buildCostItems.every(b => b.ok);

  return (
    <div
      className={[
        'bg-surface rounded-lg border p-4 flex flex-col gap-3 transition-colors duration-200',
        isActive ? 'border-border hover:border-primary/40' : '',
        isIdle   ? 'border-warning/30' : '',
        isAvailable ? 'border-border/50' : '',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
              isActive ? 'bg-success animate-pulse' : isIdle ? 'bg-warning' : 'bg-border'
            }`} />
            <span className="font-body text-[13px] font-medium text-text-primary">{def.name}</span>
            {counts.active > 0 && (
              <span className="font-data text-[10px] text-success bg-success/10 rounded px-1.5 py-0.5">
                {counts.active} active
              </span>
            )}
            {idleCount > 0 && (
              <span className="font-data text-[10px] text-warning bg-warning/10 rounded px-1.5 py-0.5">
                {idleCount} idle
              </span>
            )}
          </div>
          <p className="font-body text-[11px] text-text-dim leading-snug">{def.description}</p>
        </div>

        <div className="flex items-start gap-1.5 shrink-0">
          <div className="text-right">
            <div className="font-data text-[11px] tabular-nums text-text-secondary">
              ${def.annualCostM}M/yr
            </div>
            {counts.active > 1 && (
              <div className="font-data text-[9px] tabular-nums text-text-dim">
                total ${(def.annualCostM * counts.active).toLocaleString()}M
              </div>
            )}
          </div>
          <InfoBox content={def.tooltip} />
        </div>
      </div>

      {/* Outputs / Inputs */}
      <div className="space-y-1">
        {def.outputs.map(o => (
          <div key={o.resource} className="flex items-center gap-1.5">
            <span className="text-success text-[10px] font-data w-3">+</span>
            <span className={`font-data text-[11px] tabular-nums ${displayMult > 0 ? 'text-success' : 'text-text-dim'}`}>
              {fmtAmt(o.annualAmount * (displayMult || 1))}/yr
            </span>
            <span className="font-body text-[10px] text-text-dim">{RES_LABEL[o.resource] ?? o.resource}</span>
            {displayMult > 1 && (
              <span className="font-data text-[9px] text-text-dim tabular-nums ml-auto">x{displayMult}</span>
            )}
          </div>
        ))}
        {def.inputs.map(inp => (
          <div key={inp.resource} className="flex items-center gap-1.5">
            <span className="text-critical text-[10px] font-data w-3">-</span>
            <span className={`font-data text-[11px] tabular-nums ${displayMult > 0 ? 'text-text-secondary' : 'text-text-dim'}`}>
              {fmtAmt(inp.annualAmount * (displayMult || 1))}/yr
            </span>
            <span className="font-body text-[10px] text-text-dim">{RES_LABEL[inp.resource] ?? inp.resource}</span>
          </div>
        ))}
      </div>

      {/* Built: active incrementer + build button */}
      {hasBuilt && (
        <div className="pt-2 border-t border-border/40 space-y-2">
          {/* Incrementer row */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <IncrementButton
                label="-"
                onClick={() => decrementActive(def.id)}
                disabled={counts.active === 0}
              />
              <div className="text-center min-w-[2rem]">
                <div className="font-data text-sm tabular-nums text-text-primary leading-none">
                  {counts.active}
                </div>
                <div className="font-body text-[9px] text-text-dim leading-none mt-0.5">active</div>
              </div>
              <IncrementButton
                label="+"
                onClick={() => incrementActive(def.id)}
                disabled={!canActivate}
              />
            </div>

            <div className="text-text-dim font-body text-[10px]">
              of {counts.built} built
            </div>

            <div className="ml-auto flex items-center gap-1">
              {!atMax && (
                <button
                  onClick={() => buildOperation(def.id)}
                  disabled={!canBuild}
                  className={[
                    'text-[11px] font-body font-medium py-1 px-2.5 rounded border transition-all duration-150 active:scale-[0.97]',
                    canBuild
                      ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 hover:border-primary/60'
                      : 'bg-surface-raise text-text-dim border-border cursor-not-allowed',
                  ].join(' ')}
                >
                  + Build
                </button>
              )}
              {atMax && (
                <span className="text-[10px] font-body text-text-dim">max {def.maxInstances}</span>
              )}
            </div>
          </div>

          {/* Build cost for next unit (only when build button shown) */}
          {!atMax && def.buildCost.length > 0 && (
            <div className="space-y-0.5">
              <div className="font-body text-[9px] text-text-dim uppercase tracking-wider mb-1">
                Build cost
              </div>
              {buildCostItems.map(({ cost, have }) => (
                <BuildCostRow key={cost.resource} cost={cost} have={have} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Nothing built yet: requirements + build button */}
      {isAvailable && (
        <div className="pt-2 border-t border-border/40 space-y-2">
          {/* Research and op prereqs */}
          {(researchDef || def.requires.length > 0) && (
            <div className="space-y-0.5">
              {researchDef && (
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] shrink-0 ${researchDone ? 'text-success' : 'text-text-dim'}`}>
                    {researchDone ? '✓' : '○'}
                  </span>
                  <span className={`font-body text-[11px] ${researchDone ? 'text-text-secondary' : 'text-text-dim'}`}>
                    Research: {researchDef.name}
                  </span>
                </div>
              )}
              {def.requires.map(reqId => {
                const reqDef = OPERATIONS_BY_ID[reqId];
                const met = (allCounts[reqId]?.active ?? 0) > 0;
                return (
                  <div key={reqId} className="flex items-center gap-1.5">
                    <span className={`text-[10px] shrink-0 ${met ? 'text-success' : 'text-text-dim'}`}>
                      {met ? '✓' : '○'}
                    </span>
                    <span className={`font-body text-[11px] ${met ? 'text-text-secondary' : 'text-text-dim'}`}>
                      {reqDef?.name ?? reqId} running
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Material build cost */}
          {def.buildCost.length > 0 && (
            <div className="space-y-0.5">
              <div className="font-body text-[9px] text-text-dim uppercase tracking-wider mb-1">
                Construction cost
              </div>
              {buildCostItems.map(({ cost, have }) => (
                <BuildCostRow key={cost.resource} cost={cost} have={have} />
              ))}
            </div>
          )}

          <button
            onClick={() => buildOperation(def.id)}
            disabled={!canBuild}
            className={[
              'w-full text-[12px] font-body font-semibold py-2 px-4 rounded border transition-all duration-150 active:scale-[0.98]',
              canBuild
                ? 'bg-primary text-bg border-transparent hover:bg-primary/80 shadow-[0_0_12px_rgba(74,158,255,0.2)]'
                : 'bg-surface-raise text-text-dim border-border cursor-not-allowed',
            ].join(' ')}
          >
            Build
          </button>
        </div>
      )}
    </div>
  );
}
