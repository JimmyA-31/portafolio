import { useEffect } from 'react'
import {
  CpuChipIcon,
  CircleStackIcon,
  Squares2X2Icon,
  SparklesIcon,
  BoltIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'

type Pill = {
  label: string
  Icon: React.ComponentType<{ className?: string }>
}

type Pillar = {
  title: string
  subtitle: string
  Icon: React.ComponentType<{ className?: string }>
  items: string[]
}

const pillars: Pillar[] = [
  {
    title: 'Lo que hago',
    subtitle: 'Construcción end-to-end con foco en base sólida.',
    Icon: Squares2X2Icon,
    items: [
      'Diseño de APIs REST claras y mantenibles.',
      'Optimización de SQL y modelado relacional.',
      'Interfaces React con estado predecible y TypeScript.',
    ],
  },
  {
    title: 'Cómo trabajo',
    subtitle: 'Calidad sostenida antes que soluciones rápidas.',
    Icon: SparklesIcon,
    items: [
      'Performance y buena experiencia de desarrollo.',
      'Código legible, tipado y bien estructurado.',
      'Entrega continua sin fricción.',
    ],
  },
]

const pills: Pill[] = [
  { label: 'React + TypeScript', Icon: CpuChipIcon },
  { label: 'SQL & Data', Icon: CircleStackIcon },
  { label: 'UI moderna', Icon: BoltIcon },
  { label: 'Buenas prácticas', Icon: ShieldCheckIcon },
]

export default function About() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.aboutCard')

    cards.forEach(card => {
      const handleMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        card.style.setProperty('--x', `${x}%`)
        card.style.setProperty('--y', `${y}%`)
      }

      card.addEventListener('mousemove', handleMove)

      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--x')
        card.style.removeProperty('--y')
      })
    })
  }, [])

  return (
    <section id="about" className="section sectionSoft">
      <div className="container">
        <header className="sectionHead">
          <h2 className="sectionTitle">Sobre mí</h2>

          <p className="sectionSubtitle">
            Desarrollo productos web con backend sólido, datos bien diseñados
            y frontend moderno. Me enfoco en dejar bases limpias y sistemas
            fáciles de mantener.
          </p>

          <div className="pillRow" aria-label="Enfoque técnico principal">
            {pills.map(p => (
              <span key={p.label} className="pill">
                <p.Icon className="pillIcon" />
                {p.label}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-2">
          {pillars.map(pillar => (
            <article
              key={pillar.title}
              className="panel glowBorder card aboutCard"
            >
              <header className="aboutCardHead">
                <span className="aboutCardIconWrap" aria-hidden>
                  <pillar.Icon className="aboutCardIcon" />
                </span>

                <div>
                  <p className="aboutCardTitle">{pillar.title}</p>
                  <p className="aboutCardSubtitle">{pillar.subtitle}</p>
                </div>
              </header>

              <ul className="aboutList">
                {pillar.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
