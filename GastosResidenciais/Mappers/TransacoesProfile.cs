using AutoMapper;
using GastosResidenciais.DTO.Transacoes;
using GastosResidenciais.Share.Model.Model;

namespace GastosResidenciais.Mappers;

public class TransacoesProfile : Profile
{
    public TransacoesProfile() 
    {
        CreateMap<Transacoes,  ReadTransacoesDto>();
    }
}
