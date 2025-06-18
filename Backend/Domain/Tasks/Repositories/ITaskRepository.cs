using Core.Database;
using Task = Domain.Tasks.Entities;

namespace Domain.Tasks.Repositories;

public interface ITaskRepository : IEntityRepository<Task.Task>
{
    IQueryable<Task.Task> Query();
}