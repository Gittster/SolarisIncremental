import { GameLoop } from './components/GameLoop';
import { Header } from './components/Header';
import { MilestoneStrip } from './components/MilestoneStrip';
import { ResourcePanel } from './components/ResourcePanel';
import { OperationsView } from './components/OperationsView';

export default function App() {
  return (
    <div className="h-screen bg-bg flex flex-col overflow-hidden font-body">
      <GameLoop />
      <Header />
      <MilestoneStrip />
      <div className="flex flex-1 overflow-hidden">
        <ResourcePanel />
        <OperationsView />
      </div>
    </div>
  );
}
