using Core.CQRS;
using Core.Database;
using Domain.Tasks.Dto;

namespace Domain.Tasks.Commands;

public record UpdateTaskCommand(int Id, TaskParams @Params) : ICommand<TaskDto>;

internal class UpdateTaskCommandHandler(
    IUnitOfWork unitOfWork) : ICommandHandler<UpdateTaskCommand, TaskDto>
{
    public async Task<TaskDto> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
    {
        // Logic to update the Task by Id
        // This is a placeholder implementation
        var updatedTask = new TaskDto(
            Id: request.Id,
            Name: request.Params.Name,
            Description: request.Params.Description,
            Priority: request.Params.Priority,
            StoryId: request.Params.StoryId,
            EstimatedCompletionDate: request.Params.EstimatedCompletionDate,
            State: request.Params.State,
            CreatedAt: request.Params.CreatedAt,
            StartedAt: request.Params.StartedAt,
            EndDate: request.Params.EndDate,
            UserId: request.Params.UserId);

        await unitOfWork.SaveChangesAsync(cancellationToken);
        return updatedTask;
    }
}