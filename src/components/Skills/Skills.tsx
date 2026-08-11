import { useMemo, useState } from 'react'
import './Skills.css'

type SkillGroup = 'Frontend' | 'Backend' | 'Datos' | 'DevOps'

type Skill = {
  group: SkillGroup
  items: readonly string[]
}

const skills: readonly Skill[] = [
  { group: 'Frontend', items: ['React', 'Figma', 'Angular', 'Vue', 'Tailwind CSS'] },
  { group: 'Backend', items: ['JAVA', 'PHP', 'C#', 'Node.js', 'APIs REST'] },
  { group: 'Datos', items: ['SQL Server', 'MySql', 'Modelado relacional'] },
  { group: 'DevOps', items: ['Git & GitHub', 'Postman', 'Gestión de dominios y subdominios'] },
]

const groupHints: Record<SkillGroup, string> = {
  Frontend: 'Interfaces modernas, componentes reutilizables y UX cuidada.',
  Backend: 'APIs REST, lógica de negocio y seguridad.',
  Datos: 'Diseño relacional, consultas eficientes y persistencia.',
  DevOps: 'Deploy, hosting y puesta en producción.',
}

const CX = 320
const CY = 220
const CATEGORY_RADIUS = 110
const SKILL_RADIUS = 195

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

type NodeInfo = {
  id: string
  label: string
  x: number
  y: number
  type: 'core' | 'category' | 'skill'
  detail: string
  parentId?: string
}

function buildGraph(): { nodes: NodeInfo[]; edges: [string, string][] } {
  const nodes: NodeInfo[] = [
    { id: 'core', label: 'Jimmy', x: CX, y: CY, type: 'core', detail: 'Full Stack Developer — stack completo, de la interfaz a la base de datos.' },
  ]
  const edges: [string, string][] = []
  const categoryAngleStep = 360 / skills.length

  skills.forEach((group, gi) => {
    const categoryAngle = -90 + gi * categoryAngleStep
    const catPos = polar(CX, CY, CATEGORY_RADIUS, categoryAngle)
    const catId = `cat-${group.group}`

    nodes.push({
      id: catId,
      label: group.group,
      x: catPos.x,
      y: catPos.y,
      type: 'category',
      detail: groupHints[group.group],
      parentId: 'core',
    })
    edges.push(['core', catId])

    const spread = 46
    const itemCount = group.items.length
    group.items.forEach((item, ii) => {
      const offset = itemCount === 1 ? 0 : -spread / 2 + (spread / (itemCount - 1)) * ii
      const skillAngle = categoryAngle + offset
      const skillPos = polar(CX, CY, SKILL_RADIUS, skillAngle)
      const skillId = `${catId}-${item}`

      nodes.push({
        id: skillId,
        label: item,
        x: skillPos.x,
        y: skillPos.y,
        type: 'skill',
        detail: `${item} — parte del stack de ${group.group.toLowerCase()}.`,
        parentId: catId,
      })
      edges.push([catId, skillId])
    })
  })

  return { nodes, edges }
}

export default function Skills() {
  const { nodes, edges } = useMemo(buildGraph, [])
  const [selectedId, setSelectedId] = useState('core')

  const selected = nodes.find((n) => n.id === selectedId) ?? nodes[0]
  const nodeMap = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes])

  return (
    <section id="skills" className="skill-tree">
      <div className="skill-tree-titlebar">
        <span>skills.map</span>
        <span className="skill-tree-hint">clic en un nodo para ver detalle</span>
      </div>

      <div className="skill-tree-canvas">
        <svg viewBox="0 0 640 440" className="skill-tree-svg">
          {edges.map(([fromId, toId]) => {
            const from = nodeMap.get(fromId)
            const to = nodeMap.get(toId)
            if (!from || !to) return null
            const isActivePath = selectedId === toId || selectedId === fromId
            return (
              <line
                key={`${fromId}-${toId}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                className={`skill-tree-edge ${isActivePath ? 'isActive' : ''}`}
              />
            )
          })}

          {nodes.map((node) => (
            <g
              key={node.id}
              transform={`translate(${node.x}, ${node.y})`}
              className={`skill-tree-node skill-tree-node--${node.type} ${
                selectedId === node.id ? 'isSelected' : ''
              }`}
              onClick={() => setSelectedId(node.id)}
            >
              <circle r={node.type === 'core' ? 30 : node.type === 'category' ? 22 : 14} />
              <text
                y={node.type === 'core' ? 46 : node.type === 'category' ? 38 : 26}
                textAnchor="middle"
                className="skill-tree-label"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="skill-tree-detail">
        <p className="skill-tree-detail-title">{selected.label}</p>
        <p className="skill-tree-detail-text">{selected.detail}</p>
      </div>
    </section>
  )
}