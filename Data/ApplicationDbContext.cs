using AspNetMvcReact.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AspNetMvcReact.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Configurações do modelo ApplicationUser
        builder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP(6)");
        });

        // Configurações para MySQL - limitar tamanhos das chaves
        builder.Entity<Microsoft.AspNetCore.Identity.IdentityRole>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(60);
            entity.Property(e => e.Name).HasMaxLength(128);
            entity.Property(e => e.NormalizedName).HasMaxLength(128);
        });

        builder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(e => e.Id).HasMaxLength(60);
            entity.Property(e => e.UserName).HasMaxLength(128);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(128);
            entity.Property(e => e.Email).HasMaxLength(128);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(128);
        });

        builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserLogin<string>>(entity =>
        {
            entity.Property(e => e.LoginProvider).HasMaxLength(60);
            entity.Property(e => e.ProviderKey).HasMaxLength(60);
            entity.Property(e => e.UserId).HasMaxLength(60);
        });

        builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserToken<string>>(entity =>
        {
            entity.Property(e => e.UserId).HasMaxLength(60);
            entity.Property(e => e.LoginProvider).HasMaxLength(60);
            entity.Property(e => e.Name).HasMaxLength(60);
        });

        builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserRole<string>>(entity =>
        {
            entity.Property(e => e.UserId).HasMaxLength(60);
            entity.Property(e => e.RoleId).HasMaxLength(60);
        });

        // Customizar nomes das tabelas do Identity para português
        builder.Entity<ApplicationUser>().ToTable("Users");
        builder.Entity<Microsoft.AspNetCore.Identity.IdentityRole>().ToTable("Roles");
        builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserRole<string>>().ToTable("UserRoles");
        builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserClaim<string>>().ToTable("UserClaims");
        builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserLogin<string>>().ToTable("UserLogins");
        builder.Entity<Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>>().ToTable("RoleClaims");
        builder.Entity<Microsoft.AspNetCore.Identity.IdentityUserToken<string>>().ToTable("UserTokens");
    }
}