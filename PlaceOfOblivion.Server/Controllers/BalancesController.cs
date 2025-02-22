using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlaceOfOblivion.Server.Repositories.Interfaces;
using PlaceOfOblivion.Server.Services.Interfaces;
using PlaceOfOblivion.Server.Services;
using Microsoft.AspNetCore.Authorization;
using PlaceOfOblivion.Server.Repositories.Implementations;
using System.Security.Claims;
using PlaceOfOblivion.Server.Extensions;
using PlaceOfOblivion.Server.Models.DTO.UserBalance;

namespace PlaceOfOblivion.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BalancesController : ControllerBase
    {
        private readonly ILogger<BalancesController> _logger;
        private readonly IUserBalanceRepository _userBalanceRepository;
        private readonly IMapper mapper;

        private readonly IUserBalanceService _userBalanceService;

        public BalancesController(ILogger<BalancesController> logger, IUserBalanceRepository userBalanceRepository, IMapper mapper, IUserBalanceService userBalanceService)
        {
            this._logger = logger;
            this._userBalanceRepository = userBalanceRepository;
            this.mapper = mapper;
            this._userBalanceService = userBalanceService;
        }

        [Authorize]
        [HttpGet("balance")]
        public async Task<IActionResult> GetBalance()
        {
            var userId = this.GetUserIdOrThrowUnauthorized();

            var balance = await _userBalanceService.GetUserBalanceAsync(userId);

            return Ok(new { Balance = balance?.Balance ?? 0 });
        }

        [Authorize]
        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit([FromBody] BalanceUpdateDTO balanceDTO)
        {
            var userId = this.GetUserIdOrThrowUnauthorized();
            var success = await _userBalanceService.UpdateUserBalanceAsync(userId, balanceDTO.Amount);

            if (!success)
                return BadRequest("Failed to update balance");

            return Ok(new { Message = "Balance updated successfully" });
        }

        [Authorize]
        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw([FromBody] BalanceUpdateDTO balanceDTO)
        {
            var userId = this.GetUserIdOrThrowUnauthorized();

            var success = await _userBalanceService.UpdateUserBalanceAsync(userId, -balanceDTO.Amount);

            if (!success)
                return BadRequest("Insufficient funds or failed to update balance");

            return Ok(new { Message = "Balance updated successfully" });
        }

    }
}
