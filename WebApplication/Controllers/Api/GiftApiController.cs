namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;
    using Database = WebApplication.Models.Database;
    using WebApi = WebApplication.Models.WebApi;
    using WebApplication.Services.Contracts;

    [Route("api/gift")]
    public class GiftApiController : ApiControllerBase
    {
        public IAccessControlService AccessControlService { get; }
        public IUserAccessor UserAccessor { get; }

        public GiftApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IAccessControlService accessControlService,
            IUserAccessor userAccessor)
            : base(dbContext, loggerFactory)
        {
            AccessControlService = accessControlService;
            UserAccessor = userAccessor;
        }

        [HttpGet]
        async public Task<List<WebApi.Gift>> Index()
        {
            var userId = await UserAccessor.GetCurrentIndividualId();
            return await AccessControlService.GetVisibleGifts(userId).Select(g => g.ToWeb()).ToListAsync();
        }

        [HttpPost]
        async public Task<IActionResult> Post(WebApi.Gift inputGift)
        {
            if (inputGift.Id > 0) {
                return BadRequest("trying to post a new gift with positive id");
            }
            var gift = inputGift.ToDatabase();
            gift.Id = 0;
            var userId = await UserAccessor.GetCurrentIndividualId();
            gift.OwnerId = userId;
            var result = DbContext.Gifts.Add(gift);
            await DbContext.SaveChangesAsync();
            return CreatedAtRoute("GetGift", new { controller = "GiftApi", id = result.Entity.Id }, result.Entity.ToWeb());
        }

        [HttpPut]
        [Route("{id:int}")]
        async public Task<IActionResult> Put(int id, WebApi.Gift inputGift)
        {
            if (inputGift == null) {
                return BadRequest("gift not provided");
            }
            var storedGift = await FetchGift(id);
            if (storedGift == null) {
                return Forbid();
            }
            inputGift.Id = id;
            DbContext.Entry(storedGift).CurrentValues.SetValues(inputGift.ToDatabase());
            await DbContext.SaveChangesAsync();
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
            DbContext.Gifts.Remove(storedGift);
            await DbContext.SaveChangesAsync();
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

        async private Task<Database.Gift> FetchGift(int id)
        {
            var userId = await UserAccessor.GetCurrentIndividualId();
            return AccessControlService.GetVisibleGifts(userId).FirstOrDefault(g => g.Id == id);
        }
    }
}