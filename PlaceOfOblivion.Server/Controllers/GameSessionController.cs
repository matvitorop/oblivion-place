using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlaceOfOblivion.Server.Extensions;
using PlaceOfOblivion.Server.Services.Interfaces;
using System.Security.Claims;

namespace PlaceOfOblivion.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GameSessionController : ControllerBase
    {
        private readonly IGameSessionService _gameSessionService;
        private readonly ILogger<UsersController> _logger;
        public GameSessionController(ILogger<UsersController> logger, IGameSessionService gameSessionService)
        {
            _gameSessionService = gameSessionService;
            _logger = logger;
        }

        [Authorize]
        [HttpPost("play")]
        public async Task<IActionResult> PlayGame()
        {
            var userId = this.GetUserIdOrThrowUnauthorized();

            if (userId == 0)
            {
                return Unauthorized("User ID is missing.");
            }

            var gameSession = await _gameSessionService.PlayGameAsync(userId);

            return Ok(gameSession);
        }

        [Authorize]
        [HttpGet("history")]
        public async Task<IActionResult> GetUserGameSessions()
        {
            var userId = this.GetUserIdOrThrowUnauthorized();

            if (userId == 0)
            {
                return Unauthorized("User ID is missing.");
            }

            var sessions = await _gameSessionService.GetUserGameSessionsAsync(userId);

            return Ok(sessions);
        }
    }
}
