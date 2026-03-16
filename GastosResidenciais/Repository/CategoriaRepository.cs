using AutoMapper;
using GastosResidenciais.DTO.Categoria;
using GastosResidenciais.Interface;
using GastosResidenciais.Share.Data.Data;
using GastosResidenciais.Share.Model.Model;
using Microsoft.EntityFrameworkCore;

namespace GastosResidenciais.Repository;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly GastosResidenciaisContext _context;
    private IMapper _mapper;

    public CategoriaRepository(GastosResidenciaisContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    public ReadCategoriaDto GetById(Guid id)
    {
        var categorias = _mapper.Map<ReadCategoriaDto>(_context.Categorias.FirstOrDefault(p => p.Id == id));
        if (categorias == null)
        {
            throw new InvalidOperationException("Categoria não encontrada.");
        }

        return categorias;
    }

    public List<ReadCategoriaDto> GetAll()
    {
        return _mapper.Map<List<ReadCategoriaDto>>(_context.Categorias.ToList());
    }

    public async Task<ReadCategoriaDto> Criar(CriaAtualizaCategoriaDto dto)
    {
        Categorias categorias = new Categorias
     (
         Guid.NewGuid(),
         dto.Descricao,
         dto.TipoFinalidade
     );

        await _context.Categorias.AddAsync(categorias);
        await _context.SaveChangesAsync();

        return new ReadCategoriaDto
        {
            Id = categorias.Id,
            Descricao = categorias.Descricao,
            TipoFinalidade = categorias.TipoFinalidade,
            DataCriacao = categorias.DataCriacao
        };
    }

    public async Task<ReadCategoriaDto> Update(Guid id, CriaAtualizaCategoriaDto dto)
    {
        var categorias = await _context.Categorias.FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new KeyNotFoundException("Categoria não encontrado.");

        categorias.Atualizacao(
            dto.Descricao,
            dto.TipoFinalidade
        );

        _context.Categorias.Update(categorias);

        await _context.SaveChangesAsync();

        return new ReadCategoriaDto
        {
            Id = categorias.Id,
            Descricao = categorias.Descricao,
            TipoFinalidade = categorias.TipoFinalidade,
            DataCriacao = categorias.DataCriacao
        };
    }

    public async Task<bool> Delete(Guid id)
    {
        var categoria = await _context.Categorias.FindAsync(id);

        if (categoria == null)
            return false;

        _context.Categorias.Remove(categoria);

        await _context.SaveChangesAsync();

        return true;
    }
}
