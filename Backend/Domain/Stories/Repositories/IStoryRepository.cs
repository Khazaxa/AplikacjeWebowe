using Core.Database;
using Domain.Stories.Entities;

namespace Domain.Stories.Repositories;

public interface IStoryRepository : IEntityRepository<Story>
{
    IQueryable<Story> Query();
}