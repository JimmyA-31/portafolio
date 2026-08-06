import { useEffect, useState, type ReactNode } from 'react';
import { Monitor } from '@phosphor-icons/react';
import { useWindowManager } from '../WindowManager/WindowManager';
import TechTicker from './TechTicker';
import StartMenu from '../StartMenu/StartMenu';
import './Taskbar.css';

interface TaskbarApp {
  id: string;
  label: string;
  icon: ReactNode;
}

function useClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30_000);
    return () => clearInterval(interval);
  }, []);

  return time.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

export default function Taskbar({ apps }: { apps: TaskbarApp[] }) {
  const { windows, focusWindow, minimizeWindow } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const clock = useClock();

  return (
    <>
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}

      <div className="os-taskbar">
        <button
          className={`os-start-btn ${startOpen ? 'active' : ''}`}
          type="button"
          onClick={() => setStartOpen((v) => !v)}
        >
          <Monitor size={18} weight="regular" />
          Inicio
        </button>

        <div className="os-taskbar-items">
          {windows.map((w) => {
            const app = apps.find((a) => a.id === w.id);
            return (
              <button
                key={w.id}
                className={`os-taskbar-item ${w.isMinimized ? '' : 'active'}`}
                onClick={() => (w.isMinimized ? focusWindow(w.id) : minimizeWindow(w.id))}
                type="button"
              >
                <span className="os-taskbar-icon">{app?.icon}</span>
                <span>{w.title}</span>
              </button>
            );
          })}
        </div>

        <TechTicker />

        <span className="os-taskbar-clock">{clock}</span>
      </div>
    </>
  );
}