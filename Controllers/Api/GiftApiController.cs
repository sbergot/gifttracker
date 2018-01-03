namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Logging;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;

    [Authorize]
    [Route("api/gift")]
    public class GiftApiController : ApiControllerBase
    {
        public GiftApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            UserManager<ApplicationUser> userManager)
            : base(dbContext, loggerFactory, userManager)
        {}

        [HttpGet]
        async public Task<IEnumerable<Gift>> Index()
        {
            var userId = await GetCurrentIndividualId();
            if (!userId.HasValue)
            {
                return new Gift[] {};
            }
            return _dbContext
                .Gifts
                .Where(g => g.OwnerId == userId.Value)
                .Include(g => g.Receiver)
                .ToList();
        }

        [HttpPost]
        async public Task<IActionResult> Post([FromBody]Gift inputGift)
        {
            if (inputGift.Id > 0) {
                return BadRequest("trying to post a new gift with positive id");
            }
            inputGift.Id = 0;
            var userId = await GetCurrentIndividualId();
            if (!userId.HasValue) { throw new System.Exception("user has no individual"); }
            inputGift.OwnerId = userId.Value;
            var result = _dbContext.Gifts.Add(inputGift);
            _dbContext.SaveChanges();
            return CreatedAtRoute("GetGift", new { controller = "GiftApi", id = result.Entity.Id }, result.Entity);
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
            inputGift.Id = id;
            _dbContext.Entry(storedGift).CurrentValues.SetValues(inputGift);
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

        async private Task<Gift> FetchGift(int id)
        {
            var userId = await GetCurrentIndividualId();
            if (!userId.HasValue) { throw new System.Exception("user has no individual"); }
           return _dbContext.Gifts.FirstOrDefault(g => g.Id == id && g.OwnerId == userId.Value);
        }
    }
}