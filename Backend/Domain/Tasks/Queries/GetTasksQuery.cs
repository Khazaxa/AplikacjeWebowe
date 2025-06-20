using Core.CQRS;
using Core.Database;
using Domain.Stories.Enums;
using Domain.Tasks.Dto;
using Domain.Tasks.Repositories;

namespace Domain.Tasks.Queries;

public record GetTasksQuery : IQuery<IQueryable<TaskDto>>;

internal class GetTasksQueryHandler(
    ITaskRepository taskRepository) : IQueryHandler<GetTasksQuery, IQueryable<TaskDto>>
{
    public async Task<IQueryable<TaskDto>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
    {
        var tasks = taskRepository.Query()
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
        
        return tasks.AsQueryable();
    }
}