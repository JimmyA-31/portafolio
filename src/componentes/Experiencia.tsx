import { useEffect, useRef } from 'react'

type Role = {
  company: string
  title: string
  period: string
  bullets: string[]
}

const roles: Role[] = [
  {
    company: 'NeonSoft Studio (ejemplo)',
    title: 'Full-Stack Developer',
    period: '2024 – 2025',
    bullets: [
      'Implementé endpoints REST y validaciones para módulos de ventas.',
      'Optimicé consultas reduciendo tiempos de respuesta (caso demo).',
      'Refactor de componentes React para reuso y mantenibilidad.',
    ],
  },
  {
    company: 'DataCraft Labs (ejemplo)',
    title: 'Backend Developer',
    period: '2023 – 2024',
    bullets: [
      'Diseño de procedimientos almacenados y transacciones.',
      'Integración de autenticación y auditoría.',
      'Soporte a despliegues y troubleshooting en producción.',
    ],
  },
]

export default function Experiencia() {
  const timelineRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight

      const start = windowH * 0.2
      const end = windowH * 0.8

      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (rect.height + (start - end)))
      )

      el.style.setProperty('--xp-progress', progress.toString())
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div className="sectionHead">
          <h2 className="sectionTitle">Experiencia</h2>
          <p className="sectionSubtitle">
            Historial ficticio para que lo reemplaces por el tuyo.
          </p>
        </div>

        <ol
          ref={timelineRef}
          className="xpTimeline"
          aria-label="Experiencia laboral"
        >
          {roles.map((r, i) => (
            <li
              key={r.company}
              className={`xpItem ${i === 0 ? 'isPrimary' : ''}`}
            >
              <div className="xpRail" aria-hidden="true">
                <span className="xpDot" />
              </div>

              <article className="xpCard">
                <header className="xpHead">
                  <div className="xpMain">
                    <h3 className="xpTitle">{r.title}</h3>
                    <p className="xpCompany">{r.company}</p>
                  </div>

                  <span className="xpPeriod badge">{r.period}</span>
                </header>

                <ul className="xpBullets">
                  {r.bullets.map(b => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
