using Domain.Stories.Enums;

namespace Domain.Tasks.Dto;

public record TaskParams(
    string? Name, 
    string? Description, 
    Priority? Priority, 
    int? StoryId, 
    DateTime? EstimatedCompletionDate, 
    State? State, 
    DateTime? CreatedAt, 
    DateTime? StartedAt, 
    DateTime? EndDate,
    int? AssignedToId);