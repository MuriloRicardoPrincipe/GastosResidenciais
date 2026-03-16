using GastosResidenciais.DTO.Pessoa;
using GastosResidenciais.Interface;
using GastosResidenciais.Share.Model.Model;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Controllers;

[ApiController]
[Route("[controller]")]
public class PessoaController : Controller
{
    private readonly IPessoasRepository _repository;

    public PessoaController(IPessoasRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CriaAtualizaPessoaDto dto)
    {
        var pessoa = await _repository.Criar(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = pessoa.Id },
            pessoa
        );
    }

    [HttpGet]
    public IEnumerable<ReadPessoasDto> GetAll()
    {
        var pess = _repository.GetAll();

        return pess;

    }


    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var pess = _repository.GetById(id);

        if (pess != null)
        {
            return Ok(pess);
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
    public async Task<IActionResult> Update(Guid id, [FromBody] CriaAtualizaPessoaDto dto)
    {
        try
        {
            var pessoa = await _repository.Update(id, dto);
            return CreatedAtAction(
                nameof(GetById),
                new { id = pessoa.Id },
                pessoa
            );
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
