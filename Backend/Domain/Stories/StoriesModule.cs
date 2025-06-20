using Autofac;
using Domain.Stories.Repositories;

namespace Domain.Stories;

internal class StoriesModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);

        builder.RegisterType<StoryRepository>().AsImplementedInterfaces();
    }
}