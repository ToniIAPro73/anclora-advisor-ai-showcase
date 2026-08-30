# Arquitectura de la demo interactiva

[← Volver al índice](../README.md)

> Demo de portfolio con datos ficticios. No contiene datos de producción ni código operativo completo. / Portfolio demo using fictional data. It does not contain production data or the complete operational codebase.

## Qué es

Una aplicación web **independiente y autocontenida** incluida en este repositorio para mostrar, de forma interactiva, el lenguaje de producto de Anclora Advisor AI: consulta documental con citas, nivel de grounding, señales de riesgo y trazabilidad de la consulta.

Se ejecuta en local con cero secretos y cero llamadas externas:

```bash
npm install && npm run dev   # desarrollo
npm run build && npm run preview  # build de producción
```

## Stack

- **Vite + React + TypeScript** (modo estricto), sin backend.
- CSS escrito a mano (`src/styles/global.css`), tema claro con acento teal `#1DAB89`.
- Sin variables de entorno, sin SDKs de IA, sin llamadas de red en tiempo de ejecución.

## Estructura

```text
src/
├── data/
│   ├── documents.ts    # 4 documentos sintéticos (contrato, factura, nómina, normativa)
│   └── scenarios.ts    # escenarios de consulta con respuestas, citas y riesgos predefinidos
├── lib/
│   └── engine.ts       # emparejamiento determinista consulta → escenario + traza simulada
├── components/         # Sidebar, DocumentPanel, ConsultationPanel, RiskPanel, TraceLog, Footer
├── App.tsx             # shell de aplicación y orquestación del estado de la demo
└── main.tsx
```

## Recuperación simulada (mock RAG determinista)

La demo **no ejecuta** ningún modelo de lenguaje ni búsqueda vectorial. El flujo visible (consulta → recuperación → síntesis → evaluación) es una representación escenificada del pipeline del producto:

1. La consulta libre se normaliza (minúsculas, sin acentos) y se compara con las palabras clave de cada escenario predefinido (`src/lib/engine.ts`).
2. Se selecciona el escenario con más coincidencias; en empate, se prioriza el documento activo. Sin coincidencias, se muestra una respuesta de cobertura limitada con grounding bajo.
3. Las citas (documento, sección, fragmento, similitud), las señales de riesgo y la recomendación son datos fijos definidos en `src/data/scenarios.ts`.
4. La traza visible muestra solo resúmenes públicos de cada etapa; nunca razonamiento interno del modelo.

Todo el contenido — empresas, importes, cláusulas, fragmentos normativos — es ficticio y está escrito expresamente para esta demo.

## Qué NO representa

- No es el código operativo del producto: la aplicación real es un monolito modular Next.js con RAG sobre pgvector, orquestación LLM multi-proveedor y persistencia (ver [architecture.md](architecture.md)).
- No incluye prompts, proveedores de IA, credenciales, datos de producción ni lógica empresarial propietaria.
- Los tiempos de las etapas y las puntuaciones de similitud/grounding son valores ilustrativos fijos, no mediciones reales.

## Capturas

Las imágenes de `assets/screenshots/` se han generado capturando esta demo en ejecución (`npm run preview`), en los estados que cualquier visitante puede reproducir localmente.
