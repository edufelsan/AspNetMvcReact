using Microsoft.AspNetCore.Identity;

namespace AspNetMvcReact.Models;

public class ApplicationUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; } = true;

    // Propriedade computed para nome completo
    public string FullName => $"{FirstName} {LastName}".Trim();
}