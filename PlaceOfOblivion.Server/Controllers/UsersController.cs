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
    /// <summary>
    /// Controller to work with user data
    /// </summary>
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
        /// <summary>
        /// Register new user and add token to necessary cookie
        /// </summary>
        /// <param name="userDTO">Data for user registration</param>
        /// <returns>Return created user record or error</returns>
        /// <response code="200">Registration successful, token add to cookie</response>
        /// <response code="400">User is already exist</response>
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

        /// <summary>
        /// Login user and add token to necessary cookie
        /// </summary>
        /// <param name="userDTO">Data for login (email and password)</param>
        /// <returns>Returns user record or error</returns>
        /// <response code="200">Successful login, token added to cookie</response>
        /// <response code="400">Wrong email or password</response>
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

        /// <summary>
        /// Get profile of current user (via token in cookie)
        /// </summary>
        /// <returns>Return current user profile</returns>
        /// <response code="200">Returns user data</response>
        /// <response code="401">User in unauthorized</response>
        /// <response code="404">User is not found</response>
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

        /// <summary>
        /// Get profile of current user (via token in cookie)
        /// </summary>
        /// <returns>Return current user profile</returns>
        /// <response code="200">Returns user data</response>
        /// <response code="401">User in unauthorized</response>
        /// <response code="404">User is not found</response>
        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = this.GetUserIdOrThrowUnauthorized();

            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(new { user.Id, user.Username, user.Email });
        }

        /// <summary>
        /// Exacute user logout, by deleting token from cookie
        /// </summary>
        /// <returns>Logout status</returns>
        /// <response code="200">Logout is successful</response>
        /// <response code="401">User is unauthorized</response>
        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("auth_token");
            return Ok(new { success = true, message = "Logged out successfully" });
        }

        /// <summary>
        /// Delete user profile, linked records and token
        /// </summary>
        /// <returns>Return result message</returns>
        /// <response code="200">User deleted successfully</response>
        /// <response code="401">User in unauthorized</response>
        /// <response code="400">Invalid user</response>
        [Authorize]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete()
        {
            var userId = this.GetUserIdOrThrowUnauthorized();
            Response.Cookies.Delete("auth_token");

            if(await _userService.DeleteUserAsync(userId) == true)
            {
                return Ok(new { success = true, message = "User deleted successfully" });
            }
            return BadRequest("Invalid user");
        }
    }
}
