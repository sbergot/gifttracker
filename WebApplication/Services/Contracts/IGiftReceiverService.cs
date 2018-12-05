namespace WebApplication.Services.Contracts
{
    using WebApplication.Services.Models;

    public interface IGiftReceiverService
    {
        ServiceResponseStatus AddGiftReceiver(int userId, int giftId, int receiverId);
        ServiceResponseStatus RemoveGiftReceiver(int userId, int giftId, int individualId);
    }
}
