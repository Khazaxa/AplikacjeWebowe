using Core.Database;
using Domain.Stories.Entities;

namespace Domain.Stories.Repositories;

internal class StoryRepository(
    IUnitOfWork unitOfWork,
    ManagMeDbContext dbContext
) : EntityRepositoryBase<Story>(unitOfWork), IStoryRepository
{
    public IQueryable<Story> Query()
        => dbContext.Stories;
    
    protected override IQueryable<Story> GetQuery()
        => Query().AsQueryable();
}