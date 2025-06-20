using Autofac;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using Core.Middlewares;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Module = Autofac.Module;
using MediatR.Extensions.Autofac.DependencyInjection;
using MediatR.Extensions.Autofac.DependencyInjection.Builder;

namespace Domain;

public class DomainModule(IConfigurationRoot configuration) : Module
{
    private const string ConnectionStringName = nameof(ManagMeDbContext);
    
    protected override void Load(ContainerBuilder builder)
    {
        base.Load(builder);
    
        builder.RegisterInstance(configuration).As<IConfigurationRoot>();
        builder.RegisterModule<Users.UsersModule>();
        builder.RegisterModule<Authentication.AuthenticationModule>();
        builder.RegisterModule<Stories.StoriesModule>();
        builder.RegisterModule<Tasks.TasksModule>();
        builder.RegisterModule<Projects.ProjectsModule>();
        
        builder.RegisterType<Core.Database.UnitOfWork>().As<Core.Database.IUnitOfWork>().InstancePerLifetimeScope();
        
        RegisterDatabaseProviders(builder);
        RegisterMediator(builder);
    }
    
    public static void MigrateDatabase(IServiceScope scope)
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ManagMeDbContext>();
        dbContext.Database.Migrate();
    }
    
    private void RegisterDatabaseProviders(ContainerBuilder builder)
    {
        builder
            .Register(_ =>
            {
                var optionsBuilder = new DbContextOptionsBuilder<ManagMeDbContext>();
                var connectionString = configuration.GetConnectionString(ConnectionStringName);
                
                if (connectionString != null)
                    optionsBuilder.UseSqlServer(connectionString);
                else
                    throw new DomainException("Cannot find connection string for db", 
                        (int)CommonErrorCode.InvalidOperation);
                
                return new ManagMeDbContext(optionsBuilder.Options);
            })
            .As<DbContext>()
            .AsSelf()
            .InstancePerDependency();
    }
    
    private static void RegisterMediator(ContainerBuilder builder)
    {
        var mediatorConfiguration = MediatRConfigurationBuilder
            .Create(Assembly.GetExecutingAssembly())
            .WithAllOpenGenericHandlerTypesRegistered()
            .WithRegistrationScope(RegistrationScope.Scoped)
            .Build();

        builder.RegisterMediatR(mediatorConfiguration);
    }
}