import type { AppConfig } from './appsConfig';
import type { WindowConfig } from './WindowManager/WindowManager';

export function buildWindowConfig(app: AppConfig): WindowConfig {
  return {
    id: app.id,
    title: app.title,
    icon: app.icon,
    content: app.content,
    width: app.width,
    height: app.height,
    accentColor: app.accentColor,
    typeLabel: app.typeLabel,
    windowStyle: app.windowStyle,
  };
}