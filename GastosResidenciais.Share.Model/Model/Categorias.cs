using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Share.Model.Model;

public class Categorias : BaseEntity
{
    [Required]
    [MaxLength(400)]
    public string Descricao {  get; private set; }

    public Finalidade TipoFinalidade { get; private set; }

    public virtual ICollection<Transacoes> Transacoes { get; set; }

    protected Categorias() { }

    public Categorias(Guid id, string descricao, Finalidade tipoFinalidade)
    {
        this.Descricao = descricao;
        this.TipoFinalidade = tipoFinalidade;
        CriaData();
    }

    public void Atualizacao(string descricao, Finalidade tipoFinalidade)
    {
        this.Descricao = descricao;
        this.TipoFinalidade = tipoFinalidade;
        AtualizarData();
    }
}
