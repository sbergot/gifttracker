namespace WebApplication.Controllers.Api
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;

    [ServiceFilter(typeof(ApiExceptionFilter))]
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
            var userId = user.Id;
            return userId;
        }
    }
}