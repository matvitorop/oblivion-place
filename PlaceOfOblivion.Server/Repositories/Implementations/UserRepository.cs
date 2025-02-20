using Microsoft.EntityFrameworkCore;
using PlaceOfOblivion.Server.Data;
using PlaceOfOblivion.Server.Models.Domain;
using PlaceOfOblivion.Server.Models.DTO.User;
using PlaceOfOblivion.Server.Repositories.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace PlaceOfOblivion.Server.Repositories.Implementations
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(POODbContext dbContext) : base(dbContext) { }
        public async Task<User> AddUser(User user)
        {
            user.HashedPassword = HashPassword(user.HashedPassword);
            await AddAsync(user);

            return user;
        }

        public async Task<User> GetByEmailAndPassword(string email, string password)
        {
            var user = await FindOneAsync(x => x.Email == email);
            if (user == null)
            {
                return null;
            }

            if (HashPassword(password) != user.HashedPassword)
            {
                return null;
            }

            return user;
        }

        public async Task<bool> CheckUserByEmail(AddUserDTO userDTO)
        {
            var user = await FindOneAsync(x => x.Email == userDTO.Email);

            if (user == null)
            {
                return false;
            }

            return true;
        }
        public string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            return Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
        }
        public async Task AddUserBalanceAsync(UserBalance balance)
        {
            await _context.UserBalances.AddAsync(balance);
            await _context.SaveChangesAsync();
        }
    }
}
