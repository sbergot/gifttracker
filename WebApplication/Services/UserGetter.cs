namespace WebApplication.Services
{
    using System.Threading.Tasks;
    using WebApplication.Models;

    public class UserGetter: IUserGetter
    {
        public UserGetter()
        {
        }

        Task<ApplicationUser> IUserGetter.GetUser()
        {
            throw new System.NotImplementedException();
        }
    }
}