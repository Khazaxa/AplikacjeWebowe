using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Stories.Enums;
using Domain.Tasks.Dto;
using Domain.Tasks.Repositories;

namespace Domain.Tasks.Queries;

public record GetTaskQuery(int Id) : IQuery<TaskDto>;

internal class GetTaskQueryHandler(
    ITaskRepository taskRepository) : IQueryHandler<GetTaskQuery, TaskDto>
{
    public async Task<TaskDto> Handle(GetTaskQuery request, CancellationToken cancellationToken)
    {
        var task = await taskRepository.FindAsync(request.Id, cancellationToken) 
            ?? throw new DomainException("Task not found.", (int)CommonErrorCode.InvalidOperation);
        
        return new TaskDto(
            task.Id,
            task.Name,
            task.Description,
            task.Priority,
            task.StoryId,
            task.EstimatedCompletionDate,
            task.State,
            task.CreatedAt,
            task.StartedAt,
            task.EndDate,
            task.UserId);
    }
}