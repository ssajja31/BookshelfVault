using BookshelfVaultBFF.DbModels;
using Microsoft.EntityFrameworkCore;

namespace BookshelfVaultBFF.Data
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }

        public DbSet<Category> Categories { get; set; }
    }
}
