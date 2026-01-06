import { useEffect, useRef } from 'react'

type Role = {
  company: string
  title: string
  period: string
  bullets: string[]
}

const roles: Role[] = [
  {
    company: 'G2 Solution',
    title: 'Practicante Desarrollador Web',
    period: '2025',
    bullets: [
      'Desarrollé sitios web y sistemas tipo CRM para clínicas ópticas, empresas de seguridad y una academia de manejo.',
      'Participé en el levantamiento de requerimientos y planificación bajo metodología SCRUM.',
      'Maqueté interfaces en Figma y las implementé en frontend responsive.',
      'Implementé funcionalidades backend y consumo de APIs para gestión de datos.',
    ],
  },
  {
    company: 'Proyectos académicos y personales',
    title: 'Desarrollador Full Stack',
    period: '2024 – 2025',
    bullets: [
      'Desarrollé aplicaciones web completas como parte de proyectos académicos y personales.',
      'Implementé frontend con React y maquetación previa en Figma.',
      'Desarrollé APIs REST y lógica backend para gestión de datos.',
      'Versioné el código con Git y documenté funcionalidades.',
    ],
  }
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
