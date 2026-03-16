using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.DTO.Pessoa;

public class CriaAtualizaPessoaDto
{

    [MaxLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres.")]
    public required string Nome { get; set; }

    public required int Idade { get; set; }
}
