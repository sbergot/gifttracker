namespace WebApplication.Services.Implementations
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using WebApplication.Models.Database;
    using WebApplication.Services.Contracts;


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

        async public Task<int> GetCurrentIndividualId()
        {
            var user = await this.GetUser();
            if (user.IndividualId == null) {
                throw new System.InvalidOperationException("user not linked to an individual");
            }
            return user.IndividualId.Value;
        }

    }
}