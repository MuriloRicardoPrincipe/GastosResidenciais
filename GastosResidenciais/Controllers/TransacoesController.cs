using GastosResidenciais.DTO.Pessoa;
using GastosResidenciais.DTO.Transacoes;
using GastosResidenciais.Interface;
using GastosResidenciais.Share.Model.Model;
using Microsoft.AspNetCore.Mvc;

namespace GastosResidenciais.Controllers;

[ApiController]
[Route("[controller]")]
public class TransacoesController : Controller
{
    private readonly ITransacoesRepository _repository;

    public TransacoesController(ITransacoesRepository repository)
    {
        _repository = repository;
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] CriaAtualizaTransacoesDto Dto)
    {
        var transacoes = await _repository.Criar(Dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = transacoes.Id },
            transacoes
        );
    }

    [HttpGet]
    public IEnumerable<ReadTransacoesDto> GetAll()
    {
        var transacoes = _repository.GetAll();

        return transacoes;

    }


    [HttpGet("{id}")]
    public IActionResult GetById(Guid id)
    {
        var transacoes = _repository.GetById(id);

        if (transacoes != null)
        {
            return Ok(transacoes);
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
    public async Task<IActionResult> Update(Guid id, [FromBody] CriaAtualizaTransacoesDto dto)
    {
        try
        {
            var transacoes = await _repository.Update(id, dto);
            
            return CreatedAtAction(
                nameof(GetById),
                new { id = transacoes.Id },
                transacoes
            );
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpGet("totais-pessoa")]
    public async Task<IActionResult> TotaisPorPessoa()
    {
        var resultado = await _repository.TotaisPorPessoa();
        return Ok(resultado);
    }

    [HttpGet("totais-categoria")]
    public async Task<IActionResult> TotaisPorCategoria()
    {
        var resultado = await _repository.TotaisPorCategoria();
        return Ok(resultado);
    }
}