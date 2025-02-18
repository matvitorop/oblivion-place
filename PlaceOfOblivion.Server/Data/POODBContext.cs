using Microsoft.EntityFrameworkCore;
using PlaceOfOblivion.Server.Models;
using System;

namespace PlaceOfOblivion.Server.Data
{
    public class POODBContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<UserBalance> UserBalances { get; set; } = null!;
        public DbSet<GameSession> GameSessions { get; set; } = null!;

        public POODBContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1 to 1 relations between user and balance
            modelBuilder.Entity<UserBalance>()
                .HasOne(ub => ub.User)
                .WithOne()
                .HasForeignKey<UserBalance>(ub => ub.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // 1 to many relations between user and session
            modelBuilder.Entity<GameSession>()
                .HasOne(gs => gs.User)
                .WithMany()
                .HasForeignKey(gs => gs.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Start data
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", Email = "admin@example.com", HashedPassword = "hashed_password" }
            );
        }
    }
}
