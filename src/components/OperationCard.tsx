import type { OperationDef } from '../types';
import { useGameStore, selectBudgetUsed, selectCanBuild, selectOperationStatus } from '../store/gameStore';
import { OPERATIONS_BY_ID, RESEARCH_BY_ID } from '../game/definitions';
import { Tooltip } from './Tooltip';

interface Props {
  def: OperationDef;
}

function fmtAmount(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 10_000)    return `${(n / 1_000).toFixed(1)}K`;
  return Math.round(n).toLocaleString();
}

const RESOURCE_LABELS: Record<string, string> = {
  steel: 'Steel', carbon: 'Carbon', aluminum: 'Alum', silicon: 'Si',
  ree: 'REE', methalox: 'Methalox', cntCable: 'CNT Cable', avionics: 'Avionics',
  structural: 'Structural', solarPanels: 'Solar Panels', lifeSupport: 'Life Support', rp: 'RP',
};

export function OperationCard({ def }: Props) {
  const counts      = useGameStore(s => s.operationCounts[def.id] ?? { running: 0, mothballed: 0 });
  const status      = useGameStore(s => selectOperationStatus(s, def.id));
  const canBuild    = useGameStore(s => selectCanBuild(s, def.id));
  const budgetUsed  = useGameStore(selectBudgetUsed);
  const annualBudget = useGameStore(s => s.annualBudgetM);
  const allCounts   = useGameStore(s => s.operationCounts);
  const unlockedResearch = useGameStore(s => s.unlockedResearch);
  const buildOperation      = useGameStore(s => s.buildOperation);
  const mothballOperation   = useGameStore(s => s.mothballOperation);
  const reactivateOperation = useGameStore(s => s.reactivateOperation);

  const budgetAvailableForReactivate = annualBudget - budgetUsed;

  const isRunning    = counts.running > 0;
  const isMothballed = counts.mothballed > 0;
  const isLocked     = status === 'locked';
  const isAvailable  = !isRunning && !isMothballed && !isLocked;

  const totalInstances = counts.running + counts.mothballed;
  const atMax = totalInstances >= def.maxInstances;

  // Effective outputs scale with running count (for displaying actual throughput)
  const runningMultiplier = isRunning ? counts.running : 1;

  const researchDef = def.requiresResearch ? RESEARCH_BY_ID[def.requiresResearch] : null;
  const researchDone = def.requiresResearch ? unlockedResearch.includes(def.requiresResearch) : true;

  return (
    <Tooltip content={def.tooltip} side="top">
      <div
        className={[
          'bg-surface rounded-lg border p-4 flex flex-col gap-3 transition-all duration-200 h-full',
          isRunning && !isMothballed ? 'border-border hover:border-primary/40' : '',
          isRunning && isMothballed  ? 'border-border hover:border-primary/40' : '',
          !isRunning && isMothballed ? 'border-warning/30' : '',
          isAvailable ? 'border-border/60' : '',
          isLocked    ? 'border-border/20 opacity-40' : '',
        ].join(' ')}
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              {/* Status dot */}
              {isRunning && (
                <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0 animate-pulse" />
              )}
              {!isRunning && isMothballed && (
                <div className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
              )}
              {isAvailable && (
                <div className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
              )}
              {isLocked && (
                <div className="w-1.5 h-1.5 rounded-full bg-border/40 shrink-0" />
              )}

              <span className="font-body text-[13px] font-medium text-text-primary">
                {def.name}
              </span>

              {/* Instance count badges */}
              {isRunning && counts.running > 0 && (
                <span className="font-data text-[10px] text-success bg-success/10 rounded px-1.5 py-0.5">
                  {counts.running} running
                </span>
              )}
              {isMothballed && counts.mothballed > 0 && (
                <span className="font-data text-[10px] text-warning bg-warning/10 rounded px-1.5 py-0.5">
                  {counts.mothballed} mothballed
                </span>
              )}
            </div>
            <p className="font-body text-[11px] text-text-dim leading-snug">
              {def.description}
            </p>
          </div>

          {/* Cost */}
          <div className="text-right shrink-0">
            <div className="font-data text-[11px] tabular-nums text-text-secondary">
              ${def.annualCostM}M/yr
            </div>
            {counts.running > 1 && (
              <div className="font-data text-[10px] tabular-nums text-text-dim">
                total ${def.annualCostM * counts.running}M
              </div>
            )}
          </div>
        </div>

        {/* ── Outputs / Inputs ── */}
        <div className="space-y-1">
          {def.outputs.map(o => (
            <div key={o.resource} className="flex items-center gap-1.5">
              <span className="text-success text-[10px] font-data w-3">→</span>
              <span className="font-data text-[11px] text-success tabular-nums">
                +{fmtAmount(o.annualAmount * runningMultiplier)}/yr
              </span>
              <span className="font-body text-[10px] text-text-dim">
                {RESOURCE_LABELS[o.resource] ?? o.resource}
              </span>
              {isRunning && counts.running > 1 && (
                <span className="font-data text-[9px] text-text-dim tabular-nums ml-auto">
                  ×{counts.running}
                </span>
              )}
            </div>
          ))}
          {def.inputs.map(inp => (
            <div key={inp.resource} className="flex items-center gap-1.5">
              <span className="text-critical text-[10px] font-data w-3">←</span>
              <span className="font-data text-[11px] text-text-secondary tabular-nums">
                −{fmtAmount(inp.annualAmount * runningMultiplier)}/yr
              </span>
              <span className="font-body text-[10px] text-text-dim">
                {RESOURCE_LABELS[inp.resource] ?? inp.resource}
              </span>
            </div>
          ))}
        </div>

        {/* ── Requirements (locked/available only) ── */}
        {(isAvailable || isLocked) && (def.requires.length > 0 || researchDef) && (
          <div className="space-y-0.5 pt-1.5 border-t border-border/40">
            {researchDef && (
              <div className="flex items-center gap-1.5">
                <span className={`text-[10px] ${researchDone ? 'text-success' : 'text-text-dim'}`}>
                  {researchDone ? '✓' : '○'}
                </span>
                <span className={`font-body text-[11px] ${researchDone ? 'text-text-secondary' : 'text-text-dim'}`}>
                  Research: {researchDef.name}
                </span>
              </div>
            )}
            {def.requires.map(reqId => {
              const reqDef = OPERATIONS_BY_ID[reqId];
              const met = (allCounts[reqId]?.running ?? 0) > 0;
              return (
                <div key={reqId} className="flex items-center gap-1.5">
                  <span className={`text-[10px] ${met ? 'text-success' : 'text-text-dim'}`}>
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

        {/* ── Locked: show what unlocks it ── */}
        {isLocked && !isRunning && !isMothballed && (
          <div className="text-[11px] font-body text-text-dim mt-auto">
            {def.requiresResearch && !researchDone
              ? `Requires research: ${researchDef?.name}`
              : `Unlocks Phase ${def.unlocksAtPhase}`}
          </div>
        )}

        {/* ── Action buttons ── */}
        <div className="flex gap-2 mt-auto pt-1">
          {/* Running: mothball + optionally build another */}
          {isRunning && (
            <>
              {!atMax && (
                <button
                  onClick={() => buildOperation(def.id)}
                  disabled={!canBuild}
                  className={[
                    'flex-1 text-[11px] font-body font-medium py-1.5 px-3 rounded transition-all duration-150',
                    canBuild
                      ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 hover:border-primary/60 active:scale-[0.98]'
                      : 'bg-surface-raise text-text-dim border border-border cursor-not-allowed',
                  ].join(' ')}
                >
                  + Build Another
                </button>
              )}
              <button
                onClick={() => mothballOperation(def.id)}
                className="flex-1 text-[11px] font-body py-1.5 px-3 rounded border border-border/60 text-text-dim hover:border-warning/50 hover:text-warning transition-all duration-150 active:scale-[0.98]"
              >
                Mothball One
              </button>
            </>
          )}

          {/* Mothballed (and not running): reactivate + build new */}
          {!isRunning && isMothballed && (
            <>
              <button
                onClick={() => reactivateOperation(def.id)}
                disabled={budgetAvailableForReactivate < def.annualCostM}
                className={[
                  'flex-1 text-[11px] font-body font-medium py-1.5 px-3 rounded border transition-all duration-150 active:scale-[0.98]',
                  budgetAvailableForReactivate >= def.annualCostM
                    ? 'bg-success/10 text-success border-success/30 hover:bg-success/20 hover:border-success/60'
                    : 'bg-surface-raise text-text-dim border-border cursor-not-allowed',
                ].join(' ')}
              >
                Reactivate
              </button>
              {!atMax && (
                <button
                  onClick={() => buildOperation(def.id)}
                  disabled={!canBuild}
                  className={[
                    'flex-1 text-[11px] font-body font-medium py-1.5 px-3 rounded border transition-all duration-150 active:scale-[0.98]',
                    canBuild
                      ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20'
                      : 'bg-surface-raise text-text-dim border-border cursor-not-allowed',
                  ].join(' ')}
                >
                  + Build New
                </button>
              )}
            </>
          )}

          {/* Available: primary build button */}
          {isAvailable && (
            <button
              onClick={() => buildOperation(def.id)}
              disabled={!canBuild}
              className={[
                'flex-1 text-[12px] font-body font-semibold py-2 px-4 rounded border transition-all duration-150 active:scale-[0.98]',
                canBuild
                  ? 'bg-primary text-bg border-transparent hover:bg-primary/80 shadow-[0_0_12px_rgba(74,158,255,0.25)] hover:shadow-[0_0_20px_rgba(74,158,255,0.4)]'
                  : 'bg-surface-raise text-text-dim border-border cursor-not-allowed',
              ].join(' ')}
            >
              Build
            </button>
          )}

          {/* Max instances reached */}
          {atMax && !isRunning && !isMothballed && (
            <div className="flex-1 text-center text-[11px] font-body text-text-dim py-1.5">
              Max {def.maxInstances} instances
            </div>
          )}
        </div>
      </div>
    </Tooltip>
  );
}
