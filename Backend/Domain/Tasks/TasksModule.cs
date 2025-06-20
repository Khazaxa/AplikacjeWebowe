using Autofac;
using Domain.Tasks.Repositories;

namespace Domain.Tasks;

internal class TasksModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);

        builder.RegisterType<TaskRepository>().AsImplementedInterfaces();
    }
}