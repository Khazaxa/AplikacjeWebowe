using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Tasks.Dto;
using Domain.Tasks.Repositories;

namespace Domain.Tasks.Commands;

public record UpdateTaskCommand(int Id, TaskParams @Params) : ICommand<TaskDto>;

internal class UpdateTaskCommandHandler(
    ITaskRepository taskRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<UpdateTaskCommand, TaskDto>
{
    public async Task<TaskDto> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
    {
        var task = await taskRepository.FindAsync(request.Id, cancellationToken)
            ?? throw new DomainException("Task not found.", (int)CommonErrorCode.InvalidOperation);
        
        if(await taskRepository.AnyAsync(
               s => s.Name == request.Params.Name, cancellationToken))
            throw new DomainException("Task with this name already exists.", (int)CommonErrorCode.InvalidOperation);
        
        task.Update(
            request.Params.Name,
            request.Params.Description,
            request.Params.Priority,
            request.Params.StoryId,
            request.Params.EstimatedCompletionDate,
            request.Params.State,
            request.Params.AssignedToId
        );
        
        taskRepository.Update(task);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        var updatedTask = new TaskDto
        (
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
            task.AssignedToId,
            task.ReporterId
        );
        
        return updatedTask;
    }
}