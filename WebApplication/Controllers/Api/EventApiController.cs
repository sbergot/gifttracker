namespace WebApplication.Controllers.Api
{
    using System;
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

    [Route("api/event")]
    public class EventApiController : ApiControllerBase
    {
        public EventApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory)
            : base(dbContext, loggerFactory)
        {}

        [HttpGet]
        async public Task<List<WebApi.Event>> Index()
        {
            var events = await DbContext.Events.Select(e => e.ToWeb()).ToListAsync();
            return events;
        }

        [HttpPost("{year}/{type}")]
        async public Task<IActionResult> Create(int year, EventType type)
        {
            var evt = new Database.Event
            {
                Year = year,
                Type = type
            };
            DbContext.Add(evt);
            await DbContext.SaveChangesAsync();
            return CreatedAtAction("GetEvent", new { year = year, type = type });
        }

        [HttpGet("{year}/{type}", Name = "GetEvent")]
        public WebApi.Event GetEvent(int year, EventType type)
        {
            return DbContext.Events.First(o => o.Year == o.Year && o.Type == type).ToWeb();
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
                Logger.LogInformation("wrong event type: {0}", input);
            }
            return result;
        }
    }
}