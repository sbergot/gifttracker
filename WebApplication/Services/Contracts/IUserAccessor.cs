namespace WebApplication.Services.Contracts
{
    using System.Threading.Tasks;
    using WebApplication.Models.Database;

    public interface IUserAccessor
    {
        Task<ApplicationUser> GetUser();
        Task<int> GetCurrentIndividualId();
    }
}