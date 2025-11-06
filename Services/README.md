# 📧 Serviço de Email - Documentação

Este documento descreve o serviço de email centralizado implementado na aplicação ASP.NET Core.

## 📁 Estrutura de Arquivos

```
Services/
├── Interfaces/
│   └── IEmailService.cs          # Interface do serviço
├── Models/
│   ├── EmailMessage.cs           # Modelo para mensagens de email
│   ├── EmailTemplate.cs          # Modelo para templates de email
│   └── EmailConfiguration.cs     # Configurações de email
└── EmailService.cs               # Implementação principal

Templates/
├── Email/
│   ├── Welcome/
│   │   ├── welcome.html          # Template HTML de boas-vindas
│   │   └── welcome.txt           # Template texto de boas-vindas
│   ├── PasswordReset/
│   │   ├── passwordreset.html    # Template HTML de reset de senha
│   │   └── passwordreset.txt     # Template texto de reset de senha
│   ├── EmailConfirmation/
│   │   ├── emailconfirmation.html # Template HTML de confirmação
│   │   └── emailconfirmation.txt  # Template texto de confirmação
│   └── Shared/
│       └── layout.html           # Layout base (futuro)
```

## ⚙️ Configuração

### 1. Configurações no appsettings.json

```json
{
  "EmailConfiguration": {
    "SmtpServer": "smtp.gmail.com",
    "SmtpPort": 587,
    "Username": "your-email@gmail.com",
    "Password": "your-app-password",
    "EnableSsl": true,
    "FromEmail": "noreply@yourcompany.com",
    "FromName": "Sua Empresa",
    "ReplyToEmail": "support@yourcompany.com",
    "ReplyToName": "Suporte",
    "TimeoutInSeconds": 30,
    "MaxRetryAttempts": 3,
    "EnableLogging": true
  }
}
```

### 2. Configurações para Desenvolvimento

No `appsettings.Development.json`, você pode usar serviços como Mailtrap:

```json
{
  "EmailConfiguration": {
    "SmtpServer": "smtp.mailtrap.io",
    "SmtpPort": 2525,
    "Username": "your-mailtrap-username",
    "Password": "your-mailtrap-password",
    "EnableSsl": true,
    "FromEmail": "dev@yourcompany.com",
    "FromName": "Desenvolvimento - Sua Empresa"
  }
}
```

### 3. Registro no Program.cs

O serviço já está registrado no container de DI:

```csharp
// Configure Email Service
builder.Services.Configure<EmailConfiguration>(
    builder.Configuration.GetSection("EmailConfiguration"));
builder.Services.AddScoped<IEmailService, EmailService>();
```

## 🚀 Como Usar

### 1. Injeção no Controller

```csharp
public class YourController : Controller
{
    private readonly IEmailService _emailService;

    public YourController(IEmailService emailService)
    {
        _emailService = emailService;
    }
}
```

### 2. Envio de Email Simples

```csharp
var emailMessage = new EmailMessage
{
    To = "user@example.com",
    Subject = "Assunto do Email",
    Body = "<h1>Olá!</h1><p>Esta é uma mensagem de teste.</p>",
    IsHtml = true
};

var result = await _emailService.SendEmailAsync(emailMessage);

if (result.IsSuccess)
{
    // Email enviado com sucesso
    Console.WriteLine($"Email enviado! MessageId: {result.MessageId}");
}
else
{
    // Erro no envio
    Console.WriteLine($"Erro: {result.ErrorMessage}");
}
```

### 3. Envio com Template

```csharp
var variables = new Dictionary<string, object>
{
    { "UserName", "João da Silva" },
    { "ConfirmationUrl", "https://seusite.com/confirmar?token=abc123" }
};

var result = await _emailService.SendTemplatedEmailAsync(
    "Welcome", 
    "user@example.com", 
    "Bem-vindo ao Sistema!", 
    variables
);
```

### 4. Métodos de Conveniência

#### Email de Boas-vindas
```csharp
var result = await _emailService.SendWelcomeEmailAsync(
    "user@example.com", 
    "João da Silva", 
    "https://seusite.com/confirmar?token=abc123"
);
```

#### Email de Reset de Senha
```csharp
var result = await _emailService.SendPasswordResetEmailAsync(
    "user@example.com", 
    "João da Silva", 
    "https://seusite.com/reset?token=xyz789"
);
```

#### Email de Confirmação
```csharp
var result = await _emailService.SendEmailConfirmationAsync(
    "user@example.com", 
    "João da Silva", 
    "https://seusite.com/confirmar?token=abc123"
);
```

### 5. Envio em Massa

```csharp
var emails = new List<EmailMessage>
{
    new EmailMessage { To = "user1@example.com", Subject = "Teste 1", Body = "Mensagem 1" },
    new EmailMessage { To = "user2@example.com", Subject = "Teste 2", Body = "Mensagem 2" }
};

var results = await _emailService.SendBulkEmailAsync(emails);

foreach (var result in results)
{
    if (result.IsSuccess)
        Console.WriteLine($"Email enviado para: {result.MessageId}");
    else
        Console.WriteLine($"Erro: {result.ErrorMessage}");
}
```

## 📋 Templates

### Variáveis Disponíveis

Os templates suportam substituição de variáveis usando a sintaxe `{{NomeVariavel}}`:

