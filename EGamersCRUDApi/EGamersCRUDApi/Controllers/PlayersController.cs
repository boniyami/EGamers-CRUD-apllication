using EGamersCRUDApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EGamersCRUDApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly AppDBContext _db;
        private readonly IWebHostEnvironment _env;

        public PlayersController(AppDBContext db, IWebHostEnvironment env)
        {
            _db = db;
            _env = env;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetAllPlayers()
        {
            var players = await _db.Players.Include(d=>d.Device).Include(g=>g.Games).ToListAsync();
            return Ok(players);
        }

        [HttpGet("Devices")]
        public async Task<ActionResult<IEnumerable<Device>>> GetAllDevices()
        {
            var devices = await _db.Devices.ToListAsync();
            return Ok(devices);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayerById(int id)
        {
            var player = await _db.Players.Include(d => d.Device).Include(g => g.Games).FirstOrDefaultAsync(p => p.PlayerId == id);
            return Ok(player);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(int id)
        {
            var player = await _db.Players.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }
            _db.Players.Remove(player);
            await _db.SaveChangesAsync();
            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<Player>> SavePlayer(Player player)
        {
            if (string.IsNullOrEmpty(player.ImageUrl))
            {
                player.ImageUrl = "noimage.jpg";
            }
            player.Games = player.Games ?? new List<Game>();
            _db.Players.Add(player);
            await _db.SaveChangesAsync();
            foreach (var item in player.Games)
            {
                item.Player = null;
            }
            return CreatedAtAction(nameof(GetPlayerById), new { id = player.PlayerId }, player);
        }
        [HttpPost("Upload/{id}")]
        public async Task<ActionResult<UploadResponse>> Upload(int id, IFormFile file)
        {
            var player = await _db.Players.FindAsync(id);
            if (player == null)
            {
                return NotFound();
            }
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }
            if (file.ContentType != "image/jpeg" && file.ContentType != "image/png")
            {
                return BadRequest("Only Jpg  And png files are allowed");
            }
            if (file.Length > 2 * 1024 * 1024)
            {
                return BadRequest("File Size must be 2 mb");
            }
            string ext = Path.GetExtension(file.FileName);
            string fileName = Path.GetFileNameWithoutExtension(Path.GetRandomFileName()) + ext;
            string savePath = Path.Combine(_env.WebRootPath, "images", fileName);
            if (!Directory.Exists(Path.Combine(_env.WebRootPath, "images")))
            {
                Directory.CreateDirectory(Path.Combine(_env.WebRootPath, "images"));
            }
            try
            {
                using (var filestream = new FileStream(savePath, FileMode.Create))
                {
                    await file.CopyToAsync(filestream);
                }
                player.ImageUrl = fileName;
                await _db.SaveChangesAsync();
                return Ok(new UploadResponse { FileName = player.ImageUrl });
            }
            catch (IOException ex)
            {
                Console.WriteLine($"An error occurred while uploading the file: {ex.Message}");
                return StatusCode(500, "An error occurred while uploading the file.");
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlayer(int id, Player player)
        {
            if (id != player.PlayerId) return BadRequest();
            try
            {
                var exPlayer = await _db.Players.Include(d => d.Device).Include(g => g.Games).FirstOrDefaultAsync(p => p.PlayerId == id);
                if (exPlayer == null) return NotFound();
                _db.Entry(exPlayer).CurrentValues.SetValues(player);
                if (player.Games != null)
                {
                    var gamesToRemove = exPlayer.Games.Where(ex => !player.Games.Any(upGame => upGame.GameId == ex.GameId)).ToList();
                    _db.Games.RemoveRange(gamesToRemove);
                    foreach (var item in player.Games)
                    {
                        var exGame = exPlayer.Games.FirstOrDefault(ex => ex.GameId == item.GameId);
                        if (exGame != null)
                        {
                            _db.Entry(exGame).CurrentValues.SetValues(item);
                            _db.Entry(exGame).State = EntityState.Modified;
                        }
                        else
                        {
                            exPlayer.Games.Add(item);
                        }
                    }
                    await _db.SaveChangesAsync();
                    foreach (var game in exPlayer.Games)
                    {
                        game.Player = null;
                    }
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlayerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        private bool PlayerExists(int id)
        {
            return _db.Players.Any(p => p.PlayerId == id);
        }
    }
}
