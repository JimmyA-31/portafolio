import type { ReactNode } from 'react';
import {
  FileCode,
  FolderOpen,
  Terminal,
  Database,
  TreeStructure,
  ChatCircleDots,
  GameController,
  Bomb as BombIcon,
  Package,
} from '@phosphor-icons/react';
import About from '../components/About/About';
import Proyectos from '../components/Proyectos/Proyectos';
import Skills from '../components/Skills/Skills';
import Experiencia from '../components/Experiencia/Experiencia';
import Contacto from '../components/Contacto/Contacto';
import TerminalApp from './apps/TerminalApp';
import ChatbotApp from './apps/ChatbotApp';
import SnakeGame from './apps/SnakeGame';
import MinesweeperGame from './apps/MinesweeperGame';
import ExtrasFolder from './apps/ExtrasFolder';

export interface AppConfig {
  id: string;
  label: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
  width: number;
  height: number;
  accentColor: string;
  typeLabel: string;
  windowStyle?: string;
}

const ICON_SIZE = 34;
const ICON_PROPS = { size: ICON_SIZE, weight: 'regular' as const };

// Apps "extra": juegos y asistente, viven dentro de la carpeta Extras
export const extraApps: AppConfig[] = [
  {
    id: 'chatbot',
    label: 'Asistente.exe',
    title: 'Asistente.exe',
    icon: <ChatCircleDots {...ICON_PROPS} color="var(--os-accent)" />,
    content: <ChatbotApp />,
    width: 420,
    height: 500,
    accentColor: '#5BC0BE',
    typeLabel: 'BOT',
    windowStyle: 'chat',
  },
  {
    id: 'snake',
    label: 'Snake.exe',
    title: 'Snake.exe',
    icon: <GameController {...ICON_PROPS} color="var(--os-glow)" />,
    content: <SnakeGame />,
    width: 420,
    height: 460,
    accentColor: '#22C55E',
    typeLabel: 'GAME',
    windowStyle: 'game',
  },
  {
    id: 'minesweeper',
    label: 'Buscaminas.exe',
    title: 'Buscaminas.exe',
    icon: <BombIcon {...ICON_PROPS} color="var(--os-accent)" />,
    content: <MinesweeperGame />,
    width: 380,
    height: 390,
    accentColor: '#E5484D',
    typeLabel: 'GAME',
    windowStyle: 'game',
  },
];

// Apps principales: lo primero que ve el visitante en el escritorio
export const desktopApps: AppConfig[] = [
  {
    id: 'sobre-mi',
    label: 'about.ts',
    title: 'about.ts',
    icon: <FileCode {...ICON_PROPS} color="var(--os-glow)" />,
    content: <About />,
    width: 700,
    height: 460,
    accentColor: '#5BC0BE',
    typeLabel: 'TS',
    windowStyle: 'editor',
  },
  {
    id: 'proyectos',
    label: 'Proyectos',
    title: 'Proyectos',
    icon: <FolderOpen {...ICON_PROPS} color="var(--os-accent)" />,
    content: <Proyectos />,
    width: 680,
    height: 520,
    accentColor: '#FCA311',
    typeLabel: 'DIR',
    windowStyle: 'explorer',
  },
  {
    id: 'skills',
    label: 'skills.map',
    title: 'skills.map',
    icon: <TreeStructure {...ICON_PROPS} color="var(--os-glow)" />,
    content: <Skills />,
    width: 620,
    height: 500,
    accentColor: '#22C55E',
    typeLabel: 'MAP',
    windowStyle: 'editor',
  },
  {
    id: 'experiencia',
    label: 'Experiencia',
    title: 'Experiencia',
    icon: <Terminal {...ICON_PROPS} color="var(--os-accent)" />,
    content: <Experiencia />,
    width: 600,
    height: 500,
    accentColor: '#94A3B8',
    typeLabel: 'LOG',
    windowStyle: 'terminal',
  },
  {
    id: 'contacto',
    label: 'Contacto',
    title: 'Contacto',
    icon: <Database {...ICON_PROPS} color="var(--os-glow)" />,
    content: <Contacto />,
    width: 480,
    height: 440,
    accentColor: '#9B5DE5',
    typeLabel: 'SQL',
    windowStyle: 'database',
  },
  {
    id: 'terminal',
    label: 'Terminal.exe',
    title: 'Terminal.exe',
    icon: <Terminal {...ICON_PROPS} color="var(--os-accent)" />,
    content: <TerminalApp />,
    width: 560,
    height: 400,
    accentColor: '#F97316',
    typeLabel: 'SH',
    windowStyle: 'terminal',
  },
  {
    id: 'extras',
    label: 'Extras',
    title: 'Extras',
    icon: <Package {...ICON_PROPS} color="var(--os-glow)" />,
    content: <ExtrasFolder apps={extraApps} />,
    width: 420,
    height: 390,
    accentColor: '#FCA311',
    typeLabel: 'DIR',
    windowStyle: 'explorer',
  },
];

// Lista completa, usada donde se necesita buscar cualquier ícono (ej. Taskbar)
export const allApps: AppConfig[] = [...desktopApps, ...extraApps];