#### Template Welcome
- `{{UserName}}` - Nome do usuário
- `{{ConfirmationUrl}}` - URL de confirmação da conta

#### Template PasswordReset
- `{{UserName}}` - Nome do usuário
- `{{ResetUrl}}` - URL para redefinição de senha

#### Template EmailConfirmation
- `{{UserName}}` - Nome do usuário
- `{{ConfirmationUrl}}` - URL de confirmação do email

### Criando Novos Templates

1. Crie uma pasta em `Templates/Email/NomeDoTemplate/`
2. Adicione os arquivos:
   - `nometemplate.html` (obrigatório)
   - `nometemplate.txt` (opcional)
3. Use variáveis no formato `{{NomeVariavel}}`

Exemplo de template personalizado:

```html
<!DOCTYPE html>
<html>
<head>
    <title>{{Subject}}</title>
</head>
<body>
    <h1>Olá, {{UserName}}!</h1>
    <p>{{Message}}</p>
    <a href="{{ActionUrl}}">Clique aqui</a>
</body>
</html>
```

## 🔧 Funcionalidades Avançadas

### 1. Teste de Conexão

```csharp
var isConnected = await _emailService.TestConnectionAsync();
if (isConnected)
{
    Console.WriteLine("Conexão OK!");
}
```

### 2. Listar Templates Disponíveis

```csharp
var templates = await _emailService.GetAvailableTemplatesAsync();
foreach (var template in templates)
{
    Console.WriteLine($"Template disponível: {template}");
}
```

### 3. Renderizar Template (Preview)

```csharp
var variables = new Dictionary<string, object>
{
    { "UserName", "João" },
    { "Message", "Teste de preview" }
};

var result = await _emailService.RenderTemplateAsync("Welcome", variables);
if (result.IsSuccess)
{
    Console.WriteLine($"HTML: {result.HtmlBody}");
    Console.WriteLine($"Texto: {result.PlainTextBody}");
}
```

### 4. Email com Anexos

```csharp
var emailMessage = new EmailMessage
{
    To = "user@example.com",
    Subject = "Email com Anexo",
    Body = "Veja o arquivo em anexo.",
    Attachments = new List<EmailAttachment>
    {
        new EmailAttachment
        {
            FileName = "documento.pdf",
            Content = File.ReadAllBytes("path/to/document.pdf"),
            ContentType = "application/pdf"
        }
    }
};

await _emailService.SendEmailAsync(emailMessage);
```

## 🧪 Testando o Serviço

### Controller de Teste

Acesse `/Email` no seu navegador (após fazer login) para testar:

- Envio de emails com templates
- Envio de emails simples
- Teste de conexão
- Preview de templates

### Configuração de Teste

Para testes, recomendamos usar:

1. **Mailtrap.io** - Para desenvolvimento
2. **Gmail** - Para produção (com App Passwords)
3. **SendGrid** - Para aplicações em escala

## 🔐 Segurança

### 1. Configuração de Senhas
- Use **App Passwords** para Gmail
- Armazene credenciais em **Azure Key Vault** ou **User Secrets**
- Nunca commite senhas no código

### 2. User Secrets (Desenvolvimento)

```bash
dotnet user-secrets set "EmailConfiguration:Username" "your-email@gmail.com"
dotnet user-secrets set "EmailConfiguration:Password" "your-app-password"
```

### 3. Variáveis de Ambiente (Produção)

```bash
export EmailConfiguration__Username="your-email@gmail.com"
export EmailConfiguration__Password="your-app-password"
```

## 📊 Monitoramento

### Logs

O serviço gera logs detalhados quando `EnableLogging: true`:

```csharp
// Logs de sucesso
_logger.LogInformation("Email enviado com sucesso para {To} - MessageId: {MessageId}", to, messageId);

// Logs de erro
_logger.LogError(ex, "Erro ao enviar email (tentativa {Attempt}/{MaxAttempts}): {Error}", attempt, maxAttempts, error);
```

### Retry Automático

O serviço tentará reenviar emails automaticamente em caso de falha:
- Configurável via `MaxRetryAttempts`
- Delay progressivo entre tentativas
- Logs de todas as tentativas

## 🚀 Próximos Passos

### Melhorias Possíveis

1. **Engine de Template Avançada**
   - Integração com Razor Engine
   - Suporte a layouts complexos
   - Includes e partials

2. **Múltiplos Provedores**
   - SendGrid
   - Mailgun
   - Amazon SES

3. **Queue de Emails**
   - Background Jobs com Hangfire
   - Processamento assíncrono
   - Retry automático

4. **Métricas e Analytics**
   - Taxa de entrega
   - Taxa de abertura
   - Tracking de cliques

### Exemplo de Implementação Avançada

```csharp
// Futuro: Múltiplos provedores
public interface IEmailProvider
{
    Task<EmailResult> SendAsync(EmailMessage message);
}

// Futuro: Queue de emails
public interface IEmailQueue
{
    Task EnqueueAsync(EmailMessage message);
    Task ProcessAsync();
}
```

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique os logs da aplicação
2. Teste a conexão com `TestConnectionAsync()`
3. Valide as configurações no appsettings
4. Confirme que os templates existem

---

**Desenvolvido com ❤️ para facilitar o envio de emails na sua aplicação ASP.NET Core!**