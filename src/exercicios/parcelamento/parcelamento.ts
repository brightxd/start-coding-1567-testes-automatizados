export type ResultadoParcelamento = {
  valorParcela: number
  totalParcelas: number
}

export function calcularParcelamento(
  valorCompra: number,
  numeroParcelas: number
): ResultadoParcelamento {
  return { valorParcela: valorCompra / numeroParcelas, totalParcelas: numeroParcelas }
}
