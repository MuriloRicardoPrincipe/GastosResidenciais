using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Share.Model.Model;

public class Transacoes : BaseEntity
{
    [Required]
    [MaxLength(400)]
    public string Descricao { get; private set; }
    public decimal Valor { get; private set; }
    public Finalidade TipoFinalidade { get; private set; }
    public virtual Categorias Categoria { get; private set; }
    public Guid CategoriaId { get; private set; }
    public virtual Pessoas Pessoa { get; private set; }
    public Guid PessoaId { get; private set; }

    protected Transacoes() { }
    public Transacoes(Guid id, string descricao, decimal valor, Finalidade tipoFinalidade, Guid categoriaId, Guid pessoaId)
    {
        this.Descricao = descricao;
        this.Valor = valor;
        this.TipoFinalidade = tipoFinalidade;
        this.CategoriaId = categoriaId;
        this.PessoaId = pessoaId;
        CriaData();
    }

    public void Atualizacao(string descricao, decimal valor, Finalidade tipoFinalidade, Guid categoriaId, Guid pessoaId)
    {
        this.Descricao = descricao;
        this.Valor = valor;
        this.TipoFinalidade = tipoFinalidade;
        this.CategoriaId = categoriaId;
        this.PessoaId = pessoaId;
        AtualizarData();
    }
    private void ValidaValores(decimal valor)
    {
        if (valor <= 0)
            throw new ArgumentException("Preço de venda deve ser maior que zero.");

        Valor = valor;
    }

    private void ValidaTipoFinalidade(Categorias categoria, Finalidade tipoFinalidade)
    {
        
    }
}
