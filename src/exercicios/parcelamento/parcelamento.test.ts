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

    it('aplica 8% sobre o total quando for de 9x a 12x', () => {
      const resultado = calcularParcelamento(1000, 9)

      expect(resultado.valorParcela).toBe(120)
      expect(resultado.totalParcelas).toBe(9)
    })

    it('aplica 10% sobre o total quando for de 13x a 18x', () => {
      const resultado = calcularParcelamento(1000, 13)

      expect(resultado.valorParcela).toBe(84.62)
      expect(resultado.totalParcelas).toBe(13)
    })

    it.each([
      { parcelas: 4,  esperado: 250    },
      { parcelas: 5,  esperado: 210    },
      { parcelas: 8,  esperado: 131.25 },
      { parcelas: 9,  esperado: 120    },
      { parcelas: 12, esperado: 90     },
      { parcelas: 13, esperado: 84.62  },
    ])('aplica a faixa correta no limite de $parcelas parcelas', ({ parcelas, esperado }) => {
      const resultado = calcularParcelamento(1000, parcelas)

      expect(resultado.valorParcela).toBe(esperado)
    })
  })

  describe('arredondamento', () => {
    it('arredonda o valor da parcela para 2 casas decimais', () => {
      const resultado = calcularParcelamento(100, 3)

      expect(resultado.valorParcela).toBe(33.33)
      expect(resultado.totalParcelas).toBe(3)
    })
  })

  describe('validações', () => {
    it('lança erro quando o número de parcelas for menor que 1', () => {
      expect(() => calcularParcelamento(1000, 0)).toThrow('Número de parcelas deve ser um inteiro entre 1 e 18')
    })

    it('lança erro quando o número de parcelas for maior que 18', () => {
      expect(() => calcularParcelamento(1000, 19)).toThrow('Número de parcelas deve ser um inteiro entre 1 e 18')
    })

    it('lança erro quando o número de parcelas não for inteiro', () => {
      expect(() => calcularParcelamento(1000, 2.5)).toThrow('Número de parcelas deve ser um inteiro entre 1 e 18')
    })

    it('lança erro quando o valor da compra for zero ou negativo', () => {
      expect(() => calcularParcelamento(0, 3)).toThrow('Valor da compra deve ser maior que zero')
      expect(() => calcularParcelamento(-50, 3)).toThrow('Valor da compra deve ser maior que zero')
    })
  })
})
