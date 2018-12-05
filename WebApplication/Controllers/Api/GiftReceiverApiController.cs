namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.Extensions.Logging;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.Services.Contracts;
    using WebApplication.Services.Models;

    [Authorize]
    [Route("api/giftreceiver")]
    public class GiftReceiverApiController : ApiControllerBase
    {
        public IUserAccessor UserAccessor { get; }
        public IAccessControlService AccessControlService { get; }
        public IGiftReceiverService GiftReceiverService { get; }

        public GiftReceiverApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IUserAccessor userAccessor,
            IAccessControlService accessControlService,
            IGiftReceiverService giftReceiverService)
            : base(dbContext, loggerFactory)
        {
            UserAccessor = userAccessor;
            AccessControlService = accessControlService;
            GiftReceiverService = giftReceiverService;
        }

        [HttpGet]
        async public Task<List<int[]>> Index()
        {
            var userId = await UserAccessor.GetCurrentIndividualId();
            var giftsWithReceivers = AccessControlService.GetVisibleGiftReceiverPairs(userId);
            return await giftsWithReceivers.ToListAsync();
        }

        [HttpPost]
        [Route("updates")]
        async public Task<IActionResult> PostUpdates(WebApplication.ViewModels.GiftReceiverUpdate updates)
        {
            return Ok();
        }

        [HttpPost]
        [Route("{giftId:int}/{receiverId:int}")]

        async public Task<IActionResult> Post(int giftId, int receiverId)
        {
            var userId = await UserAccessor.GetCurrentIndividualId();
            var response = GiftReceiverService.AddGiftReceiver(userId, giftId, receiverId);
            if (response == ServiceResponseStatus.Sucess) {
                await DbContext.SaveChangesAsync();
            }
            return FromResponse(response);
        }

        [HttpDelete]
        [Route("{giftId:int}/{receiverId:int}")]

        async public Task<IActionResult> Delete(int giftId, int receiverId)
        {
            var userId = await UserAccessor.GetCurrentIndividualId();
            var response = GiftReceiverService.RemoveGiftReceiver(userId, giftId, receiverId);
            if (response == ServiceResponseStatus.Sucess) {
                await DbContext.SaveChangesAsync();
            }
            return Ok();
        }
    }
}