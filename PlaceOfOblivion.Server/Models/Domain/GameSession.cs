using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PlaceOfOblivion.Server.Models.Domain
{
    [Table("GameSession")]
    public class GameSession
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [Required]
        public DateTime PlayedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public string Symbols { get; set; } = string.Empty;

        [Required]
        public bool IsWin { get; set; }

        [Required]
        public decimal Prize { get; set; } = 0;
    }

}
