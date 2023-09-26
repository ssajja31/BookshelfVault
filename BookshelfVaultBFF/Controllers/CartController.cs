using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookshelfVaultBFF.Data;
using BookshelfVaultBFF.DbModels;
using BookshelfVaultBFF.Dto;

namespace BookshelfVaultBFF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly BookContext _context;

        public CartController(BookContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await FetchCart();

            if (cart == null)
            {
                return NotFound();
            }

            return new CartDto
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(item => new ItemDto
                {
                    BookId = item.BookId,
                    Title = item.Book.Title,
                    Price = item.Book.Price,
                    Thumbanil = item.Book.Thumbnail,
                    Author = item.Book.Author,
                    Quantity = item.Book.Quantity
                }).ToList(),
            };
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToCart(string bookId, int quantity)
        {
            var cart = await FetchCart();

            if (cart == null)
            {
                cart = CreateCart();
            }

            var book = await _context.Books.FindAsync(bookId);

            if (book == null)
            {
                return NotFound();
            }

            cart.AddItem(book, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest();
        }

        private async Task<Cart> FetchCart()
        {
            var cart = await _context.Carts
                            .Include(i => i.Items)
                            .ThenInclude(b => b.Book)
                            .FirstOrDefaultAsync(c => c.BuyerId == Request.Cookies["buyerId"]);

            return cart;
        }

        private Cart CreateCart()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var cart = new Cart { BuyerId = buyerId };

            _context.Carts.Add(cart);

            return cart;
        }
    }
}
