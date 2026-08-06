import './About.css'

type Pillar = {
  title: string
  subtitle: string
  items: string[]
}

const stack = ['React / Angular', 'SQL & Data', 'UI moderna', 'Buenas prácticas']

const pillars: Pillar[] = [
  {
    title: 'Lo que hago',
    subtitle: 'Desarrollo completo de aplicaciones, desde la interfaz hasta la base de datos.',
    items: [
      'Diseño de APIs REST claras y mantenibles.',
      'Optimización de SQL y modelado relacional.',
      'Páginas web modernas, intranets y dashboards.'
    ],
  },
  {
    title: 'Cómo trabajo',
    subtitle: 'Priorizo soluciones escalables, y trabajo de acuerdo a requerimientos.',
    items: [
      'Diseño y desarrollo de interfaces claras, responsive y usables.',
      'Código limpio, tipado y organizado para facilitar mantenimiento.',
      'Trabajo continuo con entregas frecuentes y feedback continuo (SCRUM).'
    ],
  },
]

function toFnName(title: string) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')
    .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join('')
}

type Line = { type: 'comment' | 'keyword' | 'string' | 'blank'; content: string }

function buildLines(): Line[] {
  const lines: Line[] = []

  lines.push({ type: 'comment', content: '// about.ts' })
  lines.push({ type: 'blank', content: '' })
  lines.push({ type: 'comment', content: '/**' })
  lines.push({ type: 'comment', content: ' * Desarrollo productos web con backend sólido, datos bien' })
  lines.push({ type: 'comment', content: ' * diseñados y frontend moderno. Bases limpias, sistemas' })
  lines.push({ type: 'comment', content: ' * fáciles de mantener.' })
  lines.push({ type: 'comment', content: ' */' })
  lines.push({ type: 'blank', content: '' })

  lines.push({ type: 'keyword', content: 'const stack = [' })
  stack.forEach((s, i) =>
    lines.push({ type: 'string', content: `  '${s}'${i < stack.length - 1 ? ',' : ''}` })
  )
  lines.push({ type: 'keyword', content: '];' })
  lines.push({ type: 'blank', content: '' })

  pillars.forEach((pillar) => {
    lines.push({ type: 'keyword', content: `function ${toFnName(pillar.title)}() {` })
    lines.push({ type: 'comment', content: `  // ${pillar.subtitle}` })
    lines.push({ type: 'keyword', content: '  return [' })
    pillar.items.forEach((item, i) =>
      lines.push({ type: 'string', content: `    '${item}'${i < pillar.items.length - 1 ? ',' : ''}` })
    )
    lines.push({ type: 'keyword', content: '  ];' })
    lines.push({ type: 'keyword', content: '}' })
    lines.push({ type: 'blank', content: '' })
  })

  return lines
}

export default function About() {
  const lines = buildLines()

  return (
    <section id="about" className="about-editor">
      <div className="editor-tabs">
        <div className="editor-tab">
          <span className="editor-tab-dot" />
          about.ts
        </div>
      </div>

      <div className="editor-body">
        {lines.map((line, i) => (
          <div className="editor-line" key={i}>
            <span className="editor-line-number">{i + 1}</span>
            <span className={`editor-line-content editor-line--${line.type}`}>
              {line.content || '\u00A0'}
            </span>
          </div>
        ))}
      </div>

      <div className="editor-statusbar">
        <span>TypeScript</span>
        <span>{lines.length} líneas</span>
        <span>UTF-8</span>
      </div>
    </section>
  )
}