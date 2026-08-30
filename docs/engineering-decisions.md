# Decisiones de ingeniería

> Este documento forma parte de la documentación técnica del showcase. Ver contexto general en [../README.md](../README.md).

Este documento recoge las decisiones estructurales del proyecto y su justificación. No son preferencias estéticas: cada una responde a un riesgo concreto de un producto que maneja datos fiscales, documentos legales y respuestas generadas por IA.

## TypeScript en modo estricto

Todo el proyecto compila con TypeScript `strict`. En un sistema donde los datos fluyen desde respuestas de modelos de lenguaje y documentos importados hasta registros contables, los tipos laxos son una fuente de errores silenciosos. El modo estricto convierte en errores de compilación lo que de otro modo serían `undefined` en producción.

Coste asumido: más ceremonia en los límites del sistema (parsing de respuestas externas). Beneficio: los tipos del dominio (factura, evaluación de riesgo, cita documental) son contratos que el compilador hace cumplir en cada refactor.

## Validación con Zod en la frontera

Los tipos de TypeScript desaparecen en tiempo de ejecución; las peticiones HTTP no. Cada API route valida su entrada con esquemas Zod antes de ejecutar lógica de negocio. Los esquemas actúan además como documentación viva del contrato de cada endpoint: qué campos acepta, con qué formato y cuáles son obligatorios.

La combinación deliberada es: Zod en la frontera (runtime), TypeScript estricto hacia dentro (compile time). Ninguna de las dos sustituye a la otra.

## Separación en capas

El proyecto es un monolito modular con cuatro capas con responsabilidades disjuntas:

1. **UI**: componentes y hooks React, sin acceso directo a datos.
2. **Capa de aplicación**: API routes con validación, autenticación y autorización.
3. **Orquestación IA**: proveedores LLM, recuperación, herramientas deterministas.
4. **Acceso a datos**: PostgreSQL y pgvector.

La regla de dependencia es unidireccional: la UI solo habla con la capa de aplicación; la orquestación IA no conoce HTTP; el acceso a datos no conoce modelos de lenguaje. Esto permite sustituir un proveedor de IA, añadir un módulo de producto o cambiar una consulta sin efectos colaterales fuera de su capa.

## Herramientas deterministas frente al LLM

Decisión central del diseño: los modelos de lenguaje no calculan. La aritmética fiscal y de facturación se implementa como herramientas deterministas en código, con tests unitarios, que el modelo invoca cuando el flujo lo requiere. El LLM aporta lenguaje, recuperación y razonamiento cualitativo; el código aporta exactitud numérica y reproducibilidad.

Esta separación resuelve dos problemas a la vez: elimina los errores aritméticos del modelo y hace los cálculos auditables y testeables de forma convencional.

## Desarrollo guiado por especificaciones

Cada feature se desarrolla siguiendo un ciclo de spec-driven development:

1. **Spec**: documento de especificación por feature, inmutable una vez aprobado.
2. **Plan**: descomposición técnica derivada de la spec.
3. **Tasks**: tareas ejecutables y verificables.
4. **PR**: integración contra la rama de desarrollo, trazable a su spec.

Las specs inmutables evitan la deriva silenciosa de requisitos: si el alcance cambia, se crea una nueva versión de la spec en lugar de editarla retroactivamente. El resultado es una trazabilidad completa entre lo que se decidió, lo que se construyó y lo que se entregó.

## Estrategia de testing

Tres niveles complementarios, detallados en [testing-and-quality.md](testing-and-quality.md):

- **Unitarios e integración**: scripts ejecutados con tsx sobre la lógica de negocio y los puntos de integración.
- **E2E**: Playwright sobre flujos reales de usuario, con trazas y capturas en caso de fallo.
- **Evaluación RAG**: harness con datasets y umbrales, con gate automático para cambios en la base de conocimiento.

El CI ejecuta type-check, lint y smoke tests en cada integración, de modo que ninguna rama rota llega a desarrollo.

## Decisiones descartadas

- **Microservicios**: sobredimensionados para el equipo y el alcance; el monolito modular ofrece los mismos límites con menos coste operativo.
- **Almacén vectorial dedicado**: pgvector sobre la misma PostgreSQL elimina una dependencia y simplifica la coherencia transaccional entre documentos y vectores.
- **Cálculo por LLM con verificación posterior**: descartado; la verificación a posteriori no garantiza exactitud, el código determinista sí.

## Documentos relacionados

- [architecture.md](architecture.md) — consecuencia arquitectónica de estas decisiones
- [ai-capabilities.md](ai-capabilities.md) — detalle de la capa de IA
- [testing-and-quality.md](testing-and-quality.md) — cómo se verifica todo esto
