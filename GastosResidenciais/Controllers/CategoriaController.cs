using GastosResidenciais.DTO.Categoria;
using GastosResidenciais.Interface;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoriaController : Controller
{
    private readonly ICategoriaRepository _repository;

    public CategoriaController(ICategoriaRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CriaAtualizaCategoriaDto Dto)
    {
        var categoria = await _repository.Criar(Dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = categoria.Id },
            categoria
        );
    }

    [HttpGet]
    public IEnumerable<ReadCategoriaDto> GetAll()
    {
        var cat = _repository.GetAll();

        return cat;

    }


    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var cat = _repository.GetById(id);

        if (cat != null)
        {
            return Ok(cat);
        }
        return NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _repository.Delete(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CriaAtualizaCategoriaDto dto)
    {
        try
        {
            var categoria = await _repository.Update(id, dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = categoria.Id },
                categoria
            );
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}

