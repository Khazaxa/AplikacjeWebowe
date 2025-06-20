using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Stories.Dto;
using Domain.Stories.Repositories;

namespace Domain.Stories.Commands;

public record UpdateStoryCommand(int Id, StoryParams @Params) : ICommand<StoryDto>;

internal class UpdateStoryCommandHandler(
    IStoryRepository storyRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<UpdateStoryCommand, StoryDto>
{
    public async Task<StoryDto> Handle(UpdateStoryCommand request, CancellationToken cancellationToken)
    {
        var story = await storyRepository.FindAsync(request.Id, cancellationToken)
                  ?? throw new DomainException("Story not found.", (int)CommonErrorCode.InvalidOperation);
        
        if(await storyRepository.AnyAsync(
               s => s.Name == request.Params.Name, cancellationToken))
            throw new DomainException("Story with this name already exists.", (int)CommonErrorCode.InvalidOperation);
        
        story.Update(
            request.Params.Name,
            request.Params.Description,
            request.Params.Priority,
            request.Params.State);
        
        storyRepository.Update(story);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        var updatedStory = new StoryDto
        (
            story.Id,
            story.Name,
            story.Description,
            story.Priority,
            story.State
        );
        
        return updatedStory;
    }
}