using GastosResidenciais.Share.Model.Model;

namespace GastosResidenciais.DTO.Transacoes;

public class ReadTransacoesDto
{
    public Guid Id { get; set; }
    public string Descricao { get; set; }
    public decimal Valor { get; set; }
    public Finalidade TipoFinalidade { get; set; }
    public Guid CategoriaId { get; set; }
    public Guid PessoaId { get; set; }
    public DateTime DataCriacao { get; set; }
    public DateTime DataAtualizacao { get; set; }
}
