using AutoMapper;
using GastosResidenciais.DTO.Pessoa;
using GastosResidenciais.Share.Model.Model;

namespace GastosResidenciais.Mappers
{
    public class PessoaProfile : Profile
    {
        public PessoaProfile() 
        {
            CreateMap<Pessoas, ReadPessoasDto>();
        }
    }
}
