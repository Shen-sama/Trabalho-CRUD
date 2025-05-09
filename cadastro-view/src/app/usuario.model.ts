export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  enderecos: Endereco[];
  telefones: Telefone[];
}

export interface Endereco {
  rua: string;
  numero: string;
  complemento: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Telefone {
  ddd: string;
  numero: string;
}
