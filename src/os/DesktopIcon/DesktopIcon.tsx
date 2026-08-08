import type { ReactNode, CSSProperties, MouseEvent } from 'react';
import './DesktopIcon.css';

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onOpen: () => void;
  style?: CSSProperties;
  onDragStart?: (e: MouseEvent<HTMLButtonElement>) => void;
  draggable?: boolean;
}

export default function DesktopIcon({ label, icon, onOpen, style, onDragStart, draggable }: DesktopIconProps) {
  return (
    <button
      className={`desktop-icon ${draggable ? 'desktop-icon--draggable' : ''}`}
      onDoubleClick={onOpen}
      onMouseDown={onDragStart}
      style={style}
      type="button"
    >
      <span className="desktop-icon-glyph">{icon}</span>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
}