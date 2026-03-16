using GastosResidenciais.Share.Model.Model;
using System.ComponentModel.DataAnnotations;

namespace GastosResidenciais.DTO.Categoria
{
    public class CriaAtualizaCategoriaDto
    {
        [MaxLength(400, ErrorMessage = "a descricão deve ter no máximo 400 caracteres.")]
        public required string Descricao { get; set; }

        public required Finalidade TipoFinalidade { get; set; }
    }
}
