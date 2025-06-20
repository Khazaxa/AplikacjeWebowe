using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Projects.Dto;
using Domain.Projects.Repositories;

namespace Domain.Projects.Commands;

public record UpdateProjectCommand(int Id, ProjectParams @Params) : ICommand<ProjectDto>;

internal class UpdateProjectCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<UpdateProjectCommand, ProjectDto>
{
    public async Task<ProjectDto> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
    {
        var project = await projectRepository.FindAsync(request.Id, cancellationToken)
            ?? throw new DomainException("Project not found.", (int)CommonErrorCode.InvalidOperation);
        
        project.Update(
            request.Params.Name,
            request.Params.Description);

        projectRepository.Update(project);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return new ProjectDto
        (
            project.Id,
            project.Name,
            project.Description
        );
    }
}