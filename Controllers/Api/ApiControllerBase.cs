namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.Filters;

    [ServiceFilter(typeof(ApiExceptionFilter))]
    [ModelValidationFilter]
    public class ApiControllerBase : ControllerBase
    {
        protected readonly ApplicationDbContext _dbContext;
        protected readonly UserManager<ApplicationUser> _userManager;
        protected readonly ILogger _logger;

        public ApiControllerBase (
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            UserManager<ApplicationUser> userManager
            )
        {
          _dbContext = dbContext;
          _userManager = userManager;
          _logger = loggerFactory.CreateLogger(this.GetType().Name);
        }

        async protected Task<string> GetUserId() {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            return user.Id;
        }

        async protected Task<int?> GetCurrentIndividualId() {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            return user.IndividualId;
        }

        async protected Task<List<Individual>> GetVisibleIndividuals() {
            var indivId = await GetCurrentIndividualId();
            return _dbContext.Individuals
                .Join(
                    _dbContext.IndividualVisibility,
                    i => i.Id,
                    iv => iv.ViewedId,
                    (i, iv) => new { i, iv.ViewerId })
                .Where(o => o.ViewerId == indivId)
                .Select(o => o.i)
                .ToList();

        }

        protected IQueryable<Gift> GetVisibleGifts(int userId) {
            return _dbContext
                .Gifts
                .Where(g => (userId == g.OwnerId)
                    || (g.IsVisibleToReceiver ?? false) && (userId == g.ReceiverId)
                    || (g.IsVisibleToOthers ?? false) && (userId != g.ReceiverId)
                );
        }
    }
}