namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.ViewModels;
    using WebApplication.Services;

    [Authorize]
    [Route("api/referential")]
    public class ReferentialApiController : ApiControllerBase
    {
        public ReferentialApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IGiftTrackerService giftTrackerService)
            : base(dbContext, loggerFactory, giftTrackerService)
        {}

        [HttpGet]
        async public Task<DataContext> Index()
        {
            var events = _dbContext.Events;
            var individuals = await _giftTrackerService.GetVisibleIndividualList();
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            _logger.LogInformation("userid: " + userId.ToString());
            var gifts = _giftTrackerService.GetVisibleGifts(userId);

            var giftsWithReceivers = await
                (from giftreceiver in _dbContext.GiftReceiver
                join receiver in _giftTrackerService.GetVisibleIndividuals(userId) on giftreceiver.ReceiverId equals receiver.Id
                join gift in _giftTrackerService.GetVisibleGifts(userId) on giftreceiver.GiftId equals gift.Id
                select new [] {giftreceiver.GiftId, giftreceiver.ReceiverId}
                ).ToAsyncEnumerable().ToList();

            return new DataContext
            {
                IndividualMap = individuals.ToDictionary(i => i.Id),
                EventMap = events.ToDictionary(e => e.Id),
                GiftMap = gifts.ToDictionary(g => g.Id),
                GiftReceiverPairs = giftsWithReceivers
            };
        }
    }
}