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

    [Authorize]
    [Route("api/giftreceiver")]
    public class GiftReceiverApiController : ApiControllerBase
    {
        public IUserAccessor UserAccessor { get; }
        public IAccessControlService AccessControlService { get; }

        public GiftReceiverApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IUserAccessor userAccessor,
            IAccessControlService accessControlService)
            : base(dbContext, loggerFactory)
        {
            UserAccessor = userAccessor;
            AccessControlService = accessControlService;
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

            if (!AccessControlService.IsGiftVisible(userId, giftId)) {
                return Forbid();
            }

            if (!AccessControlService.IsIndividualVisible(userId, receiverId)) {
                return Forbid();
            }

            var result = DbContext.GiftReceiver.Add(new GiftReceiver {
                GiftId = giftId,
                ReceiverId = receiverId
            });
            await DbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("{giftId:int}/{receiverId:int}")]

        async public Task<IActionResult> Delete(int giftId, int receiverId)
        {
            var userId = await UserAccessor.GetCurrentIndividualId();

            if (!AccessControlService.IsGiftVisible(userId, giftId)) {
                return Forbid();
            }

            if (!AccessControlService.IsIndividualVisible(userId, receiverId)) {
                return Forbid();
            }

            DbContext.GiftReceiver.RemoveRange(
                DbContext.GiftReceiver.Where(gr => gr.GiftId == giftId && gr.ReceiverId == receiverId));
            await DbContext.SaveChangesAsync();
            return Ok();
        }
    }
}