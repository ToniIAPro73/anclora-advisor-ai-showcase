import { useState } from "react";
import type { FormEvent } from "react";
import type { QueryScenario } from "../data/scenarios";
import { GROUNDING_LABEL } from "../lib/engine";

export type Phase = "idle" | "running" | "done";

export interface QueryResult {
  scenario: QueryScenario;
  question: string;
  matched: boolean;
}

interface ConsultationPanelProps {
  suggestions: QueryScenario[];
  phase: Phase;
  result: QueryResult | null;
  onAsk: (question: string) => void;
}

export default function ConsultationPanel({
  suggestions,
  phase,
  result,
  onAsk,
}: ConsultationPanelProps) {
  const [input, setInput] = useState("");
  const running = phase === "running";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || running) return;
    setInput("");
    onAsk(question);
  };

  return (
    <section className="card consult-panel" aria-labelledby="consult-title">
      <header className="consult-header">
        <div>
          <p className="card-eyebrow">Consulta</p>
          <h2 id="consult-title" className="card-title">
            Consulta sobre la documentación
          </h2>
        </div>
        <span className="sim-badge" title="Las respuestas se generan de forma determinista en local">
          Respuestas simuladas para demo
        </span>
      </header>

      <p className="consult-hint">Consultas sugeridas para el documento activo:</p>
      <div className="chip-row" role="group" aria-label="Consultas sugeridas">
        {suggestions.map((scenario) => (
          <button
            key={scenario.id}
            type="button"
            className="chip"
            disabled={running}
            onClick={() => onAsk(scenario.question)}
          >
            {scenario.question}
          </button>
        ))}
      </div>

      <form className="consult-form" onSubmit={submit}>
        <label className="sr-only" htmlFor="consult-input">
          Escribe tu consulta fiscal o laboral
        </label>
        <input
          id="consult-input"
          className="consult-input"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Escribe tu consulta fiscal o laboral…"
          disabled={running}
          autoComplete="off"
        />
        <button type="submit" className="btn-primary" disabled={running || !input.trim()}>
          {running ? "Procesando…" : "Consultar"}
        </button>
      </form>

      {running && (
        <div className="consult-status" role="status" aria-live="polite">
          <span className="spinner" aria-hidden="true" />
          Recuperando fragmentos… <em>(proceso simulado)</em>
        </div>
      )}

      {phase === "done" && result && (
        <article className="answer" aria-live="polite">
          <p className="answer-question">
            <span className="answer-question-label">Tu consulta</span>
            {result.question}
          </p>
          {!result.matched && (
            <p className="answer-coverage" role="note">
              Coincidencia aproximada: la respuesta usa el escenario sintético más cercano.
            </p>
          )}
          <div className="answer-body">
            {result.scenario.answer.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <div className="answer-meta">
            <span className={`grounding-badge grounding-${result.scenario.grounding}`}>
              <span className="grounding-dot" aria-hidden="true" />
              {GROUNDING_LABEL[result.scenario.grounding]}
              <span className="grounding-score">
                {result.scenario.groundingScore.toFixed(2)}
              </span>
            </span>
          </div>

          <div className="citations">
            <h3 className="card-subheading">Fuentes consultadas</h3>
            <ol className="citation-list">
              {result.scenario.citations.map((citation) => (
                <li key={`${citation.section}-${citation.similarity}`} className="citation">
                  <p className="citation-source">
                    <strong>{citation.docTitle}</strong>
                    <span className="citation-section">{citation.section}</span>
                    <span className="citation-similarity">
                      similitud {citation.similarity.toFixed(2)}
                    </span>
                  </p>
                  <blockquote className="citation-fragment">{citation.fragment}</blockquote>
                </li>
              ))}
            </ol>
          </div>

          <div className="answer-actions">
            {result.scenario.suggestedActions.map((action) => (
              <span key={action} className="chip chip-static">
                {action}
              </span>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}
