/**
 * Datos sintéticos de la demo de portfolio.
 * Todas las empresas, personas, importes y normativa citada son ficticios.
 * No existe conexión con ningún servicio externo ni modelo de IA real.
 */

export type DocKind = "contrato" | "factura" | "nomina" | "normativa";

export interface DocKeyFigure {
  label: string;
  value: string;
}

export interface SyntheticDocument {
  id: string;
  kind: DocKind;
  kindLabel: string;
  title: string;
  subtitle: string;
  updated: string;
  summary: string;
  parties: string[];
  keyFigures: DocKeyFigure[];
}

export const DOCUMENTS: SyntheticDocument[] = [
  {
    id: "doc-contrato",
    kind: "contrato",
    kindLabel: "Contrato",
    title: "Contrato de arrendamiento de local comercial",
    subtitle: "Meridian Retail S.L. · Norte Sur Arrendamientos S.A.",
    updated: "Indexado el 12/03/2026",
    summary:
      "Arrendamiento de local comercial de 118 m² en planta baja destinado a actividad de retail. Duración inicial de 5 años con prórroga tácita anual, renta mensual escalonada y fianza de dos mensualidades.",
    parties: [
      "Arrendador: Norte Sur Arrendamientos S.A. (ficticia)",
      "Arrendatario: Meridian Retail S.L. (ficticia)",
    ],
    keyFigures: [
      { label: "Renta mensual", value: "1.950,00 €" },
      { label: "Duración inicial", value: "5 años" },
      { label: "Fianza", value: "2 mensualidades" },
      { label: "Superficie", value: "118 m²" },
    ],
  },
  {
    id: "doc-factura",
    kind: "factura",
    kindLabel: "Factura",
    title: "Factura F-2026-041",
    subtitle: "Litoral Proyectos S.L. → Meridian Retail S.L.",
    updated: "Importada el 02/04/2026",
    summary:
      "Factura por servicios de reforma parcial del local comercial. Base imponible de 4.850,00 € con IVA al 21 %. Forma de pago por transferencia a 30 días desde la fecha de emisión.",
    parties: [
      "Emisor: Litoral Proyectos S.L. (ficticia)",
      "Receptor: Meridian Retail S.L. (ficticia)",
    ],
    keyFigures: [
      { label: "Base imponible", value: "4.850,00 €" },
      { label: "IVA (21 %)", value: "1.018,50 €" },
      { label: "Total", value: "5.868,50 €" },
      { label: "Vencimiento", value: "30 días" },
    ],
  },
  {
    id: "doc-nomina",
    kind: "nomina",
    kindLabel: "Nómina",
    title: "Nómina · marzo 2026",
    subtitle: "Meridian Retail S.L. · categoría administrativa",
    updated: "Registrada el 31/03/2026",
    summary:
      "Nómina mensual de perfil administrativo con salario base, plus de convenio y pagas extraordinarias prorrateadas. Retención de IRPF al 11,4 % y cotizaciones a la Seguridad Social según grupo de cotización 5.",
    parties: [
      "Empresa: Meridian Retail S.L. (ficticia)",
      "Trabajador/a: persona ficticia (datos anonimizados)",
    ],
    keyFigures: [
      { label: "Salario bruto", value: "1.740,00 €" },
      { label: "Retención IRPF", value: "11,4 %" },
      { label: "Líquido a percibir", value: "1.428,10 €" },
      { label: "Grupo de cotización", value: "5" },
    ],
  },
  {
    id: "doc-normativa",
    kind: "normativa",
    kindLabel: "Normativa",
    title: "Guía fiscal del autónomo — extracto",
    subtitle: "Deducción de suministros en vivienda habitual",
    updated: "Actualizada el 20/01/2026",
    summary:
      "Extracto sintético de una guía de conocimiento sobre deducibilidad de gastos de suministros cuando la vivienda habitual es también centro de actividad. Describe requisitos, porcentaje aplicable y obligaciones de documentación.",
    parties: ["Documento de conocimiento interno (ficticio)"],
    keyFigures: [
      { label: "Porcentaje de referencia", value: "30 %" },
      { label: "Régimen aplicable", value: "Estimación directa" },
      { label: "Fragmentos indexados", value: "14" },
    ],
  },
];

export const docById = (id: string): SyntheticDocument | undefined =>
  DOCUMENTS.find((d) => d.id === id);
