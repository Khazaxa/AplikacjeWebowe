using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Projects.Dto;
using Domain.Projects.Repositories;
using Domain.Stories.Dto;

namespace Domain.Projects.Queries;

public record GetProjectQuery(int Id) : IQuery<ProjectDto>;

internal class GetProjectQueryHandler(
    IProjectRepository projectRepository) : IQueryHandler<GetProjectQuery, ProjectDto>
{
    public async Task<ProjectDto> Handle(GetProjectQuery request, CancellationToken cancellationToken)
    {
        var project = await projectRepository.FindAsync(request.Id, cancellationToken)
            ?? throw new DomainException("Project not found.", (int)CommonErrorCode.InvalidOperation);

        return new ProjectDto(project.Id, project.Name, project.Description);
    }
}