using Core.CQRS;
using Core.Database;
using Domain.Tasks.Dto;

namespace Domain.Tasks.Commands;

public record CreateTaskCommand(TaskParams @Params) : ICommand<int>;

internal class CreateTaskCommandHandler(
    IUnitOfWork unitOfWork) : ICommandHandler<CreateTaskCommand, int>
{
    public async Task<int> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
    {
        var task = 1;
        await unitOfWork.SaveChangesAsync(cancellationToken);
        return task;
    }
}