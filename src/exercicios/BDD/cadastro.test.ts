import { cadastrarCliente } from './cadastro'

const enderecoFake = {
  cep: '12345678',
  logradouro: 'Rua das Flores',
  bairro: 'Centro',
  cidade: 'São Paulo',
  uf: 'SP',
}

describe('cadastrarCliente', () => {
  it('deve lançar erro quando o CEP tem formato inválido', async () => {
    await expect(cadastrarCliente({ nome: 'João', cep: '123' })).rejects.toThrow('CEP inválido')
  })

  it('deve aceitar CEP válido com hífen', async () => {
    const buscar = vi.fn().mockResolvedValue(enderecoFake)
    const resultado = await cadastrarCliente({ nome: 'João', cep: '12345-678' }, buscar)
    expect(resultado.nome).toBe('João')
  })

  it('deve aceitar CEP válido sem hífen', async () => {
    const buscar = vi.fn().mockResolvedValue(enderecoFake)
    const resultado = await cadastrarCliente({ nome: 'João', cep: '12345678' }, buscar)
    expect(resultado.nome).toBe('João')
  })

  it('deve lançar erro quando o endereço não é encontrado', async () => {
    const buscar = vi.fn().mockResolvedValue(null)
    await expect(cadastrarCliente({ nome: 'João', cep: '12345678' }, buscar)).rejects.toThrow('CEP não encontrado')
  })

  it('deve retornar cliente com nome e endereço quando o cadastro é bem-sucedido', async () => {
    const buscar = vi.fn().mockResolvedValue(enderecoFake)
    const resultado = await cadastrarCliente({ nome: 'Maria', cep: '12345678' }, buscar)
    expect(resultado).toEqual({ nome: 'Maria', endereco: enderecoFake })
  })

  it('deve lançar erro quando a busca de endereço falha com exceção', async () => {
    const buscar = vi.fn().mockRejectedValue(new Error('timeout'))
    await expect(cadastrarCliente({ nome: 'João', cep: '12345678' }, buscar)).rejects.toThrow('Não foi possível consultar o CEP agora, tente novamente')
  })

  it('deve remover o hífen do CEP antes de chamar a função de busca', async () => {
    const buscar = vi.fn().mockResolvedValue(enderecoFake)
    await cadastrarCliente({ nome: 'João', cep: '12345-678' }, buscar)
    expect(buscar).toHaveBeenCalledWith('12345678')
  })
})

describe('buscarEnderecoNoViaCep', () => {
  it('deve retornar o endereço quando o ViaCEP responde com sucesso', async () => {})

  it('deve retornar null quando o ViaCEP indica que o CEP não existe', async () => {})

  it('deve lançar erro quando o ViaCEP responde com status de erro HTTP', async () => {})
})
