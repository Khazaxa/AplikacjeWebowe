using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Tasks.Dto;
using Domain.Tasks.Repositories;
using Domain.Users.Services;
using Task = Domain.Tasks.Entities.Task;

namespace Domain.Tasks.Commands;

public record CreateTaskCommand(TaskParams @Params) : ICommand<int>;

internal class CreateTaskCommandHandler(
    IUserContextService userContext,
    ITaskRepository taskRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<CreateTaskCommand, int>
{
    public async Task<int> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
    {
        if(string.IsNullOrEmpty(request.Params.Name))
            throw new DomainException("Name is required.", (int)CommonErrorCode.InvalidOperation);
        
        if(await taskRepository.AnyAsync(
               s => s.Name == request.Params.Name, cancellationToken))
            throw new DomainException("Task with this name already exists.", (int)CommonErrorCode.InvalidOperation);
        
        var task = new Task(
            request.Params.Name,
            request.Params.Description,
            request.Params.Priority,
            request.Params.StoryId,
            request.Params.EstimatedCompletionDate,
            request.Params.State,
            request.Params.AssignedToId,
            request.Params.CreatedAt,
            userContext.GetUserId());
        
        taskRepository.Add(task);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return task.Id;
    }
}