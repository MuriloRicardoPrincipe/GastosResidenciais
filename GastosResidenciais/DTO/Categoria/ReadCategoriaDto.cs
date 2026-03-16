using GastosResidenciais.Share.Model.Model;

namespace GastosResidenciais.DTO.Categoria
{
    public class ReadCategoriaDto
    {
        public Guid Id { get; set; }
        public string Descricao { get; set; }
        public Finalidade TipoFinalidade { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataAtualizacao { get; set; }
    }
}
