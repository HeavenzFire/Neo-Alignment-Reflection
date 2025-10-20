import React from 'react';

interface HealingWaveProps {
  isFocusing: boolean;
}

const HealingWave: React.FC<HealingWaveProps> = ({ isFocusing }) => {
  // We use the `key` prop in the parent to re-mount this component on each focus start,
  // which guarantees the CSS animation restarts every single time.
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {isFocusing && (
        <div
          key={Date.now()} // Re-mounts the component to reliably restart the animation
          className="absolute bg-green-400 rounded-full animate-healing-wave"
          style={{
            width: '1px',
            height: '1px',
            boxShadow: '0 0 50px 20px rgba(173, 255, 47, 0.5)',
          }}
        ></div>
      )}
      <style>{`
        @keyframes healing-wave {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(3000); /* Scale large enough to cover any screen */
            opacity: 0;
          }
        }
        .animate-healing-wave {
          animation: healing-wave 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
      `}</style>
    </div>
  );
};

export default HealingWave;
