using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebApplication.Models;
using WebApplication.ViewModels.ManageViewModels;

namespace WebApplication.Controllers
{
    [Authorize]
    public class ManageController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger _logger;

        public ManageController(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _logger = loggerFactory.CreateLogger<ManageController>();
        }

        //
        // GET: /Manage/Index
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        //
        // POST: /Manage/RemoveLogin
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RemoveLogin(RemoveLoginViewModel account)
        {
            var user = await GetCurrentUserAsync();
            if (user != null)
            {
                await _signInManager.SignOutAsync();
                await _userManager.DeleteAsync(user);
            }
            return RedirectToAction("Index", "AccountController");
        }

        private Task<ApplicationUser> GetCurrentUserAsync()
        {
            return _userManager.GetUserAsync(HttpContext.User);
        }
    }
}
