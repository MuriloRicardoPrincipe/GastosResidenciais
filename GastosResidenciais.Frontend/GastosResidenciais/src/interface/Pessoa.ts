// O DTO que vem do backend solicita.
export interface Pessoa {    
    id: string;
    nome: string;
    idade: number;
    dataCriacao: string;
}

export interface UpdatePessoaArgs {
  id: string
  data: {
    nome: string
    idade: number
  }
}

export interface CreatePessoaArgs {    
    nome: string;
    idade: number;
}