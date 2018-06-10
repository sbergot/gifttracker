namespace WebApplication.Services
{
    using System.Threading.Tasks;
    using WebApplication.Models;

    public interface IUserAccessor
    {
        Task<ApplicationUser> GetUser();
    }
}