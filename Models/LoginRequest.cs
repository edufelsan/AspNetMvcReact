using System.ComponentModel.DataAnnotations;

namespace AspNetMvcReact.Models;

public class LoginRequest
{
    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Por favor, insira um email válido.")]
    [Display(Name = "Email")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "A senha é obrigatória.")]
    [Display(Name = "Senha")]
    public string Password { get; set; } = string.Empty;

    [Display(Name = "Lembrar de mim")]
    public bool Remember { get; set; } = false;

    public string? ReturnUrl { get; set; }
}