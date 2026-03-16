namespace GastosResidenciais.Share.Api.DTO.Transacoes;

public class TotaisPessoaDto
{

    public Guid PessoaId { get; set; }
    public string Pessoa { get; set; }
    public decimal Receitas { get; set; }
    public decimal Despesas { get; set; }
    public decimal Saldo => Receitas - Despesas;
}
