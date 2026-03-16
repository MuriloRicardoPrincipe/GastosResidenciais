using AutoMapper;
using GastosResidenciais.DTO.Pessoa;
using GastosResidenciais.Interface;
using GastosResidenciais.Share.Data.Data;
using GastosResidenciais.Share.Model.Model;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Repository;

public class PessoaRepository : IPessoasRepository
{
    private readonly GastosResidenciaisContext _context;
    private IMapper _mapper;

    public PessoaRepository(GastosResidenciaisContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public async Task<ReadPessoasDto> Criar(CriaAtualizaPessoaDto dto)
    {
        Pessoas pessoa = new Pessoas
        (
            Guid.NewGuid(),
            dto.Nome,
            dto.Idade
        );

        await _context.Pessoas.AddAsync(pessoa);
        await _context.SaveChangesAsync();

        return new ReadPessoasDto
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade,
            DataCriacao = pessoa.DataCriacao

        };
    }
    public ReadPessoasDto GetById(Guid id)
    {
        var pessoa = _mapper.Map<ReadPessoasDto>(_context.Pessoas.FirstOrDefault(p => p.Id == id));
        if (pessoa == null)
        {
            throw new InvalidOperationException("Pessoa não encontrada.");
        }

        return pessoa;
    }

    public List<ReadPessoasDto> GetAll()
    {
        return _mapper.Map<List<ReadPessoasDto>>(_context.Pessoas.ToList());
    }

    public async Task<ReadPessoasDto> Update(Guid id, CriaAtualizaPessoaDto dto)
    {
        var pessoa = await _context.Pessoas.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new KeyNotFoundException("Pessoa não encontrado.");

        pessoa.Atualizacao(
            dto.Nome,
            dto.Idade
        );

        _context.Pessoas.Update(pessoa);

        await _context.SaveChangesAsync();

        return new ReadPessoasDto
        {
            Id = pessoa.Id,
            Nome = pessoa.Nome,
            Idade = pessoa.Idade,
            DataCriacao = pessoa.DataCriacao
        };
    }

    public async Task<bool> Delete(Guid id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);

        if (pessoa == null)
            return false;

        _context.Pessoas.Remove(pessoa);

        await _context.SaveChangesAsync();

        return true;
    }

}
