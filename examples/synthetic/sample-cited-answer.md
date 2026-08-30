# Ejemplo sintético — consulta y respuesta con citas

> Todos los datos de este archivo son ficticios y se utilizan exclusivamente
> con fines de demostración profesional. / All data in this file is fictional
> and used exclusively for portfolio demonstration purposes.

Este archivo ilustra el **formato de una respuesta RAG trazable**: respuesta,
citas a fragmentos recuperados y nivel de grounding. Los contenidos citados
proceden del documento sintético `sample-knowledge-document.md`.

---

**Consulta del usuario (ficticia):**

> ¿Puedo deducir parte de la luz de mi casa si trabajo como autónomo desde casa?

**Respuesta del sistema (ejemplo ilustrativo):**

> Sí, con matices. Si desarrollas la actividad en tu vivienda habitual, los
> suministros (electricidad, agua, gas, telefonía e internet) pueden ser
> parcialmente deducibles. En el ejemplo documental, la deducción se calcula
> aplicando un 30 % sobre la parte de la vivienda afecta a la actividad.
>
> Para el cálculo concreto, el sistema utiliza una herramienta determinista:
> introduce la superficie afecta y el gasto anual y obtendrás el importe
> ilustrativo.
>
> **Citas:**
> 1. `sample-knowledge-document.md` — «Deducción de gastos de suministros en
>    vivienda habitual» (similitud 0,87)
> 2. `sample-knowledge-document.md` — «Ejemplo de aplicación» (similitud 0,81)
>
> **Grounding:** alto · **Acciones sugeridas:** abrir calculadora de gastos,
> revisar alertas fiscales del trimestre

---

**Por qué importa:** la respuesta no es una generación libre. Cada afirmación
relevante se apoya en un fragmento recuperado y citable, y los cálculos los
resuelve código determinista, no el modelo.
