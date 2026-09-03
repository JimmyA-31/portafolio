import type { AppConfig } from '../appsConfig';
import { useWindowManager } from '../WindowManager/WindowManager';
import { buildWindowConfig } from '../openApp';
import './ExtrasFolder.css';

interface ExtrasFolderProps {
  apps: AppConfig[];
}

export default function ExtrasFolder({ apps }: ExtrasFolderProps) {
  const { openWindow } = useWindowManager();

  return (
    <div className="extras-folder">
      <p className="extras-folder-hint">Contenido extra — doble clic para abrir</p>
      <div className="extras-folder-grid">
        {apps.map((app) => (
          <button
            key={app.id}
            type="button"
            className="extras-folder-item"
            onDoubleClick={() => openWindow(buildWindowConfig(app))}
          >
            <span className="extras-folder-icon">{app.icon}</span>
            <span className="extras-folder-label">{app.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}