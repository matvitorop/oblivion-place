using PlaceOfOblivion.Server.Models.Domain;

namespace PlaceOfOblivion.Server.Repositories.Interfaces
{
    public interface IUserBalanceRepository : IRepository<UserBalance>
    {
        Task<UserBalance?> GetUserBalanceAsync(int userId);
        Task<bool> UpdateUserBalanceAsync(int userId, decimal amount);
    }
}
