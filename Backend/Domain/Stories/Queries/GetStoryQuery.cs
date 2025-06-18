using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Stories.Dto;
using Domain.Stories.Repositories;

namespace Domain.Stories.Queries;

public record GetStoryQuery(int Id) : IQuery<StoryDto>;

internal class GetStoryQueryHandler(
    IStoryRepository storyRepository) : IQueryHandler<GetStoryQuery, StoryDto>
{
    public async Task<StoryDto> Handle(GetStoryQuery request, CancellationToken cancellationToken)
    {
        var story = await storyRepository.FindAsync(request.Id, cancellationToken) 
                        ?? throw new DomainException("Story not found.", (int)CommonErrorCode.InvalidOperation);
        
        return new StoryDto(
            story.Id, 
            story.Name, 
            story.Description, 
            story.Priority, 
            story.State);
    }
}