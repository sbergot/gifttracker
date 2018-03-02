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
            var userId = await GetCurrentIndividualId();
            return _dbContext.Individuals.GroupJoin(
                this.GetVisibleGifts(userId.Value),
                i => i.Id,
                g => g.ReceiverId,
                (i, gs) => new IndividualWithGifts {
                    Individual = i,
                    Gifts = gs.ToList()
                }).ToList();
        }
    }
}