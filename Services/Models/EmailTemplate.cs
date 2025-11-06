namespace AspNetMvcReact.Services.Models
{
    public class EmailTemplate
    {
        public string Name { get; set; } = string.Empty;
        public string HtmlTemplatePath { get; set; } = string.Empty;
        public string? PlainTextTemplatePath { get; set; }
        public string Subject { get; set; } = string.Empty;
        public Dictionary<string, object> Variables { get; set; } = new();
        public string? Layout { get; set; } // Layout base para usar
    }

    public class EmailTemplateResult
    {
        public string Subject { get; set; } = string.Empty;
        public string HtmlBody { get; set; } = string.Empty;
        public string? PlainTextBody { get; set; }
        public bool IsSuccess { get; set; }
        public string? ErrorMessage { get; set; }
    }
}