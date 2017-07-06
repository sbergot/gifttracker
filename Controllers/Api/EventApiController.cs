namespace WebApplication.Controllers.Api
{
    using System;
    using System.Linq;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;

    [Authorize]
    [Route("api/event")]
    public class EventApiController : ControllerBase
    {
        private ApplicationDbContext _dbContext;
        private readonly ILogger _logger;

        public EventApiController (ApplicationDbContext dbConctext, ILoggerFactory loggerFactory)
        {
          _dbContext = dbConctext;
          _logger = loggerFactory.CreateLogger<EventApiController>();
        }

        [HttpGet]
        public IActionResult Index()
        {
            var events = _dbContext.Events
                .GroupJoin(
                    _dbContext.Gifts,
                    e => e.Id,
                    g => g.EventId,
                    (e, gs) => new ViewModels.EventWithGifts {
                        Id = e.Id,
                        Type = e.Type,
                        Year = e.Year,
                        Gifts = gs.ToList()
                    })
                .ToList();
            return Ok(events);
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

    }
}