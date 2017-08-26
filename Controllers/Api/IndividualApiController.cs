namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.ViewModels;

    [Authorize]
    [Route("api/individual")]
    public class IndividualApiController : ApiControllerBase
    {
        public IndividualApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            UserManager<ApplicationUser> userManager)
            : base(dbContext, loggerFactory, userManager)
        {}

        [HttpGet]
        async public Task<IEnumerable<IndividualWithGifts>> Index()
        {
            var userId = await GetUserId();
            return _dbContext.Individuals.GroupJoin(
                _dbContext.Gifts.Where(g => g.OwnerId == userId),
                i => i.Id,
                g => g.ReceiverId,
                (i, gs) => new IndividualWithGifts {
                    Id = i.Id,
                    BirthDay = i.BirthDay,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    UserId = i.UserId,
                    Gifts = gs.ToList()
                }).ToList();
        }
    }
}