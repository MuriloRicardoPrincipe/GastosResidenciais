namespace GastosResidenciais.Share.Api.DTO.Transacoes;

public class TotaisCategoriaDto
{
    public Guid CategoriaId { get; set; }
    public string Categoria { get; set; }
    public decimal Receitas { get; set; }
    public decimal Despesas { get; set; }
    public decimal Saldo => Receitas - Despesas;
}
