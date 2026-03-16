export const TipoFinalidadeApi = {
  DESPESA: 1,
  RECEITA: 2,
} as const

export type TipoFinalidadeApi =
  typeof TipoFinalidadeApi[keyof typeof TipoFinalidadeApi]

export const TipoFinalidadeLabel: Record<number, string> = {
  [TipoFinalidadeApi.DESPESA]: "Despesa",
  [TipoFinalidadeApi.RECEITA]: "Receita",
}