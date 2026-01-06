import { useEffect, useState } from 'react'
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  CommandLineIcon,
  CodeBracketIcon,
  Squares2X2Icon,
  SparklesIcon,
  EnvelopeIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from '../hooks/useTheme'

const links = [
  { id: 'about', label: 'Sobre mí', Icon: SparklesIcon },
  { id: 'projects', label: 'Proyectos', Icon: Squares2X2Icon },
  { id: 'skills', label: 'Skills', Icon: CodeBracketIcon },
  { id: 'experience', label: 'Experiencia', Icon: CommandLineIcon },
  { id: 'contact', label: 'Contacto', Icon: EnvelopeIcon },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`navWrap ${scrolled ? 'navWrap--scrolled' : ''}`}>
        <div className="navInner">
          <a className="brand" href="#top">
            <span className="brandMark" />
            <span className="brandText">Jimmy Alvarez</span>
            <span className="brandTag">Full Stack</span>
          </a>

          {/* Desktop */}
          <nav className="navLinks">
            {links.map(({ id, label, Icon }) => (
              <a key={id} className="navLinkX" href={`#${id}`}>
                <Icon className="navIcon" />
                {label}
              </a>
            ))}
          </nav>

          <div className="navActions">
            <button
              type="button"
              className="navBtn navBtn--ghost"
              onClick={toggleTheme}
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? (
                <SunIcon className="navIcon" />
              ) : (
                <MoonIcon className="navIcon" />
              )}
            </button>

            <a
              className="navBtn"
              href="https://github.com/JimmyA-31"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <ArrowTopRightOnSquareIcon className="navIcon" />
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              className="navBtn navBtn--menu"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            >
              {open ? (
                <XMarkIcon className="navIcon" />
              ) : (
                <Bars3Icon className="navIcon" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`mobileOverlay ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`mobileMenu ${open ? 'open' : ''}`}>
        {links.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            className="mobileLink"
            onClick={() => setOpen(false)}
          >
            <Icon className="navIcon" />
            {label}
          </a>
        ))}
      </aside>
    </>
  )
}
