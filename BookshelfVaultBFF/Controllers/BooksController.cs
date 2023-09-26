using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookshelfVaultBFF.Data;
using BookshelfVaultBFF.DbModels;
using System.Net.Http.Headers;

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
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(string id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // POST: api/Books
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _context.Books.Add(book);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookExists(book.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
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
