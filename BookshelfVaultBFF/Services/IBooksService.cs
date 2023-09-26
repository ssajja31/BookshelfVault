using BookshelfVaultBFF.DbModels;

public interface IBooksService
{
    public Task<IDictionary<Book, string>> SeedData(string searchQuery);
}
