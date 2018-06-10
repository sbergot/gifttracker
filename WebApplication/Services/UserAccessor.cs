namespace WebApplication.Services
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using WebApplication.Models;

    public class UserAccessor: IUserAccessor
    {
        public UserAccessor(
            UserManager<ApplicationUser> userManager,
            IHttpContextAccessor httpAccessor
        )
        {
            UserManager = userManager;
            HttpAccessor = httpAccessor;
        }

        public UserManager<ApplicationUser> UserManager { get; }
        public IHttpContextAccessor HttpAccessor { get; }

        async public Task<ApplicationUser> GetUser()
        {
            return await UserManager.GetUserAsync(HttpAccessor.HttpContext.User);
        }
    }
}