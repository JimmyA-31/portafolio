import { SiPhp, SiMysql, SiReact, SiGit, SiGithub } from '@icons-pack/react-simple-icons';
import './TechTicker.css';

const techs = [
  { id: 'php', label: 'PHP', Icon: SiPhp },
  { id: 'mysql', label: 'MySQL', Icon: SiMysql },
  { id: 'react', label: 'React', Icon: SiReact },
  { id: 'git', label: 'Git', Icon: SiGit },
  { id: 'github', label: 'GitHub', Icon: SiGithub },
];

const loopedTechs = [...techs, ...techs];

export default function TechTicker() {
  return (
    <div className="taskbar-ticker" aria-label="Stack tecnológico">
      <div className="taskbar-ticker-track">
        {loopedTechs.map((t, i) => (
          <span key={`${t.id}-${i}`} className="taskbar-ticker-item" title={t.label}>
            <t.Icon size={16} color="var(--os-glow)" />
          </span>
        ))}
      </div>
    </div>
  );
}