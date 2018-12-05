namespace WebApplication.Services.Implementations
{
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
                return ServiceResponseStatus.Forbidden;
            }

            if (!AccessControlService.IsIndividualVisible(userId, receiverId)) {
                return ServiceResponseStatus.Forbidden;
            }

            var result = DbContext.GiftReceiver.Add(new GiftReceiver {
                GiftId = giftId,
                ReceiverId = receiverId
            });
            return ServiceResponseStatus.Sucess;
        }


        public ServiceResponseStatus RemoveGiftReceiver(int userId, int giftId, int receiverId)
        {
            if (!AccessControlService.IsGiftVisible(userId, giftId)) {
                return ServiceResponseStatus.Forbidden;
            }

            if (!AccessControlService.IsIndividualVisible(userId, receiverId)) {
                return ServiceResponseStatus.Forbidden;
            }

            var result = DbContext.GiftReceiver.Add(new GiftReceiver {
                GiftId = giftId,
                ReceiverId = receiverId
            });
            return ServiceResponseStatus.Sucess;
        }
    }
}
