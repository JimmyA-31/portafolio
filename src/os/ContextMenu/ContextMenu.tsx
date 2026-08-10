import { useEffect, useRef, useState, type ReactNode } from 'react';
import './ContextMenu.css';

export interface ContextMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  divider?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const rect = menu.getBoundingClientRect();
    const clampedX = Math.min(x, window.innerWidth - rect.width - 8);
    const clampedY = Math.min(y, window.innerHeight - rect.height - 48);
    setPos({ x: Math.max(8, clampedX), y: Math.max(8, clampedY) });
  }, [x, y]);

    useEffect(() => {
    function handleClick() {
        onClose();
    }

    window.addEventListener('click', handleClick);

    return () => {
        window.removeEventListener('click', handleClick);
    };
    }, [onClose]);

  return (
    <div className="context-menu" style={{ left: pos.x, top: pos.y }} ref={menuRef}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            className="context-menu-item"
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            {item.icon && <span className="context-menu-icon">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
          {item.divider && <div className="context-menu-divider" />}
        </div>
      ))}
    </div>
  );
}