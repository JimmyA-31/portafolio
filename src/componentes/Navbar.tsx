import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../hooks/useTheme'
import {
  CommandLineIcon,
  CodeBracketIcon,
  Squares2X2Icon,
  SparklesIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'

const links = [
  { id: 'about', label: 'Sobre mí', Icon: SparklesIcon },
  { id: 'projects', label: 'Proyectos', Icon: Squares2X2Icon },
  { id: 'skills', label: 'Skills', Icon: CodeBracketIcon },
  { id: 'experience', label: 'Experiencia', Icon: CommandLineIcon },
  { id: 'contact', label: 'Contacto', Icon: EnvelopeIcon },
]

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navWrap ${scrolled ? 'navWrap--scrolled' : ''}`}>
      <div className="navInner">
        <a className="brand" href="#top" aria-label="Ir al inicio">
          <span className="brandMark" />
          <span className="brandText">Jimmy Alvarez</span>
          <span className="brandTag">Full Stack</span>
        </a>

        <nav className="navLinks" aria-label="Navegación principal">
          {links.map(({ id, label, Icon }) => (
            <a key={id} className="navLinkX" href={`#${id}`}>
              <Icon className="navIcon" />
              <span>{label}</span>
              <span className="navLinkGlow" />
            </a>
          ))}
        </nav>

        <div className="navActions">
          <button className="navBtn navBtn--ghost" type="button" onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon className="navIcon" /> : <MoonIcon className="navIcon" />}
            {theme === 'dark' ? 'Claro' : 'Oscuro'}
          </button>

          <a className="navBtn" href="https://github.com/ejemplo" target="_blank" rel="noreferrer">
            <ArrowTopRightOnSquareIcon className="navIcon" />
            GitHub
          </a>
        </div>

      </div>
    </header>
  )
}
