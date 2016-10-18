namespace WebApplication.Controllers
{
    using System.Linq;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;

    [Authorize]
    [Route("api/gift")]
    public class GiftApiController : ControllerBase
    {
        private ApplicationDbContext _dbContext;

        public GiftApiController (ApplicationDbContext dbConctext)
        {
          _dbContext = dbConctext;
        }

        [HttpGet]
        public IEnumerable<Gift> Index()
        {
            return _dbContext.Gifts.ToList();
        }

        [HttpPost]
        public IActionResult Post([FromBody]Gift gift)
        {
            var result = _dbContext.Gifts.Add(gift);
            _dbContext.SaveChanges();
            return CreatedAtRoute("GetGift", new { controller = "GiftApi", id = result.Entity.Id }, result.Entity);
        }

        [HttpGet("{id}", Name = "GetGift")]
        public IActionResult GetById(int id)
        {
            return Ok(_dbContext.Gifts.First(g => g.Id == id));
        }
    }
}