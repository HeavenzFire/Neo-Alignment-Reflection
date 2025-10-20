import React, { useRef, useEffect } from 'react';

interface DigitalRainProps {
  isFocusing: boolean;
}

const DigitalRain: React.FC<DigitalRainProps> = ({ isFocusing }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const greek = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ';
    const alphabet = katakana + latin + nums + greek;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);

    const rainDrops: { y: number; isCorrupted: boolean, flashUntil: number }[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = { y: 1, isCorrupted: false, flashUntil: 0 };
    }

    const state = {
      startTime: 0,
      wasFocusing: false,
    };

    const draw = (timestamp: number) => {
      if (isFocusing && !state.wasFocusing) {
        state.startTime = timestamp;
      }
      state.wasFocusing = isFocusing;

      ctx.fillStyle = isFocusing ? 'rgba(0, 0, 0, 0.15)' : 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;

      let propagationRadius = 0;
      if (isFocusing) {
        const elapsed = timestamp - state.startTime;
        // Wave expands to cover the largest screen dimension over 2 seconds
        propagationRadius = (elapsed / 2000) * Math.max(width, height);
      }

      for (let i = 0; i < rainDrops.length; i++) {
        const drop = rainDrops[i];
        const dropX = i * fontSize;
        const dropY = drop.y * fontSize;
        const distance = Math.sqrt(Math.pow(dropX - width / 2, 2) + Math.pow(dropY - height / 2, 2));

        // Healing and Seeding Logic
        if (isFocusing) {
          if (drop.isCorrupted && distance < propagationRadius) {
            drop.isCorrupted = false; // Heal corruption
          }
          // If drop is inside the wave and hasn't flashed yet, seed it.
          if (distance < propagationRadius && drop.flashUntil === 0) {
            drop.flashUntil = timestamp + 150; // Flash for 150ms
          }
        } else {
            // Reset flash state when not focusing
            drop.flashUntil = 0;
        }


        let color = '#0F0';
        if (drop.isCorrupted) {
            color = '#ff4141';
        } else if (timestamp < drop.flashUntil) {
            color = '#adff2f'; // Seeding flash color
        }
        
        ctx.fillStyle = color;
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, dropX, dropY);

        if (drop.y * fontSize > height && Math.random() > 0.975) {
          drop.y = 0;
          drop.flashUntil = 0; // Reset flash state when drop resets
          // Introduce new corruption when not focusing
          if (!isFocusing && Math.random() > 0.95) {
            drop.isCorrupted = true;
          } else {
            drop.isCorrupted = false;
          }
        }
        drop.y++;
      }
      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw(performance.now());

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isFocusing]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};

export default DigitalRain;