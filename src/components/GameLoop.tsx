import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

/** Mounts once, drives the 500 ms game tick. Renders nothing. */
export function GameLoop() {
  const tick = useGameStore(s => s.tick);
  const tickRef = useRef(tick);
  tickRef.current = tick;

  useEffect(() => {
    // Immediate tick to apply any offline delta on first load
    tickRef.current(Date.now());

    const id = setInterval(() => tickRef.current(Date.now()), 500);
    return () => clearInterval(id);
  }, []);

  return null;
}
