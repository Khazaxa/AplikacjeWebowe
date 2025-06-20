using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Stories.Dto;
using Domain.Stories.Entities;
using Domain.Stories.Repositories;

namespace Domain.Stories.Commands;

public record CreateStoryCommand(StoryParams @Params) : ICommand<int>;

internal class CreateStoryCommandHandler(
    IStoryRepository storyRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<CreateStoryCommand, int>
{
    public async Task<int> Handle(CreateStoryCommand request, CancellationToken cancellationToken)
    {
        if(string.IsNullOrEmpty(request.Params.Name))
            throw new DomainException("Name is required.", (int)CommonErrorCode.InvalidOperation);
        
        if(await storyRepository.AnyAsync(
               s => s.Name == request.Params.Name, cancellationToken))
            throw new DomainException("Story with this name already exists.", (int)CommonErrorCode.InvalidOperation);
        
        var story = new Story(
            request.Params.Name,
            request.Params.Description,
            request.Params.Priority,
            request.Params.State,
            request.Params.ProjectId);
        
        storyRepository.Add(story);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return story.Id;
    }
}