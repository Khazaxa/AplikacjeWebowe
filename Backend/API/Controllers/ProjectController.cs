using Domain.Projects.Commands;
using Domain.Projects.Dto;
using Domain.Projects.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[ApiController]
public class ProjectController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("/project")]
    public async Task<int> CreateProject(ProjectParams @params, CancellationToken cancellationToken)
        => await mediator.Send(new CreateProjectCommand(@params), cancellationToken);
    
    [HttpGet]
    [Route("/project/{id}")]
    public async Task<ProjectDto> GetProject(int id, CancellationToken cancellationToken)
    => await mediator.Send(new GetProjectQuery(id), cancellationToken);
    
    [HttpGet]
    [Route("/projects")]
    public async Task<IQueryable<ProjectDto>> GetStories(CancellationToken cancellationToken)
        => await mediator.Send(new GetProjectsQuery(), cancellationToken);
    
    [HttpPut]
    [Route("/project/{id}")]
    public async Task<ProjectDto> UpdateProject(int id, ProjectParams @params, CancellationToken cancellationToken)
        => await mediator.Send(new UpdateProjectCommand(id, @params), cancellationToken);

    [HttpDelete]
    [Route("/project/{id}")]
    public async Task DeleteProject(int id, CancellationToken cancellationToken)
        => await mediator.Send(new DeleteProjectCommand(id), cancellationToken);
}