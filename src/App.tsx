import { useState } from 'react';
import { GameLoop } from './components/GameLoop';
import { Header } from './components/Header';
import type { TabId } from './components/Header';
import { MilestoneStrip } from './components/MilestoneStrip';
import { ResourcePanel } from './components/ResourcePanel';
import { ProjectsView } from './components/ProjectsView';
import { OperationsView } from './components/OperationsView';
import { ResearchView } from './components/ResearchView';
import { Modal } from './components/Modal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('projects');

  return (
    <div className="h-screen bg-bg flex flex-col overflow-hidden font-body">
      <GameLoop />
      <Modal />
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <MilestoneStrip />
      <div className="flex flex-1 overflow-hidden">
        <ResourcePanel />
        {activeTab === 'projects'   && <ProjectsView />}
        {activeTab === 'operations' && <OperationsView />}
        {activeTab === 'research'   && <ResearchView />}
      </div>
    </div>
  );
}
