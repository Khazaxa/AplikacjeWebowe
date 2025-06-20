using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Tasks.Repositories;
using Domain.Users.Services;
using MediatR;

namespace Domain.Tasks.Commands;

public record CompleteTaskCommand(int Id) : ICommand<Unit>;

internal class CompleteTaskCommandHandler(
    ITaskRepository taskRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<CompleteTaskCommand, Unit>
{
    public async Task<Unit> Handle(CompleteTaskCommand request, CancellationToken cancellationToken)
    {
        var task = await taskRepository.FindAsync(request.Id, cancellationToken)
                   ?? throw new DomainException($"Task with ID {request.Id} not found.", (int)CommonErrorCode.InvalidOperation);

        task.Complete();
        
        taskRepository.Update(task);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}