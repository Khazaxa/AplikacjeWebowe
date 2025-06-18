using Core.CQRS;
using Core.Database;
using Domain.Projects.Dto;

namespace Domain.Projects.Commands;

public record CreateProjectCommand(ProjectParams @Params) : ICommand<int>;

internal class CreateProjectCommandHandler(
    IUnitOfWork unitOfWork) : ICommandHandler<CreateProjectCommand, int>
{
    public async Task<int> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = 1;
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return project;
    }
}