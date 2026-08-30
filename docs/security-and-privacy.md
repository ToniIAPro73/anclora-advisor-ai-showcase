# Seguridad y privacidad

> Este documento forma parte de la documentación técnica del showcase. Ver contexto general en [../README.md](../README.md).

## Principio de mínimos datos

El producto aplica el principio de least data: se solicita y persiste únicamente la información necesaria para prestar la funcionalidad concreta. No hay recolección de datos con fines analíticos o publicitarios, ni campos "por si acaso". Cada dato almacenado responde a una pregunta concreta: ¿qué funcionalidad dejaría de funcionar si este dato no existiera?

Este principio se aplica en ambas direcciones:

- **Hacia el usuario**: el sistema no exige más datos de los que la operación requiere.
- **Hacia los servicios externos**: las integraciones (proveedores LLM, correo) reciben el contexto mínimo necesario para completar su tarea.

## Datos sintéticos en este repositorio

> Todos los datos mostrados en este repositorio son ficticios y se utilizan exclusivamente con fines de demostración profesional.

Este showcase no contiene datos reales: ni de usuarios, ni documentos de clientes, ni registros de producción. Las capturas son maquetas recreadas y los ejemplos de `examples/synthetic/` son conjuntos de datos construidos expresamente para demostración. La base de conocimiento se describe genéricamente como corpus documental curado; no se publican sus contenidos.

## Ausencia de secretos

El repositorio no contiene credenciales, claves de API, cadenas de conexión, endpoints de producción ni configuraciones de entorno. La sanitización forma parte del proceso de publicación:

1. **Selección**: solo se publica documentación, diagramas y datos sintéticos; el código operativo y la lógica propietaria permanecen fuera.
2. **Revisión automática**: búsqueda sistemática sobre el contenido publicado de patrones sensibles (URLs de servicios, nombres de variables de entorno, identificadores de proyecto, rutas internas, datos personales).
3. **Revisión manual**: verificación de que ningún documento permite reconstruir la arquitectura operativa, los prompts internos o la lógica de negocio propietaria.

## Control de acceso

En el producto real, la autenticación se resuelve mediante sesión de cookie y la autorización mediante control de acceso basado en roles (RBAC) con tres niveles: `admin`, `partner` y `user`. Los roles son por usuario — no hay multi-tenancy por organización — y se verifican en servidor en cada operación; el frontend nunca decide permisos. Las operaciones administrativas (gestión de la base de conocimiento, configuración) están restringidas al rol administrador.

## Trazabilidad y auditoría

El producto mantiene un registro de auditoría de las operaciones relevantes: quién hizo qué y cuándo. El concepto es deliberadamente simple — una tabla append-only consultada desde la administración — pero cumple tres funciones:

- **Rendición de cuentas**: toda mutación sensible queda atribuida a un usuario concreto.
- **Investigación**: ante un comportamiento anómalo, el registro permite reconstruir la secuencia de operaciones.
- **Confianza**: en un producto que toca datos fiscales y documentos legales, la trazabilidad es una característica del producto, no un añadido.

## Privacidad en la capa de IA

- Las respuestas del chat se apoyan en una base de conocimiento curada, no en los datos del usuario; la recuperación no expone documentos de otros usuarios.
- Los datos de las conversaciones persistidas pertenecen a su usuario y solo son accesibles con su sesión.
- El diseño de proveedores locales de embeddings y LLM permite, cuando se requiera, ejecutar el pipeline completo sin enviar datos a servicios externos.

## Qué no se publica y por qué

No se publican prompts internos, rutas de endpoints, nombres de variables de entorno, configuraciones de despliegue ni código operativo. La razón no es solo proteger propiedad intelectual: publicar la superficie de ataque exacta de un sistema en producción es una mala práctica de seguridad independientemente de lo bien construido que esté. Este showcase documenta decisiones y capacidades, no planos de construcción.

## Documentos relacionados

- [architecture.md](architecture.md) — dónde se aplican los controles de acceso
- [engineering-decisions.md](engineering-decisions.md) — decisiones que refuerzan estos principios
- [testing-and-quality.md](testing-and-quality.md) — verificación y hardening
