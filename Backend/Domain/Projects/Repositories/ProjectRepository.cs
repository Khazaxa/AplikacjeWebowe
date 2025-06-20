using Core.Database;
using Domain.Projects.Entities;
using Domain.Stories.Entities;

namespace Domain.Projects.Repositories;

internal class ProjectRepository(
    IUnitOfWork unitOfWork,
    ManagMeDbContext dbContext
) : EntityRepositoryBase<Project>(unitOfWork), IProjectRepository
{
    public IQueryable<Project> Query()
        => dbContext.Projects;
    
    protected override IQueryable<Project> GetQuery()
        => Query().AsQueryable();
}