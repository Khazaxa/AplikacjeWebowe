using Domain.Projects.Entities;
using Domain.Stories.Entities;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Task = Domain.Tasks.Entities.Task;

namespace Domain;

internal class ManagMeDbContext : DbContext
{
    public ManagMeDbContext(DbContextOptions<ManagMeDbContext> options) : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Story> Stories { get; set; }
    public DbSet<Task> Tasks { get; set; }
    public DbSet<Project> Projects { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        User.OnModelCreating(modelBuilder);
        Story.OnModelCreating(modelBuilder);
        Task.OnModelCreating(modelBuilder);
        Project.OnModelCreating(modelBuilder);
    }
}