import {
  CodeBracketIcon,
  CircleStackIcon,
  CommandLineIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'

type SkillGroup =
  | 'Frontend'
  | 'Backend'
  | 'Datos'
  | 'DevOps'

type Skill = {
  group: SkillGroup
  items: readonly string[]
}

const skills: readonly Skill[] = [
  {
    group: 'Frontend',
    items: ['React', 'Figma', 'Angular', 'Tailwind CSS', 'Accesibilidad'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'APIs REST', 'JAVA','C#', 'Arquitectura por capas'],
  },
  {
    group: 'Datos',
    items: ['SQL Server', 'MySql', 'Modelado relacional'],
  },
  {
    group: 'DevOps',
    items: [
    'Git & GitHub',
    'Gestión de dominios y subdominios'
  ],
  },
]

const meta: Record<
  SkillGroup,
  {
    Icon: React.ComponentType<{ className?: string }>
    hint: string
    priority: 'high' | 'medium'
  }
> = {
  Frontend: {
  Icon: CodeBracketIcon,
  hint: 'Interfaces modernas, componentes reutilizables y UX cuidada.',
  priority: 'high',
  },
  Backend: {
    Icon: CommandLineIcon,
    hint: 'APIs REST, lógica de negocio y seguridad.',
    priority: 'high',
  },
  Datos: {
    Icon: CircleStackIcon,
    hint: 'Diseño relacional, consultas eficientes y persistencia.',
    priority: 'medium',
  },
  DevOps: {
    Icon: WrenchScrewdriverIcon,
    hint: 'Deploy, hosting y puesta en producción.',
    priority: 'medium',
  },
}

export default function Skills() {
  return (
    <section id="skills" className="section sectionSoft">
      <div className="container">
        <header className="sectionHead">
          <h2 className="sectionTitle">Skills</h2>
          <p className="sectionSubtitle">
            Stack técnico enfocado en producto, mantenibilidad y performance.
          </p>
        </header>

        <div className="grid grid-2 skillsGrid">
          {skills.map(({ group, items }) => {
            const { Icon, hint, priority } = meta[group]

            return (
              <article
                key={group}
                className={`panel glowBorder card skillCard ${
                  priority === 'high' ? 'isPrimary' : ''
                }`}
                onMouseMove={e => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty(
                    '--mx',
                    `${e.clientX - r.left}px`
                  )
                  e.currentTarget.style.setProperty(
                    '--my',
                    `${e.clientY - r.top}px`
                  )
                }}
                onMouseLeave={e => {
                  // centra el glow al salir (opcional, pero se siente más fino)
                  e.currentTarget.style.setProperty('--mx', '50%')
                  e.currentTarget.style.setProperty('--my', '50%')
                }}
              >
                <header className="skillHead">
                  <span className="skillIconWrap" aria-hidden>
                    <Icon className="skillIcon" />
                  </span>

                  <div>
                    <h3 className="skillGroup">{group}</h3>
                    <p className="skillHint">{hint}</p>
                  </div>
                </header>

                <ul
                  className="skillChips"
                  aria-label={`${group}: tecnologías y prácticas`}
                >
                  {items.map(it => (
                    <li key={it} className="badge skillChip">
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
