import { LinkedinLogo, GithubLogo, EnvelopeSimple } from '@phosphor-icons/react';
import './QuickDock.css';

const links = [
  { href: 'https://www.linkedin.com/in/jimmy-alvarez-30315225b/', Icon: LinkedinLogo, label: 'LinkedIn' },
  { href: 'https://github.com/JimmyA-31', Icon: GithubLogo, label: 'GitHub' },
  { href: 'mailto:jimmy.alvarez.saavedra@gmail.com', Icon: EnvelopeSimple, label: 'Email' },
];

export default function QuickDock() {
  return (
    <div className="quick-dock">
      {links.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noreferrer"
          className="quick-dock-item"
          title={label}
        >
          <Icon size={18} weight="regular" color="var(--os-glow)" />
        </a>
      ))}
    </div>
  );
}