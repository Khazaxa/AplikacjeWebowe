using Core.CQRS;
using Domain.Users.Dtos;
using Domain.Users.Enums;
using Domain.Users.Repositories;

namespace Domain.Users.Queries;

public record GetUsersQuery() : IQuery<IQueryable<UserDto>>;

internal class GetUsersQueryHandler(
    IUserRepository userRepository) : IQueryHandler<GetUsersQuery, IQueryable<UserDto>>
{
    public async Task<IQueryable<UserDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        var users = userRepository.Query()
            .Where(u => u.Role == UserRole.Dev || u.Role == UserRole.Devops);
        return users.Select(user => new UserDto(
            user.Id,
            user.Email,
            user.Name,
            user.Surname,
            user.Role));
    }
}