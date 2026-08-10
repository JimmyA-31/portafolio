export const accentThemes = [
  { name: 'Ámbar', accent: '#FCA311', glow: '#E5E5E5' },
  { name: 'Cian', accent: '#5BC0BE', glow: '#6FFFE9' },
  { name: 'Rosa', accent: '#E5484D', glow: '#FFD6D9' },
  { name: 'Violeta', accent: '#9B5DE5', glow: '#E0C3FC' },
];

export function applyAccentTheme(index: number) {
  const theme = accentThemes[index % accentThemes.length];
  document.documentElement.style.setProperty('--os-accent', theme.accent);
  document.documentElement.style.setProperty('--os-glow', theme.glow);
}