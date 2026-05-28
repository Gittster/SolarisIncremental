import { useState } from 'react';
import { GameLoop } from './components/GameLoop';
import { MilestoneCard } from './components/MilestoneCard';
import { BaseView } from './components/BaseView';
import { BottomTabBar, TabId } from './components/BottomTabBar';

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 text-text-dim">
      <span className="text-4xl font-data opacity-30">◉</span>
      <p className="text-sm font-body text-text-secondary">{label}</p>
      <p className="text-xs font-body text-text-dim">Coming in next phase</p>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('base');

  return (
    /*
     * The outer wrapper constrains to 390 px on wide screens to simulate
     * a mobile viewport. On real mobile it fills the screen naturally.
     */
    <div className="max-w-[390px] mx-auto h-screen bg-bg flex flex-col overflow-hidden font-body">
      <GameLoop />

      {/* Milestone card — always visible at the top of every view */}
      <div className="shrink-0 z-20">
        <MilestoneCard />
      </div>

      {/* Scrollable main content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {activeTab === 'base'      && <BaseView />}
        {activeTab === 'map'       && <ComingSoon label="Solar System Map" />}
        {activeTab === 'research'  && <ComingSoon label="Research Tree" />}
        {activeTab === 'contracts' && <ComingSoon label="Commercial Contracts" />}
      </div>

      {/* Fixed bottom navigation */}
      <BottomTabBar active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
