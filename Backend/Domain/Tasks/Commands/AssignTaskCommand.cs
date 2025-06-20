using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Tasks.Repositories;
using Domain.Users.Enums;
using Domain.Users.Repositories;
using MediatR;

namespace Domain.Tasks.Commands;

public record AssignTaskCommand(int Id, int UserId) : ICommand<Unit>;

internal class AssignTaskCommandHandler(
    IUserRepository userRepository,
    ITaskRepository taskRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<AssignTaskCommand, Unit>
{
    public async Task<Unit> Handle(AssignTaskCommand request, CancellationToken cancellationToken)
    {
        var task = await taskRepository.FindAsync(request.Id, cancellationToken)
            ?? throw new DomainException($"Task with ID {request.Id} not found.", 
                (int)CommonErrorCode.InvalidOperation);
        
        var user = await userRepository.FindAsync(request.UserId, cancellationToken)
            ?? throw new DomainException($"User with ID {request.UserId} not found.", 
                (int)CommonErrorCode.InvalidOperation);

        if(user.Role is UserRole.Dev or UserRole.Devops)
            task.Assign(request.UserId);
        else
            throw new DomainException($"User with ID {request.UserId} cannot be assigned to tasks.", 
                (int)CommonErrorCode.InvalidOperation);
        
        taskRepository.Update(task);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}