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

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await FetchCart();

            if (cart == null)
            {
                return NotFound();
            }

            return MapCartToCardDto(cart);
        }

        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(string bookId, int quantity)
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

            if (result) return CreatedAtRoute("GetCart", MapCartToCardDto(cart));

            return BadRequest();
        }

        private async Task<Cart> FetchCart()
        {
            string buyerId = GetBuyerId();

            if (string.IsNullOrWhiteSpace(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            var cart = await _context.Carts
                            .Include(i => i.Items)
                            .ThenInclude(b => b.Book)
                            .FirstOrDefaultAsync(c => c.BuyerId == buyerId);

            return cart;
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        private Cart CreateCart()
        {
            var buyerId = User.Identity?.Name;

            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30), SameSite = SameSiteMode.None, Secure = false };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            
            var cart = new Cart { BuyerId = buyerId };

            _context.Carts.Add(cart);

            return cart;
        }

        private CartDto MapCartToCardDto(Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(item => new ItemDto
                {
                    BookId = item.BookId,
                    Title = item.Book.Title,
                    Price = item.Book.Price,
                    Thumbnail = item.Book.Thumbnail,
                    Author = item.Book.Author,
                    Quantity = item.Quantity
                }).ToList(),
            };
        }
    }
}
