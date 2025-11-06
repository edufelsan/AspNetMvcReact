namespace AspNetMvcReact.Services.Models
{
    public class EmailConfiguration
    {
        public string SmtpServer { get; set; } = string.Empty;
        public int SmtpPort { get; set; } = 587;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public bool EnableSsl { get; set; } = true;
        public string FromEmail { get; set; } = string.Empty;
        public string FromName { get; set; } = string.Empty;
        public string ReplyToEmail { get; set; } = string.Empty;
        public string ReplyToName { get; set; } = string.Empty;
        public int TimeoutInSeconds { get; set; } = 30;
        public int MaxRetryAttempts { get; set; } = 3;
        public bool EnableLogging { get; set; } = true;
    }

    public class EmailResult
    {
        public bool IsSuccess { get; set; }
        public string? ErrorMessage { get; set; }
        public string? MessageId { get; set; }
        public DateTime SentAt { get; set; }
        public int AttemptsCount { get; set; } = 1;
        public List<string>? Errors { get; set; }
    }

    public enum EmailProvider
    {
        Smtp,
        SendGrid,
        Mailgun,
        AmazonSES
    }
}