import type { QueryResult } from "./ConsultationPanel";

const LEVEL_LABEL: Record<string, string> = {
  alto: "Riesgo alto",
  medio: "Riesgo medio",
  bajo: "Riesgo bajo",
};

export default function RiskPanel({ result }: { result: QueryResult | null }) {
  return (
    <section className="card risk-panel" aria-labelledby="risk-title">
      <header>
        <p className="card-eyebrow">Evaluación</p>
        <h2 id="risk-title" className="card-title">
          Riesgos y recomendación
        </h2>
      </header>

      {!result ? (
        <p className="panel-empty">
          Lanza una consulta para ver las señales de riesgo y la recomendación asociada.
        </p>
      ) : (
        <>
          <ul className="risk-list">
            {result.scenario.risks.map((risk) => (
              <li key={risk.label} className={`risk-item risk-${risk.level}`}>
                <span className="risk-dot" aria-hidden="true" />
                <div>
                  <p className="risk-label">
                    {risk.label}
                    <span className="risk-level">{LEVEL_LABEL[risk.level]}</span>
                  </p>
                  <p className="risk-detail">{risk.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="recommendation">
            <h3 className="card-subheading">Recomendación</h3>
            <p>{result.scenario.recommendation}</p>
          </div>
        </>
      )}
    </section>
  );
}
