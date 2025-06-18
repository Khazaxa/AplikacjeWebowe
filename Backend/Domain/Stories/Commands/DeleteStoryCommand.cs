using Core.CQRS;
using Core.Database;
using MediatR;

namespace Domain.Stories.Commands;

public record DeleteStoryCommand(int Id) : ICommand<Unit>;

internal class DeleteStoryCommandHandler(
    IUnitOfWork unitOfWork) : ICommandHandler<DeleteStoryCommand, Unit>
{
    public async Task<Unit> Handle(DeleteStoryCommand request, CancellationToken cancellationToken)
    {
        // Logic to delete the story by request.Id
        // For example:
        // var story = await unitOfWork.Stories.FindAsync(request.Id);
        // if (story != null)
        // {
        //     unitOfWork.Stories.Remove(story);
        // }

        await unitOfWork.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}