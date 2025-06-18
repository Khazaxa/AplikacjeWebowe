using Core.CQRS;
using Core.Database;
using Domain.Projects.Dto;

namespace Domain.Projects.Queries;

public record GetProjectsQuery : IQuery<IQueryable<ProjectDto>>;

internal class GetProjectsQueryHandler(
    IUnitOfWork unitOfWork) : IQueryHandler<GetProjectsQuery, IQueryable<ProjectDto>>
{
    public async Task<IQueryable<ProjectDto>> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
    {
        var projects = new List<ProjectDto>
        {
            new (
                Id: 1,
                Name: "Project 1",
                Description: "Description for Project 1"),
            new (
                Id: 2,
                Name: "Project 2",
                Description: "Description for Project 2"),
            new (
                Id: 3,
                Name: "Project 3",
                Description: "Description for Project 3")
        };
        
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return projects.AsQueryable();
    }
}