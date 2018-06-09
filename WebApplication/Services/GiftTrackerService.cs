namespace WebApplication.Services
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

    public class GiftTrackerService : IGiftTrackerService
    {
        protected readonly ApplicationDbContext _dbContext;
        protected readonly UserManager<ApplicationUser> _userManager;
        protected readonly ILogger _logger;
        protected readonly ClaimsPrincipal _userClaim;

        public GiftTrackerService(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            UserManager<ApplicationUser> userManager,
            ClaimsPrincipal userClaim)
        {
          _dbContext = dbContext;
          _userManager = userManager;
          _logger = loggerFactory.CreateLogger(this.GetType().Name);
          _userClaim = userClaim;
        }

        async public Task<int?> GetCurrentIndividualId()
        {
            var user = await _userManager.GetUserAsync(_userClaim);
            return user.IndividualId;
        }

        async public Task<string> GetUserId()
        {
            var user = await _userManager.GetUserAsync(_userClaim);
            return user.Id;
        }

        public IQueryable<Gift> GetVisibleGifts(int userId)
        {
            return _dbContext.Gifts.Where(g => g.OwnerId == userId).
            Concat(
                _dbContext.Gifts.Join(
                    _dbContext.GiftReceiver,
                    g => g.Id,
                    gr => gr.GiftId,
                    (g, gr) => new { Gift = g, ReceiverId = gr.ReceiverId }
                ).
                Where(o => o.Gift.IsVisibleToOthers ?? false && o.Gift.OwnerId != userId && o.ReceiverId != userId).
                Select(o => o.Gift)
            );
        }

        async public Task<List<Individual>> GetVisibleIndividuals()
        {
            var indivId = await GetCurrentIndividualId();
            return _dbContext.Individuals
                .Join(
                    _dbContext.IndividualVisibility,
                    i => i.Id,
                    iv => iv.ViewedId,
                    (i, iv) => new { i, iv.ViewerId })
                .Where(o => o.ViewerId == indivId)
                .Select(o => o.i)
                .ToList();
        }
    }
}