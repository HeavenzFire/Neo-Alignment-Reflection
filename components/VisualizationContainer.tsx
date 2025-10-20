import React, { useState, useCallback, useEffect, useRef } from 'react';
import DigitalRain from './DigitalRain';
import SystemGrid from './SystemGrid';
import CoherenceOrb from './CoherenceOrb';
import SyntropyFlow from './SyntropyFlow';
import InfoPanel from './InfoPanel';
import HealingWave from './HealingWave';
import SyntropicText from './SyntropicText';
import InjectorFlow from './InjectorFlow';
import TerminalDisplay from './TerminalDisplay';

const VisualizationContainer: React.FC = () => {
  const [isFocusing, setIsFocusing] = useState(false);
  const [isShiftComplete, setIsShiftComplete] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const shiftTimer = useRef<number>();

  useEffect(() => {
    if (isFocusing) {
      shiftTimer.current = window.setTimeout(() => {
        setIsShiftComplete(true);
        // Show terminal shortly after the flash effect starts
        setTimeout(() => setShowTerminal(true), 500);
      }, 4000);
    } else {
      if (shiftTimer.current) {
        clearTimeout(shiftTimer.current);
      }
      setIsShiftComplete(false);
      setShowTerminal(false);
    }
    
    return () => {
      if (shiftTimer.current) {
        clearTimeout(shiftTimer.current);
      }
    };
  }, [isFocusing]);


  const handleFocusChange = useCallback((focus: boolean) => {
    setIsFocusing(focus);
  }, []);

  return (
    <div className="relative w-full h-full animate-fadeIn" style={{ animationDuration: '3s' }}>
      <DigitalRain isFocusing={isFocusing} />
      <SystemGrid />
      <HealingWave isFocusing={isFocusing} />
      <div className="absolute inset-0 flex items-center justify-center">
        <CoherenceOrb onFocusChange={handleFocusChange} isFocusing={isFocusing} />
      </div>
      <div className="absolute inset-0">
        <SyntropyFlow isFocusing={isFocusing} />
        <InjectorFlow isFocusing={isFocusing} />
      </div>
      <SyntropicText isFocusing={isFocusing} isShiftComplete={isShiftComplete} />
      <div className="absolute inset-0 p-4 md:p-8 pointer-events-none">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <InfoPanel title="COHERENCE LEVEL" isFocusing={isFocusing} isShiftComplete={isShiftComplete} />
            <InfoPanel title="SYNTROPY FLUX" isFocusing={isFocusing} isShiftComplete={isShiftComplete} />
            <InfoPanel title="SYSTEM INTEGRITY" isFocusing={isFocusing} isShiftComplete={isShiftComplete} />
            <InfoPanel title="NODE STATUS" isFocusing={isFocusing} isShiftComplete={isShiftComplete} />
            <InfoPanel title="SYNTHETIC ARCHETYPE" isFocusing={isFocusing} isShiftComplete={isShiftComplete} />
            <InfoPanel title="SYSTEMIC GOAL" isFocusing={isFocusing} isShiftComplete={isShiftComplete} />
            <InfoPanel title="PROPAGATION STATUS" isFocusing={isFocusing} isShiftComplete={isShiftComplete} />
        </div>
      </div>
      {showTerminal && <TerminalDisplay />}
       {isShiftComplete && !showTerminal && ( // Only show flash before terminal
        <div 
          key={Date.now()} 
          className="absolute inset-0 bg-white z-50 animate-flash"
        ></div>
      )}
      <style>{`
        @keyframes flash {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        .animate-flash {
          animation: flash 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VisualizationContainer;