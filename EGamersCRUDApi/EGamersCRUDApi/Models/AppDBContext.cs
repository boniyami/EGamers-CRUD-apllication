using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EGamersCRUDApi.Models
{
    public class AppDBContext:DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext>op):base(op)
        {
            
        }
        public DbSet<Device> Devices { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Game> Games { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Player>().HasOne(p => p.Device).WithMany(d => d.Players).HasForeignKey(p => p.DeviceId).OnDelete(DeleteBehavior.Cascade); 
            modelBuilder.Entity<Game>().HasOne(g => g.Player).WithMany(p => p.Games).HasForeignKey(g => g.PlayerId).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Device>().HasData(
                new Device { DeviceId = 1, DeviceName = "PS5" },
                new Device { DeviceId = 2, DeviceName = "PC" },
                new Device { DeviceId = 3, DeviceName = "Mobile" });

            modelBuilder.Entity<Player>().HasData(
                new Player { PlayerId = 1, PlayerName = "Yamin", RegDate = new DateTime(2026, 1, 1), RegFee = 1500, IsActive = true, DeviceId = 1, ImageUrl = "" });

            modelBuilder.Entity<Game>().HasData(
                new Game { GameId = 1, GameName = "PUBG", GameVer = "v23.5", PlayerId = 1 },
                new Game { GameId = 2, GameName = "COD", GameVer = "v25.9b", PlayerId = 1 });
        }
    }

    public class Device
    {
        public int DeviceId { get; set; }
        public string DeviceName { get; set; } = null!;
        public virtual ICollection<Player>? Players { get; set; } = new List<Player>();
    }

    public class Player
    {
        public int PlayerId { get; set; }
        public string PlayerName { get; set; } = null!;
        public DateTime RegDate { get; set; }
        [Column(TypeName = "money" )]
        public decimal RegFee { get; set; }
        public bool IsActive { get; set; }
        public int DeviceId { get; set; }
        public string? ImageUrl { get; set; }
        public virtual Device? Device { get; set; }
        public virtual ICollection<Game> Games { get; set; } = new List<Game>();
    }

    public class Game
    {
        public int GameId { get; set; }
        public string GameName { get; set; } = null!;
        public string GameVer { get; set; } = null!;
        public int PlayerId { get; set; }
        public virtual Player? Player { get; set; }
    }

    public class UploadResponse
    {
        public string FileName { get; set; } = default!;
    }
}
