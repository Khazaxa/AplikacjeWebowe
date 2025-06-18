using Core.CQRS;
using Core.Database;
using Domain.Stories.Dto;
using Domain.Stories.Enums;

namespace Domain.Stories.Commands;

public record UpdateStoryCommand(int Id, StoryParams @Params) : ICommand<StoryDto>;

internal class UpdateStoryCommandHandler(
    IUnitOfWork unitOfWork) : ICommandHandler<UpdateStoryCommand, StoryDto>
{
    public async Task<StoryDto> Handle(UpdateStoryCommand request, CancellationToken cancellationToken)
    {
        // Logic to update the story by Id
        // This is a placeholder implementation
        var updatedStory = new StoryDto(
            Id: request.Id,
            Name: "Updated Story Name",
            Description: "Updated Story Description",
            Priority.High,
            State.Done
        );

        await unitOfWork.SaveChangesAsync(cancellationToken);
        return updatedStory;
    }
}