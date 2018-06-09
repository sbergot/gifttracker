namespace WebApplication.Controllers.Api
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Models;
    using WebApplication.Filters;
    using WebApplication.Services;

    [ServiceFilter(typeof(ApiExceptionFilter))]
    [ModelValidationFilter]
    public class ApiControllerBase : ControllerBase
    {
        protected readonly ApplicationDbContext _dbContext;
        protected readonly ILogger _logger;
        protected readonly IGiftTrackerService _giftTrackerService;

        public ApiControllerBase (
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory,
            IGiftTrackerService giftTrackerService
            )
        {
          _dbContext = dbContext;
          _logger = loggerFactory.CreateLogger(this.GetType().Name);
          _giftTrackerService = giftTrackerService;
        }
    }
}