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
        public IEnumerable<Gift> Index()
        {
            return _dbContext.Gifts.ToList();
        }

        [HttpPost]
        async public Task<IActionResult> Post([FromBody]Gift inputGift)
        {
            if (inputGift.Id > 0) {
                return BadRequest("trying to post a new gift with positive id");
            }
            var user = await _userManager.GetUserAsync(HttpContext.User);
            inputGift.OwnerId = user.Id;
            var result = _dbContext.Gifts.Add(inputGift);
            _dbContext.SaveChanges();
            return CreatedAtRoute("GetGift", new { controller = "GiftApi", id = result.Entity.Id }, result.Entity);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, [FromBody]Gift inputGift)
        {
            if (inputGift == null) {
                return BadRequest("gift not provided");
            }
            inputGift.Id = id;
            var exists = _dbContext.Gifts.Any(g => g.Id == id);
            if (!exists) {
                return NotFound();
            }
            _dbContext.Gifts.Attach(inputGift);
            _dbContext.Entry(inputGift).State = EntityState.Modified;
            _dbContext.SaveChanges();
            return Ok(inputGift);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete(int id)
        {
            var gift = new Gift { Id = id };
            _dbContext.Gifts.Attach(gift);
            _dbContext.Gifts.Remove(gift);
            _dbContext.SaveChanges();
            return Ok();
        }

        [HttpGet("{id}", Name = "GetGift")]
        public IActionResult GetById(int id)
        {
            return Ok(_dbContext.Gifts.First(g => g.Id == id));
        }
    }
}