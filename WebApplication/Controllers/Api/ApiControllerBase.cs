namespace WebApplication.Controllers.Api
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Filters;

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