import type { SyntheticDocument } from "../data/documents";

export default function DocumentPanel({ doc }: { doc: SyntheticDocument }) {
  return (
    <section className="card doc-panel" aria-labelledby="doc-panel-title">
      <header className="doc-panel-header">
        <div>
          <p className="card-eyebrow">Documento seleccionado</p>
          <h2 id="doc-panel-title" className="card-title">
            {doc.title}
          </h2>
          <p className="doc-panel-subtitle">{doc.subtitle}</p>
        </div>
        <span className="kind-badge">{doc.kindLabel}</span>
      </header>

      <p className="doc-summary">{doc.summary}</p>

      <div className="doc-grid">
        <div>
          <h3 className="card-subheading">Partes</h3>
          <ul className="doc-parties">
            {doc.parties.map((party) => (
              <li key={party}>{party}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="card-subheading">Cifras clave</h3>
          <dl className="doc-figures">
            {doc.keyFigures.map((figure) => (
              <div key={figure.label} className="doc-figure">
                <dt>{figure.label}</dt>
                <dd>{figure.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
