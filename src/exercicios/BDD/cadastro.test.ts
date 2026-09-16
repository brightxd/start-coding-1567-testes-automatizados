import { cadastrarCliente, buscarEnderecoNoViaCep } from './cadastro'

describe('cadastrarCliente', () => {
  it('deve lançar erro quando o CEP tem formato inválido', async () => {})

  it('deve aceitar CEP válido com hífen', async () => {})

  it('deve aceitar CEP válido sem hífen', async () => {})

  it('deve lançar erro quando o endereço não é encontrado', async () => {})

  it('deve retornar cliente com nome e endereço quando o cadastro é bem-sucedido', async () => {})

  it('deve lançar erro quando a busca de endereço falha com exceção', async () => {})

  it('deve remover o hífen do CEP antes de chamar a função de busca', async () => {})
})

describe('buscarEnderecoNoViaCep', () => {
  it('deve retornar o endereço quando o ViaCEP responde com sucesso', async () => {})

  it('deve retornar null quando o ViaCEP indica que o CEP não existe', async () => {})

  it('deve lançar erro quando o ViaCEP responde com status de erro HTTP', async () => {})
})
