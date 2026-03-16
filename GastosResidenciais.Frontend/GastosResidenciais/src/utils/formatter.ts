export const dateFormatter = new Intl.DateTimeFormat('pt-BR');

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});


export const parseCurrency = (value: string): number => {
    return Number(
      value
        .replace(/\./g, '')
        .replace(',', '.')
    )
  }
