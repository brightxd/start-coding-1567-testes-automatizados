import {
  criarCarrinho,
  adicionarItem,
  aplicarCupom,
  calcularSubtotal,
  calcularDesconto,
  calcularFrete,
  calcularTotal,
} from './carrinho'

describe('carrinho', () => {

  describe('criarCarrinho', () => {
    it('deve criar um carrinho vazio', () => {
      // act
      const carrinho = criarCarrinho()

      // assert
      expect(carrinho.itens).toEqual([])
    })
  })

  describe('adicionarItem', () => {
    it('deve adicionar um item ao carrinho', () => {
      // arrange
      const carrinho = criarCarrinho()
      const item = { nome: 'Camiseta', precoEmCentavos: 5000, quantidade: 1 }

      // act
      const resultado = adicionarItem(carrinho, item)

      // assert
      expect(resultado.itens).toHaveLength(1)
      expect(resultado.itens[0]).toEqual(item)
    })

    it('deve lançar erro ao adicionar item com quantidade zero', () => {
      // arrange
      const carrinho = criarCarrinho()
      const item = { nome: 'Camiseta', precoEmCentavos: 5000, quantidade: 0 }

      // act & assert
      expect(() => adicionarItem(carrinho, item)).toThrow('Quantidade deve ser maior que zero')
    })

    it('deve lançar erro ao adicionar item com quantidade negativa', () => {
      // arrange
      const carrinho = criarCarrinho()
      const item = { nome: 'Camiseta', precoEmCentavos: 5000, quantidade: -2 }

      // act & assert
      expect(() => adicionarItem(carrinho, item)).toThrow('Quantidade deve ser maior que zero')
    })
  })

  describe('aplicarCupom', () => {
    it('deve aplicar cupom percentual ao carrinho', () => {
      // arrange
      const carrinho = criarCarrinho()
      const cupom = { tipo: 'percentual' as const, percentual: 10 }

      // act
      const resultado = aplicarCupom(carrinho, cupom)

      // assert
      expect(resultado.cupom).toEqual(cupom)
    })

    it('deve aplicar cupom fixo ao carrinho', () => {
      // arrange
      const carrinho = criarCarrinho()
      const cupom = { tipo: 'fixo' as const, valorEmCentavos: 1000 }

      // act
      const resultado = aplicarCupom(carrinho, cupom)

      // assert
      expect(resultado.cupom).toEqual(cupom)
    })

    it('deve lançar erro ao aplicar cupom expirado', () => {
      // arrange
      const carrinho = criarCarrinho()
      const cupom = { tipo: 'percentual' as const, percentual: 10, validoAte: new Date('2020-01-01') }

      // act & assert
      expect(() => aplicarCupom(carrinho, cupom)).toThrow('Cupom expirado')
    })
  })

  describe('calcularSubtotal', () => {
    it('deve retornar zero para carrinho vazio', () => {
      // arrange
      const carrinho = criarCarrinho()

      // act
      const resultado = calcularSubtotal(carrinho)

      // assert
      expect(resultado).toBe(0)
    })

    it('deve calcular o subtotal com múltiplos itens', () => {
      // arrange
      let carrinho = criarCarrinho()
      carrinho = adicionarItem(carrinho, { nome: 'Camiseta', precoEmCentavos: 5000, quantidade: 2 })
      carrinho = adicionarItem(carrinho, { nome: 'Calça', precoEmCentavos: 8000, quantidade: 1 })

      // act
      const resultado = calcularSubtotal(carrinho)

      // assert
      expect(resultado).toBe(18000)
    })
  })

  describe('calcularDesconto', () => {
    it('deve retornar zero quando não há cupom', () => {
      // arrange
      let carrinho = criarCarrinho()
      carrinho = adicionarItem(carrinho, { nome: 'Camiseta', precoEmCentavos: 5000, quantidade: 1 })

      // act
      const resultado = calcularDesconto(carrinho)

      // assert
      expect(resultado).toBe(0)
    })

    it('deve calcular desconto percentual', () => {
      // arrange
      let carrinho = criarCarrinho()
      carrinho = adicionarItem(carrinho, { nome: 'Camiseta', precoEmCentavos: 10000, quantidade: 1 })
      carrinho = aplicarCupom(carrinho, { tipo: 'percentual', percentual: 10 })

      // act
      const resultado = calcularDesconto(carrinho)

      // assert
      expect(resultado).toBe(1000)
    })

    it('deve calcular desconto fixo', () => {
      // arrange
      let carrinho = criarCarrinho()
      carrinho = adicionarItem(carrinho, { nome: 'Camiseta', precoEmCentavos: 10000, quantidade: 1 })
      carrinho = aplicarCupom(carrinho, { tipo: 'fixo', valorEmCentavos: 2000 })

      // act
      const resultado = calcularDesconto(carrinho)

      // assert
      expect(resultado).toBe(2000)
    })

    it('não deve descontar mais do que o subtotal com cupom fixo', () => {
      // arrange
      let carrinho = criarCarrinho()
      carrinho = adicionarItem(carrinho, { nome: 'Camiseta', precoEmCentavos: 1000, quantidade: 1 })
      carrinho = aplicarCupom(carrinho, { tipo: 'fixo', valorEmCentavos: 9999 })

      // act
      const resultado = calcularDesconto(carrinho)

      // assert
      expect(resultado).toBe(1000)
    })
  })

  describe('calcularFrete', () => {
    it('deve retornar zero para carrinho vazio', () => {
      // arrange
      const carrinho = criarCarrinho()

      // act
      const resultado = calcularFrete(carrinho)

      // assert
      expect(resultado).toBe(0)
    })

    it('deve cobrar frete quando o valor é menor que o mínimo para frete grátis', () => {
      // arrange
      let carrinho = criarCarrinho()
      carrinho = adicionarItem(carrinho, { nome: 'Camiseta', precoEmCentavos: 5000, quantidade: 1 })

      // act
      const resultado = calcularFrete(carrinho)

      // assert
      expect(resultado).toBe(1500)
    })

    it('deve ter frete grátis quando o valor atinge o mínimo', () => {
      // arrange
      let carrinho = criarCarrinho()
      carrinho = adicionarItem(carrinho, { nome: 'Camiseta', precoEmCentavos: 20000, quantidade: 1 })

      // act
      const resultado = calcularFrete(carrinho)

      // assert
      expect(resultado).toBe(0)
    })
  })

  describe('calcularTotal', () => {
    it('deve calcular o total com frete', () => {
      // arrange
      let carrinho = criarCarrinho()
      carrinho = adicionarItem(carrinho, { nome: 'Camiseta', precoEmCentavos: 5000, quantidade: 1 })

      // act
      const resultado = calcularTotal(carrinho)

      // assert
      expect(resultado).toBe(6500)
    })

    it('deve calcular o total com desconto e sem frete', () => {
      // arrange
      let carrinho = criarCarrinho()
      carrinho = adicionarItem(carrinho, { nome: 'Camiseta', precoEmCentavos: 25000, quantidade: 1 })
      carrinho = aplicarCupom(carrinho, { tipo: 'percentual', percentual: 10 })

      // act
      const resultado = calcularTotal(carrinho)

      // assert
      expect(resultado).toBe(22500)
    })
  })

})
