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
            var individuals = await _giftTrackerService.GetVisibleIndividuals();
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            var gifts = _giftTrackerService.GetVisibleGifts(userId.Value);

            var giftsWithReceivers = await
                (from gift in _giftTrackerService.GetVisibleGifts(userId.Value)
                join gr in _dbContext.GiftReceiver
                on gift.Id equals gr.GiftId into rs
                select new {
                    GiftId = gift.Id,
                    ReceiverIds = rs.Select(r => r.ReceiverId).ToList()
                }).ToDictionaryAsync(gr => gr.GiftId, gr => gr.ReceiverIds.ToList());

            var eventsWithGifts = await
                (from evt in _dbContext.Events
                join gift in _giftTrackerService.GetVisibleGifts(userId.Value)
                on evt.Id equals gift.Id into eg
                select new {
                    EventId = evt.Id,
                    GiftIds = eg.Select(g => g.Id)
                }).ToDictionaryAsync(eg => eg.EventId, eg => eg.GiftIds.ToList());

            return new DataContext
            {
                IndividualMap = individuals.ToDictionary(i => i.Id),
                EventMap = events.ToDictionary(e => e.Id),
                GiftMap = gifts.ToDictionary(g => g.Id)
            };
        }
    }
}