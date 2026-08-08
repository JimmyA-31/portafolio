import { useState } from 'react'
import { FileCode, ArrowSquareOut, FolderOpen } from '@phosphor-icons/react'
import './Proyectos.css'

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
    name: 'ShopVue',
    desc: 'Página web de E-commerce para venta de productos de tecnología, ropa y accesorios.',
    stack: ['Vue.js', 'CSS', 'Figma', 'Typescript', 'Vercel'],
    year: 2026,
    demo: 'https://e-commerce-vue-lime.vercel.app/',
  },
  {
    name: 'Whizzet',
    desc: 'Página web de agencia de marketing digital, branding y desarrollo web.',
    stack: ['PHP', 'MySql', 'Javascript', 'Figma', 'Bootstrap','Hostinger'],
    year: 2025,
    demo: 'https://whizzet.com/',
  },
  {
    name: 'G2 Solution',
    desc: 'Página web de empresa de seguridad electrónica y mantenimiento.',
    stack: ['PHP', 'MySql', 'Javascript', 'Figma', 'Bootstrap','Hostinger'],
    year: 2025,
    demo: 'https://g2solutionperu.com/',
  },
  {
    name: 'AutoAcademia',
    desc: 'CRM especializado para una academia de manejo, con control de usuarios por roles y validacion de modulos por rol, además de una seccion de reportes para exportar en Excel/PDF, dashboards personalizados de ventas.',
    stack: ['PHP', 'MySql', 'Javascript', 'Figma', 'Bootstrap','Hostinger'],
    year: 2025,
    demo: 'https://autoacademia.whizzet.com/',
  },
]

function fileName(name: string) {
  return `${name.toLowerCase().replace(/\s+/g, '-')}.proj`
}

export default function Proyectos() {
  const [selected, setSelected] = useState(0)
  const project = projects[selected]

  return (
    <section id="projects" className="explorer">
      <div className="explorer-breadcrumb">
        <FolderOpen size={14} color="var(--os-accent)" />
        <span>Proyectos</span>
        <span className="explorer-breadcrumb-sep">/</span>
        <span className="explorer-breadcrumb-count">{projects.length} archivos</span>
      </div>

      <div className="explorer-body">
        <ul className="explorer-list">
          {projects.map((p, i) => (
            <li key={p.name}>
              <button
                type="button"
                className={`explorer-row ${i === selected ? 'isActive' : ''}`}
                onClick={() => setSelected(i)}
              >
                <FileCode
                  size={18}
                  weight="regular"
                  color={i === selected ? 'var(--os-glow)' : 'var(--os-accent)'}
                />
                <span className="explorer-row-info">
                  <span className="explorer-row-name">{fileName(p.name)}</span>
                  <span className="explorer-row-meta">{p.year} · {p.stack.length} tecnologías</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="explorer-preview">
          <header className="explorer-preview-head">
            <FileCode size={26} weight="duotone" color="var(--os-glow)" />
            <div>
              <p className="explorer-preview-title">{project.name}</p>
              <p className="explorer-preview-file">{fileName(project.name)} — {project.year}</p>
            </div>
          </header>

          <p className="explorer-preview-desc">{project.desc}</p>

          <div className="explorer-preview-block">
            <p className="explorer-preview-label">stack.json</p>
            <ul className="explorer-preview-stack">
              {project.stack.map((tech) => (
                <li key={tech} className="badge">{tech}</li>
              ))}
            </ul>
          </div>

          <div className="explorer-preview-actions">
            {project.repo && (
              <a className="btn btn--ghost" href={project.repo} target="_blank" rel="noreferrer">
                <ArrowSquareOut size={14} />
                Repositorio
              </a>
            )}
            {project.demo && (
              <a className="btn" href={project.demo} target="_blank" rel="noreferrer">
                <ArrowSquareOut size={14} />
                Ver demo
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}