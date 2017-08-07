namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.ViewModels;

    [Authorize]
    [Route("api/individual")]
    public class IndividualApiController : ControllerBase
    {
        private ApplicationDbContext _dbContext;
        private UserManager<ApplicationUser> _userManager;

        public IndividualApiController (
            ApplicationDbContext dbContext,
            UserManager<ApplicationUser> userManager
            )
        {
          _dbContext = dbContext;
          _userManager = userManager;
        }

        [HttpGet]
        public IEnumerable<IndividualWithGifts> Index()
        {
            return _dbContext.Individuals.GroupJoin(
                _dbContext.Gifts,
                i => i.Id,
                g => g.ReceiverId,
                (i, gs) => new IndividualWithGifts {
                    Id = i.Id,
                    BirthDay = i.BirthDay,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    UserId = i.UserId,
                    Gifts = gs.ToList()
                }).ToList();
        }
    }
}