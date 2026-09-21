import { describe, it, expect } from 'vitest'
import { calcularParcelamento } from './parcelamento'

describe('calcularParcelamento', () => {
  describe('sem juros (1x a 4x)', () => {
    it('retorna o valor total em parcela única quando for 1x', () => {
      const resultado = calcularParcelamento(1000, 1)

      expect(resultado.valorParcela).toBe(1000)
      expect(resultado.totalParcelas).toBe(1)
    })

    it('divide o valor sem juros quando for 4x', () => {
      const resultado = calcularParcelamento(1000, 4)

      expect(resultado.valorParcela).toBe(250)
      expect(resultado.totalParcelas).toBe(4)
    })
  })

  describe('com juros', () => {
    it('aplica 5% sobre o total quando for de 5x a 8x', () => {
      const resultado = calcularParcelamento(1000, 5)

      expect(resultado.valorParcela).toBe(210)
      expect(resultado.totalParcelas).toBe(5)
    })
  })
})
