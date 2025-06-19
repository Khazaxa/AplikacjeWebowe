using Domain.Users.Dtos;
using Domain.Users.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
[ApiController]
public class UserController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [Route("/users")]
    public async Task<IQueryable<UserDto>> GetUsers(CancellationToken cancellationToken)
        => await mediator.Send(new GetUsersQuery(), cancellationToken);
}