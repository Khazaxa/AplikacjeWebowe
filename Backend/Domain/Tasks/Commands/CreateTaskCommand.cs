using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Tasks.Dto;
using Domain.Tasks.Repositories;
using Task = Domain.Tasks.Entities.Task;

namespace Domain.Tasks.Commands;

public record CreateTaskCommand(TaskParams @Params) : ICommand<int>;

internal class CreateTaskCommandHandler(
    ITaskRepository taskRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<CreateTaskCommand, int>
{
    public async Task<int> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
    {
        if(string.IsNullOrEmpty(request.Params.Name))
            throw new DomainException("Name is required.", (int)CommonErrorCode.InvalidOperation);
        
        var task = new Task(
            request.Params.Name,
            request.Params.Description,
            request.Params.Priority,
            request.Params.StoryId,
            request.Params.EstimatedCompletionDate,
            request.Params.State,
            request.Params.UserId
            );
        
        taskRepository.Add(task);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return task.Id;
    }
}