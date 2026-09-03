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

  const positionStyle: CSSProperties =
    win.isMaximized || isMobile
      ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 40px)', zIndex: win.zIndex }
      : {
          top: win.position.y,
          left: win.position.x,
          width: win.size.width,
          height: win.size.height,
          zIndex: win.zIndex,
        };

  const style = {
    ...positionStyle,
    '--window-accent': win.accentColor ?? 'var(--os-accent)',
  } as CSSProperties;

  const isEditor = win.windowStyle === 'editor';
  const isTerminal = win.windowStyle === 'terminal';
  const isExplorer = win.windowStyle === 'explorer';
  const isDatabase = win.windowStyle === 'database';
  const isChat = win.windowStyle === 'chat';
  const isGame = win.windowStyle === 'game';

  return (
      <div
        className={`os-window ${isMobile ? 'os-window--mobile' : ''} ${isEditor ? 'os-window--editor' : ''} ${
          isTerminal ? 'os-window--terminal' : ''
        } ${isExplorer ? 'os-window--explorer' : ''} ${isDatabase ? 'os-window--database' : ''} ${
          isChat ? 'os-window--chat' : ''
        } ${isGame ? 'os-window--game' : ''}`}
        style={style}
        onMouseDown={() => focusWindow(id)}
      >
      <div
        className={`os-window-titlebar ${isMobile ? 'os-window-titlebar--mobile' : ''} ${
          isEditor ? 'os-window-titlebar--editor' : ''
        } ${isTerminal ? 'os-window-titlebar--terminal' : ''} ${isExplorer ? 'os-window-titlebar--explorer' : ''} ${
          isDatabase ? 'os-window-titlebar--database' : ''
        } ${isChat ? 'os-window-titlebar--chat' : ''} ${isGame ? 'os-window-titlebar--game' : ''}`}
        onMouseDown={handleTitleMouseDown}
      >
        {isEditor ? (
          <div className="os-editor-tabs-row">
            <div className="os-editor-tab os-editor-tab--ghost">
              <span className="os-editor-tab-name">utils.ts</span>
            </div>
            <div className="os-editor-tab os-editor-tab--active">
              {win.icon && <span className="os-window-icon">{win.icon}</span>}
              <span className="os-editor-tab-name">{win.title}</span>
              <span className="os-editor-tab-dot" />
            </div>
            <div className="os-editor-tab os-editor-tab--ghost">
              <span className="os-editor-tab-name">styles.css</span>
            </div>
          </div>
        ) : isTerminal ? (
          <div className="os-terminal-titlebar-inner">
            <div className="os-terminal-dots">
              <span className="os-terminal-dot red" />
              <span className="os-terminal-dot yellow" />
              <span className="os-terminal-dot green" />
            </div>
            <span className="os-terminal-title-text">{win.title}</span>
          </div>
        ) : isExplorer ? (
          <div className="os-explorer-titlebar-inner">
            <div className="os-explorer-nav">
              <span className="os-explorer-nav-btn" aria-hidden>‹</span>
              <span className="os-explorer-nav-btn" aria-hidden>›</span>
            </div>
            <div className="os-explorer-address">
              {win.icon && <span className="os-window-icon">{win.icon}</span>}
              <span className="os-explorer-title-text">Escritorio</span>
              <span className="os-explorer-address-sep">/</span>
              <span className="os-explorer-title-text os-explorer-title-text--active">{win.title}</span>
            </div>
            <div className="os-explorer-view-toggle">
              <span className="os-explorer-view-btn active" aria-hidden>▤</span>
              <span className="os-explorer-view-btn" aria-hidden>▦</span>
            </div>
          </div>
        ) : isDatabase ? (
          <div className="os-db-titlebar-inner">
            <span className="os-db-icon-wrap">{win.icon}</span>
            <div className="os-db-meta">
              <span className="os-db-title-text">{win.title}</span>
              <span className="os-db-connection-string">postgresql://localhost:5432/contacto</span>
            </div>
            <span className="os-db-schema-chip">public</span>
            <span className="os-db-status">
              <span className="os-db-status-dot" />
              conectado
            </span>
          </div>
        ) : isChat ? (
          <div className="os-chat-titlebar-inner">
            <span className="os-chat-avatar">
              {win.icon}
              <span className="os-chat-avatar-status" />
            </span>
            <span className="os-chat-title-text">{win.title}</span>
          </div>
        ) : isGame ? (
          <div className="os-game-titlebar-inner">
            <span className="os-game-p1">
              <span className="os-game-p1-dot" />
              P1
            </span>
            {win.icon && <span className="os-window-icon">{win.icon}</span>}
            <span className="os-game-title-text">{win.title}</span>
          </div>
        ) : (
          <div className="os-window-title">
            {win.icon && <span className="os-window-icon">{win.icon}</span>}
            <span>{win.title}</span>
            {win.typeLabel && <span className="os-window-type-badge">{win.typeLabel}</span>}
          </div>
        )}

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