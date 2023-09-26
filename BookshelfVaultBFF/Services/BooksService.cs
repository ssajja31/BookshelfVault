using BookshelfVaultBFF.DbModels;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;

namespace BookshelfVaultBFF.Services
{
    public class BooksService : IBooksService
    {
        public async Task<IDictionary<Book, string>> SeedData(string searchQuery)
        {
            IDictionary<Book, string> books = new Dictionary<Book, string>();

            using HttpClient client = new();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");

            string url = $"https://www.googleapis.com/books/v1/volumes?q={searchQuery}";

            var json = await client.GetStringAsync(url);

            JObject result = JObject.Parse(json);
            var items = result["items"];

            foreach(var item in JArray.Parse(items.ToString()))
            {
                Book book = new Book();

                JObject bookObj = JObject.Parse(item.ToString());

                book.Id = bookObj["id"].ToString();

                var volumeInfo = JObject.Parse(bookObj["volumeInfo"]?.ToString());

                book.Title = volumeInfo["title"]?.ToString();
                book.Subtitle = volumeInfo["subtitle"]?.ToString();
                book.Publisher = volumeInfo["publisher"]?.ToString();
                book.Description = volumeInfo["description"]?.ToString();
                book.Preview = volumeInfo["previewLink"]?.ToString();
                book.Quantity = 10;
                book.Price = GenerateRandomPrice();

                book.Author = JArray.Parse(volumeInfo["authors"].ToString())[0].ToString();
                book.Thumbnail = volumeInfo["imageLinks"] != null ? 
                    volumeInfo["imageLinks"]["thumbnail"]?.ToString() : null;
                book.CategoryId = 0;
                book.Category = null;

                string categoryName = volumeInfo["categories"] != null ? 
                    JArray.Parse(volumeInfo["categories"].ToString())[0].ToString() : 
                    "General";

                books.Add(book, categoryName);
            }

            return books;
        }

        private decimal GenerateRandomPrice()
        {
            // Create an instance of the Random class
            Random random = new Random();

            // Generate a random integer between 0 and 100 (inclusive)
            int randomNumber = random.Next(2500, 10001);

            // Convert the random integer to a decimal and divide by 100 to get a decimal price between 0 and 100
            decimal randomPrice = (decimal)randomNumber / 100m;

            return randomPrice;
        }
    }
}
