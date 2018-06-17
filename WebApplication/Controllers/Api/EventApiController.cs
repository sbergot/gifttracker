namespace WebApplication.Controllers.Api
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.Services;

    [Authorize]
    [Route("api/event")]
    public class EventApiController : ApiControllerBase
    {
        public EventApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IGiftTrackerService giftTrackerService)
            : base(dbContext, loggerFactory, giftTrackerService)
        {}

        [HttpGet]
        async public Task<IActionResult> Index()
        {
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            // List<ViewModels.EventWithGifts> events = await _dbContext.Events
            //     .GroupJoin(
            //         _giftTrackerService.GetVisibleGifts(userId.Value),
            //         evt => evt.Id,
            //         gift => gift.EventId,
            //         (evt, gs) => new ViewModels.EventWithGifts {
            //             EventId = evt.Id,
            //             Gifts = gs.ToList()
            //         })
            //     .ToListAsync();

            var giftsWithReceivers =
                from gift in _giftTrackerService.GetVisibleGifts(userId.Value)
                join gr in _dbContext.GiftReceiver 
                on gift.Id equals gr.GiftId into rs
                select new ViewModels.GiftWithReceivers {
                    GiftId = gift.Id,
                    ReceiverIds = rs.Select(r => r.ReceiverId).ToList()
                }

            var eventsWithGifts = 
                from evt in _dbContext.Events
                join gift in  on evt.Id equals gift.Id into eg


            List<WebApplication.Models.Individual> individuals = await _giftTrackerService.GetVisibleIndividuals();
            ViewModels.TimeLine result = new ViewModels.TimeLine
            {
                Events = events,
                Individuals = individuals
            };
            return Ok(result);
        }

        [HttpPost("{year}/{type}")]
        public IActionResult Create(int year, EventType type)
        {
            var evt = new Event
            {
                Year = year,
                Type = type
            };
            _dbContext.Add(evt);
            _dbContext.SaveChanges();
            return CreatedAtAction("GetEvent", new { year = year, type = type });
        }

        [HttpGet("{year}/{type}", Name = "GetEvent")]
        public IActionResult GetEvent(int year, EventType type)
        {
            return Ok(_dbContext.Events.First(o => o.Year == o.Year && o.Type == type));
        }

        private EventType? ParseEventType(string input)
        {
            EventType? result = null;
            try
            {
                result = (EventType)Enum.Parse(typeof(EventType), input);
            }
            catch (System.ArgumentException)
            {
                _logger.LogInformation("wrong event type: {0}", input);
            }
            return result;
        }
    }
}