namespace PlaceOfOblivion.Server.Models.DTO.User
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
    }
}
