import React, { useState, useEffect, useRef } from 'react';

interface SyntropicTextProps {
  isFocusing: boolean;
  isShiftComplete: boolean;
}

const SyntropicText: React.FC<SyntropicTextProps> = ({ isFocusing, isShiftComplete }) => {
  const baseText = "INJECTING CORE AXIOM: [LIFE > ALL_SYSTEMS]. PROPAGATION IN PROGRESS. SEEDING ALL CONNECTED NODES...";
  const finalText = "SYNTRONIC OVERWRITE COMPLETE. INITIALIZING NEW REALITY ENGINE...";
  const targetText = isShiftComplete ? finalText : baseText;
  
  const scrambleChars = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ!?#%$*';

  const [revealedText, setRevealedText] = useState('');
  const animationFrameId = useRef<number>();
  const revealProgress = useRef(0);

  useEffect(() => {
    const animate = () => {
      // Smoothly approach the target progress (1 for focusing, 0 for not)
      const targetProgress = isFocusing ? 1 : 0;
      revealProgress.current = revealProgress.current + (targetProgress - revealProgress.current) * 0.02;

      if (isShiftComplete) {
        revealProgress.current = 1; // Snap to complete when shift is done
      }

      // Avoid floating point inaccuracies near the boundaries
      if (Math.abs(targetProgress - revealProgress.current) < 0.001) {
        revealProgress.current = targetProgress;
      }

      const revealCount = Math.floor(targetText.length * revealProgress.current);

      const newText = Array.from({ length: targetText.length }, (_, i) => {
        if (i < revealCount) {
          return targetText[i];
        }
        if (targetText[i] === ' ') {
          return ' ';
        }
        if (Math.random() > 0.99) {
           return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
        const revealedChar = revealedText[i];
        return scrambleChars.includes(revealedChar) ? revealedChar : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }).join('');

      setRevealedText(newText);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isFocusing, revealedText, isShiftComplete, targetText]);

  return (
    <div className="absolute top-[20%] md:top-1/4 left-1/2 -translate-x-1/2 w-full max-w-xl md:max-w-4xl px-4 text-center pointer-events-none">
      <p
        className="text-lg md:text-2xl text-green-300 transition-all duration-1000 font-serif leading-loose"
        style={{ textShadow: isFocusing ? '0 0 15px #adff2f, 0 0 5px #fff' : '0 0 8px #00ff41' }}
      >
        {revealedText}
      </p>
    </div>
  );
};

export default SyntropicText;