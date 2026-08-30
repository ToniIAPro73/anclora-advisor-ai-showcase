export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner">
        <p className="footer-brand">
          <strong>Portfolio Showcase</strong> ·{" "}
          <a
            href="https://github.com/ToniIAPro73/anclora-advisor-ai-showcase"
            target="_blank"
            rel="noreferrer"
          >
            github.com/ToniIAPro73/anclora-advisor-ai-showcase
          </a>
        </p>
        <p className="footer-disclaimer" lang="es">
          Demo de portfolio con datos ficticios. No contiene datos de producción ni código operativo
          completo.
        </p>
        <p className="footer-disclaimer" lang="en">
          Portfolio demo using fictional data. It does not contain production data or the complete
          operational codebase.
        </p>
      </div>
    </footer>
  );
}
