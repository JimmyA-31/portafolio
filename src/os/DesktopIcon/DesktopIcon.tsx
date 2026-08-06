import type { ReactNode } from 'react';
import './DesktopIcon.css';

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onOpen: () => void;
}

export default function DesktopIcon({ label, icon, onOpen }: DesktopIconProps) {
  return (
    <button className="desktop-icon" onDoubleClick={onOpen} type="button">
      <span className="desktop-icon-glyph">{icon}</span>
      <span className="desktop-icon-label">{label}</span>
    </button>
  );
}