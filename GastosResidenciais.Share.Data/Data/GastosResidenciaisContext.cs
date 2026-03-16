using GastosResidenciais.Share.Model.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;
using System;

namespace GastosResidenciais.Share.Data.Data;

public class GastosResidenciaisContext : DbContext
{
    public DbSet<Pessoas> Pessoas { get; set; }
    public DbSet<Categorias> Categorias { get; set; }
    public DbSet<Transacoes> Transacoes { get; set; }


    private string connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=GastosResidenciais;Integrated Security=True;Encrypt=False;TrustServerCertificate=False;Application Intent=ReadWrite;MultiSubnetFailover=False";

    public GastosResidenciaisContext(DbContextOptions<GastosResidenciaisContext> options) : base(options) { }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured)
        {
            return;
        }
        optionsBuilder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Pessoas>( builder =>
        {
            builder.HasKey(p => p.Id);
        });

        modelBuilder.Entity<Categorias>(builder =>
        {
            builder.HasKey(p => p.Id);
        });

        modelBuilder.Entity<Transacoes>(builder =>
        {
            builder.HasKey(p => p.Id);

            builder.Property(t => t.Descricao)
                .IsRequired()
                .HasMaxLength(400);
            //Garante o formato e as casas decimais.
            builder.Property(t => t.Valor)
                .HasPrecision(18, 2);

            builder.HasOne(t => t.Pessoa)
                .WithMany(p => p.Transacoes)
                .HasForeignKey(t => t.PessoaId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(t => t.Categoria)
                .WithMany(c => c.Transacoes)
                .HasForeignKey(t => t.CategoriaId);
        });
    }
}
