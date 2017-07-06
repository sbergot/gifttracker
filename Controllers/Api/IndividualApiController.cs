namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;

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
        public IEnumerable<Individual> Index()
        {
            return _dbContext.Individuals.ToList();
        }
    }
}