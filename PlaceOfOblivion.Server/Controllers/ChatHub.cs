using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PlaceOfOblivion.Server.Extensions;
using PlaceOfOblivion.Server.Repositories.Interfaces;
using PlaceOfOblivion.Server.Services;
using PlaceOfOblivion.Server.Services.Interfaces;
using System.Security.Claims;

namespace PlaceOfOblivion.Server.Controllers
{
    [Authorize]
    public class ChatHub : Hub
    {
        private readonly ILogger<ChatHub> _logger;

        public ChatHub(ILogger<ChatHub> logger)
        {
            this._logger = logger;
        }

        public async Task SendMessage(string message)
        {
            var username = Context.User?.Identity?.Name ?? "Anonymous";

            await Clients.All.SendAsync("ReceiveMessage", username, message);
        }
    }
}
