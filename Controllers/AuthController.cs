using AspNetMvcReact.Models;
using AspNetMvcReact.Services.Interfaces;
using InertiaCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace AspNetMvcReact.Controllers;

public class AuthController : Controller
{
    private readonly ILogger<AuthController> _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IEmailService _emailService;

    public AuthController(
        ILogger<AuthController> logger,
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
    [AllowAnonymous]
    public IActionResult Login(string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return Inertia.Render("Auth/Login", new { 
            canResetPassword = true,
            status = "",
            returnUrl = returnUrl
        });
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult Register(string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return Inertia.Render("Auth/Register", new {
            returnUrl = returnUrl
        });
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Login(string email, string password, string remember = "false")
    {
        // Converter string remember para boolean
        bool rememberMe = remember.Equals("true", StringComparison.OrdinalIgnoreCase) 
            || remember == "on" 
            || remember == "1" 
            || remember.Equals("yes", StringComparison.OrdinalIgnoreCase);
        
        // Log para debug
        _logger.LogInformation($"Login attempt - Email: '{email}', Password: '{(string.IsNullOrEmpty(password) ? "empty" : "filled")}', Remember: '{remember}' -> {rememberMe}");

        // Validação manual
        if (string.IsNullOrWhiteSpace(email))
        {
            ModelState.AddModelError("email", "O email é obrigatório.");
        }

        if (string.IsNullOrWhiteSpace(password))
        {
            ModelState.AddModelError("password", "A senha é obrigatória.");
        }

        if (ModelState.IsValid)
        {
            var result = await _signInManager.PasswordSignInAsync(email, password, rememberMe, lockoutOnFailure: false);
            
            if (result.Succeeded)
            {
                _logger.LogInformation("User logged in.");
                
                // Update last login time
                var user = await _userManager.FindByEmailAsync(email);
                if (user != null)
                {
                    user.LastLoginAt = DateTime.UtcNow;
                    await _userManager.UpdateAsync(user);
                }
                
                return RedirectToLocal(null);
            }
            
            if (result.RequiresTwoFactor)
            {
                return RedirectToAction(nameof(LoginWith2fa), new { returnUrl = (string?)null, remember = rememberMe });
            }
            
            if (result.IsLockedOut)
            {
                _logger.LogWarning("User account locked out.");
                ModelState.AddModelError(string.Empty, "Conta bloqueada temporariamente. Tente novamente mais tarde.");
            }
            else
            {
                ModelState.AddModelError(string.Empty, "Email ou senha incorretos.");
            }
        }

        return Inertia.Render("Auth/Login", new { 
            canResetPassword = true,
            status = "",
            returnUrl = (string?)null,
            errors = ModelState.Where(x => x.Value!.Errors.Count > 0)
                .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray())
        });
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Register(string name, string email, string password, string password_confirmation, string terms = "false")
    {
        // Converter string terms para boolean
        bool termsAccepted = terms.Equals("true", StringComparison.OrdinalIgnoreCase) 
            || terms == "on" 
            || terms == "1" 
            || terms.Equals("yes", StringComparison.OrdinalIgnoreCase);
        
        // Log para debug
        _logger.LogInformation($"Received data - Name: '{name}', Email: '{email}', Password: '{(string.IsNullOrEmpty(password) ? "empty" : "filled")}', Terms: '{terms}' -> {termsAccepted}");
        
        // Validação manual
        if (string.IsNullOrWhiteSpace(name))
        {
            ModelState.AddModelError("name", "O nome é obrigatório.");
        }

        if (string.IsNullOrWhiteSpace(email))
        {
            ModelState.AddModelError("email", "O email é obrigatório.");
        }

        if (string.IsNullOrWhiteSpace(password))
        {
            ModelState.AddModelError("password", "A senha é obrigatória.");
        }

        if (string.IsNullOrWhiteSpace(password_confirmation))
        {
            ModelState.AddModelError("password_confirmation", "A confirmação de senha é obrigatória.");
        }

        if (password != password_confirmation)
        {
            ModelState.AddModelError("password_confirmation", "As senhas não coincidem.");
        }

        if (!termsAccepted)
        {
            ModelState.AddModelError("terms", "Você deve aceitar os termos de uso.");
        }

        if (ModelState.IsValid)
        {
            var nameParts = name.Trim().Split(' ', 2);
            var firstName = nameParts[0];
            var lastName = nameParts.Length > 1 ? nameParts[1] : "";

            var user = new ApplicationUser 
            { 
                UserName = email, 
                Email = email,
                FirstName = firstName,
                LastName = lastName
            };

            var result = await _userManager.CreateAsync(user, password);
            
            if (result.Succeeded)
            {
                _logger.LogInformation("User created a new account with password.");

                // Enviar email de boas-vindas
                try
                {
                    var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var confirmationUrl = Url.Action("ConfirmEmail", "Auth", 
                        new { userId = user.Id, token = confirmationToken }, Request.Scheme);

                    var emailResult = await _emailService.SendWelcomeEmailAsync(
                        user.Email!, 
                        user.FirstName, 
                        confirmationUrl
                    );

                    if (emailResult.IsSuccess)
                    {
                        _logger.LogInformation("Welcome email sent successfully to {Email}", user.Email);
                    }
                    else
                    {
                        _logger.LogError("Failed to send welcome email to {Email}: {Error}", 
                            user.Email, emailResult.ErrorMessage);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error sending welcome email to {Email}", user.Email);
                    // Não falhar o registro por causa do email
                }

                await _signInManager.SignInAsync(user, isPersistent: false);
                return RedirectToLocal(null);
            }
            
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        return Inertia.Render("Auth/Register", new {
            returnUrl = (string?)null,
            errors = ModelState.Where(x => x.Value!.Errors.Count > 0)
                .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray())
        });
    }

    [HttpPost]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        _logger.LogInformation("User logged out.");
        return RedirectToAction("Index", "Home");
    }

    private IActionResult RedirectToLocal(string? returnUrl)
    {
        if (Url.IsLocalUrl(returnUrl))
        {
            return Redirect(returnUrl);
        }
        else
        {
            return RedirectToAction("Index", "Dashboard");
        }
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult ForgotPassword()
    {
        return Inertia.Render("Auth/ForgotPassword");
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword(string email)
    {
        // Log para debug
        _logger.LogInformation($"Password reset requested for email: '{email}'");

        // Validação
        if (string.IsNullOrWhiteSpace(email))
        {
            ModelState.AddModelError("email", "O email é obrigatório.");
            return Inertia.Render("Auth/ForgotPassword", new {
                errors = ModelState.Where(x => x.Value!.Errors.Count > 0)
                    .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray())
            });
        }

        var user = await _userManager.FindByEmailAsync(email);
        
        // Por segurança, sempre retornamos sucesso mesmo se o email não existir
        // Isso evita que atacantes descubram quais emails estão registrados
        
        if (user != null)
        {
            try
            {
                // Gerar token de reset de senha
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                
                // Criar URL de reset
                var resetUrl = Url.Action("ResetPassword", "Auth", 
                    new { token = token, email = user.Email }, Request.Scheme);
                
                // Enviar email usando o serviço de email
                var emailResult = await _emailService.SendPasswordResetEmailAsync(
                    user.Email!, 
                    user.FirstName ?? "Usuário", 
                    resetUrl!
                );
                
                if (emailResult.IsSuccess)
                {
                    _logger.LogInformation("Password reset email sent successfully to {Email}", user.Email);
                }
                else
                {
                    _logger.LogError("Failed to send password reset email to {Email}: {Error}", 
                        user.Email, emailResult.ErrorMessage);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending password reset email to {Email}", user.Email);
            }
        }
        else
        {
            _logger.LogInformation("Password reset requested for non-existent email: {Email}", email);
        }

        return Inertia.Render("Auth/ForgotPassword", new {
            status = "Se o email estiver registrado, você receberá instruções para redefinir sua senha."
        });
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> LoginWith2fa(bool rememberMe, string? returnUrl = null)
    {
        // Ensure the user has gone through the username & password screen first
        var user = await _signInManager.GetTwoFactorAuthenticationUserAsync();

        if (user == null)
        {
            throw new InvalidOperationException($"Unable to load two-factor authentication user.");
        }

        ViewData["ReturnUrl"] = returnUrl;

        return Inertia.Render("Auth/LoginWith2fa", new {
            rememberMe = rememberMe,
            returnUrl = returnUrl
        });
    }

    [HttpGet]
    [AllowAnonymous]
    public IActionResult ResetPassword(string? token = null, string? email = null)
    {
        if (string.IsNullOrEmpty(token) || string.IsNullOrEmpty(email))
        {
            _logger.LogWarning("Reset password accessed with missing token or email");
            return Inertia.Render("Auth/ResetPassword", new {
                token = (string?)null,
                email = (string?)null,
                errors = new Dictionary<string, string[]> 
                {
                    [""] = new[] { "Link de redefinição de senha inválido ou expirado." }
                }
            });
        }

        return Inertia.Render("Auth/ResetPassword", new {
            token = token,
            email = email
        });
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> ResetPassword(string email, string token, string password, string password_confirmation)
    {
        // Log para debug
        _logger.LogInformation($"Password reset attempt for email: '{email}'");

        // Validação manual
        if (string.IsNullOrWhiteSpace(email))
        {
            ModelState.AddModelError("email", "O email é obrigatório.");
        }

        if (string.IsNullOrWhiteSpace(token))
        {
            ModelState.AddModelError("token", "Token de redefinição é obrigatório.");
        }

        if (string.IsNullOrWhiteSpace(password))
        {
            ModelState.AddModelError("password", "A nova senha é obrigatória.");
        }

        if (string.IsNullOrWhiteSpace(password_confirmation))
        {
            ModelState.AddModelError("password_confirmation", "A confirmação de senha é obrigatória.");
        }

        if (password != password_confirmation)
        {
            ModelState.AddModelError("password_confirmation", "As senhas não coincidem.");
        }

        if (!ModelState.IsValid)
        {
            return Inertia.Render("Auth/ResetPassword", new {
                token = token,
                email = email,
                errors = ModelState.Where(x => x.Value!.Errors.Count > 0)
                    .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray())
            });
        }

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            _logger.LogWarning("Password reset attempted for non-existent user: {Email}", email);
            // Por segurança, não revelar que o usuário não existe
            ModelState.AddModelError(string.Empty, "Link de redefinição de senha inválido ou expirado.");
            return Inertia.Render("Auth/ResetPassword", new {
                token = token,
                email = email,
                errors = ModelState.Where(x => x.Value!.Errors.Count > 0)
                    .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray())
            });
        }

        var result = await _userManager.ResetPasswordAsync(user, token, password);
        
        if (result.Succeeded)
        {
            _logger.LogInformation("Password reset successful for user: {Email}", user.Email);
            
            // Opcional: Enviar email de confirmação de que a senha foi alterada
            try
            {
                var variables = new Dictionary<string, object>
                {
                    { "UserName", user.FirstName ?? "Usuário" },
                    { "DateTime", DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
                    { "LoginUrl", Url.Action("Login", "Auth", null, Request.Scheme) ?? "/" }
                };

                await _emailService.SendTemplatedEmailAsync(
                    "PasswordChanged", // Você precisaria criar este template
                    user.Email!,
                    "Senha alterada com sucesso",
                    variables
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending password change confirmation email to {Email}", user.Email);
            }

            return Inertia.Render("Auth/ResetPasswordConfirmation", new {
                email = user.Email
            });
        }

        foreach (var error in result.Errors)
        {
            if (error.Code == "InvalidToken")
            {
                ModelState.AddModelError(string.Empty, "Link de redefinição de senha inválido ou expirado.");
            }
            else
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        return Inertia.Render("Auth/ResetPassword", new {
            token = token,
            email = email,
            errors = ModelState.Where(x => x.Value!.Errors.Count > 0)
                .ToDictionary(x => x.Key, x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray())
        });
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> ConfirmEmail(string userId, string token)
    {
        if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
        {
            _logger.LogWarning("Email confirmation accessed with missing userId or token");
            return Inertia.Render("Auth/EmailConfirmationResult", new {
                success = false,
                message = "Link de confirmação inválido."
            });
        }

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            _logger.LogWarning("Email confirmation attempted for non-existent user: {UserId}", userId);
            return Inertia.Render("Auth/EmailConfirmationResult", new {
                success = false,
                message = "Usuário não encontrado."
            });
        }

        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (result.Succeeded)
        {
            _logger.LogInformation("Email confirmed successfully for user: {Email}", user.Email);
            
            // Opcional: Enviar email de confirmação bem-sucedida
            try
            {
                var variables = new Dictionary<string, object>
                {
                    { "UserName", user.FirstName ?? "Usuário" },
                    { "LoginUrl", Url.Action("Login", "Auth", null, Request.Scheme) ?? "/" }
                };

                await _emailService.SendTemplatedEmailAsync(
                    "EmailConfirmed", // Você precisaria criar este template
                    user.Email!,
                    "Email confirmado com sucesso!",
                    variables
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending email confirmation success notification to {Email}", user.Email);
            }

            return Inertia.Render("Auth/EmailConfirmationResult", new {
                success = true,
                message = "Email confirmado com sucesso! Você já pode fazer login.",
                email = user.Email
            });
        }
        else
        {
            _logger.LogWarning("Email confirmation failed for user: {Email}", user.Email);
            return Inertia.Render("Auth/EmailConfirmationResult", new {
                success = false,
                message = "Erro ao confirmar email. O link pode ter expirado."
            });
        }
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> ResendConfirmationEmail()
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
                _logger.LogInformation("Confirmation email resent successfully to {Email}", user.Email);
                return Json(new { success = true, message = "Email de confirmação enviado novamente. Verifique sua caixa de entrada." });
            }
            else
            {
                _logger.LogError("Failed to resend confirmation email to {Email}: {Error}", 
                    user.Email, emailResult.ErrorMessage);
                return Json(new { success = false, message = "Erro ao enviar email. Tente novamente mais tarde." });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resending confirmation email to {Email}", user.Email);
            return Json(new { success = false, message = "Erro ao enviar email. Tente novamente mais tarde." });
        }
    }
}