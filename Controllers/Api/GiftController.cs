namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using WebApplication.Data;
    using WebApplication.Models;

    [Authorize]
    [Route("api/gift")]
    public class GiftController : ControllerBase
    {
        private ApplicationDbContext _dbContext;

        public GiftController (ApplicationDbContext dbConctext)
        {
          _dbContext = dbConctext;
        }

        [HttpGet]
        public IEnumerable<Gift> Index()
        {
            return _dbContext.Gifts.ToList();
        }

        [HttpPost]
        public IActionResult Post([FromBody]Gift inputGift)
        {
            if (inputGift.Id > 0) {
                return BadRequest("trying to post a new gift with positive id");
            }
            var result = _dbContext.Gifts.Add(inputGift);
            _dbContext.SaveChanges();
            return CreatedAtRoute("GetGift", new { controller = "GiftApi", id = result.Entity.Id }, result.Entity);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Put(int id, [FromBody]Gift inputGift)
        {
            if (inputGift == null) {
                return BadRequest("gift not provided");
            }
            inputGift.Id = id;
            var exists = _dbContext.Gifts.Any(g => g.Id == id);
            if (!exists) {
                return NotFound();
            }
            _dbContext.Attach(inputGift);
            _dbContext.Entry(inputGift).State = EntityState.Modified;
            _dbContext.SaveChanges();
            return Ok(inputGift);
        }


        [HttpGet("{id}", Name = "GetGift")]
        public IActionResult GetById(int id)
        {
            return Ok(_dbContext.Gifts.First(g => g.Id == id));
        }
    }
}