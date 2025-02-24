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
    /// <summary>
    /// A controller for managing the user's balance.
    /// </summary>
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

        /// <summary>
        /// Gets the balance of the current user.
        /// </summary>
        /// <returns>Object with currents user`s balance</returns>
        /// <response code="200">Returns a balance</response>
        /// <response code="401">The user is not authorized.</response>
        [Authorize]
        [HttpGet("balance")]
        public async Task<IActionResult> GetBalance()
        {
            var userId = this.GetUserIdOrThrowUnauthorized();

            var balance = await _userBalanceService.GetUserBalanceAsync(userId);

            return Ok(new { Balance = balance?.Balance ?? 0 });
        }

        /// <summary>
        /// Deposits user`s balance
        /// </summary>
        /// <param name="balanceDTO">Object with deposit sum</param>
        /// <returns>Message about successful deposit or error</returns>
        /// <response code="200">The balance has been successfully replenished.</response>
        /// <response code="400">Failed to update the balance.</response>
        /// <response code="401">The user is not authorized.</response>
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

        /// <summary>
        /// Withdraws funds from the user's balance.
        /// </summary>
        /// <param name="balanceDTO">An object with the amount to be withdrawn.</param>
        /// <returns>Notification of successful withdrawal or error.</returns>
        /// <response code="200">The balance has been successfully updated.</response>
        /// <response code="400">Insufficient funds or balance update error.</response>
        /// <response code="401">The user is not authorized.</response>
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
