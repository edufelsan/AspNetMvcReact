// EXEMPLO: Como integrar o EmailService no workflow de autenticação
// Adicione este código aos métodos do AuthController para usar o serviço de email

// 1. REGISTRO DE USUÁRIO COM EMAIL DE BOAS-VINDAS
[HttpPost]
[AllowAnonymous]
public async Task<IActionResult> Register(RegisterRequest request)
{
    if (!ModelState.IsValid)
    {
        return Inertia.Render("Auth/Register", new { Errors = ModelState });
    }

    var user = new ApplicationUser
    {
        UserName = request.Email,
        Email = request.Email,
        FirstName = request.FirstName,
        LastName = request.LastName
    };

    var result = await _userManager.CreateAsync(user, request.Password);

    if (result.Succeeded)
    {
        // ✅ ENVIAR EMAIL DE BOAS-VINDAS
        try
        {
            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationUrl = Url.Action("ConfirmEmail", "Auth", 
                new { userId = user.Id, token = confirmationToken }, Request.Scheme);

            await _emailService.SendWelcomeEmailAsync(user.Email, user.FirstName, confirmationUrl);
            
            _logger.LogInformation("Email de boas-vindas enviado para {Email}", user.Email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao enviar email de boas-vindas para {Email}", user.Email);
            // Não falhar o registro por causa do email
        }

        await _signInManager.SignInAsync(user, isPersistent: false);
        return Inertia.Location("/Dashboard");
    }

    foreach (var error in result.Errors)
    {
        ModelState.AddModelError(string.Empty, error.Description);
    }

    return Inertia.Render("Auth/Register", new { Errors = ModelState });
}

// 2. ESQUECI MINHA SENHA
[HttpPost]
[AllowAnonymous]
public async Task<IActionResult> ForgotPassword(string email)
{
    var user = await _userManager.FindByEmailAsync(email);
    if (user == null)
    {
        // Não revelar que o usuário não existe
        TempData["Success"] = "Se o email existir, você receberá instruções para redefinir sua senha.";
        return RedirectToAction("Login");
    }

    // ✅ ENVIAR EMAIL DE REDEFINIÇÃO DE SENHA
    try
    {
        var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
        var resetUrl = Url.Action("ResetPassword", "Auth", 
            new { token = resetToken, email = user.Email }, Request.Scheme);

        await _emailService.SendPasswordResetEmailAsync(user.Email, user.FirstName, resetUrl!);
        
        _logger.LogInformation("Email de redefinição de senha enviado para {Email}", user.Email);
        TempData["Success"] = "Instruções para redefinir sua senha foram enviadas para seu email.";
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Erro ao enviar email de redefinição para {Email}", user.Email);
        TempData["Error"] = "Erro ao enviar email. Tente novamente mais tarde.";
    }

    return RedirectToAction("Login");
}

// 3. REENVIAR EMAIL DE CONFIRMAÇÃO
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
        TempData["Info"] = "Seu email já foi confirmado.";
        return RedirectToAction("Index", "Dashboard");
    }

    // ✅ REENVIAR EMAIL DE CONFIRMAÇÃO
    try
    {
        var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var confirmationUrl = Url.Action("ConfirmEmail", "Auth", 
            new { userId = user.Id, token = confirmationToken }, Request.Scheme);

        await _emailService.SendEmailConfirmationAsync(user.Email!, user.FirstName, confirmationUrl!);
        
        _logger.LogInformation("Email de confirmação reenviado para {Email}", user.Email);
        TempData["Success"] = "Email de confirmação enviado novamente. Verifique sua caixa de entrada.";
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Erro ao reenviar email de confirmação para {Email}", user.Email);
        TempData["Error"] = "Erro ao enviar email. Tente novamente mais tarde.";
    }

    return RedirectToAction("Index", "Dashboard");
}

// 4. CONFIRMAÇÃO DE EMAIL
[HttpGet]
[AllowAnonymous]
public async Task<IActionResult> ConfirmEmail(string userId, string token)
{
    if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(token))
    {
        TempData["Error"] = "Link de confirmação inválido.";
        return RedirectToAction("Login");
    }

    var user = await _userManager.FindByIdAsync(userId);
    if (user == null)
    {
        TempData["Error"] = "Usuário não encontrado.";
        return RedirectToAction("Login");
    }

    var result = await _userManager.ConfirmEmailAsync(user, token);
    if (result.Succeeded)
    {
        TempData["Success"] = "Email confirmado com sucesso! Você já pode fazer login.";
        
        // ✅ OPCIONAL: Enviar email de confirmação bem-sucedida
        try
        {
            var variables = new Dictionary<string, object>
            {
                { "UserName", user.FirstName },
                { "LoginUrl", Url.Action("Login", "Auth", null, Request.Scheme)! }
            };

            await _emailService.SendTemplatedEmailAsync(
                "EmailConfirmed", // Você precisaria criar este template
                user.Email!,
                "Email Confirmado com Sucesso!",
                variables
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro ao enviar email de confirmação bem-sucedida");
            // Não falhar a confirmação por causa do email
        }
    }
    else
    {
        TempData["Error"] = "Erro ao confirmar email. O link pode ter expirado.";
    }

    return RedirectToAction("Login");
}

