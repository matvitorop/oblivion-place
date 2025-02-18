using AutoMapper;
using PlaceOfOblivion.Server.Models.Domain;
using PlaceOfOblivion.Server.Models.DTO.User;

namespace PlaceOfOblivion.Server.Mapping
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {
            CreateMap<User, UserDTO>();

            CreateMap<AddUserDTO, User>();
        }
    }
}
