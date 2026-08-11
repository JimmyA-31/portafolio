import { useRef, useState, type MouseEvent } from 'react';
import { ArrowsClockwise, Palette, Info, SquaresFour } from '@phosphor-icons/react';
import { useWindowManager } from '../WindowManager/WindowManager';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import { useDraggableIcons } from '../DesktopIcon/useDraggableIcons';
import WindowsLayer from '../Window/WindowsLayer';
import Taskbar from '../Taskbar/Taskbar';
import { desktopApps, allApps } from '../appsConfig';
import AmbientTerminal from '../Widgets/AmbientTerminal';
import QuickDock from '../Widgets/QuickDock';
import GitHubStatsWidget from '../Widgets/GitHubStatsWidget';
import { useIsMobile } from '../../hooks/useIsMobile';
import MobileIntro from '../Widgets/MobileIntro';
import ParticlesBackground from '../Widgets/ParticlesBackground';
import ContextMenu from '../ContextMenu/ContextMenu';
import { accentThemes, applyAccentTheme } from '../accentThemes';
import CommandPalette from '../CommandPalette/CommandPalette';
import './Desktop.css';

export default function Desktop() {
  const isMobile = useIsMobile();
  const { openWindow } = useWindowManager();
  const iconsAreaRef = useRef<HTMLDivElement>(null);
  const { positions, handleDragStart, resetPositions } = useDraggableIcons(desktopApps, iconsAreaRef);

  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [accentIndex, setAccentIndex] = useState(0);

  const handleOpen = (app: (typeof desktopApps)[number]) => {
    openWindow({
      id: app.id,
      title: app.title,
      icon: app.icon,
      content: app.content,
      width: app.width,
      height: app.height,
    });
  };

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();

    setMenu({ x: e.clientX, y: e.clientY });
  };

  const cycleAccent = () => {
    const next = (accentIndex + 1) % accentThemes.length;
    setAccentIndex(next);
    applyAccentTheme(next);
  };

  const openAboutOS = () => {
    openWindow({
      id: 'about-os',
      title: 'Acerca de ArcnalOS',
      content: (
        <div style={{ padding: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 12.5, lineHeight: 1.7 }}>
          <p style={{ color: 'var(--os-glow)', fontFamily: 'Chakra Petch, sans-serif', fontSize: 16 }}>
            ArcnalOS v1.0.0
          </p>
          <p>Sistema operativo ficticio construido con React + TypeScript.</p>
          <p>Diseñado y desarrollado por Jimmy Alvarez (Arcnal).</p>
          <p style={{ color: 'var(--os-text-muted)' }}>github.com/JimmyA-31</p>
        </div>
      ),
      width: 340,
      height: 220,
    });
  };

  return (
    <div className={`os-desktop ${isMobile ? 'os-desktop--mobile' : ''}`} onContextMenu={!isMobile ? handleContextMenu : undefined}>
      {isMobile ? (
        <div className="os-desktop-icons">
          {desktopApps.map((app) => (
            <DesktopIcon
              key={app.id}
              label={app.label}
              icon={app.icon}
              onOpen={() => handleOpen(app)}
            />
          ))}
        </div>
      ) : (
        <div className="os-desktop-icons-area" ref={iconsAreaRef}>
          {desktopApps.map((app) => {
            const pos = positions[app.id];
            return (
              <DesktopIcon
                key={app.id}
                label={app.label}
                icon={app.icon}
                onOpen={() => handleOpen(app)}
                draggable
                onDragStart={handleDragStart(app.id)}
                style={pos ? { left: pos.x, top: pos.y } : { visibility: 'hidden' }}
              />
            );
          })}
        </div>
      )}

      <WindowsLayer />
      <CommandPalette />
      <ParticlesBackground count={isMobile ? 26 : 45} />

      {isMobile ? (
        <MobileIntro />
      ) : (
        <>
          <GitHubStatsWidget />
          <QuickDock />
          <AmbientTerminal />
        </>
      )}

      {menu && (
        <ContextMenu
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          items={[
            { label: 'Actualizar', icon: <ArrowsClockwise size={16} />, onClick: () => window.location.reload() },
            { label: 'Ordenar íconos', icon: <SquaresFour size={16} />, onClick: resetPositions, divider: true },
            { label: 'Cambiar acento de color', icon: <Palette size={16} />, onClick: cycleAccent },
            { label: 'Acerca de ArcnalOS', icon: <Info size={16} />, onClick: openAboutOS },
          ]}
        />
      )}

      <Taskbar apps={allApps} />
    </div>
  );
}