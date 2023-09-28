using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookshelfVaultBFF.Data;
using BookshelfVaultBFF.DbModels;

namespace BookshelfVaultBFF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly BookContext _context;

        public CategoriesController(BookContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }
    }
}
