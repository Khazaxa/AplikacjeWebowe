using Domain.Stories.Entities;
using Domain.Stories.Enums;
using Domain.Users.Entities;

namespace Domain.Tasks.Dto;

public record TaskDto(
    int? Id,
    string? Name,
    string? Description,
    Priority? Priority,
    int? StoryId,
    DateTime? EstimatedCompletionDate,
    State? State,
    DateTime? CreatedAt,
    DateTime? StartedAt,
    DateTime? EndDate,
    int? AssignedToId,
    int? ReporterId);