using InertiaCore;
using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return Inertia.Render("Welcome");
    }

    [Route("privacy")]
    public IActionResult Privacy()
    {
        return Inertia.Render("PrivacyPolicy");
    }

    [Route("terms")]
    public IActionResult Terms()
    {
        return Inertia.Render("TermsOfService");
    }
}
