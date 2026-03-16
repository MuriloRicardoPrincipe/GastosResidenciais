using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.Share.Model.Model;

public class Pessoas : BaseEntity
{
    [Required]
    [MaxLength(200)]
    public string Nome { get; private set; }

    public int Idade { get; private set; }

    public virtual ICollection<Transacoes> Transacoes { get; set; }

    protected Pessoas() { }

    public Pessoas(Guid id, string nome, int idade)
    {
        this.Nome = nome;
        this.Idade = idade;
        CriaData();
    }

    public void Atualizacao(string nome, int idade)
    {
        this.Nome = nome;
        this.Idade = idade;
        AtualizarData();
    }
}
