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
        protected ApplicationDbContext DbContext { get; }
        protected ILogger Logger { get; }

        public ApiControllerBase (
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory)
        {
          DbContext = dbContext;
          Logger = loggerFactory.CreateLogger(this.GetType().Name);
        }
    }
}