// 5. ALTERAÇÃO DE EMAIL (ENVIAR CONFIRMAÇÃO PARA NOVO EMAIL)
[HttpPost]
[Authorize]
public async Task<IActionResult> ChangeEmail(string newEmail)
{
    var user = await _userManager.GetUserAsync(User);
    if (user == null)
    {
        return NotFound();
    }

    if (user.Email == newEmail)
    {
        TempData["Info"] = "Este já é seu email atual.";
        return RedirectToAction("Profile");
    }

    // ✅ ENVIAR CONFIRMAÇÃO PARA NOVO EMAIL
    try
    {
        var changeEmailToken = await _userManager.GenerateChangeEmailTokenAsync(user, newEmail);
        var confirmationUrl = Url.Action("ConfirmEmailChange", "Auth", 
            new { userId = user.Id, newEmail = newEmail, token = changeEmailToken }, Request.Scheme);

        var variables = new Dictionary<string, object>
        {
            { "UserName", user.FirstName },
            { "NewEmail", newEmail },
            { "ConfirmationUrl", confirmationUrl! }
        };

        await _emailService.SendTemplatedEmailAsync(
            "EmailChange", // Você precisaria criar este template
            newEmail,
            "Confirme seu Novo Email",
            variables
        );

        _logger.LogInformation("Email de confirmação de alteração enviado para {NewEmail}", newEmail);
        TempData["Success"] = $"Email de confirmação enviado para {newEmail}. Verifique sua caixa de entrada.";
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Erro ao enviar email de confirmação de alteração para {NewEmail}", newEmail);
        TempData["Error"] = "Erro ao enviar email de confirmação. Tente novamente mais tarde.";
    }

    return RedirectToAction("Profile");
}

// EXEMPLO DE USO EM OUTROS CONTEXTOS:

// 6. NOTIFICAÇÃO DE LOGIN SUSPEITO
private async Task NotifySuspiciousLogin(ApplicationUser user, string ipAddress, string userAgent)
{
    try
    {
        var variables = new Dictionary<string, object>
        {
            { "UserName", user.FirstName },
            { "IpAddress", ipAddress },
            { "UserAgent", userAgent },
            { "DateTime", DateTime.Now.ToString("dd/MM/yyyy HH:mm") },
            { "SecurityUrl", Url.Action("Security", "Account", null, "https")! }
        };

        await _emailService.SendTemplatedEmailAsync(
            "SuspiciousLogin", // Template para login suspeito
            user.Email!,
            "Atividade Suspeita Detectada",
            variables
        );
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Erro ao enviar notificação de login suspeito");
    }
}

// 7. NEWSLETTER OU COMUNICADOS
[HttpPost]
[Authorize(Roles = "Admin")]
public async Task<IActionResult> SendNewsletter(string subject, string templateName)
{
    try
    {
        // Buscar todos os usuários que aceitaram receber newsletters
        var users = await _userManager.Users
            .Where(u => u.AcceptsNewsletter && u.EmailConfirmed)
            .ToListAsync();

        var emailTasks = users.Select(async user =>
        {
            var variables = new Dictionary<string, object>
            {
                { "UserName", user.FirstName },
                { "UnsubscribeUrl", Url.Action("Unsubscribe", "Newsletter", 
                    new { userId = user.Id, token = "..." }, Request.Scheme)! }
            };

            return await _emailService.SendTemplatedEmailAsync(
                templateName,
                user.Email!,
                subject,
                variables
            );
        });

        var results = await Task.WhenAll(emailTasks);
        var successCount = results.Count(r => r.IsSuccess);
        var errorCount = results.Count(r => !r.IsSuccess);

        TempData["Success"] = $"Newsletter enviada! {successCount} sucessos, {errorCount} erros.";
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Erro ao enviar newsletter");
        TempData["Error"] = "Erro ao enviar newsletter.";
    }

    return RedirectToAction("Index", "Admin");
}

// DICAS DE CONFIGURAÇÃO:

// 1. User Secrets para desenvolvimento:
// dotnet user-secrets set "EmailConfiguration:Username" "your-email@gmail.com"
// dotnet user-secrets set "EmailConfiguration:Password" "your-app-password"

// 2. Configuração para produção com Azure Key Vault:
// builder.Configuration.AddAzureKeyVault(keyVaultUrl, new DefaultAzureCredential());

// 3. Configuração com variáveis de ambiente:
// export EmailConfiguration__Username="your-email@gmail.com"
// export EmailConfiguration__Password="your-app-password"