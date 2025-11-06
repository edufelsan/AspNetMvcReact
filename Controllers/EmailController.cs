using AspNetMvcReact.Services.Interfaces;
using AspNetMvcReact.Services.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AspNetMvcReact.Controllers
{
    [Authorize]
    public class EmailController : Controller
    {
        private readonly IEmailService _emailService;
        private readonly ILogger<EmailController> _logger;

        public EmailController(IEmailService emailService, ILogger<EmailController> logger)
        {
            _emailService = emailService;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Envia email de teste usando template
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> SendTestEmail(string email, string templateName = "Welcome")
        {
            try
            {
                var variables = new Dictionary<string, object>
                {
                    { "UserName", User.Identity?.Name ?? "Usuário Teste" }
                };

                // Se for template de confirmação, adicionar URL
                if (templateName.Equals("EmailConfirmation", StringComparison.OrdinalIgnoreCase))
                {
                    var confirmationUrl = Url.Action("ConfirmEmail", "Auth", new { userId = "test", token = "test-token" }, Request.Scheme);
                    variables.Add("ConfirmationUrl", confirmationUrl ?? "#");
                }
                // Se for template de reset de senha
                else if (templateName.Equals("PasswordReset", StringComparison.OrdinalIgnoreCase))
                {
                    var resetUrl = Url.Action("ResetPassword", "Auth", new { token = "test-token" }, Request.Scheme);
                    variables.Add("ResetUrl", resetUrl ?? "#");
                }
                // Se for template de boas-vindas
                else if (templateName.Equals("Welcome", StringComparison.OrdinalIgnoreCase))
                {
                    var confirmationUrl = Url.Action("ConfirmEmail", "Auth", new { userId = "test", token = "test-token" }, Request.Scheme);
                    variables.Add("ConfirmationUrl", confirmationUrl ?? "#");
                }

                var result = await _emailService.SendTemplatedEmailAsync(templateName, email, $"Teste - {templateName}", variables);

                if (result.IsSuccess)
                {
                    TempData["Success"] = $"Email enviado com sucesso! MessageId: {result.MessageId}";
                }
                else
                {
                    TempData["Error"] = $"Erro ao enviar email: {result.ErrorMessage}";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar email de teste");
                TempData["Error"] = $"Erro inesperado: {ex.Message}";
            }

            return RedirectToAction("Index");
        }

        /// <summary>
        /// Envia email simples sem template
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> SendSimpleEmail(string email, string subject, string message)
        {
            try
            {
                var emailMessage = new EmailMessage
                {
                    To = email,
                    Subject = subject,
                    Body = $"<h1>Mensagem Simples</h1><p>{message}</p>",
                    IsHtml = true
                };

                var result = await _emailService.SendEmailAsync(emailMessage);

                if (result.IsSuccess)
                {
                    TempData["Success"] = $"Email simples enviado com sucesso! MessageId: {result.MessageId}";
                }
                else
                {
                    TempData["Error"] = $"Erro ao enviar email: {result.ErrorMessage}";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar email simples");
                TempData["Error"] = $"Erro inesperado: {ex.Message}";
            }

            return RedirectToAction("Index");
        }

        /// <summary>
        /// Envia email de boas-vindas usando método de conveniência
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> SendWelcomeEmail(string email, string userName)
        {
            try
            {
                var confirmationUrl = Url.Action("ConfirmEmail", "Auth", new { userId = "test", token = "test-token" }, Request.Scheme);
                var result = await _emailService.SendWelcomeEmailAsync(email, userName, confirmationUrl);

                if (result.IsSuccess)
                {
                    TempData["Success"] = $"Email de boas-vindas enviado com sucesso! MessageId: {result.MessageId}";
                }
                else
                {
                    TempData["Error"] = $"Erro ao enviar email de boas-vindas: {result.ErrorMessage}";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar email de boas-vindas");
                TempData["Error"] = $"Erro inesperado: {ex.Message}";
            }

            return RedirectToAction("Index");
        }

        /// <summary>
        /// Envia email de redefinição de senha usando método de conveniência
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> SendPasswordResetEmail(string email, string userName)
        {
            try
            {
                var resetUrl = Url.Action("ResetPassword", "Auth", new { token = "test-reset-token" }, Request.Scheme);
                var result = await _emailService.SendPasswordResetEmailAsync(email, userName, resetUrl ?? "#");

                if (result.IsSuccess)
                {
                    TempData["Success"] = $"Email de redefinição de senha enviado com sucesso! MessageId: {result.MessageId}";
                }
                else
                {
                    TempData["Error"] = $"Erro ao enviar email de redefinição: {result.ErrorMessage}";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar email de redefinição de senha");
                TempData["Error"] = $"Erro inesperado: {ex.Message}";
            }

            return RedirectToAction("Index");
        }

        /// <summary>
        /// Testa a conexão com o servidor de email
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> TestConnection()
        {
            try
            {
                var isConnected = await _emailService.TestConnectionAsync();

                if (isConnected)
                {
                    TempData["Success"] = "Conexão com servidor de email testada com sucesso!";
                }
                else
                {
                    TempData["Error"] = "Falha ao conectar com o servidor de email. Verifique as configurações.";
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao testar conexão");
                TempData["Error"] = $"Erro ao testar conexão: {ex.Message}";
            }

            return RedirectToAction("Index");
        }

        /// <summary>
        /// Lista templates disponíveis
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAvailableTemplates()
        {
            try
            {
                var templates = await _emailService.GetAvailableTemplatesAsync();
                return Json(templates);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter templates");
                return Json(new { error = ex.Message });
            }
        }

        /// <summary>
        /// Renderiza um template sem enviar
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> PreviewTemplate(string templateName)
        {
            try
            {
                var variables = new Dictionary<string, object>
                {
                    { "UserName", "João da Silva" },
                    { "ConfirmationUrl", "https://exemplo.com/confirmar" },
                    { "ResetUrl", "https://exemplo.com/resetar" }
                };

                var result = await _emailService.RenderTemplateAsync(templateName, variables);

                if (result.IsSuccess)
                {
                    return Json(new
                    {
                        success = true,
                        subject = result.Subject,
                        htmlBody = result.HtmlBody,
                        plainTextBody = result.PlainTextBody
                    });
                }
                else
                {
                    return Json(new { success = false, error = result.ErrorMessage });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao renderizar template");
                return Json(new { success = false, error = ex.Message });
            }
        }
    }
}