import type { OperationDef } from '../types';
import { useGameStore, selectBudgetUsed, selectCanBuild, selectOperationStatus } from '../store/gameStore';
import { OPERATIONS_BY_ID } from '../game/definitions';

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
  ree: 'REE', methalox: 'Methalox', cntCable: 'CNT', avionics: 'Avionics',
  structural: 'Struct', solarPanels: 'Solar', lifeSupport: 'LifeSup', rp: 'RP',
};

export function OperationCard({ def }: Props) {
  const counts = useGameStore(s => s.operationCounts[def.id] ?? { running: 0, mothballed: 0 });
  const status = useGameStore(s => selectOperationStatus(s, def.id));
  const canBuild = useGameStore(s => selectCanBuild(s, def.id));
  const budgetUsed = useGameStore(selectBudgetUsed);
  const annualBudget = useGameStore(s => s.annualBudgetM);
  const allCounts = useGameStore(s => s.operationCounts);
  const buildOperation = useGameStore(s => s.buildOperation);
  const mothballOperation = useGameStore(s => s.mothballOperation);
  const reactivateOperation = useGameStore(s => s.reactivateOperation);

  const budgetFreeAfterBuild = annualBudget - budgetUsed - def.annualCostM;

  const isRunning   = status === 'running';
  const isMothballed = status === 'mothballed';
  const isAvailable  = status === 'available' || (counts.running === 0 && counts.mothballed === 0 && status !== 'locked');
  const isLocked     = status === 'locked';

  const totalInstances = counts.running + counts.mothballed;
  const atMax = totalInstances >= def.maxInstances;

  return (
    <div
      className={[
        'bg-surface rounded-lg border p-4 flex flex-col gap-3 transition-all duration-200',
        isRunning    ? 'border-border hover:border-primary/40' : '',
        isMothballed ? 'border-warning/30 bg-surface/60' : '',
        isAvailable  ? 'border-border/60' : '',
        isLocked     ? 'border-border/30 opacity-50' : '',
      ].join(' ')}
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            {isRunning && (
              <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0 animate-pulse" />
            )}
            {isMothballed && (
              <div className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
            )}
            {(isAvailable || isLocked) && (
              <div className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
            )}
            <span className="font-body text-[13px] font-medium text-text-primary truncate">
              {def.name}
            </span>
            {totalInstances > 1 && (
              <span className="font-data text-[10px] text-primary bg-primary/10 rounded px-1">
                ×{totalInstances}
              </span>
            )}
          </div>
          <p className="font-body text-[11px] text-text-dim leading-snug">
            {def.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="font-data text-[11px] tabular-nums text-text-secondary">
            ${def.annualCostM}M/yr
          </div>
          {totalInstances > 1 && (
            <div className="font-data text-[10px] tabular-nums text-text-dim">
              ×{totalInstances} = ${def.annualCostM * totalInstances}M
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
              +{fmtAmount(o.annualAmount * (counts.running || 1))}/yr
            </span>
            <span className="font-body text-[10px] text-text-dim">
              {RESOURCE_LABELS[o.resource] ?? o.resource}
            </span>
          </div>
        ))}
        {def.inputs.map(inp => (
          <div key={inp.resource} className="flex items-center gap-1.5">
            <span className="text-critical text-[10px] font-data w-3">←</span>
            <span className="font-data text-[11px] text-text-secondary tabular-nums">
              −{fmtAmount(inp.annualAmount * (counts.running || 1))}/yr
            </span>
            <span className="font-body text-[10px] text-text-dim">
              {RESOURCE_LABELS[inp.resource] ?? inp.resource}
            </span>
          </div>
        ))}
      </div>

      {/* ── Requirements checklist (available / locked) ── */}
      {(isAvailable || isLocked) && def.requires.length > 0 && (
        <div className="space-y-0.5 pt-1 border-t border-border/40">
          {def.requires.map(reqId => {
            const reqDef = OPERATIONS_BY_ID[reqId];
            const met = (allCounts[reqId]?.running ?? 0) > 0;
            return (
              <div key={reqId} className="flex items-center gap-1.5">
                <span className={`text-[10px] ${met ? 'text-success' : 'text-text-dim'}`}>
                  {met ? '✓' : '○'}
                </span>
                <span className={`font-body text-[11px] ${met ? 'text-text-secondary' : 'text-text-dim'}`}>
                  {reqDef?.name ?? reqId}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Action buttons ── */}
      <div className="flex gap-2 mt-auto pt-1">
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
              className="flex-1 text-[11px] font-body py-1.5 px-3 rounded border border-border/60 text-text-dim hover:border-warning/40 hover:text-warning transition-all duration-150 active:scale-[0.98]"
            >
              Mothball
            </button>
          </>
        )}

        {isMothballed && counts.mothballed > 0 && (
          <>
            <button
              onClick={() => reactivateOperation(def.id)}
              disabled={budgetFreeAfterBuild < 0}
              className={[
                'flex-1 text-[11px] font-body font-medium py-1.5 px-3 rounded border transition-all duration-150 active:scale-[0.98]',
                budgetFreeAfterBuild >= 0
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
                    ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 hover:border-primary/60'
                    : 'bg-surface-raise text-text-dim border-border cursor-not-allowed',
                ].join(' ')}
              >
                + Build New
              </button>
            )}
          </>
        )}

        {isAvailable && !isRunning && !isMothballed && (
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

        {isLocked && (
          <div className="flex-1 text-center text-[11px] font-body text-text-dim py-1.5">
            Unlocks in Phase {def.unlocksAtPhase}
          </div>
        )}
      </div>
    </div>
  );
}
