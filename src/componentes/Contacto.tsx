import { useForm, ValidationError } from '@formspree/react'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'

type ContactLineProps = {
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}

function ContactLine({ href, icon: Icon, children }: ContactLineProps) {
  const Tag = href ? 'a' : 'div'

  return (
    <Tag
      className={`contactLine ${!href ? 'contactLine--static' : ''}`}
      href={href}
    >
      <Icon className="contactLineIcon" />
      <span className="contactLineText">{children}</span>
    </Tag>
  )
}

function ContactInfo() {
  return (
    <address className="contactCard" aria-label="Datos de contacto">
      <ContactLine href="mailto:jimmy.alvarez.saavedra@gmail.com" icon={EnvelopeIcon}>
        jimmy.alvarez.saavedra@gmail.com
      </ContactLine>

      <ContactLine href="tel:+51902618405" icon={PhoneIcon}>
        +51 902 618 405
      </ContactLine>

      <ContactLine icon={MapPinIcon}>
        Lima, PE
      </ContactLine>

      <div className="contactCtas contactCtas--inCard">
        <a
          className="btn btn--ghost"
          href="https://www.linkedin.com/in/jimmy-alvarez-30315225b/"
          target="_blank"
          rel="noreferrer"
        >
          <ArrowTopRightOnSquareIcon className="contactBtnIcon" />
          LinkedIn
        </a>

        <a
          className="btn btn--ghost"
          href="https://github.com/JimmyA-31"
          target="_blank"
          rel="noreferrer"
        >
          <ArrowTopRightOnSquareIcon className="contactBtnIcon" />
          GitHub
        </a>
      </div>

      <p className="contactNote">
        Si prefieres, agenda una llamada corta o escríbeme por WhatsApp.
      </p>
    </address>
  )
}

function ContactForm() {
  const [state, handleSubmit, reset] = useForm('xvzgvpvk')

  if (state.succeeded) {
    return (
      <div>
        <p className="contactSuccess" role="status" aria-live="polite">
          Mensaje enviado. Te responderé pronto.
        </p>

        <div className="contactFormActions">
          <button className="btn btn--ghost" type="button" onClick={reset}>
            Enviar otro
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      className="contactForm"
      onSubmit={handleSubmit}
      aria-busy={state.submitting}
    >
      <label className="contactLabel">
        Nombre
        <input
          className="contactInput"
          name="name"
          autoComplete="name"
          required
        />
      </label>

      <label className="contactLabel">
        Email
        <input
          className="contactInput"
          type="email"
          name="email"
          autoComplete="email"
          required
        />
      </label>
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label className="contactLabel">
        Mensaje
        <textarea
          className="contactTextarea"
          name="message"
          rows={4}
          required
        />
      </label>
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <ValidationError prefix="Form" errors={state.errors} />

      <div className="contactFormActions">
        <button className="btn" type="submit" disabled={state.submitting}>
          <PaperAirplaneIcon className="contactBtnIcon" />
          {state.submitting ? 'Enviando…' : 'Enviar'}
        </button>
      </div>
    </form>
  )
}

export default function Contacto() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contactShell panel glowBorder">
          <header className="contactHead">
            <div>
              <h2 className="sectionTitle">Contacto</h2>
              <p className="sectionSubtitle">
                ¿Tienes un proyecto o idea? Hablemos.
              </p>
            </div>
          </header>

          <div className="contactGrid">
            <ContactInfo />
            <aside className="contactCard">
              <p className="contactCardTitle">Escríbeme</p>
              <ContactForm />
            </aside>
          </div>

          <div className="contactScan" aria-hidden />
        </div>
      </div>
    </section>
  )
}
