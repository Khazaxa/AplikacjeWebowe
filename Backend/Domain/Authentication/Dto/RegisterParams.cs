using Domain.Users.Enums;

namespace Domain.Authentication.Dto;

public record RegisterParams(
    string Email,
    string Password,
    string? Name,
    string? Surname,
    int? Age,
    string? Description,
    UserRole Role);