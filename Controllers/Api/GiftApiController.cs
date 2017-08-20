namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;

    [Authorize]
    [Route("api/gift")]
    public class GiftApiController : ControllerBase
    {
        private ApplicationDbContext _dbContext;
        private UserManager<ApplicationUser> _userManager;

        public GiftApiController (
            ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
          _dbContext = dbContext;
          _userManager = userManager;
        }

        [HttpGet]
        async public Task<IEnumerable<Gift>> Index()
        {
            var userId = await GetUserId();
            return _dbContext
                .Gifts
                .Where(g => g.OwnerId == userId)
                .Include(g => g.Receiver)
                .ToList();
        }

        [HttpPost]
        async public Task<IActionResult> Post([FromBody]Gift inputGift)
        {
            if (inputGift.Id > 0) {
                return BadRequest("trying to post a new gift with positive id");
            }
            inputGift.OwnerId = await GetUserId();
            var result = _dbContext.Gifts.Add(inputGift);
            _dbContext.SaveChanges();
            return CreatedAtRoute("GetGift", new { controller = "GiftApi", id = result.Entity.Id }, result.Entity);
        }

        async private Task<Gift> FetchGift(int id)
        {
            var userId = await GetUserId();
            return _dbContext.Gifts.FirstOrDefault(g => g.Id == id && g.OwnerId == userId);
        }

        async private Task<string> GetUserId() {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            var userId = user.Id;
            return userId;
        }

        [HttpPut]
        [Route("{id:int}")]
        async public Task<IActionResult> Put(int id, [FromBody]Gift inputGift)
        {
            if (inputGift == null) {
                return BadRequest("gift not provided");
            }
            var storedGift = await FetchGift(id);
            if (storedGift == null) {
                return Forbid();
            }
            _dbContext.Entry(storedGift).State = EntityState.Detached;
            inputGift.Id = id;
            _dbContext.Gifts.Attach(inputGift);
            _dbContext.Entry(inputGift).State = EntityState.Modified;
            _dbContext.SaveChanges();
            return Ok(inputGift);
        }

        [HttpDelete]
        [Route("{id:int}")]
        async public Task<IActionResult> Delete(int id)
        {
            var storedGift = await FetchGift(id);
            if (storedGift == null) {
                return Forbid();
            }
            _dbContext.Gifts.Remove(storedGift);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpGet("{id}", Name = "GetGift")]
        async public Task<IActionResult> GetById(int id)
        {
            var storedGift = await FetchGift(id);
            if (storedGift == null) {
                return Forbid();
            }
            return Ok(storedGift);
        }
    }
}