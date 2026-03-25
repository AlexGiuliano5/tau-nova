/**
 * Opciones de categoría del reporte (placeholder hasta que vengan del backend).
 */

export const REPORTE_CATEGORIAS = [
  { id: 'sin_datos', label: 'Sin datos' },
  { id: 'error_funcionalidad', label: 'Error de funcionalidad' }
] as const;

export type ReporteCategoriaId = (typeof REPORTE_CATEGORIAS)[number]['id'];
