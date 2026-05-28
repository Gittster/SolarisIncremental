import { useState, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Props {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'right';
}

export function Tooltip({ content, children, side = 'top' }: Props) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    timer.current = setTimeout(() => setVisible(true), 300);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setVisible(false);
  };

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const posClasses = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    right:  'left-full top-0 ml-2',
  }[side];

  return (
    <div className="relative h-full" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && (
        <div
          className={`absolute ${posClasses} z-50 w-80 px-3 py-2.5 rounded-lg
            bg-[#0d1220] border border-border shadow-2xl
            pointer-events-none`}
        >
          {typeof content === 'string' ? (
            <p className="font-body text-[11px] text-text-secondary leading-relaxed">
              {content}
            </p>
          ) : content}
        </div>
      )}
    </div>
  );
}
