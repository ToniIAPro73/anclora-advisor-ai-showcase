# Testing y calidad

> Este documento forma parte de la documentación técnica del showcase. Ver contexto general en [../README.md](../README.md).

## Filosofía

En un producto que genera respuestas con IA, calcula importes fiscales y maneja documentos legales, "parece que funciona" no es un criterio aceptable. La estrategia de calidad se apoya en tres patas: tests automatizados en varios niveles, verificación estática continua y evaluación medible de la calidad de las respuestas del RAG.

## Tipos de tests

### Tests unitarios

Scripts de test ejecutados con tsx sobre la lógica de negocio pura: herramientas de cálculo fiscal y de facturación, utilidades de dominio, validación de esquemas y piezas del pipeline de recuperación. Al ser scripts ejecutados directamente sobre Node (>= 20), corren rápido y sin infraestructura adicional. El conjunto actual comprende una docena de ficheros de test unitario.

### Tests de integración

Scripts que verifican los puntos de unión entre capas: contratos de las API routes, acceso a datos, orquestación con proveedores de IA y comportamiento del pipeline de embeddings (incluida la verificación de dimensión). Estos tests ejercitan el sistema contra servicios reales o fakes controlados, según la pieza.

### Tests E2E

Playwright sobre los flujos críticos de usuario en navegador Chromium: acceso, chat con citas, facturación, alertas y administración. Los tests registran traza, captura de pantalla y vídeo en caso de fallo, de modo que un E2E roto es diagnosticable sin reproducirlo manualmente.

## Evaluación de calidad del RAG

La parte más específica del proyecto: la calidad de las respuestas del sistema de recuperación aumentada se evalúa con un harness dedicado:

- **Datasets de evaluación**: conjuntos de preguntas con respuestas y citas de referencia.
- **Métricas con umbrales**: la evaluación produce valores comparables contra umbrales de calidad configurables.
- **Gate de enforcement**: los cambios en la base de conocimiento que hacen caer la evaluación por debajo del umbral quedan bloqueados, igual que un cambio que rompe un test rompe la build.

Esto convierte la mejora del corpus documental en un proceso con regresiones detectables, en lugar de una actividad basada en impresiones.

## Verificación estática

- **Type-check**: TypeScript en modo estricto, ejecutado en CI sobre todo el proyecto.
- **Lint**: ESLint 9 con flat config, sin warnings admitidos.
- **Validación de contratos**: esquemas Zod en la frontera de las APIs, testeados como parte de los tests unitarios e integración.

## Scripts de hardening

Además de los tests, el proyecto incluye scripts de verificación transversal:

- **i18n**: comprobación de consistencia de los textos de la interfaz (cobertura de claves, ausencia de cadenas huérfanas).
- **Smoke**: verificación de arranque y endpoints esenciales tras el build, para detectar roturas de empaquetado que los tests unitarios no ven.

## Integración continua

El workflow de CI ejecuta en cada integración: type-check, lint y smoke tests. Ninguna rama se integra en desarrollo con estos checks en rojo. Los tests E2E y la evaluación RAG se ejecutan en los momentos relevantes de su ciclo (cambios de flujo de usuario y de base de conocimiento, respectivamente).

## Qué no se afirma aquí

Este documento no publica porcentajes de cobertura ni métricas de evaluación RAG concretas: esas cifras pertenecen al entorno operativo y cambian con cada iteración. Lo que el showcase demuestra es la **existencia de la maquinaria de calidad** — tipos de test, harness de evaluación, gates y CI —, no sus números de un momento dado.

## Documentos relacionados

- [engineering-decisions.md](engineering-decisions.md) — por qué esta estrategia
- [ai-capabilities.md](ai-capabilities.md) — el harness de evaluación RAG en contexto
- [architecture.md](architecture.md) — las capas que estos tests cubren
