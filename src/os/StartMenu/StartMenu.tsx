import { LinkedinLogo, ArrowSquareOut } from '@phosphor-icons/react';
import { desktopApps, type AppConfig } from '../appsConfig';
import { useWindowManager } from '../WindowManager/WindowManager';
import './StartMenu.css';

interface StartMenuProps {
  onClose: () => void;
}

export default function StartMenu({ onClose }: StartMenuProps) {
  const { openWindow } = useWindowManager();

  const handleOpen = (app: AppConfig) => {
    openWindow({
      id: app.id,
      title: app.title,
      icon: app.icon,
      content: app.content,
      width: app.width,
      height: app.height,
    });
    onClose();
  };

  const year = new Date().getFullYear();

  return (
    <>
      <div className="start-menu-overlay" onClick={onClose} />
      <div className="start-menu">
        <div className="start-menu-brand">
          <span className="start-menu-brand-name">Jimmy Alvarez</span>
          <span className="start-menu-brand-tag">Full Stack Developer</span>
        </div>

        <div className="start-menu-links">
          {desktopApps.map((app) => (
            <button
              key={app.id}
              type="button"
              className="start-menu-link"
              onClick={() => handleOpen(app)}
            >
              <span className="start-menu-link-icon">{app.icon}</span>
              <span>{app.title}</span>
            </button>
          ))}
        </div>

        <a
          className="start-menu-link start-menu-social"
          href="https://www.linkedin.com/in/jimmy-alvarez-30315225b/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedinLogo size={20} weight="regular" color="var(--os-glow)" />
          <span>LinkedIn</span>
          <ArrowSquareOut size={14} color="var(--os-text-muted)" style={{ marginLeft: 'auto' }} />
        </a>

        <div className="start-menu-footer">
          <p>© {year} Jimmy Dev</p>
          <p>
            Hecho con <strong>React</strong> + <strong>TypeScript</strong>
          </p>
        </div>
      </div>
    </>
  );
}