import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import type { AppConfig } from '../appsConfig';

const ICON_WIDTH = 90;
const ICON_HEIGHT = 96;
const START_X = 16;
const START_Y = 16;
const STORAGE_KEY = 'arcnalos-icon-positions';

type Positions = Record<string, { x: number; y: number }>;

function loadStoredPositions(): Positions {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePositions(positions: Positions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // localStorage no disponible, se ignora silenciosamente
  }
}

export function useDraggableIcons(apps: AppConfig[], containerRef: RefObject<HTMLDivElement | null>) {
  const [positions, setPositions] = useState<Positions>(() => loadStoredPositions());
  const dragState = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  useEffect(() => {
    setPositions((prev) => {
      const next = { ...prev };
      const containerHeight = containerRef.current?.clientHeight ?? 600;
      const maxRows = Math.max(1, Math.floor((containerHeight - START_Y) / ICON_HEIGHT));

      // Marca qué celdas (col, row) ya están ocupadas por íconos existentes
      const occupied = new Set(
        Object.values(next).map((p) => {
          const col = Math.round((p.x - START_X) / ICON_WIDTH);
          const row = Math.round((p.y - START_Y) / ICON_HEIGHT);
          return `${col}-${row}`;
        })
      );

      let changed = false;
      let col = 0;
      let row = 0;

      apps.forEach((app) => {
        if (next[app.id]) return;

        while (occupied.has(`${col}-${row}`)) {
          row += 1;
          if (row >= maxRows) {
            row = 0;
            col += 1;
          }
        }

        next[app.id] = {
          x: START_X + col * ICON_WIDTH,
          y: START_Y + row * ICON_HEIGHT,
        };
        occupied.add(`${col}-${row}`);
        changed = true;
      });

      if (changed) savePositions(next);
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
      if (dragState.current) {
        setPositions((prev) => {
          savePositions(prev);
          return prev;
        });
      }
      dragState.current = null;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [containerRef]);

  const resetPositions = useCallback(() => {
    const containerHeight = containerRef.current?.clientHeight ?? 600;
    const maxRows = Math.max(1, Math.floor((containerHeight - START_Y) / ICON_HEIGHT));

    const next: Positions = {};
    let col = 0;
    let row = 0;

    apps.forEach((app) => {
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

    setPositions(next);
    savePositions(next);
  }, [apps, containerRef]);

  return { positions, handleDragStart, resetPositions };
}