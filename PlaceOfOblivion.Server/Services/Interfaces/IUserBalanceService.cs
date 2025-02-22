using PlaceOfOblivion.Server.Models.Domain;

namespace PlaceOfOblivion.Server.Services.Interfaces
{
    public interface IUserBalanceService
    {
        Task<UserBalance?> GetUserBalanceAsync(int userId);
        Task<bool> UpdateUserBalanceAsync(int userId, decimal amount);
    }
}
