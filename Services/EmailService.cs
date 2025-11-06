using AspNetMvcReact.Services.Interfaces;
using AspNetMvcReact.Services.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Text;
using System.Text.RegularExpressions;

namespace AspNetMvcReact.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfig;
        private readonly ILogger<EmailService> _logger;
        private readonly IWebHostEnvironment _environment;
        private readonly string _templateBasePath;

        public EmailService(
            IOptions<EmailConfiguration> emailConfig,
            ILogger<EmailService> logger,
            IWebHostEnvironment environment)
        {
            _emailConfig = emailConfig.Value;
            _logger = logger;
            _environment = environment;
            _templateBasePath = Path.Combine(_environment.ContentRootPath, "Templates", "Email");
        }

        public async Task<EmailResult> SendEmailAsync(EmailMessage emailMessage)
        {
            var result = new EmailResult();
            var attempts = 0;

            while (attempts < _emailConfig.MaxRetryAttempts)
            {
                attempts++;
                try
                {
                    using var client = new SmtpClient();
                    
                    // Configurar timeout
                    client.Timeout = _emailConfig.TimeoutInSeconds * 1000;

                    // Conectar ao servidor SMTP
                    await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.SmtpPort, 
                        _emailConfig.EnableSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.None);

                    // Autenticar
                    if (!string.IsNullOrEmpty(_emailConfig.Username))
                    {
                        await client.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
                    }

                    // Criar mensagem MIME
                    var mimeMessage = CreateMimeMessage(emailMessage);
                    
                    // Enviar
                    var response = await client.SendAsync(mimeMessage);
                    
                    // Desconectar
                    await client.DisconnectAsync(true);

                    result.IsSuccess = true;
                    result.MessageId = mimeMessage.MessageId;
                    result.SentAt = DateTime.UtcNow;
                    result.AttemptsCount = attempts;

                    if (_emailConfig.EnableLogging)
                    {
                        _logger.LogInformation("Email enviado com sucesso para {To} - MessageId: {MessageId}", 
                            emailMessage.To, result.MessageId);
                    }

                    break;
                }
                catch (Exception ex)
                {
                    result.ErrorMessage = ex.Message;
                    result.Errors ??= new List<string>();
                    result.Errors.Add($"Tentativa {attempts}: {ex.Message}");
                    result.AttemptsCount = attempts;

                    if (_emailConfig.EnableLogging)
                    {
                        _logger.LogError(ex, "Erro ao enviar email (tentativa {Attempt}/{MaxAttempts}): {Error}", 
                            attempts, _emailConfig.MaxRetryAttempts, ex.Message);
                    }

                    if (attempts >= _emailConfig.MaxRetryAttempts)
                    {
                        result.IsSuccess = false;
                        break;
                    }

                    // Aguardar antes da próxima tentativa
                    await Task.Delay(1000 * attempts);
                }
            }

            return result;
        }

        public async Task<EmailResult> SendTemplatedEmailAsync(string templateName, string to, string subject, Dictionary<string, object> variables)
        {
            return await SendTemplatedEmailAsync(templateName, new List<string> { to }, subject, variables);
        }

        public async Task<EmailResult> SendTemplatedEmailAsync(string templateName, List<string> toList, string subject, Dictionary<string, object> variables)
        {
            try
            {
                var templateResult = await RenderTemplateAsync(templateName, variables);
                
                if (!templateResult.IsSuccess)
                {
                    return new EmailResult
                    {
                        IsSuccess = false,
                        ErrorMessage = $"Erro ao renderizar template: {templateResult.ErrorMessage}"
                    };
                }

                var emailMessage = new EmailMessage
                {
                    ToList = toList,
                    Subject = !string.IsNullOrEmpty(subject) ? subject : templateResult.Subject,
                    Body = templateResult.HtmlBody,
                    PlainTextBody = templateResult.PlainTextBody,
                    IsHtml = true
                };

                return await SendEmailAsync(emailMessage);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao enviar email com template {TemplateName}", templateName);
                return new EmailResult
                {
                    IsSuccess = false,
                    ErrorMessage = ex.Message
                };
            }
        }

        public async Task<List<EmailResult>> SendBulkEmailAsync(List<EmailMessage> emailMessages)
        {
            var results = new List<EmailResult>();
            var tasks = emailMessages.Select(SendEmailAsync);
            
            var completedResults = await Task.WhenAll(tasks);
            results.AddRange(completedResults);

            return results;
        }

        public async Task<EmailTemplateResult> RenderTemplateAsync(string templateName, Dictionary<string, object> variables)
        {
            var result = new EmailTemplateResult();

            try
            {
                var templatePath = Path.Combine(_templateBasePath, templateName);
                var htmlTemplatePath = Path.Combine(templatePath, $"{templateName.ToLower()}.html");
                var textTemplatePath = Path.Combine(templatePath, $"{templateName.ToLower()}.txt");

                if (!File.Exists(htmlTemplatePath))
                {
                    result.ErrorMessage = $"Template HTML não encontrado: {htmlTemplatePath}";
                    return result;
                }

                // Renderizar HTML
                var htmlTemplate = await File.ReadAllTextAsync(htmlTemplatePath);
                result.HtmlBody = await RenderTemplate(htmlTemplate, variables);

                // Renderizar texto plano se existir
                if (File.Exists(textTemplatePath))
                {
                    var textTemplate = await File.ReadAllTextAsync(textTemplatePath);
                    result.PlainTextBody = await RenderTemplate(textTemplate, variables);
                }

                // Extrair subject do template HTML se não fornecido
                if (string.IsNullOrEmpty(result.Subject))
                {
                    var subjectMatch = Regex.Match(result.HtmlBody, @"<title>(.*?)</title>", RegexOptions.IgnoreCase);
                    if (subjectMatch.Success)
                    {
                        result.Subject = subjectMatch.Groups[1].Value.Trim();
                    }
                }

                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.ErrorMessage = ex.Message;
                _logger.LogError(ex, "Erro ao renderizar template {TemplateName}", templateName);
            }

            return result;
        }

        public Task<bool> ValidateEmailTemplateAsync(string templateName)
        {
            try
            {
                var templatePath = Path.Combine(_templateBasePath, templateName);
                var htmlTemplatePath = Path.Combine(templatePath, $"{templateName.ToLower()}.html");
                
                return Task.FromResult(File.Exists(htmlTemplatePath));
            }
            catch
            {
                return Task.FromResult(false);
            }
        }

        public Task<List<string>> GetAvailableTemplatesAsync()
        {
            try
            {
                if (!Directory.Exists(_templateBasePath))
                    return Task.FromResult(new List<string>());

                var templateDirs = Directory.GetDirectories(_templateBasePath)
                    .Where(dir => !Path.GetFileName(dir).Equals("Shared", StringComparison.OrdinalIgnoreCase))
                    .Select(Path.GetFileName)
                    .Where(name => !string.IsNullOrEmpty(name))
                    .Cast<string>()
                    .ToList();

                return Task.FromResult(templateDirs);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao obter templates disponíveis");
                return Task.FromResult(new List<string>());
            }
        }

        public async Task<bool> TestConnectionAsync()
        {
            try
            {
                using var client = new SmtpClient();
                await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.SmtpPort, 
                    _emailConfig.EnableSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.None);
                
                if (!string.IsNullOrEmpty(_emailConfig.Username))
                {
                    await client.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
                }
                
                await client.DisconnectAsync(true);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao testar conexão SMTP");
                return false;
            }
        }

        // Métodos de conveniência para templates específicos
        public async Task<EmailResult> SendWelcomeEmailAsync(string to, string userName, string? confirmationUrl = null)
        {
            var variables = new Dictionary<string, object>
            {
                { "UserName", userName },
                { "ConfirmationUrl", confirmationUrl ?? "#" }
            };

            return await SendTemplatedEmailAsync("Welcome", to, "Bem-vindo!", variables);
        }

        public async Task<EmailResult> SendPasswordResetEmailAsync(string to, string userName, string resetUrl)
        {
            var variables = new Dictionary<string, object>
            {
                { "UserName", userName },
                { "ResetUrl", resetUrl }
            };

            return await SendTemplatedEmailAsync("PasswordReset", to, "Redefinição de Senha", variables);
        }

        public async Task<EmailResult> SendEmailConfirmationAsync(string to, string userName, string confirmationUrl)
        {
            var variables = new Dictionary<string, object>
            {
                { "UserName", userName },
                { "ConfirmationUrl", confirmationUrl }
            };

            return await SendTemplatedEmailAsync("EmailConfirmation", to, "Confirme seu Email", variables);
        }

        #region Private Methods

        private MimeMessage CreateMimeMessage(EmailMessage emailMessage)
        {
            var message = new MimeMessage();

            // From
            message.From.Add(new MailboxAddress(_emailConfig.FromName, _emailConfig.FromEmail));

            // To
            if (!string.IsNullOrEmpty(emailMessage.To))
            {
                message.To.Add(MailboxAddress.Parse(emailMessage.To));
            }

            foreach (var to in emailMessage.ToList)
            {
                if (!string.IsNullOrEmpty(to))
                {
                    message.To.Add(MailboxAddress.Parse(to));
                }
            }

            // CC
            if (!string.IsNullOrEmpty(emailMessage.Cc))
            {
                message.Cc.Add(MailboxAddress.Parse(emailMessage.Cc));
            }

            if (emailMessage.CcList != null)
            {
                foreach (var cc in emailMessage.CcList)
                {
                    if (!string.IsNullOrEmpty(cc))
                    {
                        message.Cc.Add(MailboxAddress.Parse(cc));
                    }
                }
            }

            // BCC
            if (!string.IsNullOrEmpty(emailMessage.Bcc))
            {
                message.Bcc.Add(MailboxAddress.Parse(emailMessage.Bcc));
            }

            if (emailMessage.BccList != null)
            {
                foreach (var bcc in emailMessage.BccList)
                {
                    if (!string.IsNullOrEmpty(bcc))
                    {
                        message.Bcc.Add(MailboxAddress.Parse(bcc));
                    }
                }
            }

            // Reply-To
            if (!string.IsNullOrEmpty(_emailConfig.ReplyToEmail))
            {
                message.ReplyTo.Add(new MailboxAddress(_emailConfig.ReplyToName, _emailConfig.ReplyToEmail));
            }

            // Subject
            message.Subject = emailMessage.Subject;

            // Priority
            message.Priority = emailMessage.Priority switch
            {
                2 => MessagePriority.Urgent,
                0 => MessagePriority.NonUrgent,
                _ => MessagePriority.Normal
            };

            // Body
            var bodyBuilder = new BodyBuilder();

            if (emailMessage.IsHtml)
            {
                bodyBuilder.HtmlBody = emailMessage.Body;
                if (!string.IsNullOrEmpty(emailMessage.PlainTextBody))
                {
                    bodyBuilder.TextBody = emailMessage.PlainTextBody;
                }
            }
            else
            {
                bodyBuilder.TextBody = emailMessage.Body;
            }

            // Attachments
            if (emailMessage.Attachments != null)
            {
                foreach (var attachment in emailMessage.Attachments)
                {
                    bodyBuilder.Attachments.Add(attachment.FileName, attachment.Content, ContentType.Parse(attachment.ContentType));
                }
            }

            message.Body = bodyBuilder.ToMessageBody();

            // Headers customizados
            if (emailMessage.Headers != null)
            {
                foreach (var header in emailMessage.Headers)
                {
                    message.Headers.Add(header.Key, header.Value);
                }
            }

            return message;
        }

        private Task<string> RenderTemplate(string template, Dictionary<string, object> variables)
        {
            var result = template;

            foreach (var variable in variables)
            {
                var placeholder = $"{{{{{variable.Key}}}}}";
                result = result.Replace(placeholder, variable.Value?.ToString() ?? string.Empty);
            }

            return Task.FromResult(result);
        }

        #endregion
    }
}