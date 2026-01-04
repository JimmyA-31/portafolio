import { useEffect, useMemo, useRef, type ComponentType } from 'react'
import {
  SiPhp,
  SiMysql,
  SiReact,
  SiGit,
  SiGithub,
} from '@icons-pack/react-simple-icons'

type Tech = {
  id: string
  label: string
  Icon: ComponentType<{ className?: string }>
}

/**
 * Tecnologías coherentes con tu perfil real
 * (backend sólido + React)
 */
const techs: Tech[] = [
  { id: 'php-1', label: 'PHP · APIs REST', Icon: SiPhp },
  { id: 'mysql-1', label: 'MySQL · Modelado relacional', Icon: SiMysql },
  { id: 'react-1', label: 'React · UI mantenible', Icon: SiReact },
  { id: 'git-1', label: 'Git · Control de versiones', Icon: SiGit },
  { id: 'github-1', label: 'GitHub · Flujo de trabajo', Icon: SiGithub },

  // duplicado real para loop continuo
  { id: 'php-2', label: 'PHP · APIs REST', Icon: SiPhp },
  { id: 'mysql-2', label: 'MySQL · Modelado relacional', Icon: SiMysql },
  { id: 'react-2', label: 'React · UI mantenible', Icon: SiReact },
  { id: 'git-2', label: 'Git · Control de versiones', Icon: SiGit },
  { id: 'github-2', label: 'GitHub · Flujo de trabajo', Icon: SiGithub },

  // duplicado real para loop continuo
  { id: 'php-2', label: 'PHP · APIs REST', Icon: SiPhp },
  { id: 'mysql-2', label: 'MySQL · Modelado relacional', Icon: SiMysql },
  { id: 'react-2', label: 'React · UI mantenible', Icon: SiReact },
  { id: 'git-2', label: 'Git · Control de versiones', Icon: SiGit },
  { id: 'github-2', label: 'GitHub · Flujo de trabajo', Icon: SiGithub }
]

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="tickerTrack" aria-hidden={ariaHidden}>
      {techs.map(t => (
        <span
          key={t.id}
          className="tickerItem"
          title={t.label}
          aria-label={t.label}
        >
          <t.Icon className="tickerIcon" />
        </span>
      ))}
    </div>
  )
}

export default function TechTicker() {
  const moveRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  // velocidad moderada → acompaña, no distrae
  const speed = 45

  const dupKey = useMemo(
    () => `dup-${Math.random().toString(16).slice(2)}`,
    []
  )

  useEffect(() => {
    const moveEl = moveRef.current
    const trackEl = trackRef.current
    if (!moveEl || !trackEl) return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return

    let raf = 0
    let last = performance.now()
    let x = 0
    let w = 0

    const measure = () => {
      w = trackEl.getBoundingClientRect().width
    }

    measure()
    window.addEventListener('resize', measure)

    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now

      if (!isHovering.current) {
        x += speed * dt
        if (w > 0) x = x % w
        moveEl.style.transform = `translate3d(${-x}px, 0, 0)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section
      className="tickerWrap"
      aria-label="Tecnologías utilizadas en proyectos reales"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <p className="tickerKicker">
        Tecnologías que uso en proyectos reales
      </p>

      <div ref={moveRef} className="tickerMove">
        {/* Track base */}
        <div ref={trackRef} className="tickerTrackWrap">
          <Track />
        </div>

        {/* Track duplicado */}
        <div
          className="tickerTrackWrap"
          aria-hidden="true"
          data-dup={dupKey}
        >
          <Track ariaHidden />
        </div>
      </div>
    </section>
  )
}
