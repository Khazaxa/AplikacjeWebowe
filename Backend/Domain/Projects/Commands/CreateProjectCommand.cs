using Core.CQRS;
using Core.Database;
using Core.Middlewares;
using Domain.Projects.Dto;
using Domain.Projects.Entities;
using Domain.Projects.Repositories;

namespace Domain.Projects.Commands;

public record CreateProjectCommand(ProjectParams @Params) : ICommand<int>;

internal class CreateProjectCommandHandler(
    IProjectRepository projectRepository,
    IUnitOfWork unitOfWork) : ICommandHandler<CreateProjectCommand, int>
{
    public async Task<int> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
    {
        if(string.IsNullOrEmpty(request.Params.Name))
            throw new DomainException("Name is required.", (int)CommonErrorCode.InvalidOperation);
        
        if(await projectRepository.AnyAsync(
               s => s.Name == request.Params.Name, cancellationToken))
            throw new DomainException("Project with this name already exists.", (int)CommonErrorCode.InvalidOperation);
        
        var project = new Project(
            request.Params.Name, 
            request.Params.Description);
        
        projectRepository.Add(project);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return project.Id;
    }
}