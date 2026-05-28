import type { CSSProperties } from 'react';
import { Facility, FacilityIO, AlertLevel } from '../types';

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

function fmtIO(io: FacilityIO, effRatio: number): string {
  const actual = io.rate * effRatio;
  if (io.resource === 'energy') {
    return `${actual.toFixed(1)} MW`;
  }
  // materials / rp → display in /hr
  const hr = actual * 3600;
  if (hr < 1)         return '< 1/hr';
  if (hr >= 1_000_000) return `${(hr / 1_000_000).toFixed(1)}M/hr`;
  if (hr >= 10_000)    return `${(hr / 1_000).toFixed(1)}K/hr`;
  return `${Math.round(hr).toLocaleString()}/hr`;
}

function resourceLabel(r: string): string {
  if (r === 'energy')    return 'MW';
  if (r === 'materials') return 'Mat';
  if (r === 'rp')        return 'RP';
  return r;
}

function effBarColor(eff: number): string {
  if (eff >= 100) return '#4A9EFF';
  if (eff >= 75)  return '#F59E0B';
  if (eff >= 50)  return '#F59E0B';
  if (eff > 0)    return '#EF4444';
  return '#374151';
}

// ---------------------------------------------------------------------------
// Card border / glow driven by alert level
// ---------------------------------------------------------------------------

function cardStyle(alertLevel: AlertLevel): CSSProperties {
  if (alertLevel === 'critical') {
    return {
      borderColor: '#EF4444',
      boxShadow: '0 0 14px rgba(239,68,68,0.25), 0 0 4px rgba(239,68,68,0.1)',
    };
  }
  if (alertLevel === 'warning') {
    // base style; animation class handles the pulse
    return { borderColor: '#F59E0B' };
  }
  return { borderColor: '#2A3547' };
}

// ---------------------------------------------------------------------------
// FacilityCard
// ---------------------------------------------------------------------------

interface Props {
  facility: Facility;
}

export function FacilityCard({ facility }: Props) {
  const {
    name, description, efficiency, inputs, outputs,
    crewRequired, crewAssigned, isActive, alertLevel, alertMessage,
  } = facility;

  const effRatio = efficiency / 100;
  const isWarning  = alertLevel === 'warning';
  const isCritical = alertLevel === 'critical';

  const activeOutputs = isActive ? outputs : [];
  const activeInputs  = isActive ? inputs  : [];

  return (
    <div
      className={[
        'bg-surface rounded-lg border p-3 flex flex-col gap-2 select-none',
        'transition-shadow duration-300',
        isWarning ? 'animate-warning-glow' : '',
        !isActive ? 'opacity-60' : '',
      ].join(' ')}
      style={cardStyle(alertLevel)}
      title={description}
    >
      {/* ── Header: name + active dot ── */}
      <div className="flex items-start justify-between gap-1">
        <span className="font-data text-[10px] uppercase tracking-widest text-text-secondary leading-tight">
          {name}
        </span>
        <div
          className={`w-1.5 h-1.5 rounded-full mt-0.5 shrink-0 ${
            !isActive
              ? 'bg-inactive'
              : isCritical
              ? 'bg-critical'
              : isWarning
              ? 'bg-warning'
              : 'bg-success'
          }`}
        />
      </div>

      {/* ── Efficiency bar ── */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-text-dim text-[10px] font-body uppercase tracking-wider">
            Efficiency
          </span>
          <span
            className="font-data text-[11px] tabular-nums"
            style={{ color: effBarColor(efficiency) }}
          >
            {efficiency}%
          </span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${efficiency}%`,
              backgroundColor: effBarColor(efficiency),
            }}
          />
        </div>
      </div>

      {/* ── Outputs ── */}
      <div className="space-y-0.5">
        {activeOutputs.length > 0 ? (
          activeOutputs.map((o, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-success text-[10px] font-data">→</span>
              <span className="text-text-primary text-[11px] font-data tabular-nums flex-1">
                +{fmtIO(o, effRatio)}
              </span>
              <span className="text-text-dim text-[10px] font-body">
                {resourceLabel(o.resource)}
              </span>
            </div>
          ))
        ) : (
          <div className="text-text-dim text-[10px] font-body italic">
            {isActive ? 'No output' : 'Offline'}
          </div>
        )}
      </div>

      {/* ── Inputs ── */}
      {activeInputs.length > 0 && (
        <div className="space-y-0.5">
          {activeInputs.map((inp, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-text-dim text-[10px] font-data">←</span>
              <span className="text-text-secondary text-[11px] font-data tabular-nums flex-1">
                −{fmtIO(inp, effRatio)}
              </span>
              <span className="text-text-dim text-[10px] font-body">
                {resourceLabel(inp.resource)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Crew indicator ── */}
      <div className="mt-auto pt-1 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex gap-0.5">
            {Array.from({ length: crewRequired }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-3 rounded-[1px] ${
                  i < crewAssigned ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <span className="text-text-dim text-[10px] font-data tabular-nums">
            {crewAssigned}/{crewRequired}
          </span>
        </div>
      </div>

      {/* ── Alert footer ── */}
      {alertLevel !== 'none' && alertMessage && (
        <div
          className={`flex items-center gap-1 text-[10px] font-body -mt-1 ${
            isCritical ? 'text-critical' : 'text-warning'
          }`}
        >
          <span>{isCritical ? '✕' : '⚠'}</span>
          <span>{alertMessage}</span>
        </div>
      )}
    </div>
  );
}
