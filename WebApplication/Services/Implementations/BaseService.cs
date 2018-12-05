namespace WebApplication.Services.Implementations
{
    using Microsoft.Extensions.Logging;
    using WebApplication.Data;

    public class BaseService
    {
        protected ApplicationDbContext DbContext { get; }
        protected ILogger Logger { get; }

        public BaseService(
            ApplicationDbContext dbContext,
            ILoggerFactory loggerFactory)
        {
            DbContext = dbContext;
            Logger = loggerFactory.CreateLogger(this.GetType().Name);
        }
    }
}
