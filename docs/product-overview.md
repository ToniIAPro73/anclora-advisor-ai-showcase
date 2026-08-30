# Visión general del producto

> Este documento forma parte de la documentación técnica del showcase. Ver contexto general en [../README.md](../README.md).

## El problema

Autónomos y pequeñas empresas en España afrontan a diario obligaciones fiscales, laborales y mercantiles con información dispersa: normativa cambiante, contratos, facturas y documentos propios. Resolver una consulta concreta — si un gasto es deducible, qué riesgo laboral presenta una actividad, cómo rectificar una factura — exige tres cosas que las herramientas genéricas no combinan:

- **Tiempo de experto**: localizar la norma aplicable y contrastarla con el caso concreto.
- **Trazabilidad**: una respuesta sin fuente citable no sirve para justificar una decisión ante terceros.
- **Operativa real**: la consulta rara vez acaba en texto; deriva en una factura, una rectificación, una alerta o una acción de mitigación.

Los chatbots genéricos responden sin fuentes, sin memoria del caso y sin conexión con las herramientas de trabajo. Los programas de gestión clásicos operan, pero no explican ni razonan sobre normativa.

## Usuario objetivo

- **Autónomos y pequeñas empresas** que gestionan su propia facturación y obligaciones fiscales sin asesoría externa permanente.
- **Profesionales de asesoría** que necesitan apoyo documental trazable para consultas recurrentes de sus clientes.

El producto está diseñado para usuarios no técnicos: la complejidad (recuperación documental, orquestación de modelos, validación) permanece detrás de una interfaz de trabajo ordinaria.

## Propuesta de valor

Anclora Advisor AI no es un chatbot con estética de producto: es una aplicación de trabajo con módulos concretos, donde la IA sirve a la operativa y no al revés.

1. **Respuestas trazables**: el módulo de chat responde con citas a fragmentos de una base de conocimiento curada, con metadatos de similitud y nivel de grounding. El usuario puede verificar cada afirmación.
2. **Operativa integrada**: facturación completa (series, pagos parciales, rectificativas, cumplimiento VeriFactu, generación de PDF, envío por correo), evaluación de riesgo laboral con acciones de mitigación y evidencias, plantillas fiscales y alertas.
3. **Fiabilidad por diseño**: los cálculos fiscales y de facturación los resuelve código determinista, no el modelo de lenguaje. La IA redacta, recupera y razona; no hace cuentas.
4. **Memoria del trabajo**: conversaciones persistidas, alertas con recordatorios y un centro de notificaciones que mantienen el contexto entre sesiones.

## Módulos principales

- **Chat con citas (RAG)**: consulta en lenguaje natural sobre el corpus documental, con streaming en tiempo real e historial persistido.
- **Facturación**: ciclo completo de factura, incluida la importación de facturas recibidas en PDF o imagen mediante modelo visual.
- **Riesgo laboral**: evaluación asistida con acciones de mitigación y subida de evidencias.
- **Fiscalidad**: plantillas, alertas fiscales y cálculo determinista.
- **Validación documental**: motor de validación de documentos legales y verificador de cumplimiento de contratos.
- **Alertas y recordatorios**: centro de notificaciones y trabajos programados.
- **Administración**: gestión de la base de conocimiento y registro de auditoría.

## Flujo principal

```text
Consulta o documento del usuario
        ↓
Recuperación contextual sobre la base de conocimiento (RAG)
        ↓
Orquestación del modelo de lenguaje con las herramientas disponibles
        ↓
Validación de esquemas y cálculo determinista cuando aplica
        ↓
Respuesta citada, acción registrada o documento generado
```

Un ejemplo de recorrido completo: el usuario pregunta cómo rectificar una factura emitida; el chat responde con citas a la normativa recuperada; desde la misma aplicación genera la factura rectificativa en PDF, la envía por correo y el sistema registra la operación y programa los recordatorios fiscales pertinentes.

## Qué no es

- No es una asesoría legal ni sustituye criterio profesional: es una herramienta de apoyo a la decisión con fuentes verificables.
- No es un chat generalista: el conocimiento se limita a un corpus curado y los módulos responden a flujos de trabajo concretos.

## Documentos relacionados

- [architecture.md](architecture.md) — cómo está construido
- [ai-capabilities.md](ai-capabilities.md) — detalle de las capacidades de IA
- [security-and-privacy.md](security-and-privacy.md) — principios de seguridad y privacidad
