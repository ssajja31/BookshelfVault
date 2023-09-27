using BookshelfVaultBFF.DbModels;

namespace BookshelfVaultBFF.Services
{
    public interface ITokenService
    {
        public Task<string> GenerateToken(User user);
    }
}
