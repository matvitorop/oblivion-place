using PlaceOfOblivion.Server.Models.Domain;

namespace PlaceOfOblivion.Server.Repositories.Interfaces
{
    public interface IGameSessionRepository : IRepository<GameSession>
    {
        Task<IEnumerable<GameSession>> GetByUserIdAsync(int userId);
    }
}
