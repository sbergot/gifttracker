namespace WebApplication.Controllers.Api
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Logging;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;

    [Authorize]
    [Route("api/event")]
    public class EventApiController : ApiControllerBase
    {
        public EventApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            UserManager<ApplicationUser> userManager)
            : base(dbContext, loggerFactory, userManager)
        {}

        [HttpGet]
        async public Task<IActionResult> Index()
        {
            var userId = await GetUserId();
            List<ViewModels.EventWithGifts> events = _dbContext.Events
                .GroupJoin(
                    _dbContext.Gifts
                        .Where(g => g.OwnerId == userId),
                    evt => evt.Id,
                    gift => gift.EventId,
                    (evt, gs) => new ViewModels.EventWithGifts {
                        Id = evt.Id,
                        Type = evt.Type,
                        Year = evt.Year,
                        Gifts = gs.ToList()
                    })
                .ToList();
            List<WebApplication.Models.Individual> individuals = _dbContext.Individuals.ToList();
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