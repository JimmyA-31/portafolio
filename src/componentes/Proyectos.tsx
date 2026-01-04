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
    name: 'GreenDash Analytics',
    desc: 'Dashboard de métricas con filtros, gráficos y exportación CSV (datos demo).',
    stack: ['React', 'TypeScript', 'Vite', 'REST'],
    year: 2025,
    repo: 'https://github.com/ejemplo/greendash',
    demo: 'https://greendash.ejemplo.dev',
  },
  {
    name: 'ShopFlow API',
    desc: 'API para pedidos con JWT, roles y documentación (mock).',
    stack: ['Node', 'Express', 'PostgreSQL', 'JWT'],
    year: 2025,
    repo: 'https://github.com/ejemplo/shopflow-api',
  },
  {
    name: 'Notes Vault',
    desc: 'Notas con búsqueda, tags y modo offline (ejemplo).',
    stack: ['React', 'IndexedDB', 'CSS'],
    year: 2025,
    demo: 'https://notes.ejemplo.dev',
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
            Proyectos de ejemplo enfocados en arquitectura, UI y buenas prácticas.
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
