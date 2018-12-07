namespace WebApplication.Controllers.Api
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.ViewModels;
    using WebApplication.Services.Contracts;

    [Authorize]
    [Route("api/referential")]
    public class ReferentialApiController : ApiControllerBase
    {
        public ReferentialApiController(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IAccessControlService accessControlService,
            IUserAccessor userAccessor)
            : base(dbContext, loggerFactory)
        {
            AccessControlService = accessControlService;
            UserAccessor = userAccessor;
        }

        public IAccessControlService AccessControlService { get; }
        public IUserAccessor UserAccessor { get; }

        [HttpGet]
        async public Task<DataContext> Index()
        {
            var userId = await UserAccessor.GetCurrentIndividualId();
            var individuals = AccessControlService.GetVisibleIndividuals(userId);
            var gifts = AccessControlService.GetVisibleGifts(userId);
            var giftsWithReceivers = AccessControlService.GetVisibleGiftReceiverPairs(userId);

            return new DataContext
            {
                IndividualMap = await individuals.ToDictionaryAsync(i => i.Id),
                EventMap = await DbContext.Events.ToDictionaryAsync(e => e.Id),
                GiftMap = await gifts.ToDictionaryAsync(g => g.Id),
                GiftReceiverPairs = await giftsWithReceivers.ToListAsync(),
                CurrentUserId = userId
            };
        }
    }
}