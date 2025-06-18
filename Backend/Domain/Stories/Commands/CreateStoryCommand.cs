using Core.CQRS;
using Core.Database;
using Domain.Stories.Dto;

namespace Domain.Stories.Commands;

public record CreateStoryCommand(StoryParams @Params) : ICommand<int>;

internal class CreateStoryCommandHandler(
    IUnitOfWork unitOfWork) : ICommandHandler<CreateStoryCommand, int>
{
    public async Task<int> Handle(CreateStoryCommand request, CancellationToken cancellationToken)
    {
        var story = 1;
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return story;
    }
}