# Ejemplo sintético — fragmento de documento de conocimiento

> Todos los datos de este archivo son ficticios y se utilizan exclusivamente
> con fines de demostración profesional. / All data in this file is fictional
> and used exclusively for portfolio demonstration purposes.

Este archivo ilustra el **tipo de documento** que alimenta la base de
conocimiento del sistema RAG: un texto normativo/práctico, segmentado en
fragmentos (chunks) que se vectorizan y se recuperan por similitud.

---

## Deducción de gastos de suministros en vivienda habitual (ejemplo ficticio)

Cuando una persona trabajadora por cuenta propia desarrolla su actividad en
su vivienda habitual, los gastos de suministros (agua, gas, electricidad,
telefonía e internet) pueden ser parcialmente deducibles.

En este documento de ejemplo, el porcentaje deducible se fija en un valor
ilustrativo del 30 % aplicado sobre la proporción de la vivienda afecta a la
actividad, salvo que se acredite un porcentaje superior.

### Ejemplo de aplicación (cifras inventadas)

- Superficie de la vivienda: 100 m²
- Superficie afecta a la actividad: 25 m² (25 %)
- Gasto anual de suministros: 2.400 EUR
- Gasto deducible ilustrativo: 2.400 × 25 % × 30 % = 180 EUR

> Nota: este contenido es inventado y no constituye asesoramiento fiscal.

---

## Cómo lo procesa el sistema

```text
Documento fuente
      ↓
Segmentación en fragmentos (chunks)
      ↓
Generación de embeddings (384 dimensiones)
      ↓
Almacenamiento vectorial (pgvector)
      ↓
Recuperación por similitud en tiempo de consulta
      ↓
Cita del fragmento en la respuesta
```
