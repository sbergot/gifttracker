namespace WebApplication.Services
{
    using System.Threading.Tasks;
    using WebApplication.Models;

    public interface IUserGetter
    {
        Task<ApplicationUser> GetUser();
    }
}