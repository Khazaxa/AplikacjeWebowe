using Core.CQRS;
using Core.Database;
using Domain.Projects.Dto;

namespace Domain.Projects.Commands;

public record UpdateProjectCommand(int Id, ProjectParams @Params) : ICommand<ProjectDto>;

internal class UpdateProjectCommandHandler(
    IUnitOfWork unitOfWork) : ICommandHandler<UpdateProjectCommand, ProjectDto>
{
    public async Task<ProjectDto> Handle(UpdateProjectCommand request, CancellationToken cancellationToken)
    {
        // Logic to update the Project by Id
        // This is a placeholder implementation
        var updatedProject = new ProjectDto(
            Id: request.Id,
            Name: "Updated Project Name",
            Description: "Updated Project Description"
        );

        await unitOfWork.SaveChangesAsync(cancellationToken);
        return updatedProject;
    }
}