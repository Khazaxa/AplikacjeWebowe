using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Tasks.Repositories;
using MediatR;

namespace Domain.Tasks.Commands;

public record DeleteTaskCommand(int Id) : ICommand<Unit>;

internal class DeleteTaskCommandHandler(
    ITaskRepository taskRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<DeleteTaskCommand, Unit>
{
    public async Task<Unit> Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
    {
        var task = await taskRepository.FindAsync(request.Id, cancellationToken)
            ?? throw new DomainException("Task not found.", (int)CommonErrorCode.InvalidOperation);

        taskRepository.Delete(task);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}