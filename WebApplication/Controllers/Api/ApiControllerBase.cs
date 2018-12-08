namespace WebApplication.Controllers.Api
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;
    using WebApplication.Filters;
    using WebApplication.Services.Models;

    [Authorize]
    [ApiController]
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

        protected ActionResult<T> FromResponse<T>(ServiceResponse<T> response) {
            switch (response.Status) {
                case ServiceResponseStatus.Forbidden:
                    return Forbid();
                case ServiceResponseStatus.Sucess:
                    return response.Value;
                default:
                    throw new System.Exception("unhandled response status: " + response.Status.ToString());
            }
        }

        protected ActionResult FromResponse(ServiceResponseStatus responseStatus) {
            switch (responseStatus) {
                case ServiceResponseStatus.Forbidden:
                    return Forbid();
                case ServiceResponseStatus.Sucess:
                    return Ok();
                default:
                    throw new System.Exception("unhandled response status: " + responseStatus.ToString());
            }
        }
    }
}