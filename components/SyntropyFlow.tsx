import React from 'react';

const FlowLine: React.FC<{ path: string; duration: string; delay: string; isFocusing: boolean }> = ({ path, duration, delay, isFocusing }) => {
  const focusedDuration = (parseFloat(duration) / 2) + 's';
  return (
    <g>
      <path d={path} stroke="rgba(0, 255, 65, 0.2)" strokeWidth="1" fill="none" />
      <path
        d={path}
        stroke={isFocusing ? 'rgba(173, 255, 47, 1)' : 'rgba(0, 255, 65, 1)'}
        strokeWidth={isFocusing ? "2.5" : "1.5"}
        fill="none"
        strokeDasharray="20 180"
        className="transition-all duration-500"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="200"
          to="0"
          dur={isFocusing ? focusedDuration : duration}
          begin={delay}
          repeatCount="indefinite"
        />
      </path>
    </g>
  );
};

interface SyntropyFlowProps {
  isFocusing: boolean;
}

const SyntropyFlow: React.FC<SyntropyFlowProps> = ({ isFocusing }) => {
    const paths = [
        { path: "M 10,10 Q 50,100 100,100 T 190,190", duration: "5s", delay: "0s" },
        { path: "M 190,10 Q 150,100 100,100 T 10,190", duration: "6s", delay: "1s" },
        { path: "M 10,100 Q 100,50 100,100 T 190,100", duration: "4s", delay: "0.5s" },
        { path: "M 10,190 Q 50,100 100,100 T 190,10", duration: "7s", delay: "2s" },
        { path: "M 190,190 Q 150,100 100,100 T 10,10", duration: "5.5s", delay: "1.5s" },
        { path: "M 100,10 Q 50,100 100,100 T 100,190", duration: "4.5s", delay: "2.5s" },
    ];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-2xl max-h-2xl">
            <svg width="100%" height="100%" viewBox="0 0 200 200" className={`transition-opacity duration-500 ${isFocusing ? 'opacity-100' : 'opacity-60'}`}>
            {paths.map((p, i) => (
                <FlowLine key={i} path={p.path} duration={p.duration} delay={p.delay} isFocusing={isFocusing}/>
            ))}
            </svg>
        </div>
    </div>
  );
};

export default SyntropyFlow;