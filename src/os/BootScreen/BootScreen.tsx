import { useEffect, useState } from 'react';
import './BootScreen.css';

const BOOT_MESSAGES = [
  'Cargando módulos del sistema...',
  'Verificando stack: React + TypeScript...',
  'Montando componentes...',
  'Iniciando ArcnalOS...',
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 12 + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, 220);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const step = Math.floor((progress / 100) * BOOT_MESSAGES.length);
    setMessageIndex(Math.min(step, BOOT_MESSAGES.length - 1));
  }, [progress]);

  return (
    <div className="boot-screen">
      <div className="boot-logo">
        <span className="boot-logo-bracket">&lt;</span>
        ArcnalOS
        <span className="boot-logo-bracket">/&gt;</span>
      </div>

      <div className="boot-bar-track">
        <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <p className="boot-message">{BOOT_MESSAGES[messageIndex]}</p>

      <p className="boot-footer">v1.0.0 — build by Arcnal</p>
    </div>
  );
}