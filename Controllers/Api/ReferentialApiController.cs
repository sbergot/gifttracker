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

    [Authorize]
    [Route("api/referential")]
    public class ReferentialApiController : ApiControllerBase
    {
        public ReferentialApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            UserManager<ApplicationUser> userManager)
            : base(dbContext, loggerFactory, userManager)
        {}

        [HttpGet]
        async public Task<ReferentialData> Index()
        {
            var userId = await GetUserId();
            var individuals = _dbContext.Individuals.ToList();
            var events = _dbContext.Events.ToList();
            return new ReferentialData
            {
                Individuals = individuals,
                Events = events
            };
        }
    }
}