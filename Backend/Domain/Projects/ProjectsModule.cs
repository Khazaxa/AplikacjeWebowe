using Autofac;
using Domain.Projects.Repositories;

namespace Domain.Projects;

internal class ProjectsModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);

        builder.RegisterType<ProjectRepository>().AsImplementedInterfaces();
    }
}