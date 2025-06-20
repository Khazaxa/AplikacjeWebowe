using Domain.Users.Enums;

namespace Domain.Users.Dtos;

public record UserDto(
    int? Id,
    string? Email,
    string? Name,
    string? Surname,
    UserRole? Role);