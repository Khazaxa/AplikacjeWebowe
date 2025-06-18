using Core.CQRS;
using Core.Database;
using Domain.Stories.Dto;

namespace Domain.Stories.Queries;

public record GetStoryQuery(int Id) : IQuery<StoryDto>;

internal class GetStoryQueryHandler(
    IUnitOfWork unitOfWork) : IQueryHandler<GetStoryQuery, StoryDto>
{
    public async Task<StoryDto> Handle(GetStoryQuery request, CancellationToken cancellationToken)
    {
        var story = new StoryDto(
            Id: request.Id,
            Name: "Sample Story",
            Description: "This is a sample story description.",
            Priority: Enums.Priority.High,
            State: Enums.State.InProgress);
        
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return story;
    }
}