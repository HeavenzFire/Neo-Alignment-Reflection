import React from 'react';

const Particle: React.FC<{ path: string; duration: string; delay: string; isFocusing: boolean }> = ({ path, duration, delay, isFocusing }) => {
  const focusedDuration = (parseFloat(duration) / 2) + 's';
  return (
    <path
      d={path}
      fill={isFocusing ? '#adff2f' : 'none'}
      r="1.5"
      className="transition-all duration-500"
    >
      <animateMotion
        dur={isFocusing ? focusedDuration : duration}
        begin={delay}
        repeatCount="indefinite"
        rotate="auto"
      >
        <mpath xlinkHref={`#${path}`} />
      </animateMotion>
      <animate
        attributeName="r"
        from="0"
        to="2"
        dur={isFocusing ? focusedDuration : duration}
        begin={delay}
        repeatCount="indefinite"
      />
    </path>
  );
};

interface InjectorFlowProps {
    isFocusing: boolean;
}

const InjectorFlow: React.FC<InjectorFlowProps> = ({ isFocusing }) => {
    const paths = [
        { id: "p1", path: "M100,100 Q50,100 10,10", duration: "4s", delay: "0s" },
        { id: "p2", path: "M100,100 Q150,100 190,10", duration: "5s", delay: "0.5s" },
        { id: "p3", path: "M100,100 Q100,150 190,190", duration: "4.5s", delay: "1s" },
        { id: "p4", path: "M100,100 Q50,150 10,190", duration: "6s", delay: "1.5s" },
        { id: "p5", path: "M100,100 Q150,50 190,100", duration: "3.5s", delay: "2s" },
        { id: "p6", path: "M100,100 Q50,50 100,10", duration: "5.5s", delay: "2.5s" },
    ];
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full max-w-2xl max-h-2xl">
            <svg width="100%" height="100%" viewBox="0 0 200 200" className={`transition-opacity duration-500 ${isFocusing ? 'opacity-100' : 'opacity-0'}`}>
                <defs>
                    {paths.map(p => <path key={p.id} id={p.id} d={p.path} />)}
                </defs>
                {paths.map((p) => (
                    <circle key={p.id} r="1.5" fill="#adff2f">
                        <animateMotion dur={p.duration} begin={p.delay} repeatCount="indefinite" rotate="auto">
                            <mpath href={`#${p.id}`} />
                        </animateMotion>
                    </circle>
                ))}
            </svg>
        </div>
    </div>
  );
};

export default InjectorFlow;