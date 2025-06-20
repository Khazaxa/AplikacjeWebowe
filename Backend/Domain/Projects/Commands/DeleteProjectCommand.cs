using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Projects.Repositories;
using MediatR;

namespace Domain.Projects.Commands;

public record DeleteProjectCommand(int Id) : ICommand<Unit>;

internal class DeleteProjectCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<DeleteProjectCommand, Unit>
{
    public async Task<Unit> Handle(DeleteProjectCommand request, CancellationToken cancellationToken)
    {
        var project = await projectRepository.FindAsync(request.Id, cancellationToken)
            ?? throw new DomainException("Project not found.", (int)CommonErrorCode.InvalidOperation);
        
        projectRepository.Delete(project);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}