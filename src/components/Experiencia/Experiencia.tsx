import './Experiencia.css'

type Role = {
  company: string
  title: string
  period: string
  bullets: string[]
}

const roles: Role[] = [
  {
    company: 'Overskull S.A.C',
    title: 'Programador',
    period: '2026',
    bullets: [
      'Realicé el mantenimiento y soporte de módulos del sistema, identificando y resolviendo incidencias en plataformas web en producción.',
      'Desarrollé la maquetación de módulos responsivos, enfocados en usabilidad y rendimiento.',
      'Implementé y consumí APIs para la integración de funcionalidades y la generación de reportes en Power BI.',
      'Ejecuté el mantenimiento de bases de datos, asegurando la integridad y disponibilidad de la información.',
    ],
  },
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
    period: '2024 – 2026',
    bullets: [
      'Desarrollé aplicaciones web completas como parte de proyectos académicos y personales.',
      'Implementé frontend con React y maquetación previa en Figma.',
      'Desarrollé APIs REST y lógica backend para gestión de datos.',
      'Versioné el código con Git y documenté funcionalidades.',
    ],
  },
]

export default function Experiencia() {
  return (
    <section id="experience" className="skills-terminal">
      <div className="terminal-titlebar">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-titlebar-label">arcnal@portfolio: ~/experiencia</span>
      </div>

      <div className="terminal-body">
        <div className="terminal-line terminal-prompt">
          <span className="terminal-prompt-symbol">arcnal@portfolio</span>
          <span className="terminal-prompt-path">~$</span>
          <span className="terminal-prompt-cmd">experiencia --timeline</span>
        </div>

        {roles.map((r) => (
          <div className="terminal-group" key={r.company}>
            <p className="terminal-group-title">
              <span className="terminal-group-caret">▸</span> {r.title}
              <span className="terminal-group-hint"> # {r.company} · {r.period}</span>
            </p>

            <ul className="terminal-tree">
              {r.bullets.map((b, i) => (
                <li key={b} className="terminal-tree-item">
                  <span className="terminal-tree-branch">
                    {i === r.bullets.length - 1 ? '└──' : '├──'}
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="terminal-line terminal-prompt terminal-prompt--final">
          <span className="terminal-prompt-symbol">arcnal@portfolio</span>
          <span className="terminal-prompt-path">~$</span>
          <span className="terminal-cursor" />
        </div>
      </div>
    </section>
  )
}