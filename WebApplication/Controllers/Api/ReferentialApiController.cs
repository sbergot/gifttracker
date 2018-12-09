namespace WebApplication.Controllers.Api
{
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.Models.Database;
    using WebApplication.Models.WebApi;
    using WebApplication.Services.Contracts;

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
            var individuals = AccessControlService.GetVisibleIndividuals(userId).Select(i => i.ToWeb());
            var gifts = AccessControlService.GetVisibleGifts(userId).Select(g => g.ToWeb());
            var giftsWithReceivers = AccessControlService.GetVisibleGiftReceiverPairs(userId);

            return new DataContext
            {
                IndividualMap = await individuals.ToDictionaryAsync(i => i.Id),
                EventMap = await DbContext.Events.Select(e => e.ToWeb()).ToDictionaryAsync(e => e.Id),
                GiftMap = await gifts.ToDictionaryAsync(g => g.Id),
                GiftReceiverPairs = await giftsWithReceivers.ToListAsync(),
                CurrentUserId = userId
            };
        }
    }
}