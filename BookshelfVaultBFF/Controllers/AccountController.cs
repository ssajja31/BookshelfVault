using BookshelfVaultBFF.Data;
using BookshelfVaultBFF.DbModels;
using BookshelfVaultBFF.Dto;
using BookshelfVaultBFF.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookshelfVaultBFF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        private readonly BookContext _context;

        private readonly ITokenService _tokenService;

        public AccountController(UserManager<User> userManager, ITokenService tokenService, BookContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);

            if(user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Unauthorized();
            }

            var userCart = await FetchCart(loginDto.UserName);
            var existingCart = await FetchCart(Request.Cookies["buyerId"]);

            if (existingCart != null)
            {
                if (userCart != null)
                {
                    _context.Carts.Remove(userCart);
                }

                existingCart.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Cart = existingCart != null ? MapCartToCardDto(existingCart) : MapCartToCardDto(userCart),
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.UserName, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        private async Task<Cart> FetchCart(string buyerId)
        {
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
