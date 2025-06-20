using Core.CQRS;
using Core.Database;
using Domain.Projects.Dto;
using Domain.Projects.Repositories;

namespace Domain.Projects.Queries;

public record GetProjectsQuery : IQuery<IQueryable<ProjectDto>>;

internal class GetProjectsQueryHandler(
    IProjectRepository projectRepository) : IQueryHandler<GetProjectsQuery, IQueryable<ProjectDto>>
{
    public async Task<IQueryable<ProjectDto>> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
    {
        var projects = projectRepository.Query();

        return projects.Select(p => new ProjectDto
        (
            p.Id,
            p.Name,
            p.Description
        ));
    }
}