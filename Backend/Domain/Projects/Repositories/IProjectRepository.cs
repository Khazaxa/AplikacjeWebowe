using Core.Database;
using Domain.Projects.Entities;
using Domain.Stories.Entities;

namespace Domain.Projects.Repositories;

public interface IProjectRepository : IEntityRepository<Project>
{
    IQueryable<Project> Query();
}