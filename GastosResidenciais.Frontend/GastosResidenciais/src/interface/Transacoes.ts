import type { TipoFinalidadeApi } from "./TipoFinalidade";

export interface Transacoes {    
    id: string;
    descricao: string;
    valor: number;
    tipoFinalidade: TipoFinalidadeApi;
    categoriaId: string;
    pessoaId: string;
    dataCriacao: string;
}

export interface UpdateTransacoesArgs {
  id: string
  data: {
    descricao: string
    valor: number
    categoriaId: string
    pessoaId: string
    tipoFinalidade: number
  }
}

export interface CreateTransacoesArgs {    
    descricao: string;
    valor: number;
    categoriaId: string;
    pessoaId: string;
    tipoFinalidade: TipoFinalidadeApi;
}