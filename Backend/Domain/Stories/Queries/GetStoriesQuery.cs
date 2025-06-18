using Core.CQRS;
using Core.Database;
using Domain.Stories.Dto;
using Domain.Stories.Enums;

namespace Domain.Stories.Queries;

public record GetStoriesQuery : IQuery<IQueryable<StoryDto>>;

internal class GetStoriesQueryHandler(
    IUnitOfWork unitOfWork) : IQueryHandler<GetStoriesQuery, IQueryable<StoryDto>>
{
    public async Task<IQueryable<StoryDto>> Handle(GetStoriesQuery request, CancellationToken cancellationToken)
    {
        var stories = new List<StoryDto>
        {
            new (
                Id: 1,
                Name: "Story 1",
                Description: "Description for story 1",
                Priority: Priority.Medium,
                State: State.ToDo),
            new (
                Id: 2,
                Name: "Story 2",
                Description: "Description for story 2",
                Priority: Priority.High,
                State: State.InProgress),
            new (
                Id: 3,
                Name: "Story 3",
                Description: "Description for story 3",
                Priority: Priority.Low,
                State: State.Done)
        };
        
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return stories.AsQueryable();
    }
}