using GastosResidenciais.DTO.Categoria;

namespace GastosResidenciais.Interface
{
    public interface ICategoriaRepository:IRepository<CriaAtualizaCategoriaDto, ReadCategoriaDto>
    {
    }
}
