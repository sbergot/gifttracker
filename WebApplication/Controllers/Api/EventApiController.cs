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
        async public Task<List<Event>> Index()
        {
            var events = await _dbContext.Events.ToListAsync();
            return events;
        }

        [HttpPost("{year}/{type}")]
        async public Task<IActionResult> Create(int year, EventType type)
        {
            var evt = new Event
            {
                Year = year,
                Type = type
            };
            _dbContext.Add(evt);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction("GetEvent", new { year = year, type = type });
        }

        [HttpGet("{year}/{type}", Name = "GetEvent")]
        public Event GetEvent(int year, EventType type)
        {
            return _dbContext.Events.First(o => o.Year == o.Year && o.Type == type);
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