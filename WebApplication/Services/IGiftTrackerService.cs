namespace WebApplication.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using WebApplication.Models;

    public interface IGiftTrackerService
    {
        Task<int> GetCurrentIndividualId();
        Task<List<Individual>> GetVisibleIndividuals();
        IQueryable<Gift> GetVisibleGifts(int userId);
    }
}
