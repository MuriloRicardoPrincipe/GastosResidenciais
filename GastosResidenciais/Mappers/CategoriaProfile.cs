using AutoMapper;
using GastosResidenciais.DTO.Categoria;
using GastosResidenciais.Share.Model.Model;

namespace GastosResidenciais.Mappers
{
    public class CategoriaProfile : Profile
    {
        public CategoriaProfile() 
        { 
            CreateMap<Categorias, ReadCategoriaDto>();
        }
    }
}
