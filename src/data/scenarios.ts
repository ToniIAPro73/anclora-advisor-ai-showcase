/**
 * Escenarios de consulta predefinidos con respuestas deterministas.
 * Todo el contenido es sintético y se genera en local: no hay llamadas
 * a modelos de lenguaje ni servicios externos.
 */

export type GroundingLevel = "alto" | "medio" | "bajo";

export interface Citation {
  docId: string;
  docTitle: string;
  section: string;
  fragment: string;
  similarity: number;
}

export interface RiskFlag {
  level: "alto" | "medio" | "bajo";
  label: string;
  detail: string;
}

export interface QueryScenario {
  id: string;
  docId: string;
  question: string;
  /** Palabras clave para el emparejamiento determinista de consultas libres. */
  keywords: string[];
  answer: string[];
  citations: Citation[];
  grounding: GroundingLevel;
  groundingScore: number;
  risks: RiskFlag[];
  recommendation: string;
  suggestedActions: string[];
}

export const SCENARIOS: QueryScenario[] = [
  {
    id: "q-contrato-duracion",
    docId: "doc-contrato",
    question: "¿Cuál es la duración y la renta del contrato?",
    keywords: ["duracion", "renta", "contrato", "prorroga", "anos", "mensual", "plazo", "arrendamiento"],
    answer: [
      "El contrato de arrendamiento del local comercial establece una duración inicial de 5 años con prórroga tácita anual, salvo denuncia expresa con 3 meses de antelación.",
      "La renta mensual asciende a 1.950,00 € durante el primer año, con actualización anual referenciada al IPC. Se constituye una fianza equivalente a dos mensualidades (3.900,00 €).",
    ],
    citations: [
      {
        docId: "doc-contrato",
        docTitle: "Contrato de arrendamiento de local comercial",
        section: "Cláusula 3 · Duración y prórrogas",
        fragment:
          "«La duración del presente contrato será de cinco (5) años, prorrogable tácitamente por periodos anuales…»",
        similarity: 0.91,
      },
      {
        docId: "doc-contrato",
        docTitle: "Contrato de arrendamiento de local comercial",
        section: "Cláusula 5 · Renta y actualización",
        fragment:
          "«La renta mensual inicial se fija en 1.950,00 €, actualizable anualmente conforme al IPC…»",
        similarity: 0.88,
      },
      {
        docId: "doc-contrato",
        docTitle: "Contrato de arrendamiento de local comercial",
        section: "Cláusula 7 · Fianza",
        fragment: "«El arrendatario entregará en concepto de fianza el importe de dos mensualidades…»",
        similarity: 0.84,
      },
    ],
    grounding: "alto",
    groundingScore: 0.88,
    risks: [
      {
        level: "medio",
        label: "Actualización de renta",
        detail: "La cláusula de actualización referenciada al IPC puede elevar la renta en ejercicios de inflación alta.",
      },
      {
        level: "bajo",
        label: "Denuncia de prórroga",
        detail: "El preaviso de 3 meses exige control de fechas para evitar prórrogas no deseadas.",
      },
    ],
    recommendation:
      "Verificar el calendario de actualizaciones de renta y registrar las fechas límite de denuncia de prórroga en el sistema de alertas.",
    suggestedActions: ["Crear alerta de vencimiento", "Extraer cláusulas clave"],
  },
  {
    id: "q-contrato-rescision",
    docId: "doc-contrato",
    question: "¿Qué condiciones de rescisión anticipada tiene el contrato?",
    keywords: ["rescision", "desistimiento", "penalizacion", "cancelar", "anticipada", "salir", "clausula"],
    answer: [
      "El contrato permite el desistimiento anticipado del arrendatario a partir del sexto mes, con preaviso de 2 meses y una penalización de una mensualidad por cada año restante del periodo inicial.",
      "El incumplimiento de las obligaciones de pago durante dos mensualidades faculta al arrendador a resolver el contrato y reclamar las cantidades adeudadas.",
    ],
    citations: [
      {
        docId: "doc-contrato",
        docTitle: "Contrato de arrendamiento de local comercial",
        section: "Cláusula 9 · Desistimiento anticipado",
        fragment:
          "«El arrendatario podrá desistir del contrato transcurridos seis meses, con preaviso de dos y penalización de una mensualidad por año restante…»",
        similarity: 0.9,
      },
      {
        docId: "doc-contrato",
        docTitle: "Contrato de arrendamiento de local comercial",
        section: "Cláusula 11 · Resolución por incumplimiento",
        fragment:
          "«El impago de dos mensualidades consecutivas o alternas facultará al arrendador a resolver el contrato…»",
        similarity: 0.86,
      },
    ],
    grounding: "alto",
    groundingScore: 0.87,
    risks: [
      {
        level: "alto",
        label: "Penalización por desistimiento",
        detail: "La indemnización escalonada puede superar los 7.000 € si el desistimiento se produce en el primer año.",
      },
      {
        level: "medio",
        label: "Resolución por impago",
        detail: "Dos mensualidades impagadas habilitan la resolución unilateral por parte del arrendador.",
      },
    ],
    recommendation:
      "Valorar el coste total del desistimiento antes de notificarlo y documentar por escrito cualquier acuerdo con el arrendador.",
    suggestedActions: ["Estimar penalización", "Redactar notificación"],
  },
  {
    id: "q-factura-importe",
    docId: "doc-factura",
    question: "¿Cuál es el importe total y el IVA de la factura?",
    keywords: ["importe", "total", "iva", "factura", "base", "imponible", "cuanto", "precio"],
    answer: [
      "La factura F-2026-041 presenta una base imponible de 4.850,00 € a la que se aplica un IVA del 21 % (1.018,50 €), con un total a pagar de 5.868,50 €.",
      "El pago está previsto por transferencia bancaria con vencimiento a 30 días desde la fecha de emisión (02/04/2026), por lo que el límite de pago es el 02/05/2026.",
    ],
    citations: [
      {
        docId: "doc-factura",
        docTitle: "Factura F-2026-041",
        section: "Desglose económico",
        fragment: "«Base imponible: 4.850,00 € · IVA 21 %: 1.018,50 € · Total factura: 5.868,50 €»",
        similarity: 0.93,
      },
      {
        docId: "doc-factura",
        docTitle: "Factura F-2026-041",
        section: "Condiciones de pago",
        fragment: "«Forma de pago: transferencia bancaria. Vencimiento: 30 días fecha factura.»",
        similarity: 0.87,
      },
    ],
    grounding: "alto",
    groundingScore: 0.91,
    risks: [
      {
        level: "bajo",
        label: "Vencimiento próximo",
        detail: "Si no se programa el pago antes del 02/05/2026 podría incurrirse en demora.",
      },
    ],
    recommendation:
      "Programar la transferencia antes del vencimiento y archivar la factura con el justificante de pago para su deducción.",
    suggestedActions: ["Programar pago", "Exportar asiento contable"],
  },
  {
    id: "q-factura-deducible",
    docId: "doc-factura",
    question: "¿Es deducible el IVA de esta factura?",
    keywords: ["deducible", "deducir", "iva", "soportado", "fiscal", "gasto", "declaracion"],
    answer: [
      "Con carácter general, el IVA soportado en la factura F-2026-041 sería deducible si la reforma del local está afecta a la actividad económica y se conserva la factura completa con los datos fiscales del emisor y del receptor.",
      "La guía fiscal interna recuerda que la deducción se declara en el periodo de devengo o en los cuatro años siguientes, siempre que el gasto sea correlativo y esté documentado.",
    ],
    citations: [
      {
        docId: "doc-factura",
        docTitle: "Factura F-2026-041",
        section: "Datos fiscales",
        fragment: "«Emisor: Litoral Proyectos S.L. · NIF: B-00000000 (ficticio) · Concepto: reforma parcial del local comercial»",
        similarity: 0.85,
      },
      {
        docId: "doc-normativa",
        docTitle: "Guía fiscal del autónomo — extracto",
        section: "Deducción del IVA soportado",
        fragment:
          "«Serán deducibles las cuotas soportadas en bienes y servicios afectos a la actividad, conservando la factura original…»",
        similarity: 0.83,
      },
    ],
    grounding: "medio",
    groundingScore: 0.76,
    risks: [
      {
        level: "medio",
        label: "Afectación del gasto",
        detail: "La deducibilidad depende de acreditar que la reforma se vincula a la actividad, no a uso privado.",
      },
    ],
    recommendation:
      "Confirmar la afectación del gasto a la actividad y conservar la factura original antes de incluir el IVA en la declaración trimestral.",
    suggestedActions: ["Marcar como deducible", "Adjuntar justificante"],
  },
  {
    id: "q-nomina-retenciones",
    docId: "doc-nomina",
    question: "¿Qué retenciones se aplican en esta nómina?",
    keywords: ["retencion", "irpf", "nomina", "bruto", "liquido", "cotizacion", "seguridad", "social"],
    answer: [
      "En la nómina de marzo 2026 se aplica una retención de IRPF del 11,4 % sobre el salario bruto de 1.740,00 €, además de las cotizaciones del trabajador a la Seguridad Social del grupo 5.",
      "Tras deducciones, el líquido a percibir asciende a 1.428,10 €. Las pagas extraordinarias están prorrateadas dentro del devengo mensual.",
    ],
    citations: [
      {
        docId: "doc-nomina",
        docTitle: "Nómina · marzo 2026",
        section: "Devengos y deducciones",
        fragment:
          "«Salario base: 1.380,00 € · Plus convenio: 360,00 € · IRPF 11,4 % · Cotizaciones SS trabajador: 113,10 €»",
        similarity: 0.92,
      },
      {
        docId: "doc-nomina",
        docTitle: "Nómina · marzo 2026",
        section: "Líquido a percibir",
        fragment: "«Total líquido a percibir: 1.428,10 € (pagas extraordinarias prorrateadas)»",
        similarity: 0.89,
      },
    ],
    grounding: "alto",
    groundingScore: 0.9,
    risks: [
      {
        level: "bajo",
        label: "Tipo de retención",
        detail: "El tipo del 11,4 % puede quedar por debajo del tipo final si varían los rendimientos anuales.",
      },
    ],
    recommendation:
      "Revisar anualmente el tipo de retención aplicado y comunicar a la empresa cualquier variación de circunstancias personales.",
    suggestedActions: ["Simular tipo anual", "Descargar PDF de nómina"],
  },
  {
    id: "q-nomina-riesgo",
    docId: "doc-nomina",
    question: "¿Hay algún riesgo laboral asociado a esta nómina?",
    keywords: ["riesgo", "laboral", "convenio", "salario", "minimo", "inspeccion", "regularidad", "nomina"],
    answer: [
      "No se detectan incumplimientos evidentes: el salario bruto mensual de 1.740,00 € se sitúa por encima del salario mínimo interprofesional de referencia y las cotizaciones corresponden al grupo 5, coherente con la categoría administrativa.",
      "Como punto de vigilancia, conviene contrastar el plus de convenio con la tabla salarial vigente del convenio aplicable, ya que una tabla desactualizada es un hallazgo frecuente en inspección.",
    ],
    citations: [
      {
        docId: "doc-nomina",
        docTitle: "Nómina · marzo 2026",
        section: "Cotizaciones",
        fragment: "«Grupo de cotización: 5 · Bases de cotización mensuales: contingencias comunes 1.740,00 €»",
        similarity: 0.88,
      },
      {
        docId: "doc-normativa",
        docTitle: "Guía fiscal del autónomo — extracto",
        section: "Anexo laboral · tablas salariales",
        fragment:
          "«Las tablas salariales del convenio deben revisarse tras cada publicación oficial de actualización…»",
        similarity: 0.79,
      },
    ],
    grounding: "medio",
    groundingScore: 0.74,
    risks: [
      {
        level: "medio",
        label: "Tabla salarial desactualizada",
        detail: "Un plus de convenio por debajo de la tabla vigente generaría reclamación retroactiva de diferencias.",
      },
      {
        level: "bajo",
        label: "Categoría profesional",
        detail: "Cambios de funciones sin actualización de categoría pueden generar cotizaciones incorrectas.",
      },
    ],
    recommendation:
      "Contrastar la tabla salarial del convenio aplicable y documentar la revisión como evidencia de cumplimiento.",
    suggestedActions: ["Revisar convenio", "Registrar evidencia"],
  },
  {
    id: "q-normativa-suministros",
    docId: "doc-normativa",
    question: "¿Puedo deducir los suministros de mi vivienda habitual?",
    keywords: ["suministros", "vivienda", "luz", "electricidad", "agua", "internet", "deducir", "casa", "autonomo"],
    answer: [
      "Sí, con matices. Si desarrollas la actividad en tu vivienda habitual y tributas en estimación directa, los suministros (electricidad, agua, gas, telefonía e internet) pueden ser parcialmente deducibles.",
      "El extracto de la guía indica como referencia aplicar un 30 % sobre la parte de la vivienda afecta a la actividad. Conviene documentar la afectación (metros cuadrados, fotografías, plano) y conservar las facturas originales.",
    ],
    citations: [
      {
        docId: "doc-normativa",
        docTitle: "Guía fiscal del autónomo — extracto",
        section: "Deducción de gastos de suministros",
        fragment:
          "«En estimación directa, los gastos de suministros de la vivienda habitual afecta a la actividad serán deducibles en un 30 % sobre la proporción afectada…»",
        similarity: 0.9,
      },
      {
        docId: "doc-normativa",
        docTitle: "Guía fiscal del autónomo — extracto",
        section: "Ejemplo de aplicación",
        fragment:
          "«Ejemplo: vivienda de 90 m² con 27 m² afectos (30 %) y gasto anual de 1.800 € → deducción ilustrativa de 162 €…»",
        similarity: 0.85,
      },
      {
        docId: "doc-normativa",
        docTitle: "Guía fiscal del autónomo — extracto",
        section: "Obligaciones de documentación",
        fragment: "«Deberá conservarse la factura original y acreditarse la afectación de la vivienda a la actividad…»",
        similarity: 0.81,
      },
    ],
    grounding: "alto",
    groundingScore: 0.86,
    risks: [
      {
        level: "medio",
        label: "Prueba de afectación",
        detail: "Sin documentación de la superficie afectada, la deducción puede ser rechazada en un requerimiento.",
      },
      {
        level: "bajo",
        label: "Cambio de régimen",
        detail: "La regla descrita aplica a estimación directa; en módulos el tratamiento es distinto.",
      },
    ],
    recommendation:
      "Documentar la afectación de la vivienda y aplicar el porcentaje de referencia con una herramienta de cálculo determinista antes de deducir.",
    suggestedActions: ["Abrir calculadora de gastos", "Ver alertas del trimestre"],
  },
  {
    id: "q-normativa-requisitos",
    docId: "doc-normativa",
    question: "¿Qué requisitos exige la deducción de gastos?",
    keywords: ["requisitos", "exige", "condiciones", "afectacion", "documentacion", "facturas", "regimen"],
    answer: [
      "El extracto de la guía resume tres requisitos: tributar en estimación directa, que la vivienda sea a la vez habitual y centro de actividad, y conservar las facturas originales de los suministros.",
      "Además, se recomienda acreditar la superficie afectada (plano o fotografías) y aplicar el porcentaje de referencia de forma consistente entre ejercicios.",
    ],
    citations: [
      {
        docId: "doc-normativa",
        docTitle: "Guía fiscal del autónomo — extracto",
        section: "Requisitos de deducibilidad",
        fragment:
          "«Requisitos: estimación directa, afectación parcial de la vivienda habitual y conservación de facturas originales…»",
        similarity: 0.89,
      },
      {
        docId: "doc-normativa",
        docTitle: "Guía fiscal del autónomo — extracto",
        section: "Obligaciones de documentación",
        fragment: "«La afectación deberá acreditarse por cualquier medio de prueba admitido en derecho…»",
        similarity: 0.82,
      },
    ],
    grounding: "alto",
    groundingScore: 0.85,
    risks: [
      {
        level: "medio",
        label: "Consistencia entre ejercicios",
        detail: "Variaciones injustificadas del porcentaje aplicado entre años pueden requerir explicación adicional.",
      },
    ],
    recommendation:
      "Mantener un expediente de afectación actualizado y aplicar criterios estables año a año.",
    suggestedActions: ["Crear checklist de requisitos", "Archivar facturas"],
  },
];

