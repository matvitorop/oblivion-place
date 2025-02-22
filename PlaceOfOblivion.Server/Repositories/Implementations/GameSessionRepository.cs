using Microsoft.EntityFrameworkCore;
using PlaceOfOblivion.Server.Data;
using PlaceOfOblivion.Server.Models.Domain;
using PlaceOfOblivion.Server.Repositories.Interfaces;

namespace PlaceOfOblivion.Server.Repositories.Implementations
{
    public class GameSessionRepository : Repository<GameSession>, IGameSessionRepository
    {
        public GameSessionRepository(POODbContext context) : base(context) { }
        public async Task<IEnumerable<GameSession>> GetByUserIdAsync(int userId)
        {
            return await this.FindAsync(t => t.UserId == userId);
        }
    }
}
