# Capacidades de IA

> Este documento forma parte de la documentación técnica del showcase. Ver contexto general en [../README.md](../README.md).

## Recuperación aumentada (RAG)

El corazón del producto es un pipeline RAG sobre una base de conocimiento curada de materia fiscal, laboral y mercantil española.

- **Corpus vectorizado**: los documentos se fragmentan en chunks que se vectorizan en embeddings de 384 dimensiones y se almacenan en PostgreSQL mediante pgvector.
- **Búsqueda por similitud**: la recuperación se resuelve con una función RPC de similitud vectorial, con un fallback en JavaScript que mantiene el servicio operativo aunque la ruta RPC no esté disponible.
- **Rendimiento**: cachés con TTL para consultas frecuentes y alias de dominio que normalizan términos habituales del lenguaje fiscal y laboral antes de vectorizar.
- **Trazabilidad**: cada respuesta incluye citas a los fragmentos utilizados, con metadatos de similitud, de modo que el usuario puede verificar el origen de cada afirmación.

## Embeddings

La vectorización se ejecuta con proveedores locales (Xenova, Ollama, Cloudflare), sin dependencia obligatoria de servicios externos de embeddings. El pipeline verifica la dimensión de cada vector generado antes de persistirlo: un embedding con dimensión incorrecta se rechaza en lugar de contaminar el índice. Este diseño permite desarrollar y evaluar el sistema de forma completamente local.

## Orquestación de modelos de lenguaje

Una capa de abstracción unifica el acceso a endpoints compatibles con la API de OpenAI:

- **Perfiles de ejecución**: perfil local (Ollama) para desarrollo y perfil cloud (Cloudflare Workers AI, Groq) para producción, conmutables en tiempo de ejecución.
- **Fallback entre modelos**: si un modelo no está disponible o falla, la orquestación degrada a un modelo alternativo sin interrumpir la conversación.
- **Streaming**: las respuestas del chat se emiten por Server-Sent Events, mostrando la generación en tiempo real.
- **Historial persistido**: las conversaciones se almacenan y pueden reanudarse, con el contexto documental asociado.

## Herramientas deterministas frente al LLM

Los modelos de lenguaje no son fiables para aritmética. Por eso los cálculos fiscales y de facturación (importes, impuestos, rectificaciones) se implementan como herramientas deterministas en código: el modelo decide cuándo invocarlas y con qué parámetros, pero el resultado numérico lo produce código verificable con tests. La regla general del proyecto es: el LLM redacta, recupera y razona; el código calcula.

## Procesamiento documental

- **Base de conocimiento**: ingesta, fragmentación y versionado de documentos desde un panel de administración, con re-vectorización controlada.
- **Importación de facturas con modelo visual**: las facturas recibidas en PDF o imagen se leen mediante un VLM que extrae los campos estructurados (emisor, importes, impuestos, fechas) y los vuelca en el módulo de facturación para su revisión.
- **Validación documental**: motor de validación de documentos legales y verificador de cumplimiento de contratos sobre la base de conocimiento.
- **Generación de documentos**: facturas en PDF generadas con pdf-lib y envío por correo con nodemailer.

## Automatización

- **Alertas y recordatorios**: alertas fiscales derivadas de calendario y datos del usuario, recordatorios y un centro de notificaciones.
- **Trabajos programados**: una tarea cron invoca una cola interna de operaciones que procesa trabajos diferidos de forma idempotente.
- **Workflows de mitigación**: la evaluación de riesgo laboral genera acciones de mitigación seguibles, con subida de evidencias.

## Evaluación de calidad del RAG

La calidad de las respuestas no se deja a la intuición: existe un harness de evaluación con datasets de preguntas y respuestas de referencia, umbrales de calidad configurables y un gate de enforcement que bloquea cambios en la base de conocimiento cuando la evaluación cae por debajo del umbral. Esto convierte la mejora del corpus en un proceso medible y regresionable, análogo a los tests en el código.

## Documentos relacionados

- [architecture.md](architecture.md) — dónde encaja cada pieza
- [engineering-decisions.md](engineering-decisions.md) — criterios detrás de estas elecciones
- [testing-and-quality.md](testing-and-quality.md) — estrategia de testing completa
