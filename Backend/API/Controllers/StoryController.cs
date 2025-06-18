using Domain.Stories.Commands;
using Domain.Stories.Dto;
using Domain.Stories.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[ApiController]
public class StoryController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("/story")]
    public async Task<int> CreateStory(StoryParams @params, CancellationToken cancellationToken)
        => await mediator.Send(new CreateStoryCommand(@params), cancellationToken);
    
    [HttpGet]
    [Route("/story/{id}")]
    public async Task<StoryDto> GetStory(int id, CancellationToken cancellationToken)
    => await mediator.Send(new GetStoryQuery(id), cancellationToken);
    
    [HttpGet]
    [Route("/stories")]
    public async Task<IQueryable<StoryDto>> GetStories(CancellationToken cancellationToken)
        => await mediator.Send(new GetStoriesQuery(), cancellationToken);
    
    [HttpPut]
    [Route("/story/{id}")]
    public async Task<StoryDto> UpdateStory(int id, StoryParams @params, CancellationToken cancellationToken)
        => await mediator.Send(new UpdateStoryCommand(id, @params), cancellationToken);

    [HttpDelete]
    [Route("/story/{id}")]
    public async Task DeleteStory(int id, CancellationToken cancellationToken)
        => await mediator.Send(new DeleteStoryCommand(id), cancellationToken);
}