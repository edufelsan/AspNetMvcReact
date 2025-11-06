using System.ComponentModel.DataAnnotations;

namespace AspNetMvcReact.Models;

public class RegisterRequest
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [Display(Name = "Nome completo")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Por favor, insira um email válido.")]
    [Display(Name = "Email")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "A senha é obrigatória.")]
    [StringLength(100, ErrorMessage = "A senha deve ter pelo menos {2} caracteres.", MinimumLength = 6)]
    [Display(Name = "Senha")]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "A confirmação de senha é obrigatória.")]
    [Compare("Password", ErrorMessage = "A senha e a confirmação devem ser iguais.")]
    [Display(Name = "Confirmar senha")]
    public string Password_Confirmation { get; set; } = string.Empty;

    [Required(ErrorMessage = "Você deve aceitar os termos de uso.")]
    public bool Terms { get; set; } = false;

    public string? ReturnUrl { get; set; }
}