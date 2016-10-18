namespace WebApplication.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;

    public class GiftController : Controller
    {
        private readonly ILogger _logger;

        public GiftController (ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<GiftController>();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}