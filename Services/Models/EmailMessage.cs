namespace AspNetMvcReact.Services.Models
{
    public class EmailMessage
    {
        public string To { get; set; } = string.Empty;
        public List<string> ToList { get; set; } = new();
        public string? Cc { get; set; }
        public List<string>? CcList { get; set; }
        public string? Bcc { get; set; }
        public List<string>? BccList { get; set; }
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public string? PlainTextBody { get; set; }
        public bool IsHtml { get; set; } = true;
        public List<EmailAttachment>? Attachments { get; set; }
        public Dictionary<string, string>? Headers { get; set; }
        public int Priority { get; set; } = 1; // 1 = Normal, 2 = High, 0 = Low
    }

    public class EmailAttachment
    {
        public string FileName { get; set; } = string.Empty;
        public byte[] Content { get; set; } = Array.Empty<byte>();
        public string ContentType { get; set; } = "application/octet-stream";
        public string? ContentId { get; set; } // Para imagens embutidas
    }
}