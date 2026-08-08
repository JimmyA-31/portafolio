import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import type { AppConfig } from '../appsConfig';

const ICON_WIDTH = 90;
const ICON_HEIGHT = 96;
const START_X = 16;
const START_Y = 16;

export function useDraggableIcons(apps: AppConfig[], containerRef: RefObject<HTMLDivElement | null>) {
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const dragState = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    setPositions((prev) => {
      const next = { ...prev };
      const containerHeight = containerRef.current?.clientHeight ?? 600;
      const maxRows = Math.max(1, Math.floor((containerHeight - START_Y) / ICON_HEIGHT));

      let col = 0;
      let row = 0;

      apps.forEach((app) => {
        if (next[app.id]) return;
        next[app.id] = {
          x: START_X + col * ICON_WIDTH,
          y: START_Y + row * ICON_HEIGHT,
        };
        row += 1;
        if (row >= maxRows) {
          row = 0;
          col += 1;
        }
      });

      return next;
    });
  }, [apps, containerRef]);

  const handleDragStart = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      const pos = positions[id];
      if (!pos) return;
      dragState.current = {
        id,
        offsetX: e.clientX - pos.x,
        offsetY: e.clientY - pos.y,
      };
    },
    [positions]
  );

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!dragState.current) return;
      const { id, offsetX, offsetY } = dragState.current;
      const container = containerRef.current;
      const maxX = (container?.clientWidth ?? 1200) - ICON_WIDTH;
      const maxY = (container?.clientHeight ?? 600) - ICON_HEIGHT;

      const x = Math.min(Math.max(0, e.clientX - offsetX), maxX);
      const y = Math.min(Math.max(0, e.clientY - offsetY), maxY);

      setPositions((prev) => ({ ...prev, [id]: { x, y } }));
    }

    function handleMouseUp() {
      dragState.current = null;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [containerRef]);

  return { positions, handleDragStart };
}