/** Respuesta genérica cuando la consulta libre no encaja con ningún escenario. */
export const FALLBACK_SCENARIO: Omit<QueryScenario, "docId"> & { docId: string } = {
  id: "q-fallback",
  docId: "doc-normativa",
  question: "",
  keywords: [],
  answer: [
    "Esta demo trabaja con una base documental sintética limitada. La consulta no coincide con ningún escenario predefinido, por lo que la respuesta se apoya únicamente en el extracto normativo general.",
    "En el producto operativo, la recuperación ampliaría la búsqueda a toda la base de conocimiento indexada. Prueba con una de las consultas sugeridas para ver el flujo completo con citas.",
  ],
  citations: [
    {
      docId: "doc-normativa",
      docTitle: "Guía fiscal del autónomo — extracto",
      section: "Introducción",
      fragment: "«Esta guía resume criterios generales de deducibilidad para perfiles autónomos…»",
      similarity: 0.61,
    },
  ],
  grounding: "bajo",
  groundingScore: 0.42,
  risks: [
    {
      level: "medio",
      label: "Cobertura limitada",
      detail: "La consulta queda fuera de los escenarios sintéticos de la demo; el resultado es orientativo.",
    },
  ],
  recommendation:
    "Reformular la consulta con términos fiscales o laborales concretos, o utilizar una de las consultas sugeridas.",
  suggestedActions: ["Ver consultas sugeridas"],
};
