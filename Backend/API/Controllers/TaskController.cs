using Domain.Tasks.Commands;
using Domain.Tasks.Dto;
using Domain.Tasks.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[ApiController]
public class TaskController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Route("/Task")]
    public async Task<int> CreateTask(TaskParams @params, CancellationToken cancellationToken)
        => await mediator.Send(new CreateTaskCommand(@params), cancellationToken);
    
    [HttpGet]
    [Route("/Task/{id}")]
    public async Task<TaskDto> GetTask(int id, CancellationToken cancellationToken)
    => await mediator.Send(new GetTaskQuery(id), cancellationToken);
    
    [HttpGet]
    [Route("/Tasks")]
    public async Task<IQueryable<TaskDto>> GetStories(CancellationToken cancellationToken)
        => await mediator.Send(new GetTasksQuery(), cancellationToken);
    
    [HttpPut]
    [Route("/Task/{id}")]
    public async Task<TaskDto> UpdateTask(int id, TaskParams @params, CancellationToken cancellationToken)
        => await mediator.Send(new UpdateTaskCommand(id, @params), cancellationToken);

    [HttpDelete]
    [Route("/Task/{id}")]
    public async Task DeleteTask(int id, CancellationToken cancellationToken)
        => await mediator.Send(new DeleteTaskCommand(id), cancellationToken);
    
    [HttpPut]
    [Route("/task/{id}/start")]
    public async Task StartTask(int id, CancellationToken cancellationToken)
        => await mediator.Send(new StartTaskCommand(id), cancellationToken);
    
    [HttpPut]
    [Route("/task/{id}/complete")]
    public async Task CompleteTask(int id, CancellationToken cancellationToken)
        => await mediator.Send(new CompleteTaskCommand(id), cancellationToken);
    
    [HttpPut]
    [Route("/task/{id}/assign")]
    public async Task AssignTask(int id, int userId, CancellationToken cancellationToken)
        => await mediator.Send(new AssignTaskCommand(id, userId), cancellationToken);
}