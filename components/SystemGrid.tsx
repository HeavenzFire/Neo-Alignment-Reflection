
import React from 'react';

const SystemGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: '300px' }}>
      <div
        className="absolute w-full h-full"
        style={{
          transform: 'rotateX(60deg)',
          backgroundSize: '40px 40px',
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 65, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 65, 0.15) 1px, transparent 1px)
          `,
          animation: 'scrollGrid 20s linear infinite',
        }}
      ></div>
      <style>{`
        @keyframes scrollGrid {
          from { background-position: 0 0; }
          to { background-position: 0 -1000px; }
        }
      `}</style>
    </div>
  );
};

export default SystemGrid;
