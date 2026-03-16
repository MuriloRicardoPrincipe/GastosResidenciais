using GastosResidenciais.Share.Model.Model;
using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.DTO.Transacoes;

public class CriaAtualizaTransacoesDto
{

    [MaxLength(400, ErrorMessage = "a descricão deve ter no máximo 400 caracteres.")]
    public required string Descricao { get; set; }
    public required decimal Valor { get; set; }
    public required Finalidade TipoFinalidade { get; set; }
    public required Guid CategoriaId { get; set; }
    public required Guid PessoaId { get; set; }
}
