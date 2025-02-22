using PlaceOfOblivion.Server.Models.Domain;
using PlaceOfOblivion.Server.Repositories.Interfaces;
using PlaceOfOblivion.Server.Services.Interfaces;

namespace PlaceOfOblivion.Server.Services.Implementations
{
    public class UserBalanceService : IUserBalanceService
    {
        private readonly IUserBalanceRepository _userBalanceRepository;

        public UserBalanceService(IUserBalanceRepository userBalanceRepository)
        {
            _userBalanceRepository = userBalanceRepository;
        }
        public async Task<UserBalance?> GetUserBalanceAsync(int userId)
        {
            return await _userBalanceRepository.GetUserBalanceAsync(userId);
        }

        public async Task<bool> UpdateUserBalanceAsync(int userId, decimal amount)
        {
            return await _userBalanceRepository.UpdateUserBalanceAsync(userId, amount);
        }
    }
}
