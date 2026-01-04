import {
  ArrowDownCircleIcon,
  EnvelopeIcon,
  MapPinIcon,
  CheckCircleIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

const bullets = [
  'Backend robusto con APIs REST bien diseñadas',
  'Datos relacionales optimizados y consistentes',
]

const capabilities = [
  'APIs REST · Auth · Roles',
  'SQL · Modelado relacional',
  'React + TypeScript',
]

export default function Hero() {
  return (
    <section id="top" className="section heroPro">
      <div className="container heroProGrid">
        {/* LEFT */}
        <div className="heroProLeft">
          <div className="heroProKicker">
            <span className="pillX">
              <SparklesIcon className="i16" />
              Full-Stack Developer
            </span>
            <span className="pillX">
              <MapPinIcon className="i16" />
              Lima, Perú · Remoto / On-site
            </span>
          </div>

          <h1 className="heroProTitle">
            Construyo sistemas web <span className="gradText">pensados para escalar</span>, no para parches.
          </h1>

          <p className="heroProLead">
            Especializado en backend sólido, datos bien modelados y frontends React claros,
            mantenibles y rápidos.
          </p>

          <ul className="heroProList">
            {bullets.map(b => (
              <li key={b}>
                <CheckCircleIcon className="i18" />
                {b}
              </li>
            ))}
          </ul>

          <div className="heroProCtas">
            <a className="btn btnPrimary" href="#projects">
              <ArrowDownCircleIcon className="i18" />
              Explorar proyectos
            </a>
            <a className="btn btnGhost" href="#contact">
              <EnvelopeIcon className="i18" />
              Contactar
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="heroProRight panel card">
          <p className="heroProRightLabel">Lo que sé hacer</p>

          <div className="heroProStats">
            {capabilities.map(c => (
              <div key={c} className="heroProStat">
                <span className="heroProStatV">{c}</span>
              </div>
            ))}
          </div>

          <div className="heroProNote">
            Trabajo con foco en arquitectura clara, código mantenible
            y soluciones que crecen sin romperse.
          </div>
        </aside>
      </div>
    </section>
  )
}
