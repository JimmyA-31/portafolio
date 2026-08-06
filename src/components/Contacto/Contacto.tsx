import { useForm, ValidationError } from '@formspree/react'
import { EnvelopeSimple, Phone, MapPin, ArrowSquareOut, PaperPlaneTilt } from '@phosphor-icons/react'
import './Contacto.css'

function ContactForm() {
  const [state, handleSubmit, reset] = useForm('xvzgvpvk')

  if (state.succeeded) {
    return (
      <div className="query-result-success">
        <p className="query-result-success-text">
          &gt; INSERT INTO contacto — 1 row affected. Mensaje enviado, te responderé pronto.
        </p>
        <button className="btn btn--ghost" type="button" onClick={reset}>
          Enviar otro
        </button>
      </div>
    )
  }

  return (
    <form className="query-form" onSubmit={handleSubmit} aria-busy={state.submitting}>
      <p className="query-comment">-- nuevo registro</p>

      <label className="query-field">
        <span className="query-field-label">name</span>
        <input className="query-input" name="name" autoComplete="name" required />
      </label>

      <label className="query-field">
        <span className="query-field-label">email</span>
        <input className="query-input" type="email" name="email" autoComplete="email" required />
      </label>
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label className="query-field">
        <span className="query-field-label">message</span>
        <textarea className="query-input query-textarea" name="message" rows={4} required />
      </label>
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <ValidationError prefix="Form" errors={state.errors} />

      <div className="query-form-actions">
        <button className="btn" type="submit" disabled={state.submitting}>
          <PaperPlaneTilt size={14} />
          {state.submitting ? 'Ejecutando…' : 'INSERT INTO contacto'}
        </button>
      </div>
    </form>
  )
}

export default function Contacto() {
  return (
    <section id="contact" className="query-console">
      <div className="query-titlebar">
        <span>query.sql</span>
      </div>

      <div className="query-body">
        <p className="query-line">
          <span className="query-keyword">SELECT</span> * <span className="query-keyword">FROM</span> contacto;
        </p>

        <dl className="query-table">
          <div className="query-table-header">
            <span>campo</span>
            <span>valor</span>
          </div>

          <div className="query-table-row">
            <dt><EnvelopeSimple size={13} color="var(--os-accent)" /> email</dt>
            <dd><a href="mailto:jimmy.alvarez.saavedra@gmail.com">jimmy.alvarez.saavedra@gmail.com</a></dd>
          </div>

          <div className="query-table-row">
            <dt><Phone size={13} color="var(--os-accent)" /> phone</dt>
            <dd><a href="tel:+51902618405">+51 902 618 405</a></dd>
          </div>

          <div className="query-table-row">
            <dt><MapPin size={13} color="var(--os-accent)" /> location</dt>
            <dd>Lima, PE</dd>
          </div>
        </dl>

        <div className="query-links">
          <a className="btn btn--ghost" href="https://www.linkedin.com/in/jimmy-alvarez-30315225b/" target="_blank" rel="noreferrer">
            <ArrowSquareOut size={13} /> LinkedIn
          </a>
          <a className="btn btn--ghost" href="https://github.com/JimmyA-31" target="_blank" rel="noreferrer">
            <ArrowSquareOut size={13} /> GitHub
          </a>
        </div>

        <div className="query-divider" />

        <ContactForm />
      </div>
    </section>
  )
}