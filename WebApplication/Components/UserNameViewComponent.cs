namespace WebApplication.Controllers
{
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.Models.Database;
    using WebApplication.Models.Mvc;
    using WebApplication.Services.Contracts;

    [Authorize]
    public class UserNameViewComponent : ViewComponent
    {
        private ILogger Logger { get; }
        private IUserAccessor UserAccessor { get; }
        private ApplicationDbContext DbContext { get; }
        public UserManager<ApplicationUser> UserManager { get; }

        public UserNameViewComponent(
            IUserAccessor userAccessor,
            ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager,
            ILoggerFactory loggerFactory)
        {
            Logger = loggerFactory.CreateLogger<UserNameViewComponent>();
            UserAccessor = userAccessor;
            DbContext = dbContext;
            UserManager = userManager;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            var normalizedUserName = User.Identity.Name.ToUpper();
            var user = await DbContext.Users
                .Include(u => u.Individual)
                .FirstOrDefaultAsync(u => u.NormalizedUserName == normalizedUserName);
            var individual = user != null ? user.Individual : new Individual
            {
                FirstName = "annonymous"
            };
            return View(individual);
        }
    }
}