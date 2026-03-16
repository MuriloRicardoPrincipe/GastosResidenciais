using GastosResidenciais.DTO.Transacoes;
using GastosResidenciais.Share.Api.DTO.Transacoes;

namespace GastosResidenciais.Interface
{
    public interface ITransacoesRepository : IRepository<CriaAtualizaTransacoesDto, ReadTransacoesDto>
    {
        Task<IEnumerable<TotaisPessoaDto>> TotaisPorPessoa();
        Task<IEnumerable<TotaisCategoriaDto>> TotaisPorCategoria();
    }
}
