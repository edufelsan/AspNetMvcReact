using System.Security.Claims;
using AspNetMvcReact.Data;
using AspNetMvcReact.Models;
using AspNetMvcReact.Services;
using AspNetMvcReact.Services.Interfaces;
using AspNetMvcReact.Services.Models;
using InertiaCore;
using InertiaCore.Extensions;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add antiforgery services
builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "X-XSRF-TOKEN";
});

// Add Entity Framework and MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

// Add Identity services
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Password settings
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;

    // Lockout settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
    options.Lockout.MaxFailedAccessAttempts = 5;
    options.Lockout.AllowedForNewUsers = true;

    // User settings
    options.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
    options.User.RequireUniqueEmail = true;

    // Sign in settings
    options.SignIn.RequireConfirmedEmail = false;
    options.SignIn.RequireConfirmedPhoneNumber = false;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Configure application cookie
builder.Services.ConfigureApplicationCookie(options =>
{
    options.AccessDeniedPath = "/Auth/AccessDenied";
    options.Cookie.Name = "AspNetStackAuth";
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
    options.LoginPath = "/Auth/Login";
    options.LogoutPath = "/Auth/Logout";
    options.ReturnUrlParameter = "returnUrl";
    options.SlidingExpiration = true;
});

// Configure Email Service
builder.Services.Configure<EmailConfiguration>(
    builder.Configuration.GetSection("EmailConfiguration"));
builder.Services.AddScoped<IEmailService, EmailService>();

// Configure Vite Manifest Service
builder.Services.AddSingleton<IViteManifestService, ViteManifestService>();

builder.Services.AddInertia();

var app = builder.Build();

// Apply migrations automatically on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        
        // Ensure the database is created and apply any pending migrations
        await context.Database.MigrateAsync();
        
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogInformation("Database migrations applied successfully.");
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while applying database migrations.");
        
        // Em produção, você pode decidir se quer que a aplicação falhe ou continue
        // throw; // Descomente esta linha se quiser que a aplicação falhe quando as migrações falharem
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseInertia();

app.UseRouting();

// Add Authentication and Authorization middleware FIRST
app.UseAuthentication();
app.UseAuthorization();

// THEN add Inertia middleware to access authenticated user
app.Use(async (context, next) =>
{
    var isAuthenticated = context.User?.Identity?.IsAuthenticated ?? false;
    Console.WriteLine($"[Inertia Middleware] IsAuthenticated: {isAuthenticated}");
    Console.WriteLine($"[Inertia Middleware] User Identity: {context.User?.Identity?.Name}");
    Console.WriteLine($"[Inertia Middleware] Request Path: {context.Request.Path}");
    
    object? user = null;
    if (isAuthenticated)
    {
        user = new
        {
            Id = context.User?.FindFirstValue(ClaimTypes.NameIdentifier),
            Name = context.User?.FindFirstValue(ClaimTypes.Name) ?? context.User?.Identity?.Name,
            Email = context.User?.FindFirstValue(ClaimTypes.Email),
            FirstName = context.User?.FindFirstValue(ClaimTypes.GivenName),
            LastName = context.User?.FindFirstValue(ClaimTypes.Surname)
        };
        Console.WriteLine($"[Inertia Middleware] User object: {System.Text.Json.JsonSerializer.Serialize(user)}");
    }

    // Get antiforgery token
    var antiforgery = context.RequestServices.GetRequiredService<IAntiforgery>();
    var tokens = antiforgery.GetAndStoreTokens(context);
    
    var authData = new
    {
        IsAuthenticated = isAuthenticated,
        User = user
    };
    
    Console.WriteLine($"[Inertia Middleware] Auth data being shared: {System.Text.Json.JsonSerializer.Serialize(authData)}");
    
    Inertia.Share("auth", authData);
    Inertia.Share("csrf_token", tokens.RequestToken);
            
    await next(context);
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
