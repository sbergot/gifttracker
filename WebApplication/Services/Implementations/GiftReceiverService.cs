namespace WebApplication.Services.Implementations
{
    using System.Linq;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.Services.Contracts;
    using WebApplication.Services.Models;

    public class GiftReceiverService: BaseService, IGiftReceiverService
    {
        private IAccessControlService AccessControlService { get; }

        public GiftReceiverService(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IAccessControlService accessControlService)
            : base(dbContext, loggerFactory)
        {
            AccessControlService = accessControlService;
        }

        public ServiceResponseStatus AddGiftReceiver(int userId, int giftId, int receiverId)
        {
            if (!AccessControlService.IsGiftVisible(userId, giftId)) {
                Logger.LogWarning(
                    "could not add receiver because giftid {0} is not in perimeter for userid {1}",
                    giftId,
                    userId);
                return ServiceResponseStatus.Forbidden;
            }

            if (!AccessControlService.IsIndividualVisible(userId, receiverId)) {
                Logger.LogWarning(
                    "could not add receiver because receiverId {0} is not in perimeter for userid {1}",
                    giftId,
                    userId);
                return ServiceResponseStatus.Forbidden;
            }

            DbContext.GiftReceiver.Add(new GiftReceiver {
                GiftId = giftId,
                ReceiverId = receiverId
            });
            return ServiceResponseStatus.Sucess;
        }


        public ServiceResponseStatus RemoveGiftReceiver(int userId, int giftId, int receiverId)
        {
            if (!AccessControlService.IsGiftVisible(userId, giftId)) {
                Logger.LogWarning(
                    "could not remove receiver because giftid {0} is not in perimeter for userid {1}",
                    giftId,
                    userId);
                return ServiceResponseStatus.Forbidden;
            }

            if (!AccessControlService.IsIndividualVisible(userId, receiverId)) {
                Logger.LogWarning(
                    "could not remove receiver because receiverId {0} is not in perimeter for userid {1}",
                    giftId,
                    userId);
                return ServiceResponseStatus.Forbidden;
            }

            DbContext.GiftReceiver.RemoveRange(
                DbContext.GiftReceiver.Where(gr => gr.GiftId == giftId && gr.ReceiverId == receiverId));
            return ServiceResponseStatus.Sucess;
        }
    }
}
