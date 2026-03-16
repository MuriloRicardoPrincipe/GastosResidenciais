import type { TipoFinalidadeApi } from "./TipoFinalidade";

export interface Categoria {    
    id: string;
    descricao: string;
    tipoFinalidade: TipoFinalidadeApi;
    dataCriacao: string;
}


export interface UpdateCategoriaArgs {
  id: string
  data: {
    descricao: string
    tipoFinalidade: TipoFinalidadeApi;
  }
}

export interface CreateCategoriaArgs {   
    descricao: string
    tipoFinalidade: TipoFinalidadeApi;
}