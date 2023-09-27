using BookshelfVaultBFF.RequestHelpers;
using System.Text.Json;

namespace BookshelfVaultBFF.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationheader(this HttpResponse response, MetaData metaData)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
            response.Headers.Add("Access-Control-Expose-Header", "Pagination");
        }
    }
}
