export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="siteFooter" aria-label="Pie de página">
      <div className="container siteFooterInner">
        <p className="siteFooterCopy">
          © {year} <strong>Jimmy Dev</strong>
        </p>

        <p className="siteFooterMeta">
          Hecho con <span className="siteFooterAccent">React</span> +{' '}
          <span className="siteFooterAccent">TypeScript</span>
        </p>
      </div>
    </footer>
  )
}
