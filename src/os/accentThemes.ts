export const accentThemes = [
  { name: 'Ámbar', accent: '#FCA311', accentRgb: '252, 163, 17', glow: '#FFD180', glowRgb: '255, 208, 128' },
  { name: 'Cian', accent: '#5BC0BE', accentRgb: '91, 192, 190', glow: '#6FFFE9', glowRgb: '111, 255, 233' },
  { name: 'Rosa', accent: '#E5484D', accentRgb: '229, 72, 77', glow: '#FFD6D9', glowRgb: '255, 214, 217' },
  { name: 'Violeta', accent: '#9B5DE5', accentRgb: '155, 93, 229', glow: '#E0C3FC', glowRgb: '224, 195, 252' },
];

const ACCENT_STORAGE_KEY = 'arcnalos-accent-index';

export function applyAccentTheme(index: number) {
  const theme = accentThemes[index % accentThemes.length];
  const root = document.documentElement.style;
  root.setProperty('--os-accent', theme.accent);
  root.setProperty('--os-accent-rgb', theme.accentRgb);
  root.setProperty('--os-glow', theme.glow);
  root.setProperty('--os-glow-rgb', theme.glowRgb);

  try {
    localStorage.setItem(ACCENT_STORAGE_KEY, String(index));
  } catch {
    // localStorage no disponible, se ignora silenciosamente
  }
}

export function loadStoredAccentIndex(): number {
  try {
    const raw = localStorage.getItem(ACCENT_STORAGE_KEY);
    return raw ? Number(raw) : 0;
  } catch {
    return 0;
  }
}