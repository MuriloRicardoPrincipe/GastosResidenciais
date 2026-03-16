namespace GastosResidenciais.Interface;

public interface IRepository<T, O> where T : class
{
    List<O> GetAll();
    O GetById(Guid id);
    Task<O> Criar(T dto);
    Task<O> Update(Guid id, T dto);
    Task<bool> Delete(Guid id);
}
