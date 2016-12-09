namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;

    [Authorize]
    [Route("api/occurence")]
    public class OccurenceApiController : ControllerBase
    {
        private ApplicationDbContext _dbContext;

        public OccurenceApiController (ApplicationDbContext dbConctext)
        {
          _dbContext = dbConctext;
        }

        [HttpGet]
        public IEnumerable<Occurence> Index()
        {
            return _dbContext.Occurences.ToList();
        }
    }
}