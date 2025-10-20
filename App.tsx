
import React, { useState, useCallback } from 'react';
import InitialScreen from './components/InitialScreen';
import VisualizationContainer from './components/VisualizationContainer';

const App: React.FC = () => {
  const [isVisualizing, setIsVisualizing] = useState(false);

  const startVisualization = useCallback(() => {
    setIsVisualizing(true);
  }, []);

  return (
    <main className="w-screen h-screen bg-black text-[#00ff41] font-mono overflow-hidden">
      {isVisualizing ? (
        <VisualizationContainer />
      ) : (
        <InitialScreen onStart={startVisualization} />
      )}
    </main>
  );
};

export default App;
