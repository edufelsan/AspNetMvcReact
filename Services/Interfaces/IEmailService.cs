using AspNetMvcReact.Services.Models;

namespace AspNetMvcReact.Services.Interfaces
{
    public interface IEmailService
    {
        /// <summary>
        /// Envia um email simples
        /// </summary>
        Task<EmailResult> SendEmailAsync(EmailMessage emailMessage);

        /// <summary>
        /// Envia um email usando um template
        /// </summary>
        Task<EmailResult> SendTemplatedEmailAsync(string templateName, string to, string subject, Dictionary<string, object> variables);

        /// <summary>
        /// Envia um email usando um template com múltiplos destinatários
        /// </summary>
        Task<EmailResult> SendTemplatedEmailAsync(string templateName, List<string> toList, string subject, Dictionary<string, object> variables);

        /// <summary>
        /// Envia emails em massa (bulk)
        /// </summary>
        Task<List<EmailResult>> SendBulkEmailAsync(List<EmailMessage> emailMessages);

        /// <summary>
        /// Renderiza um template sem enviar
        /// </summary>
        Task<EmailTemplateResult> RenderTemplateAsync(string templateName, Dictionary<string, object> variables);

        /// <summary>
        /// Valida se um template existe e pode ser renderizado
        /// </summary>
        Task<bool> ValidateEmailTemplateAsync(string templateName);

        /// <summary>
        /// Obtém lista de templates disponíveis
        /// </summary>
        Task<List<string>> GetAvailableTemplatesAsync();

        /// <summary>
        /// Testa a conexão com o servidor de email
        /// </summary>
        Task<bool> TestConnectionAsync();

        /// <summary>
        /// Envia email de boas-vindas
        /// </summary>
        Task<EmailResult> SendWelcomeEmailAsync(string to, string userName, string? confirmationUrl = null);

        /// <summary>
        /// Envia email de redefinição de senha
        /// </summary>
        Task<EmailResult> SendPasswordResetEmailAsync(string to, string userName, string resetUrl);

        /// <summary>
        /// Envia email de confirmação de conta
        /// </summary>
        Task<EmailResult> SendEmailConfirmationAsync(string to, string userName, string confirmationUrl);
    }
}