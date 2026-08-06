import { useWindowManager } from '../WindowManager/WindowManager';
import DesktopIcon from '../DesktopIcon/DesktopIcon';
import WindowsLayer from '../Window/WindowsLayer';
import Taskbar from '../Taskbar/Taskbar';
import { desktopApps } from '../appsConfig';
import AmbientTerminal from '../Widgets/AmbientTerminal';
import QuickDock from '../Widgets/QuickDock';
import GitHubStatsWidget from '../Widgets/GitHubStatsWidget';
import { useIsMobile } from '../../hooks/useIsMobile';
import './Desktop.css';

export default function Desktop() {
  const isMobile = useIsMobile();
  const { openWindow } = useWindowManager();

  return (
    <div className={`os-desktop ${isMobile ? 'os-desktop--mobile' : ''}`}>
      <div className="os-desktop-icons">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            label={app.label}
            icon={app.icon}
            onOpen={() =>
              openWindow({
                id: app.id,
                title: app.title,
                icon: app.icon,
                content: app.content,
                width: app.width,
                height: app.height,
              })
            }
          />
        ))}
      </div>

      <WindowsLayer />
      {!isMobile && (
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