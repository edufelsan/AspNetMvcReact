using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AspNetMvcReact.Models;

public class UpdateProfileRequest
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(50, ErrorMessage = "O nome deve ter no máximo 50 caracteres.")]
    [JsonPropertyName("firstName")]
    public string FirstName { get; set; } = "";

    [Required(ErrorMessage = "O sobrenome é obrigatório.")]
    [StringLength(50, ErrorMessage = "O sobrenome deve ter no máximo 50 caracteres.")]
    [JsonPropertyName("lastName")]
    public string LastName { get; set; } = "";

    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Email inválido.")]
    [StringLength(256, ErrorMessage = "O email deve ter no máximo 256 caracteres.")]
    [JsonPropertyName("email")]
    public string Email { get; set; } = "";
}

public class ChangePasswordRequest
{
    [Required(ErrorMessage = "A senha atual é obrigatória.")]
    [DataType(DataType.Password)]
    [JsonPropertyName("currentPassword")]
    public string CurrentPassword { get; set; } = "";

    [Required(ErrorMessage = "A nova senha é obrigatória.")]
    [StringLength(100, ErrorMessage = "A senha deve ter entre {2} e {1} caracteres.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [JsonPropertyName("newPassword")]
    public string NewPassword { get; set; } = "";

    [Required(ErrorMessage = "A confirmação da senha é obrigatória.")]
    [DataType(DataType.Password)]
    [Compare("NewPassword", ErrorMessage = "A nova senha e a confirmação não coincidem.")]
    [JsonPropertyName("confirmPassword")]
    public string ConfirmPassword { get; set; } = "";
}

public class DeleteAccountRequest
{
    [Required(ErrorMessage = "A senha atual é obrigatória para excluir a conta.")]
    [DataType(DataType.Password)]
    [JsonPropertyName("password")]
    public string Password { get; set; } = "";

    [Required(ErrorMessage = "Você deve confirmar que deseja excluir a conta.")]
    [JsonPropertyName("confirmDeletion")]
    public bool ConfirmDeletion { get; set; }
}

public class ProfileResponse
{
    public string Id { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string FullName { get; set; } = "";
    public string Email { get; set; } = "";
    public bool EmailConfirmed { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public bool IsActive { get; set; }
}