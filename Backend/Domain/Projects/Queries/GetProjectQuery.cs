using Core.CQRS;
using Core.Database;
using Domain.Projects.Dto;
using Domain.Stories.Dto;

namespace Domain.Projects.Queries;

public record GetProjectQuery(int Id) : IQuery<ProjectDto>;

internal class GetProjectQueryHandler(
    IUnitOfWork unitOfWork) : IQueryHandler<GetProjectQuery, ProjectDto>
{
    public async Task<ProjectDto> Handle(GetProjectQuery request, CancellationToken cancellationToken)
    {
        var project = new ProjectDto(
            Id: request.Id,
            Name: "Sample Project",
            Description: "This is a sample Project description.");
        
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return project;
    }
}