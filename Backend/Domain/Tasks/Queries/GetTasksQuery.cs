using Core.CQRS;
using Core.Database;
using Domain.Stories.Enums;
using Domain.Tasks.Dto;

namespace Domain.Tasks.Queries;

public record GetTasksQuery : IQuery<IQueryable<TaskDto>>;

internal class GetTasksQueryHandler(
    IUnitOfWork unitOfWork) : IQueryHandler<GetTasksQuery, IQueryable<TaskDto>>
{
    public async Task<IQueryable<TaskDto>> Handle(GetTasksQuery request, CancellationToken cancellationToken)
    {
        var tasks = new List<TaskDto>
        {
            new (
                Id: 1,
                Name: "Task 1",
                Description: "Description for Task 1",
                Priority: Priority.High,
                StoryId: 1,
                EstimatedCompletionDate: DateTime.UtcNow.AddDays(5),
                State: State.InProgress,
                CreatedAt: DateTime.UtcNow,
                StartedAt: DateTime.UtcNow.AddDays(1),
                EndDate: DateTime.UtcNow.AddDays(4),
                UserId: 1),
            new (
                Id: 1,
                Name: "Task 1",
                Description: "Description for Task 1",
                Priority: Priority.High,
                StoryId: 1,
                EstimatedCompletionDate: DateTime.UtcNow.AddDays(5),
                State: State.InProgress,
                CreatedAt: DateTime.UtcNow,
                StartedAt: DateTime.UtcNow.AddDays(1),
                EndDate: DateTime.UtcNow.AddDays(4),
                UserId: 1)
        };
        
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return tasks.AsQueryable();
    }
}