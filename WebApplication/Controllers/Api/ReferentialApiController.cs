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
        async public Task<ReferentialData> Index()
        {
            var events = _dbContext.Events.ToList();
            var individuals = await _giftTrackerService.GetVisibleIndividuals();
            return new ReferentialData
            {
                Individuals = individuals,
                Events = events
            };
        }
    }
}