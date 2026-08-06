import type { ReactNode } from 'react';
import {
  FileCode,
  FolderOpen,
  FileText,
  Terminal,
  Database,
} from '@phosphor-icons/react';
import About from '../components/About/About';
import Proyectos from '../components/Proyectos/Proyectos';
import Skills from '../components/Skills/Skills';
import Experiencia from '../components/Experiencia/Experiencia';
import Contacto from '../components/Contacto/Contacto';

export interface AppConfig {
  id: string;
  label: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
  width: number;
  height: number;
}

const ICON_SIZE = 34;
const ICON_PROPS = { size: ICON_SIZE, weight: 'regular' as const };

export const desktopApps: AppConfig[] = [
  {
    id: 'sobre-mi',
    label: 'about.ts',
    title: 'about.ts',
    icon: <FileCode {...ICON_PROPS} color="var(--os-glow)" />,
    content: <About />,
    width: 520,
    height: 460,
  },
  {
    id: 'proyectos',
    label: 'Proyectos',
    title: 'Proyectos',
    icon: <FolderOpen {...ICON_PROPS} color="var(--os-accent)" />,
    content: <Proyectos />,
    width: 680,
    height: 520,
  },
  {
    id: 'skills',
    label: 'skills.log',
    title: 'skills.log',
    icon: <FileText {...ICON_PROPS} color="var(--os-glow)" />,
    content: <Skills />,
    width: 560,
    height: 480,
  },
  {
    id: 'experiencia',
    label: 'Experiencia',
    title: 'Experiencia',
    icon: <Terminal {...ICON_PROPS} color="var(--os-accent)" />,
    content: <Experiencia />,
    width: 600,
    height: 500,
  },
  {
    id: 'contacto',
    label: 'Contacto',
    title: 'Contacto',
    icon: <Database {...ICON_PROPS} color="var(--os-glow)" />,
    content: <Contacto />,
    width: 480,
    height: 440,
  },
];