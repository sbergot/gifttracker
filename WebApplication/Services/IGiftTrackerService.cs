namespace WebApplication.Services
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using WebApplication.Models;

    public interface IGiftTrackerService
    {
        Task<int> GetCurrentIndividualId();
        Task<List<Individual>> GetVisibleIndividualList();
        IQueryable<Individual> GetVisibleIndividuals(int indivId);
        IQueryable<Gift> GetVisibleGifts(int userId);
    }
}
