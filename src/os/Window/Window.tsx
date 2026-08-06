import { useRef, useCallback, useEffect, type MouseEvent, type CSSProperties } from 'react';
import { useWindowManager } from '../WindowManager/WindowManager';
import { useIsMobile } from '../../hooks/useIsMobile';
import './Window.css';

interface WindowProps {
  id: string;
}

export default function Window({ id }: WindowProps) {
  const { windows, closeWindow, minimizeWindow, toggleMaximize, focusWindow, updatePosition } =
    useWindowManager();
  const isMobile = useIsMobile();

  const win = windows.find((w) => w.id === id);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);

  const handleTitleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!win || win.isMaximized || isMobile) return;
      focusWindow(id);
      dragOffset.current = {
        x: e.clientX - win.position.x,
        y: e.clientY - win.position.y,
      };
    },
    [win, id, focusWindow, isMobile]
  );

  useEffect(() => {
    function handleMouseMove(e: globalThis.MouseEvent) {
      if (!dragOffset.current) return;
      const x = Math.max(0, e.clientX - dragOffset.current.x);
      const y = Math.max(0, e.clientY - dragOffset.current.y);
      updatePosition(id, { x, y });
    }
    function handleMouseUp() {
      dragOffset.current = null;
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [id, updatePosition]);

  if (!win || win.isMinimized) return null;

  const style: CSSProperties =
    win.isMaximized || isMobile
      ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 40px)', zIndex: win.zIndex }
      : {
          top: win.position.y,
          left: win.position.x,
          width: win.size.width,
          height: win.size.height,
          zIndex: win.zIndex,
        };

  return (
    <div
      className={`os-window ${isMobile ? 'os-window--mobile' : ''}`}
      style={style}
      onMouseDown={() => focusWindow(id)}
    >
      <div
        className={`os-window-titlebar ${isMobile ? 'os-window-titlebar--mobile' : ''}`}
        onMouseDown={handleTitleMouseDown}
      >
        <div className="os-window-title">
          {win.icon && <span className="os-window-icon">{win.icon}</span>}
          <span>{win.title}</span>
        </div>
        <div className="os-window-controls">
          {!isMobile && (
            <button className="os-window-btn minimize" onClick={() => minimizeWindow(id)} aria-label="Minimizar">
              _
            </button>
          )}
          {!isMobile && (
            <button className="os-window-btn maximize" onClick={() => toggleMaximize(id)} aria-label="Maximizar">
              {win.isMaximized ? '❐' : '□'}
            </button>
          )}
          <button
            className="os-window-btn close"
            onClick={() => closeWindow(id)}
            aria-label={isMobile ? 'Volver' : 'Cerrar'}
          >
            {isMobile ? '←' : '×'}
          </button>
        </div>
      </div>
      <div className="os-window-content">{win.content}</div>
    </div>
  );
}