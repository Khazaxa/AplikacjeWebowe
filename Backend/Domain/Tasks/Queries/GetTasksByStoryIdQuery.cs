using Core.CQRS;
using Domain.Tasks.Dto;
using Domain.Tasks.Repositories;

namespace Domain.Tasks.Queries;

public record GetTasksByStoryIdQuery(int StoryId) : IQuery<IQueryable<TaskDto>>;

internal class GetTasksByStoryIdQueryHandler(
    ITaskRepository taskRepository) : IQueryHandler<GetTasksByStoryIdQuery, IQueryable<TaskDto>>
{
    public async Task<IQueryable<TaskDto>> Handle(GetTasksByStoryIdQuery request, CancellationToken cancellationToken)
    {
        var tasks = taskRepository.Query()
            .Where(t => t.StoryId == request.StoryId)
            .Select(t => new TaskDto
            (
                t.Id,
                t.Name,
                t.Description,
                t.Priority,
                t.StoryId,
                t.EstimatedCompletionDate,
                t.State,
                t.CreatedAt,
                t.StartedAt,
                t.EndDate,
                t.AssignedToId,
                t.ReporterId
            ));

        return tasks;
    }
}