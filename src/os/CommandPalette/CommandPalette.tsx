import { useEffect, useMemo, useState, type KeyboardEvent } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { desktopApps, type AppConfig } from '../appsConfig';
import { useWindowManager } from '../WindowManager/WindowManager';
import './CommandPalette.css';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const { openWindow } = useWindowManager();

  const results = useMemo(
    () => desktopApps.filter((app) => app.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery('');
        setActiveIndex(0);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleOpenApp = (app: AppConfig) => {
    openWindow({
      id: app.id,
      title: app.title,
      icon: app.icon,
      content: app.content,
      width: app.width,
      height: app.height,
    });
    setOpen(false);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[activeIndex]) {
      handleOpenApp(results[activeIndex]);
    }
  };

  if (!open) return null;

  return (
    <div className="command-palette-overlay" onClick={() => setOpen(false)}>
      <div className="command-palette" onClick={(e) => e.stopPropagation()}>
        <div className="command-palette-input-row">
          <MagnifyingGlass size={16} color="var(--os-text-muted)" />
          <input
            autoFocus
            className="command-palette-input"
            placeholder="Buscar ventana... (Esc para cerrar)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>

        <div className="command-palette-list">
          {results.length === 0 && <p className="command-palette-empty">Sin resultados</p>}
          {results.map((app, i) => (
            <button
              key={app.id}
              type="button"
              className={`command-palette-item ${i === activeIndex ? 'isActive' : ''}`}
              onClick={() => handleOpenApp(app)}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <span className="command-palette-item-icon">{app.icon}</span>
              <span>{app.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}