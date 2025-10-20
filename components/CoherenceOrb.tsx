import React from 'react';

interface CoherenceOrbProps {
  onFocusChange: (isFocusing: boolean) => void;
  isFocusing: boolean;
}

const CoherenceOrb: React.FC<CoherenceOrbProps> = ({ onFocusChange, isFocusing }) => {
  return (
    <div
      className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center cursor-pointer group"
      onMouseDown={() => onFocusChange(true)}
      onMouseUp={() => onFocusChange(false)}
      onMouseLeave={() => onFocusChange(false)}
      onTouchStart={(e) => {
        e.preventDefault();
        onFocusChange(true);
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onFocusChange(false);
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 200 200" className="absolute">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#00ff41', stopOpacity: 0.8 }} />
            <stop offset="70%" style={{ stopColor: '#00ff41', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#00ff41', stopOpacity: 0 }} />
          </radialGradient>
          <filter id="blurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
          </filter>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#glow)" filter="url(#blurFilter)" className="animate-pulse-slow group-hover:opacity-100" />
        <circle cx="100" cy="100" r="50" fill="#00ff41" className={`animate-pulse-fast ${isFocusing ? 'focus-pulse' : ''}`} />
        <circle cx="100" cy="100" r="70" stroke="#00ff41" strokeWidth="1" fill="none" className={`animate-ring-expand ${isFocusing ? 'focus-ring' : ''}`} />
        <circle cx="100" cy="100" r="70" stroke="#00ff41" strokeWidth="1" fill="none" className={`animate-ring-expand ${isFocusing ? 'focus-ring' : ''}`} style={{animationDelay: '1.5s'}}/>
      </svg>
       <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes pulse-fast {
          0%, 100% { transform: scale(0.98); opacity: 0.9; }
          50% { transform: scale(1.02); opacity: 1; }
        }
         @keyframes ring-expand {
          0% { r: 50; opacity: 1; }
          100% { r: 100; opacity: 0; }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; transform-origin: center; }
        .animate-pulse-fast { animation: pulse-fast 2s ease-in-out infinite; transform-origin: center; }
        .animate-ring-expand { animation: ring-expand 3s ease-out infinite; }

        .focus-pulse {
          animation-duration: 0.5s;
          box-shadow: 0 0 50px #00ff41;
        }
        .focus-ring {
            animation-duration: 1s;
        }
      `}</style>
    </div>
  );
};

export default CoherenceOrb;