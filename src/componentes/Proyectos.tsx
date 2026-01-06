import { useReveal } from '../hooks/useReveal'
import TiltCard from './Tiltcard'

type Project = {
  name: string
  desc: string
  stack: string[]
  year: number
  repo?: string
  demo?: string
}

const projects: Project[] = [
  {
    name: 'Whizzet',
    desc: 'Página web de agencia de marketing digital, branding y desarrollo web.',
    stack: ['PHP', 'MySql', 'Javascript', 'Figma', 'Bootstrap'],
    year: 2025,
    demo: 'https://whizzet.com/',
  },
  {
    name: 'G2 Solution',
    desc: 'Pagína web de empresa de seguridad electrónica y mantenimiento.',
    stack: ['PHP', 'MySql', 'Javascript', 'Figma', 'Bootstrap'],
    year: 2025,
    demo: 'https://g2solutionperu.com/',
  },
  {
    name: 'Optivisión Perú',
    desc: 'Página web de empresa de servicios ópticos y venta de lentes de contacto. (Incluye CRM)',
    stack: ['PHP', 'MySql', 'Javascript', 'Figma', 'Bootstrap'],
    year: 2025,
    demo: 'https://optivisionperu.online/',
  },
]

export default function Proyectos() {
  const { ref, shown } = useReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      id="projects"
      className={`section reveal ${shown ? 'isShown' : ''}`}
    >
      <div className="container">
        <header className="sectionHead">
          <h2 className="sectionTitle">Proyectos</h2>
          <p className="sectionSubtitle">
            Alugnos Proyectos que realizé enfocados en arquitectura, UI y buenas prácticas.
          </p>
        </header>

        <div className="grid grid-3">
          {projects.map(project => (
            <TiltCard
              key={project.name}
              className="card glow projectCard"
            >
              <article>
                <header className="projectHead">
                  <h3 className="projectTitle">{project.name}</h3>
                  <span className="badge">{project.year}</span>
                </header>

                <p className="projectDesc">{project.desc}</p>

                <ul className="projectStack">
                  {project.stack.map(tech => (
                    <li key={tech} className="badge">
                      {tech}
                    </li>
                  ))}
                </ul>

                <footer className="projectActions">
                  {project.repo && (
                    <a
                      className="btn btnGhost"
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repo
                    </a>
                  )}
                  {project.demo && (
                    <a
                      className="btn"
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Demo
                    </a>
                  )}
                </footer>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
