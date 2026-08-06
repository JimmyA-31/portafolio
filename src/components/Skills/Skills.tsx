import './Skills.css'

type SkillGroup = 'Frontend' | 'Backend' | 'Datos' | 'DevOps'

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
    items: ['Node.js', 'APIs REST', 'JAVA', 'C#', 'Arquitectura por capas'],
  },
  {
    group: 'Datos',
    items: ['SQL Server', 'MySql', 'Modelado relacional'],
  },
  {
    group: 'DevOps',
    items: ['Git & GitHub', 'Gestión de dominios y subdominios'],
  },
]

function fakeTimestamp(offsetMin: number) {
  return `2026-01-01 10:${String(offsetMin).padStart(2, '0')}:00`
}

export default function Skills() {
  return (
    <section id="skills" className="log-viewer">
      <div className="log-viewer-titlebar">
        <span className="log-viewer-label">skills.log</span>
        <span className="log-viewer-badge">tail -f</span>
      </div>

      <div className="log-viewer-body">
        {skills.map((s, groupIndex) => (
          <div className="log-block" key={s.group}>
            <p className="log-line log-line--event">
              <span className="log-timestamp">[{fakeTimestamp(groupIndex * 5)}]</span>
              <span className="log-level log-level--event">EVENT</span>
              <span className="log-message">
                load_module(<span className="log-string">"{s.group}"</span>)
              </span>
            </p>

            {s.items.map((item, i) => (
              <p className="log-line" key={item}>
                <span className="log-timestamp">[{fakeTimestamp(groupIndex * 5 + i + 1)}]</span>
                <span className="log-level log-level--info">INFO</span>
                <span className="log-message">skill_ready: {item}</span>
              </p>
            ))}

            {groupIndex < skills.length - 1 && <div className="log-divider" />}
          </div>
        ))}

        <p className="log-line log-line--cursor">
          <span className="log-timestamp">[{fakeTimestamp(30)}]</span>
          <span className="log-level log-level--info">INFO</span>
          <span className="log-message">todos los módulos cargados</span>
          <span className="log-cursor" />
        </p>
      </div>
    </section>
  )
}