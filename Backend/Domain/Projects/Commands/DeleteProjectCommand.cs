using Core.CQRS;
using Core.Database;
using MediatR;

namespace Domain.Projects.Commands;

public record DeleteProjectCommand(int Id) : ICommand<Unit>;

internal class DeleteProjectCommandHandler(
    IUnitOfWork unitOfWork) : ICommandHandler<DeleteProjectCommand, Unit>
{
    public async Task<Unit> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
    {
        // Logic to delete the Project by request.Id
        // For example:
        // var Project = await unitOfWork.Stories.FindAsync(request.Id);
        // if (Project != null)
        // {
        //     unitOfWork.Stories.Remove(Project);
        // }

        await unitOfWork.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}