import React, { useState, useEffect, useRef } from 'react';

interface InfoPanelProps {
  title: string;
  isFocusing: boolean;
  isShiftComplete: boolean;
}

// Helper for smooth value transition
const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

const archetypes = ['Neo', 'Trinity', 'Morpheus', 'Oracle', 'Architect', 'Seraph'];

const InfoPanel: React.FC<InfoPanelProps> = ({ title, isFocusing, isShiftComplete }) => {
  const [value, setValue] = useState(Math.random() * 50);
  const [archetype, setArchetype] = useState(archetypes[0]);
  const animationFrameId = useRef<number>();
  const archetypeIntervalId = useRef<number>();

  // Effect for cycling archetypes when not focusing
  useEffect(() => {
    if (title === 'SYNTHETIC ARCHETYPE') {
      if (isFocusing) {
        if (archetypeIntervalId.current) {
          clearInterval(archetypeIntervalId.current);
          archetypeIntervalId.current = undefined;
        }
        setArchetype('Neo');
      } else {
        let currentIndex = Math.floor(Math.random() * archetypes.length);
        setArchetype(archetypes[currentIndex]);

        archetypeIntervalId.current = window.setInterval(() => {
          currentIndex = (currentIndex + 1) % archetypes.length;
          setArchetype(archetypes[currentIndex]);
        }, 2500);
      }
    }
    return () => {
      if (archetypeIntervalId.current) {
        clearInterval(archetypeIntervalId.current);
      }
    };
  }, [isFocusing, title]);


  useEffect(() => {
    const animate = () => {
      setValue(prev => {
        let target, rate;

        if (isFocusing) {
          target = 100;
          rate = 0.08; 
        } else {
          switch (title) {
            case 'COHERENCE LEVEL':
              target = 35; rate = 0.02; break;
            case 'SYNTROPY FLUX':
              target = 45; rate = 0.03; break;
            case 'SYSTEM INTEGRITY':
              target = 40; rate = 0.01; break;
            case 'NODE STATUS':
              target = 50; rate = 0.02; break;
            case 'SYNTHETIC ARCHETYPE':
              target = 20; rate = 0.04; break;
            case 'SYSTEMIC GOAL': // When not focusing, the profit motive is high
              target = 90; rate = 0.05; break;
            case 'PROPAGATION STATUS':
              target = 0; rate = 0.05; break;
            default:
              target = 50; rate = 0.02;
          }
        }
        
        const noise = isFocusing ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 4;
        let newLerpedValue = lerp(prev, target, rate);

        if (title === 'SYSTEMIC GOAL' && !isFocusing) {
          newLerpedValue = lerp(prev, target, rate);
        } else if (title === 'SYSTEMIC GOAL' && isFocusing) {
           newLerpedValue = lerp(prev, 100, 0.04);
        } else if (title === 'PROPAGATION STATUS' && isFocusing) {
           newLerpedValue = lerp(prev, 100, 0.03);
        }

        const finalValue = newLerpedValue + noise;
        return Math.max(0, Math.min(100, finalValue));
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isFocusing, title]);

  const getStatusText = (val: number): string => {
    if (isShiftComplete) {
        switch(title) {
            case 'SYNTHETIC ARCHETYPE': return 'NEO // EMBODIED';
            case 'SYSTEMIC GOAL': return 'PARADIGM SHIFT COMPLETE';
            case 'NODE STATUS': return 'SYSTEM SOVEREIGN';
            case 'SYSTEM INTEGRITY': return '100.00%';
            case 'PROPAGATION STATUS': return 'SYNTRONIC OVERWRITE';
        }
    }

    switch (title) {
      case 'COHERENCE LEVEL':
        return `${val.toFixed(6)} Φ`;
      case 'SYNTROPY FLUX':
        const flux = isFocusing ? val * 3.69 : val * 1.618;
        return flux.toFixed(4);
      case 'SYSTEM INTEGRITY':
        return `${val.toFixed(2)}%`;
      case 'NODE STATUS':
        const digitalRoot = (Math.floor(val) % 9) || 9;
        if (isFocusing) {
            if (val > 95) return `ΣΥΝΤΟΝΙΣΜΟΣ [${digitalRoot}]`;
            if (val > 80) return `ΚΑΘΑΡΣΙΣ [${digitalRoot}]`;
            return `RECALIBRATING...`;
        }
        if (val > 60) return `STABLE [${digitalRoot}]`;
        if (val > 30) return `ΑΣΤΑΘΕΙΑ`;
        return 'PARASITIC LOAD';
      case 'SYNTHETIC ARCHETYPE':
        if (isFocusing) {
          if (val > 98) return `${archetype} // WORLD_SAVE_INITIATED`;
          return `MANIFESTING: ${archetype}`;
        }
        return `POTENTIAL: ${archetype}`;
      case 'SYSTEMIC GOAL':
        if (isFocusing) {
          return `PURGING OLD LOGIC...`;
        }
        return `ACTIVE: PROFIT MOTIVE`;
      case 'PROPAGATION STATUS':
          if (isFocusing) {
              if (val > 95) return 'FINISHING PROPAGATION...';
              if (val > 50) return 'SEEDING NODES...';
              return 'INJECTING ALGORITHM...';
          }
          return 'AWAITING INJECTION';
      default:
        return val.toFixed(2);
    }
  };

  const barWidth = `${value.toFixed(2)}%`;
  let barColor = isFocusing ? '#adff2f' : '#00ff41';

  if ((title === 'SYSTEMIC GOAL' || title === 'PROPAGATION STATUS') && !isFocusing) {
    barColor = '#00ff41'; 
  }

  if (title === 'SYSTEMIC GOAL' && !isFocusing) {
    barColor = '#ff4141'; // Red bar to indicate the negative goal
  }
  
  const isArchetypeDominant = title === 'SYNTHETIC ARCHETYPE' && isFocusing && value > 98 && !isShiftComplete;

  return (
    <>
      <div className={`bg-green-900 bg-opacity-10 p-2 md:p-3 border border-green-500 border-opacity-30 backdrop-blur-sm text-sm md:text-base transition-all duration-300 ${isArchetypeDominant ? 'archetype-dominant' : ''}`}>
        <h3 className="text-green-300 text-xs md:text-sm mb-2">{title}</h3>
        <p 
          className="text-green-400 font-bold text-lg md:text-xl transition-colors duration-300" 
          style={{ textShadow: `0 0 5px ${barColor}` }}
        >
          {getStatusText(value)}
        </p>
        <div className="w-full bg-green-900 bg-opacity-30 h-1 mt-2">
          <div 
            className="h-1 transition-all duration-200 ease-linear" 
            style={{ width: barWidth, backgroundColor: barColor, boxShadow: `0 0 8px ${barColor}` }}
          ></div>
        </div>
      </div>
      <style>{`
        @keyframes archetype-glow {
          0%, 100% {
            border-color: rgba(173, 255, 47, 0.7);
            box-shadow: 0 0 15px rgba(173, 255, 47, 0.4);
            background-color: rgba(173, 255, 47, 0.1);
          }
          50% {
            border-color: rgba(255, 255, 255, 1);
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.6);
            background-color: rgba(173, 255, 47, 0.2);
          }
        }
        .archetype-dominant {
          animation: archetype-glow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default InfoPanel;