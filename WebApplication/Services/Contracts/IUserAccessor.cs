namespace WebApplication.Services.Contracts
{
    using System.Threading.Tasks;
    using WebApplication.Models;

    public interface IUserAccessor
    {
        Task<ApplicationUser> GetUser();
        Task<int> GetCurrentIndividualId();
    }
}