using Microsoft.EntityFrameworkCore;
using PlaceOfOblivion.Server.Data;
using PlaceOfOblivion.Server.Models.Domain;
using PlaceOfOblivion.Server.Repositories.Interfaces;

namespace PlaceOfOblivion.Server.Repositories.Implementations
{
    public class UserBalanceRepsoitory : Repository<UserBalance> , IUserBalanceRepository
    {
        
        public UserBalanceRepsoitory(POODbContext context) : base(context) { }

        public async Task<UserBalance?> GetUserBalanceAsync(int userId)
        {
            return await this.FindOneAsync(b => b.UserId == userId);
        }

        public async Task<bool> UpdateUserBalanceAsync(int userId, decimal amount)
        {
            var balance = await this.FindOneAsync(b => b.UserId == userId);

            if (balance == null)
                return false;

            if (balance.Balance + amount < 0)
                return false;

            balance.Balance += amount;

            await this.UpdateAsync(balance);

            return true;
        }
    }
}
