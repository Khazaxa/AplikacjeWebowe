using Core.Database;

namespace Domain.Tasks.Repositories;

internal class TaskRepository(
    IUnitOfWork unitOfWork,
    ManagMeDbContext dbContext
) : EntityRepositoryBase<Entities.Task>(unitOfWork), ITaskRepository
{
    public IQueryable<Entities.Task> Query()
        => dbContext.Tasks;
    
    protected override IQueryable<Entities.Task> GetQuery()
        => Query().AsQueryable();
}