using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Stories.Repositories;
using MediatR;

namespace Domain.Stories.Commands;

public record DeleteStoryCommand(int Id) : ICommand<Unit>;

internal class DeleteStoryCommandHandler(
    IStoryRepository storyRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<DeleteStoryCommand, Unit>
{
    public async Task<Unit> Handle(DeleteStoryCommand request, CancellationToken cancellationToken)
    {
        var story = await storyRepository.FindAsync(request.Id, cancellationToken)
            ?? throw new DomainException("Story not found.", (int)CommonErrorCode.InvalidOperation);
        
        storyRepository.Delete(story);
        await unitOfWork.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}