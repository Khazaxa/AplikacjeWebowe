using Domain.Stories.Enums;
using Task = Domain.Tasks.Entities.Task;

namespace Domain.Stories.Dto;

public record StoryParams(
    string? Name,
    string? Description,
    Priority? Priority,
    int? ProjectId,
    State? State);