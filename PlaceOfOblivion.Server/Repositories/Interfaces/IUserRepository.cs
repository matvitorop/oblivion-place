using PlaceOfOblivion.Server.Models.Domain;
using PlaceOfOblivion.Server.Models.DTO.User;

namespace PlaceOfOblivion.Server.Repositories.Interfaces
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByEmailAndPassword(string email, string password);
        Task<bool> CheckUserByEmail(AddUserDTO userDTO);
        Task<User> AddUser(User user);
        string HashPassword(string password);

        Task AddUserBalanceAsync(UserBalance balance);
    }
}
