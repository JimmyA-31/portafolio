import { useRef } from 'react';
import { useWindowManager } from '../WindowManager/WindowManager';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import { useDraggableIcons } from '../DesktopIcon/useDraggableIcons';
import WindowsLayer from '../Window/WindowsLayer';
import Taskbar from '../Taskbar/Taskbar';
import { desktopApps } from '../appsConfig';
import AmbientTerminal from '../Widgets/AmbientTerminal';
import QuickDock from '../Widgets/QuickDock';
import GitHubStatsWidget from '../Widgets/GitHubStatsWidget';
import { useIsMobile } from '../../hooks/useIsMobile';
import MobileIntro from '../Widgets/MobileIntro';
import ParticlesBackground from '../Widgets/ParticlesBackground';
import './Desktop.css';

export default function Desktop() {
  const isMobile = useIsMobile();
  const { openWindow } = useWindowManager();
  const iconsAreaRef = useRef<HTMLDivElement>(null);
  const { positions, handleDragStart } = useDraggableIcons(desktopApps, iconsAreaRef);

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

  return (
    <div className={`os-desktop ${isMobile ? 'os-desktop--mobile' : ''}`}>
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
      <Taskbar apps={desktopApps} />
    </div>
  );
}