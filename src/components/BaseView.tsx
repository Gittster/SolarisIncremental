import { useGameStore } from '../store/gameStore';
import { ResourceBar } from './ResourceBar';
import { FacilityCard } from './FacilityCard';

function EmptyBuildSlot() {
  return (
    <div className="border border-dashed border-border rounded-lg flex flex-col items-center justify-center min-h-[160px] cursor-pointer transition-colors hover:border-primary/40 active:border-primary/60">
      <span className="text-text-dim text-xl mb-1 font-data">+</span>
      <span className="text-text-dim text-[10px] font-body uppercase tracking-wider">Build</span>
    </div>
  );
}

export function BaseView() {
  const facilities  = useGameStore(s => s.facilities);
  const currentPhase = useGameStore(s => s.currentPhase);

  const locationLabels: Record<number, string> = {
    0: 'Earth Surface',
    1: 'Low Earth Orbit',
    2: 'Earth-Moon System',
    3: 'Lunar Surface',
  };
  const locationLabel = locationLabels[currentPhase] ?? 'Unknown Location';

  return (
    <div>
      {/* Resource bar — sticky just below the milestone card */}
      <div className="sticky top-0 z-10">
        <ResourceBar />
      </div>

      {/* Section header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <p className="text-text-dim text-[10px] font-body uppercase tracking-widest">
            {locationLabel}
          </p>
          <h2 className="text-text-secondary text-xs font-body mt-0.5">
            {facilities.filter(f => f.isActive).length} active ·{' '}
            {facilities.filter(f => f.alertLevel !== 'none').length} alerts
          </h2>
        </div>
        <span className="text-text-dim text-[10px] font-data uppercase tracking-wide">
          Phase {currentPhase}
        </span>
      </div>

      {/* Facility grid — 2 columns */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        {facilities.map(facility => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}

        {/* Two empty build slots */}
        <EmptyBuildSlot />
        <EmptyBuildSlot />
      </div>
    </div>
  );
}
