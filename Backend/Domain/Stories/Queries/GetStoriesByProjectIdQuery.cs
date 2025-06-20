using Core.CQRS;
using Domain.Stories.Dto;
using Domain.Stories.Repositories;

namespace Domain.Stories.Queries;

public record GetStoriesByProjectIdQuery(int ProjectId) : IQuery<IQueryable<StoryDto>>;

internal class GetStoriesByProjectIdQueryHandler(
    IStoryRepository storyRepository) : IQueryHandler<GetStoriesByProjectIdQuery, IQueryable<StoryDto>>
{
    public async Task<IQueryable<StoryDto>> Handle(GetStoriesByProjectIdQuery request, CancellationToken cancellationToken)
    {
        var stories = storyRepository.Query()
            .Where(s => s.ProjectId == request.ProjectId)
            .Select(s => new StoryDto
            (
                s.Id,
                s.Name,
                s.Description,
                s.Priority,
                s.State
            ));

        return stories;
    }
}