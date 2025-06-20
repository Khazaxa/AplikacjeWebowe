using Domain.Stories.Enums;

namespace Domain.Stories.Dto;

public record StoryDto(
    int? Id,
    string? Name,
    string? Description,
    Priority? Priority,
    State? State);