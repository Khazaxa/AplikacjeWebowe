using Core.CQRS;
using Core.Database;
using MediatR;

namespace Domain.Tasks.Commands;

public record DeleteTaskCommand(int Id) : ICommand<Unit>;

internal class DeleteTaskCommandHandler(
    IUnitOfWork unitOfWork) : ICommandHandler<DeleteTaskCommand, Unit>
{
    public async Task<Unit> Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
    {
        // Logic to delete the Task by request.Id
        // For example:
        // var Task = await unitOfWork.Stories.FindAsync(request.Id);
        // if (Task != null)
        // {
        //     unitOfWork.Stories.Remove(Task);
        // }

        await unitOfWork.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}