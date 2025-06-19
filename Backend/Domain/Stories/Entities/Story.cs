using Core.Database;
using Domain.Projects.Entities;
using Domain.Stories.Enums;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;
using Task = Domain.Tasks.Entities.Task;

namespace Domain.Stories.Entities;

public sealed class Story : EntityBase
{
    private Story() { }
    
    public Story(
        string name, 
        string? description,
        Priority? priority,
        State? state,
        int? projectId)
    {
        Name = name;
        Description = description;
        Priority = priority;
        State = state;
        ProjectId = projectId;
    }
    
    public string? Name { get; private set; }
    public string? Description { get; private set; }
    public Priority? Priority { get; private set; }
    public DateTime? CreatedAt { get; private set; } = DateTime.UtcNow;
    public State? State { get; private set; }
    public int? UserId { get; private set; }
    public User? User { get; private set; }
    public int? ProjectId { get; private set; }
    public Project? Project { get; private set; }
    public List<Task>? Tasks { get; private set; } = new ();
    
    public void Update(
        string? name = null, 
        string? description = null, 
        Priority? priority = null, 
        State? state = null, 
        int? userId = null)
    {
        Name = name ?? Name;
        Description = description ?? Description;
        Priority = priority ?? Priority;
        State = state ?? State;
        UserId = userId ?? UserId;
    }
    
    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Story>().HasKey(x => x.Id);
        builder.Entity<Story>().HasIndex(x => x.Name).IsUnique();
        builder.Entity<Story>()
            .HasOne(s => s.User)
            .WithMany(u => u.Stories)
            .HasForeignKey(s => s.UserId);
        builder.Entity<Story>()
            .HasMany(s => s.Tasks)
            .WithOne(t => t.Story)
            .HasForeignKey(t => t.StoryId);
        builder.Entity<Story>()
            .HasOne(s => s.Project)
            .WithMany(p => p.Stories)
            .HasForeignKey(s => s.ProjectId);
    }
}