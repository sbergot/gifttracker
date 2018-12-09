namespace WebApplication.Services.Contracts
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using WebApplication.Models.Database;

    public interface IAccessControlService
    {
        IQueryable<Individual> GetVisibleIndividuals(int indivId);
        IQueryable<Gift> GetVisibleGifts(int userId);
        IQueryable<int[]> GetVisibleGiftReceiverPairs(int userId);
        bool IsGiftVisible(int userId, int giftId);
        bool IsIndividualVisible(int userId, int individualId);
    }
}
