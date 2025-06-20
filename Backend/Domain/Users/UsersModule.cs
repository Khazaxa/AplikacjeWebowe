using Autofac;
using Domain.Users.Repositories;
using Domain.Users.Services;

namespace Domain.Users;

internal class UsersModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);

        builder.RegisterType<UserRepository>().AsImplementedInterfaces();
        builder.RegisterType<UserContextService>().AsImplementedInterfaces();
    }
}