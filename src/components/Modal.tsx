import { useGameStore } from '../store/gameStore';

export function Modal() {
  const modal = useGameStore(s => s.pendingModals[0]);
  const dismiss = useGameStore(s => s.dismissModal);

  if (!modal) return null;

  const accentClass = {
    intro:    'text-primary',
    research: 'text-success',
    resource: 'text-warning',
  }[modal.type];

  const badgeLabel = {
    intro:    'MISSION BRIEFING',
    research: 'RESEARCH COMPLETE',
    resource: 'NEW RESOURCE',
  }[modal.type];

  const paragraphs = modal.body.split('\n\n');

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      style={{ background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={dismiss}
    >
      <div
        className="relative bg-surface border border-border rounded-xl shadow-2xl w-full max-w-xl flex flex-col overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(74,158,255,0.08)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Accent line */}
        <div className={`h-0.5 w-full ${modal.type === 'research' ? 'bg-success' : modal.type === 'resource' ? 'bg-warning' : 'bg-primary'}`} />

        <div className="p-6">
          {/* Badge */}
          <div className="mb-3">
            <span className={`font-data text-[9px] uppercase tracking-[0.2em] ${accentClass}`}>
              {badgeLabel}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-xl text-text-primary leading-tight mb-1">
            {modal.title}
          </h2>
          {modal.subtitle && (
            <p className="font-body text-sm text-text-secondary mb-4">
              {modal.subtitle}
            </p>
          )}

          {/* Body */}
          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
            {paragraphs.map((para, i) => (
              <p key={i} className="font-body text-[13px] text-text-secondary leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Action */}
          <button
            onClick={dismiss}
            className="w-full py-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary font-body text-sm font-medium
              hover:bg-primary/20 hover:border-primary/50 transition-all duration-150 active:scale-[0.99]"
          >
            {modal.type === 'intro' ? 'Begin Programme' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
