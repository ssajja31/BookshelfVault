using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookshelfVaultBFF.Data;
using BookshelfVaultBFF.DbModels;
using System.Net.Http.Headers;
using BookshelfVaultBFF.RequestHelpers;
using System.Text.Json;
using BookshelfVaultBFF.Extensions;

namespace BookshelfVaultBFF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookContext _context;
        private readonly IBooksService _service;

        public BooksController(BookContext context, IBooksService service)
        {
            _context = context;
            _service = service;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<PagedList<Book>>> GetBooks([FromQuery] PaginationParams paginationParams)
        {
            var query = _context.Books.AsQueryable();
            var books = await PagedList<Book>.ToPagedList(query, paginationParams.PageNumber, paginationParams.PageSize);

            Response.AddPaginationheader(books.MetaData);

            return books;
        }

        [HttpGet("GetBooksByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooksByCategory(int categoryId)
        {
            return await _context.Books.Where(a => a.CategoryId == categoryId).ToListAsync();
        }

        [HttpPost("SeedData")]
        public async Task<ActionResult> SeedData(string searchParam)
        {
            IDictionary<Book, string> books = await _service.SeedData(searchParam);

            foreach(var book in books)
            {
                var category = await _context.Categories.FirstOrDefaultAsync(a => a.Name == book.Value);

                if (category == null)
                {
                    int categoryId = _context.Categories.Max(a => a.CategoryId) + 1;
                    book.Key.CategoryId = categoryId;

                    var newCategory = new Category
                    {
                        CategoryId = categoryId,
                        Name = book.Value
                    };
                    _context.Categories.Add(newCategory);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    book.Key.CategoryId = category.CategoryId;
                }

                var existingBook = await _context.Books.FindAsync(book.Key.Id);
                if (existingBook == null)
                {
                    _context.Books.Add(book.Key);

                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateException)
                    {
                        if (BookExists(book.Key.Id))
                        {
                            return Conflict();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
            }

            return Ok();
        }

        private bool BookExists(string id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
