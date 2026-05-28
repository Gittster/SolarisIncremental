import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  content: string;
  className?: string;
}

const PANEL_W = 296;

export function InfoBox({ content, className = '' }: Props) {
  const [visible, setVisible] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const btnRef = useRef<HTMLButtonElement>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout>>();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const calcPosition = useCallback(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const PANEL_MAX_H = 260;
    const GAP = 8;

    // Prefer right of button; flip left if not enough space
    let left = r.right + GAP;
    if (left + PANEL_W > vw - 8) left = r.left - PANEL_W - GAP;
    left = Math.max(8, left);

    // Align top with button; clamp bottom
    let top = r.top;
    if (top + PANEL_MAX_H > vh - 8) top = vh - PANEL_MAX_H - 8;
    top = Math.max(8, top);

    setPanelStyle({ position: 'fixed', top, left, width: PANEL_W, zIndex: 9999 });
  }, []);

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => {
      calcPosition();
      setVisible(true);
    }, 180);
  }, [calcPosition]);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 80);
  }, []);

  const keepOpen = useCallback(() => {
    clearTimeout(hideTimer.current);
  }, []);

  return (
    <>
      <button
        ref={btnRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        className={[
          'w-4 h-4 rounded-full border border-border/60 text-text-dim text-[9px] font-data',
          'flex items-center justify-center shrink-0',
          'hover:border-primary/60 hover:text-primary transition-colors duration-150',
          className,
        ].join(' ')}
        tabIndex={-1}
        aria-label="Information"
      >
        i
      </button>

      {visible && createPortal(
        <div
          style={panelStyle}
          className="px-3 py-2.5 rounded-lg bg-[#0c1120] border border-border/80 shadow-2xl"
          onMouseEnter={keepOpen}
          onMouseLeave={hide}
        >
          <p className="font-body text-[11px] text-text-secondary leading-relaxed">
            {content}
          </p>
        </div>,
        document.body,
      )}
    </>
  );
}
