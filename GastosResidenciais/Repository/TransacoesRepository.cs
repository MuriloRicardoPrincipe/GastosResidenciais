using AutoMapper;
using Dapper;
using GastosResidenciais.DTO.Transacoes;
using GastosResidenciais.Interface;
using GastosResidenciais.Share.Api.DTO.Transacoes;
using GastosResidenciais.Share.Data.Data;
using GastosResidenciais.Share.Model.Model;
using Microsoft.EntityFrameworkCore;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace GastosResidenciais.Repository;

public class TransacoesRepository : ITransacoesRepository
{
    private readonly GastosResidenciaisContext _context;
    private readonly IDbConnection _connection;
    private IMapper _mapper;

    public TransacoesRepository(GastosResidenciaisContext context, IMapper mapper, IDbConnection connection )
    {
        _context = context;
        _mapper = mapper;
        _connection = connection;
    }

    public async Task<ReadTransacoesDto> Criar(CriaAtualizaTransacoesDto dto)
    {
        var pessoa = await _context.Pessoas.FirstOrDefaultAsync(p => p.Id == dto.PessoaId)
    ?? throw new KeyNotFoundException("Pessoa não encontrado.");

        if (pessoa.Idade < 18 && dto.TipoFinalidade == Finalidade.RECEITA || dto.TipoFinalidade == Finalidade.AMBAS)
                    throw new Exception( "A " + pessoa.Nome + "não pode cadastrar receita.");
        
        Transacoes transacoes = new Transacoes
        (
            Guid.NewGuid(),
            dto.Descricao,
            dto.Valor,
            dto.TipoFinalidade,
            dto.CategoriaId,
            dto.PessoaId
        );

        await _context.Transacoes.AddAsync(transacoes);
        await _context.SaveChangesAsync();

        return new ReadTransacoesDto
        {
            Id = transacoes.Id,
            Descricao = transacoes.Descricao,
            Valor = transacoes.Valor,
            TipoFinalidade = transacoes.TipoFinalidade,
            CategoriaId = transacoes.CategoriaId,
            PessoaId = transacoes.PessoaId,
            DataCriacao = transacoes.DataCriacao,
        };
    }

    public List<ReadTransacoesDto> GetAll()
    {
        return _mapper.Map<List<ReadTransacoesDto>>(_context.Transacoes.ToList());
    }

    public ReadTransacoesDto GetById(Guid id)
    {
        var transacoes = _mapper.Map<ReadTransacoesDto>(_context.Transacoes.FirstOrDefault(p => p.Id == id));
        if (transacoes == null)
        {
            throw new InvalidOperationException("Transações não encontrada.");
        }

        return transacoes;
    }

    public async Task<ReadTransacoesDto> Update(Guid id, CriaAtualizaTransacoesDto dto)
    {
        var transacoes = await _context.Transacoes.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new KeyNotFoundException("Transações não encontrado.");

        var pessoa = await _context.Pessoas.FirstOrDefaultAsync(p => p.Id == dto.PessoaId)
            ?? throw new KeyNotFoundException("Pessoa não encontrado.");

        var categoria = await _context.Categorias.FirstOrDefaultAsync(p => p.Id == dto.CategoriaId)
            ?? throw new KeyNotFoundException("Categiria não encontrado.");

        if (pessoa.Idade < 18 && dto.TipoFinalidade == Finalidade.RECEITA || dto.TipoFinalidade == Finalidade.AMBAS)
            throw new Exception("A " + pessoa.Nome + "não pode cadastrar receita.");


        transacoes.Atualizacao(
            dto.Descricao,
            dto.Valor,
            dto.TipoFinalidade,
            dto.CategoriaId,
            dto.PessoaId
        );

        _context.Transacoes.Update(transacoes);

        await _context.SaveChangesAsync();

        return new ReadTransacoesDto
        {
            Id = transacoes.Id,
            Descricao = transacoes.Descricao,
            Valor = transacoes.Valor,
            TipoFinalidade = transacoes.TipoFinalidade,
            CategoriaId = transacoes.CategoriaId,
            PessoaId = transacoes.PessoaId,
            DataCriacao = transacoes.DataCriacao,
        };
    }
    public async Task<bool> Delete(Guid id)
    {
        var transacoes = await _context.Transacoes.FindAsync(id);

        if (transacoes == null)
            return false;

        _context.Transacoes.Remove(transacoes);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<IEnumerable<TotaisPessoaDto>> TotaisPorPessoa()
    {
        var sql = @"
            SELECT 
                p.Id as PessoaId,
                p.Nome AS Pessoa,
                SUM(CASE 
                    WHEN t.TipoFinalidade = 1 THEN t.Valor 
                    ELSE 0 END) AS Despesas,
                SUM(CASE 
                    WHEN t.TipoFinalidade = 2 THEN t.Valor 
                    ELSE 0 END) AS Receitas
            FROM Transacoes t
            INNER JOIN Pessoas p ON p.Id = t.PessoaId
            GROUP BY p.Id, p.Nome
            ORDER BY p.Nome
        ";

        return await _connection.QueryAsync<TotaisPessoaDto>(sql);
    }

    public async Task<IEnumerable<TotaisCategoriaDto>> TotaisPorCategoria()
    {
        var sql = @"
            SELECT 
                c.Id as CategoriaId,
                c.Descricao AS Categoria,
                SUM(CASE 
                    WHEN t.TipoFinalidade = 1 THEN t.Valor 
                    ELSE 0 END) AS Despesas,
                SUM(CASE 
                    WHEN t.TipoFinalidade = 2 THEN t.Valor 
                    ELSE 0 END) AS Receitas
            FROM Transacoes t
            INNER JOIN Categorias c ON c.Id = t.CategoriaId
            GROUP BY c.Id, c.Descricao
            ORDER BY c.Descricao
        ";

        return await _connection.QueryAsync<TotaisCategoriaDto>(sql);
    }
}
