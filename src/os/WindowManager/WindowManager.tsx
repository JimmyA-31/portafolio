import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';

export interface WindowConfig {
  id: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

interface WindowState {
  id: string;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
}

interface WindowManagerContextType {
  windows: WindowState[];
  openWindow: (config: WindowConfig) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

// Desplaza cada ventana nueva un poco respecto a la anterior (efecto "cascada")
let cascadeStep = 0;

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zCounter = useRef(10);

  const openWindow = useCallback((config: WindowConfig) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === config.id);

      // Si ya está abierta, solo la traemos al frente y la desminimizamos
      if (existing) {
        zCounter.current += 1;
        const z = zCounter.current;
        return prev.map((w) =>
          w.id === config.id ? { ...w, isMinimized: false, zIndex: z } : w
        );
      }

      zCounter.current += 1;
      cascadeStep = (cascadeStep + 1) % 6;
      const offset = cascadeStep * 28;

      const newWindow: WindowState = {
        id: config.id,
        title: config.title,
        icon: config.icon,
        content: config.content,
        isMinimized: false,
        isMaximized: false,
        zIndex: zCounter.current,
        position: { x: config.x ?? 120 + offset, y: config.y ?? 30 + offset },
        size: { width: config.width ?? 520, height: config.height ?? 420 },
      };
      return [...prev, newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.isMaximized) {
          return {
            ...w,
            isMaximized: false,
            position: w.prevPosition ?? w.position,
            size: w.prevSize ?? w.size,
          };
        }
        return { ...w, isMaximized: true, prevPosition: w.position, prevSize: w.size };
      })
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    zCounter.current += 1;
    const z = zCounter.current;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: z } : w))
    );
  }, []);

  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position } : w)));
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximize,
        focusWindow,
        updatePosition,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error('useWindowManager debe usarse dentro de <WindowManagerProvider>');
  }
  return ctx;
}