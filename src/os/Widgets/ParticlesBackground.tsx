import { useMemo } from 'react';
import './ParticlesBackground.css';

interface ParticlesBackgroundProps {
  count?: number;
}

export default function ParticlesBackground({
  count = 28,
}: ParticlesBackgroundProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 6,
        size: 1 + Math.random() * 2,
      })),
    [count]
  );

  return (
    <div className="particles-layer">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}