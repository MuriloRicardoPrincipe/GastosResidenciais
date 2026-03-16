namespace GastosResidenciais.Share.Model.Model
{
    public class BaseEntity
    {
        /*
         Gosto de usar uma base para implementar informação que acredito ser bom manter um histórico, como datas de criação e auteração.
         Ajuda a gerar um histórico de quem mexeu em alguma classe.
         */
        public Guid Id { get; private set; }
        public DateTime DataCriacao { get; private set; }
        public DateTime DataAtualizacao { get; private set; }

        protected BaseEntity(Guid id)
        {
            Id = id;
        }
        protected BaseEntity() { }

        //Abaixo funções que ajudam a manipular essas informações.
        public void CriaData()
        {
            DataCriacao = DateTime.UtcNow;
        }

        public void AtualizarData()
        {
            DataAtualizacao = DateTime.UtcNow;
        }

    }
}
