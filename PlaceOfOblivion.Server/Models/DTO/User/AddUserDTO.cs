namespace PlaceOfOblivion.Server.Models.DTO.User
{
    public class AddUserDTO
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
    }
}
