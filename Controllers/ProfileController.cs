using AspNetMvcReact.Models;
using AspNetMvcReact.Services.Interfaces;
using InertiaCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace AspNetMvcReact.Controllers;

[Authorize]
public class ProfileController : Controller
{
    private readonly ILogger<ProfileController> _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IEmailService _emailService;

    public ProfileController(
        ILogger<ProfileController> logger,
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IEmailService emailService)
    {
        _logger = logger;
        _userManager = userManager;
        _signInManager = signInManager;
        _emailService = emailService;
    }

    [HttpGet]
    public async Task<IActionResult> Index(string? success = null)
    {
        var user = await _userManager.GetUserAsync(User);
        
        if (user == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        var userData = new
        {
            id = user.Id,
            name = user.FullName,
            firstName = user.FirstName,
            lastName = user.LastName,
            email = user.Email,
            emailConfirmed = user.EmailConfirmed,
            createdAt = user.CreatedAt,
            lastLoginAt = user.LastLoginAt
        };

        return Inertia.Render("Profile/Index", new { 
            user = userData,
            success = success,
            errors = TempData.ContainsKey("Errors") ? TempData["Errors"] : null
        });
    }

    [HttpPost]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        var user = await _userManager.GetUserAsync(User);
        
        if (user == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        // Log para debug
        _logger.LogInformation($"UpdateProfile received - FirstName: '{request?.FirstName}', LastName: '{request?.LastName}', Email: '{request?.Email}'");

        // Validação manual
        if (string.IsNullOrWhiteSpace(request?.FirstName))
        {
            ModelState.AddModelError("firstName", "O nome é obrigatório.");
        }

        if (string.IsNullOrWhiteSpace(request?.LastName))
        {
            ModelState.AddModelError("lastName", "O sobrenome é obrigatório.");
        }

        if (string.IsNullOrWhiteSpace(request?.Email))
        {
            ModelState.AddModelError("email", "O email é obrigatório.");
        }

        if (!ModelState.IsValid)
        {
            return Inertia.Render("Profile/Index", new {
                user = new
                {
                    id = user.Id,
                    name = user.FullName,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    email = user.Email,
                    emailConfirmed = user.EmailConfirmed,
                    createdAt = user.CreatedAt,
                    lastLoginAt = user.LastLoginAt
                },
                errors = ModelState.Where(x => x.Value!.Errors.Count > 0)
                    .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray())
            });
        }

        var emailChanged = user.Email != request.Email;
        var oldEmail = user.Email;

        // Atualizar dados do usuário
        user.FirstName = request.FirstName.Trim();
        user.LastName = request.LastName.Trim();
        
        if (emailChanged)
        {
            user.Email = request.Email.Trim();
            user.UserName = request.Email.Trim();
            user.EmailConfirmed = false; // Requer nova confirmação
        }

        var result = await _userManager.UpdateAsync(user);

        if (result.Succeeded)
        {
            _logger.LogInformation("User profile updated successfully for {UserId}", user.Id);

            // Se o email foi alterado, enviar confirmação
            if (emailChanged)
            {
                try
                {
                    var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationUrl = Url.Action("ConfirmEmail", "Auth", 
                        new { userId = user.Id, token = confirmationToken }, Request.Scheme);

                    await _emailService.SendEmailConfirmationAsync(
                        user.Email!, 
                        user.FirstName ?? "Usuário", 
                        confirmationUrl!
                    );

                    // Notificar no email antigo sobre a mudança (se possível)
                    if (!string.IsNullOrEmpty(oldEmail))
                    {
                        var variables = new Dictionary<string, object>
                        {
                            { "UserName", user.FirstName ?? "Usuário" },
                            { "OldEmail", oldEmail },
                            { "NewEmail", user.Email! },
                            { "DateTime", DateTime.Now.ToString("dd/MM/yyyy HH:mm") }
                        };

                        await _emailService.SendTemplatedEmailAsync(
                            "EmailChanged",
                            oldEmail,
                            "Email alterado na sua conta",
                            variables
                        );
                    }

                    return RedirectToAction("Index", new { 
                        success = "Perfil atualizado com sucesso! Um email de confirmação foi enviado para o novo endereço."
                    });
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error sending email confirmation after profile update");
                    return RedirectToAction("Index", new { 
                        success = "Perfil atualizado, mas ocorreu um erro ao enviar o email de confirmação."
                    });
                }
            }
            else
            {
                return RedirectToAction("Index", new { 
                    success = "Perfil atualizado com sucesso!"
                });
            }
        }
        else
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return Inertia.Render("Profile/Index", new {
                user = new
                {
                    id = user.Id,
                    name = user.FullName,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    email = user.Email,
                    emailConfirmed = user.EmailConfirmed,
                    createdAt = user.CreatedAt,
                    lastLoginAt = user.LastLoginAt
                },
                errors = ModelState.Where(x => x.Value!.Errors.Count > 0)
                    .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray())
            });
        }
    }

    [HttpPost]
    public async Task<IActionResult> ChangePassword([FromForm] string currentPassword, [FromForm] string newPassword, [FromForm] string confirmPassword)
    {
        var user = await _userManager.GetUserAsync(User);
        
        if (user == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        // Validação
        if (string.IsNullOrWhiteSpace(currentPassword))
        {
            ModelState.AddModelError("currentPassword", "A senha atual é obrigatória.");
        }

        if (string.IsNullOrWhiteSpace(newPassword))
        {
            ModelState.AddModelError("newPassword", "A nova senha é obrigatória.");
        }

        if (string.IsNullOrWhiteSpace(confirmPassword))
        {
            ModelState.AddModelError("confirmPassword", "A confirmação da senha é obrigatória.");
        }

        if (newPassword != confirmPassword)
        {
            ModelState.AddModelError("confirmPassword", "As senhas não coincidem.");
        }

        if (currentPassword == newPassword)
        {
            ModelState.AddModelError("newPassword", "A nova senha deve ser diferente da senha atual.");
        }

        if (!ModelState.IsValid)
        {
            TempData["Errors"] = ModelState.Where(x => x.Value!.Errors.Count > 0)
                .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
            return RedirectToAction("Index");
        }

        var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

        if (result.Succeeded)
        {
            _logger.LogInformation("Password changed successfully for user {UserId}", user.Id);

            // Refazer login para manter a sessão ativa
            await _signInManager.RefreshSignInAsync(user);

            // Enviar email de confirmação de mudança de senha
            try
            {
                var variables = new Dictionary<string, object>
                {
                    { "UserName", user.FirstName ?? "Usuário" },
                    { "DateTime", DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                    { "LoginUrl", Url.Action("Login", "Auth", null, Request.Scheme) ?? "/" }
                };

                await _emailService.SendTemplatedEmailAsync(
                    "PasswordChanged",
                    user.Email!,
                    "Senha alterada com sucesso",
                    variables
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending password change confirmation email");
                // Não falhar a operação por causa do email
            }

            return RedirectToAction("Index", new { 
                success = "Senha alterada com sucesso!"
            });
        }
        else
        {
            foreach (var error in result.Errors)
            {
                if (error.Code == "PasswordMismatch")
                {
                    ModelState.AddModelError("currentPassword", "Senha atual incorreta.");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            TempData["Errors"] = ModelState.Where(x => x.Value!.Errors.Count > 0)
                .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
            return RedirectToAction("Index");
        }
    }

    [HttpPost]
    public async Task<IActionResult> ResendEmailConfirmation()
    {
        var user = await _userManager.GetUserAsync(User);
        
        if (user == null)
        {
            return NotFound();
        }

        if (await _userManager.IsEmailConfirmedAsync(user))
        {
            return Json(new { success = false, message = "Seu email já foi confirmado." });
        }

        try
        {
            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationUrl = Url.Action("ConfirmEmail", "Auth", 
                new { userId = user.Id, token = confirmationToken }, Request.Scheme);

            var emailResult = await _emailService.SendEmailConfirmationAsync(
                user.Email!, 
                user.FirstName ?? "Usuário", 
                confirmationUrl!
            );

            if (emailResult.IsSuccess)
            {
                _logger.LogInformation("Email confirmation resent for user {UserId}", user.Id);
                return Json(new { success = true, message = "Email de confirmação enviado novamente." });
            }
            else
            {
                _logger.LogError("Failed to resend email confirmation: {Error}", emailResult.ErrorMessage);
                return Json(new { success = false, message = "Erro ao enviar email. Tente novamente." });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resending email confirmation for user {UserId}", user.Id);
            return Json(new { success = false, message = "Erro ao enviar email. Tente novamente." });
        }
    }

    [HttpPost]
    public async Task<IActionResult> DeleteAccount(string password)
    {
        var user = await _userManager.GetUserAsync(User);
        
        if (user == null)
        {
            return RedirectToAction("Login", "Auth");
        }

        // Verificar senha atual para confirmar a operação
        if (string.IsNullOrWhiteSpace(password))
        {
            return Json(new { success = false, message = "Senha é obrigatória para excluir a conta." });
        }

        var passwordCheck = await _userManager.CheckPasswordAsync(user, password);
        if (!passwordCheck)
        {
            return Json(new { success = false, message = "Senha incorreta." });
        }

        try
        {
            // Enviar email de confirmação antes de excluir
            var variables = new Dictionary<string, object>
            {
                { "UserName", user.FirstName ?? "Usuário" },
                { "DateTime", DateTime.Now.ToString("dd/MM/yyyy HH:mm") }
            };

            await _emailService.SendTemplatedEmailAsync(
                "AccountDeleted",
                user.Email!,
                "Conta excluída",
                variables
            );

            // Excluir usuário
            var result = await _userManager.DeleteAsync(user);
            
            if (result.Succeeded)
            {
                _logger.LogInformation("User account deleted: {UserId}", user.Id);
                await _signInManager.SignOutAsync();
                
                return Json(new { 
                    success = true, 
                    message = "Conta excluída com sucesso.",
                    redirect = Url.Action("Index", "Home")
                });
            }
            else
            {
                _logger.LogError("Failed to delete user account: {Errors}", 
                    string.Join(", ", result.Errors.Select(e => e.Description)));
                return Json(new { success = false, message = "Erro ao excluir conta. Tente novamente." });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting user account: {UserId}", user.Id);
            return Json(new { success = false, message = "Erro ao excluir conta. Tente novamente." });
        }
    }
}