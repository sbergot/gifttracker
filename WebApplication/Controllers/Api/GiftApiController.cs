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
    using WebApplication.Services;

    [Authorize]
    [Route("api/gift")]
    public class GiftApiController : ApiControllerBase
    {
        public GiftApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IGiftTrackerService giftTrackerService)
            : base(dbContext, loggerFactory, giftTrackerService)
        {}

        [HttpGet]
        async public Task<List<Gift>> Index()
        {
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            return await _giftTrackerService.GetVisibleGifts(userId).ToListAsync();
        }

        [HttpPost]
        async public Task<IActionResult> Post([FromBody]Gift inputGift)
        {
            if (inputGift.Id > 0) {
                return BadRequest("trying to post a new gift with positive id");
            }
            inputGift.Id = 0;
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            inputGift.OwnerId = userId;
            var result = _dbContext.Gifts.Add(inputGift);
            await _dbContext.SaveChangesAsync();
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
            await _dbContext.SaveChangesAsync();
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
            await _dbContext.SaveChangesAsync();
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
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            return _giftTrackerService.GetVisibleGifts(userId).FirstOrDefault(g => g.Id == id);
        }
    }
}