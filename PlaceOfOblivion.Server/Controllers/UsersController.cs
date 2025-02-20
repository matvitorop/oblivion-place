using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlaceOfOblivion.Server.Models.DTO.User;
using PlaceOfOblivion.Server.Repositories.Interfaces;
using PlaceOfOblivion.Server.Services.Interfaces;
using PlaceOfOblivion.Server.Services;
using System.Security.Claims;
using PlaceOfOblivion.Server.Extensions;

namespace PlaceOfOblivion.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;
        private readonly TokenGenerator _token;

        private readonly IUserService _userService;

        public UsersController(ILogger<UsersController> logger, IUserRepository userRepository, IMapper mapper, TokenGenerator token, IUserService userService)
        {
            this._logger = logger;
            this.userRepository = userRepository;
            this.mapper = mapper;
            this._token = token;
            this._userService = userService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] AddUserDTO userDTO)
        {
            var result = await _userService.RegisterAsync(userDTO);

            if (result == null)
            {
                return BadRequest("User already exists.");
            }

            // add token to cookie
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(3) // durability
            };

            Response.Cookies.Append("auth_token", result.Value.Token, cookieOptions);

            return Ok(new { User = result.Value.User });
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] AddUserDTO userDTO)
        {
            var result = await _userService.LoginAsync(userDTO);

            if (result == null)
            {
                return BadRequest("Invalid email or password");
            }

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(3)
            };

            Response.Cookies.Append("auth_token", result.Value.Token, cookieOptions);

            return Ok(new { User = result.Value.User });
        }

        // TOKEN AUTHORIZE TEST
        [Authorize]
        [HttpGet]
        [Route("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = this.GetUserIdOrThrowUnauthorized();
            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
