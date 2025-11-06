using AspNetMvcReact.Models;
using InertiaCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers;

[Authorize]
public class DashboardController : Controller
{
    private readonly ILogger<DashboardController> _logger;
    private readonly UserManager<ApplicationUser> _userManager;

    public DashboardController(ILogger<DashboardController> logger, UserManager<ApplicationUser> userManager)
    {
        _logger = logger;
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var currentUser = await _userManager.GetUserAsync(User);
        
        if (currentUser == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        var userData = new
        {
            id = currentUser.Id,
            name = currentUser.FullName,
            email = currentUser.Email,
            firstName = currentUser.FirstName,
            lastName = currentUser.LastName,
            createdAt = currentUser.CreatedAt,
            lastLoginAt = currentUser.LastLoginAt
        };

        return Inertia.Render("Dashboard", new { 
            auth = new { user = userData }
        });
    }
}