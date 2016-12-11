namespace WebApplication.Controllers.Api
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;

    [Authorize]
    [Route("api/occurence")]
    public class OccurenceApiController : ControllerBase
    {
        private ApplicationDbContext _dbContext;
        private readonly ILogger _logger;

        public OccurenceApiController (ApplicationDbContext dbConctext, ILoggerFactory loggerFactory)
        {
          _dbContext = dbConctext;
          _logger = loggerFactory.CreateLogger<OccurenceApiController>();
        }

        [HttpGet]
        public IEnumerable<Occurence> Index()
        {
            return _dbContext.Occurences.ToList();
        }

        private OccurenceType? ParseOccurenceType(string input)
        {
            OccurenceType? result = null;
            try
            {
                result = (OccurenceType)Enum.Parse(typeof(OccurenceType), input);
            }
            catch (System.ArgumentException)
            {
                _logger.LogInformation("wrong occurence type: {0}", input);
            }
            return result;
        }

        [HttpPost("{year}/{type}")]
        public IActionResult Create(int year, OccurenceType type)
        {
            // var typeId = ParseOccurenceType(type);
            // if (typeId == null) {
            //     return BadRequest()
            // }
            var occurence = new Occurence
            {
                Year = year,
                Type = type
            };
            _dbContext.Add(occurence);
            _dbContext.SaveChanges();
            return CreatedAtAction("GetOccurence", new { year = year, type = type });
        }

        [HttpGet("{year}/{type}", Name = "GetOccurence")]
        public IActionResult GetOccurence(int year, int type)
        {
            return Ok(_dbContext.Occurences.First(o => o.Year == o.Year));
        }

    }
}