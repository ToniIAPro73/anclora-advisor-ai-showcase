import { useCallback, useEffect, useRef, useState } from "react";
import ConsultationPanel, { type Phase, type QueryResult } from "./components/ConsultationPanel";
import DocumentPanel from "./components/DocumentPanel";
import Footer from "./components/Footer";
import RiskPanel from "./components/RiskPanel";
import Sidebar from "./components/Sidebar";
import TraceLog from "./components/TraceLog";
import { DOCUMENTS, docById } from "./data/documents";
import { buildTrace, matchQuery, suggestedFor, type TraceStep } from "./lib/engine";

const STEP_DELAY_MS = 620;

export default function App() {
  const [activeDocId, setActiveDocId] = useState(DOCUMENTS[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(-1);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => clearTimers, []);

  const ask = useCallback(
    (question: string) => {
      clearTimers();
      const { scenario, matched } = matchQuery(question, activeDocId);
      const steps = buildTrace(scenario, matched);
      setTrace(steps);
      setVisibleSteps(0);
      setResult(null);
      setPhase("running");

      steps.forEach((_, index) => {
        timersRef.current.push(
          window.setTimeout(() => setVisibleSteps(index + 1), STEP_DELAY_MS * (index + 1)),
        );
      });
      timersRef.current.push(
        window.setTimeout(
          () => {
            setResult({ scenario, question, matched });
            setPhase("done");
          },
          STEP_DELAY_MS * (steps.length + 1),
        ),
      );
    },
    [activeDocId],
  );

  const activeDoc = docById(activeDocId) ?? DOCUMENTS[0];

  return (
    <div className="app">
      <Sidebar
        activeDocId={activeDocId}
        onSelect={setActiveDocId}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <header className="topbar">
          <button
            type="button"
            className="menu-toggle"
            aria-label="Abrir menú lateral"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(true)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <div className="topbar-title">
            <h1>Inteligencia documental</h1>
            <p>Consulta trazable sobre documentos sintéticos</p>
          </div>
          <span className="topbar-badge">IA simulada</span>
        </header>

        <main className="content">
          <div className="content-primary">
            <DocumentPanel doc={activeDoc} />
            <ConsultationPanel
              suggestions={suggestedFor(activeDocId)}
              phase={phase}
              result={result}
              onAsk={ask}
            />
          </div>
          <div className="content-rail">
            <RiskPanel result={phase === "done" ? result : null} />
            <TraceLog steps={trace} visible={visibleSteps} running={phase === "running"} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
