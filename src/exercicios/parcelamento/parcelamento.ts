export type ResultadoParcelamento = {
  valorParcela: number
  totalParcelas: number
}

export function calcularParcelamento(
  valorCompra: number,
  numeroParcelas: number
): ResultadoParcelamento {
  let juros = 0
  if (numeroParcelas >= 5 && numeroParcelas <= 8) juros = 0.05
  else if (numeroParcelas >= 9 && numeroParcelas <= 12) juros = 0.08
  else if (numeroParcelas >= 13 && numeroParcelas <= 18) juros = 0.10

  const total = valorCompra * (1 + juros)
  const valorParcela = Math.round((total / numeroParcelas) * 100) / 100
  return { valorParcela, totalParcelas: numeroParcelas }
}
