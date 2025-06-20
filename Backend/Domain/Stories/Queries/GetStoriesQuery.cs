using Core.CQRS;
using Core.Database;
using Domain.Stories.Dto;
using Domain.Stories.Enums;
using Domain.Stories.Repositories;

namespace Domain.Stories.Queries;

public record GetStoriesQuery : IQuery<IQueryable<StoryDto>>;

internal class GetStoriesQueryHandler(
    IStoryRepository storyRepository) : IQueryHandler<GetStoriesQuery, IQueryable<StoryDto>>
{
    public async Task<IQueryable<StoryDto>> Handle(GetStoriesQuery request, CancellationToken cancellationToken)
    {
        var stories = storyRepository.Query()
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