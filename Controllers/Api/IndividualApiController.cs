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
    using WebApplication.Services;

    [Authorize]
    [Route("api/individual")]
    public class IndividualApiController : ApiControllerBase
    {
        public IndividualApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IGiftTrackerService giftTrackerService)
            : base(dbContext, loggerFactory, giftTrackerService)
        {}

        [HttpGet]
        async public Task<IEnumerable<IndividualWithGifts>> Index()
        {
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            return _dbContext.Individuals.GroupJoin(
                _giftTrackerService.GetVisibleGifts(userId.Value).
                    Join(
                        _dbContext.GiftReceiver,
                        g => g.Id,
                        gr => gr.GiftId,
                        (g, gr) => new { Gift = g, ReceiverId = gr.ReceiverId }
                    ),
                i => i.Id,
                g => g.ReceiverId,
                (i, gs) => new IndividualWithGifts {
                    Individual = i,
                    Gifts = gs.Select(gr => gr.Gift).ToList()
                }).ToList();
        }
    }
}