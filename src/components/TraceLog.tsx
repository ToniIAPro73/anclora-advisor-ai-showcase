import type { TraceStep } from "../lib/engine";

interface TraceLogProps {
  steps: TraceStep[];
  /** Número de pasos ya completados/visibles; -1 si no hay ejecución. */
  visible: number;
  running: boolean;
}

/**
 * Registro de actividad simplificado: solo resúmenes públicos de cada etapa.
 * No expone razonamiento interno (chain-of-thought).
 */
export default function TraceLog({ steps, visible, running }: TraceLogProps) {
  return (
    <section className="card trace-panel" aria-labelledby="trace-title">
      <header>
        <p className="card-eyebrow">Trazabilidad</p>
        <h2 id="trace-title" className="card-title">
          Registro de actividad
        </h2>
      </header>

      {visible < 0 ? (
        <p className="panel-empty">
          Aquí aparecerá la traza de cada consulta: consulta → recuperación → síntesis → evaluación.
        </p>
      ) : (
        <ol className="trace-list" aria-live="polite">
          {steps.map((step, index) => {
            const state = index < visible ? "done" : running && index === visible ? "active" : "pending";
            return (
              <li key={step.key} className={`trace-step trace-${state}`}>
                <span className="trace-marker" aria-hidden="true" />
                <div className="trace-content">
                  <p className="trace-head">
                    <strong>{step.title}</strong>
                    {state === "done" && (
                      <span className="trace-duration">
                        {(step.durationMs / 1000).toFixed(1)} s
                      </span>
                    )}
                    {state === "active" && <span className="trace-running">en curso…</span>}
                  </p>
                  {state !== "pending" && <p className="trace-detail">{step.detail}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      )}
      <p className="trace-note">Traza simulada — resumen público de etapas, sin razonamiento interno.</p>
    </section>
  );
}
