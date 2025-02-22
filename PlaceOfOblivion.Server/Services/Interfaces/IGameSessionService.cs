using PlaceOfOblivion.Server.Models.Domain;

namespace PlaceOfOblivion.Server.Services.Interfaces
{
    public interface IGameSessionService
    {
        Task<GameSession> PlayGameAsync(int userId);
        Task<IEnumerable<GameSession>> GetUserGameSessionsAsync(int userId);
    }
}
