namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.Logging;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.Services;

    [Authorize]
    [Route("api/giftreceiver")]
    public class GiftReceiverApiController : ApiControllerBase
    {
        public GiftReceiverApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IGiftTrackerService giftTrackerService)
            : base(dbContext, loggerFactory, giftTrackerService)
        {}

        [HttpGet]
        async public Task<List<int[]>> Index()
        {
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            var giftsWithReceivers = await
                (from giftreceiver in _dbContext.GiftReceiver
                join receiver in _giftTrackerService.GetVisibleIndividuals(userId) on giftreceiver.ReceiverId equals receiver.Id
                join gift in _giftTrackerService.GetVisibleGifts(userId) on giftreceiver.GiftId equals gift.Id
                select new [] {giftreceiver.GiftId, giftreceiver.ReceiverId}
                ).ToAsyncEnumerable().ToList();

            return giftsWithReceivers;
        }

        [HttpPost]
        [Route("{giftId:int}/{receiverId:int}")]

        async public Task<IActionResult> Post(int giftId, int receiverId)
        {
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            var storedGift = _giftTrackerService.GetVisibleGifts(userId).FirstOrDefault(g => g.Id == giftId);;
            if (storedGift == null) {
                return Forbid();
            }

            var storedIndividual = _giftTrackerService.GetVisibleIndividuals(userId).FirstOrDefault(i => i.Id == receiverId);
            if (storedIndividual == null) {
                return Forbid();
            }

            var result = _dbContext.GiftReceiver.Add(new GiftReceiver {
                GiftId = giftId,
                ReceiverId = receiverId
            });
            await _dbContext.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete]
        [Route("{giftId:int}/{receiverId:int}")]

        async public Task<IActionResult> Delete(int giftId, int receiverId)
        {
            var userId = await _giftTrackerService.GetCurrentIndividualId();
            var storedGift = _giftTrackerService.GetVisibleGifts(userId).FirstOrDefault(g => g.Id == giftId);;
            if (storedGift == null) {
                return Forbid();
            }

            var storedIndividual = _giftTrackerService.GetVisibleIndividuals(userId).FirstOrDefault(i => i.Id == receiverId);
            if (storedIndividual == null) {
                return Forbid();
            }

            _dbContext.GiftReceiver.RemoveRange(
                _dbContext.GiftReceiver.Where(gr => gr.GiftId == giftId && gr.ReceiverId == receiverId));
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}