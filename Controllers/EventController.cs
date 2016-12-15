namespace WebApplication.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.Extensions.Logging;

    [Authorize]
    public class EventController : Controller
    {
        private readonly ILogger _logger;

        public EventController (ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<EventController>();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}