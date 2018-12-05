namespace WebApplication.Services.Implementations
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.Services.Contracts;

    public class AccessControlService: BaseService, IAccessControlService
    {
        public AccessControlService(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IUserAccessor userAccessor)
            : base(dbContext, loggerFactory)
        {
        }

        public IQueryable<int[]> GetVisibleGiftReceiverPairs(int userId)
        {
            return (from giftreceiver in DbContext.GiftReceiver
                join receiver in GetVisibleIndividuals(userId) on giftreceiver.ReceiverId equals receiver.Id
                join gift in GetVisibleGifts(userId) on giftreceiver.GiftId equals gift.Id
                select new [] {giftreceiver.GiftId, giftreceiver.ReceiverId}
                );
        }

        public IQueryable<Gift> GetVisibleGifts(int userId)
        {
            return DbContext.Gifts.Where(g => g.OwnerId == userId).
            Concat(
                DbContext.Gifts.Join(
                    DbContext.GiftReceiver,
                    g => g.Id,
                    gr => gr.GiftId,
                    (g, gr) => new { Gift = g, ReceiverId = gr.ReceiverId }
                ).
                Where(o => (o.Gift.IsVisibleToOthers ?? false)
                    && o.Gift.OwnerId != userId && o.ReceiverId != userId).
                Select(o => o.Gift)
            );
        }

        public IQueryable<Individual> GetVisibleIndividuals(int userId)
        {
            return DbContext.Individuals
                .Join(
                    DbContext.IndividualVisibility,
                    i => i.Id,
                    iv => iv.ViewedId,
                    (i, iv) => new { i, iv.ViewerId })
                .Where(o => o.ViewerId == userId)
                .Select(o => o.i);
        }

        public bool IsGiftVisible(int userId, int giftId)
        {
            return this.GetVisibleGifts(userId).Any(g => g.Id == giftId);
        }

        public bool IsIndividualVisible(int userId, int individualId)
        {
            return this.GetVisibleIndividuals(userId).Any(g => g.Id == individualId);
        }
    }
}
