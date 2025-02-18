using PlaceOfOblivion.Server.Models.DTO.User;

namespace PlaceOfOblivion.Server.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserDTO?> GetUserByIdAsync(int id);
        Task<(string Token, UserDTO User)?> RegisterAsync(AddUserDTO userDTO);
        Task<(string Token, UserDTO User)?> LoginAsync(AddUserDTO userDTO);
    }
}
