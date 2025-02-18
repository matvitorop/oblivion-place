using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PlaceOfOblivion.Server.Models
{
    [Table("UserBalance")]
    public class UserBalance
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [Required]
        public decimal Balance { get; set; } = 100;
    }
}
