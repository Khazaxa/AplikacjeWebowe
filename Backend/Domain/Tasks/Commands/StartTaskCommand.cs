using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Tasks.Repositories;
using Domain.Users.Services;
using MediatR;

namespace Domain.Tasks.Commands;

public record StartTaskCommand(int Id) : ICommand<Unit>;

internal class StartTaskCommandHandler(
    IUserContextService userContext,
    ITaskRepository taskRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<StartTaskCommand, Unit>
{
    public async Task<Unit> Handle(StartTaskCommand request, CancellationToken cancellationToken)
    {
        var task = await taskRepository.FindAsync(request.Id, cancellationToken)
            ?? throw new DomainException($"Task with ID {request.Id} not found.", (int)CommonErrorCode.InvalidOperation);

        task.Start(userContext.GetUserId());
        
        taskRepository.Update(task);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}