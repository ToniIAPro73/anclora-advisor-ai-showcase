/**
 * Motor de recuperación simulado, 100 % determinista y local.
 * Empareja la consulta libre con el escenario predefinido más cercano
 * mediante conteo de palabras clave (sin IA, sin red, sin aleatoriedad).
 */

import { FALLBACK_SCENARIO, SCENARIOS, type QueryScenario } from "../data/scenarios";

const normalize = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ñ\s]/g, " ");

const scoreScenario = (scenario: QueryScenario, tokens: Set<string>): number =>
  scenario.keywords.reduce(
    (acc, keyword) => (tokens.has(keyword) ? acc + 1 : acc),
    0,
  );

export interface MatchResult {
  scenario: QueryScenario;
  /** true si la consulta libre se emparejó con un escenario; false si es fallback. */
  matched: boolean;
}

/**
 * Devuelve el escenario más cercano a la consulta. En caso de empate,
 * se prioriza el documento seleccionado en la interfaz.
 */
export function matchQuery(input: string, activeDocId: string): MatchResult {
  const tokens = new Set(normalize(input).split(/\s+/).filter(Boolean));

  let best: QueryScenario | null = null;
  let bestScore = 0;

  for (const scenario of SCENARIOS) {
    const raw = scoreScenario(scenario, tokens);
    if (raw === 0) continue;
    // Pequeño sesgo determinista hacia el documento activo (desempate).
    const score = raw * 10 + (scenario.docId === activeDocId ? 1 : 0);
    if (score > bestScore) {
      best = scenario;
      bestScore = score;
    }
  }

  if (best && bestScore >= 10) {
    return { scenario: best, matched: true };
  }
  return {
    scenario: { ...FALLBACK_SCENARIO, question: input },
    matched: false,
  };
}

/** Escenarios sugeridos para un documento concreto. */
export function suggestedFor(docId: string): QueryScenario[] {
  return SCENARIOS.filter((s) => s.docId === docId);
}

export interface TraceStep {
  key: "consulta" | "recuperacion" | "sintesis" | "evaluacion";
  title: string;
  /** Resumen público del paso; nunca razonamiento interno. */
  detail: string;
  durationMs: number;
}

/** Traza visible del pipeline simulado. */
export function buildTrace(scenario: QueryScenario, matched: boolean): TraceStep[] {
  return [
    {
      key: "consulta",
      title: "Consulta",
      detail: matched
        ? "Consulta normalizada y clasificada en el dominio documental."
        : "Consulta normalizada; sin escenario directo, se aplica respuesta de cobertura limitada.",
      durationMs: 120,
    },
    {
      key: "recuperacion",
      title: "Recuperación",
      detail: `${scenario.citations.length} fragmentos recuperados de la base sintética (similitud máx. ${Math.max(
        ...scenario.citations.map((c) => c.similarity),
      ).toFixed(2)}).`,
      durationMs: 480,
    },
    {
      key: "sintesis",
      title: "Síntesis",
      detail: "Respuesta redactada a partir de los fragmentos citados, con lenguaje prudente y verificable.",
      durationMs: 390,
    },
    {
      key: "evaluacion",
      title: "Evaluación",
      detail: `Grounding ${scenario.grounding} (puntuación ${scenario.groundingScore.toFixed(
        2,
      )}) tras contrastar la respuesta con las fuentes.`,
      durationMs: 260,
    },
  ];
}

export const GROUNDING_LABEL: Record<string, string> = {
  alto: "Grounding: alto",
  medio: "Grounding: medio",
  bajo: "Grounding: bajo",
};
