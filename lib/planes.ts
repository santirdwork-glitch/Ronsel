export const ORDEN_PLANES = ["Empieza", "Avanza", "Transforma"];

export function tienePlanSuficiente(planUsuario: string, planMinimo: string): boolean {
  const indiceUsuario = ORDEN_PLANES.indexOf(planUsuario);
  const indiceMinimo = ORDEN_PLANES.indexOf(planMinimo);

  if (indiceUsuario === -1 || indiceMinimo === -1) return false;

  return indiceUsuario >= indiceMinimo;
}