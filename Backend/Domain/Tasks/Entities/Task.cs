using Core.Database;
using Domain.Stories.Entities;
using Domain.Stories.Enums;
using Domain.Users.Entities;
using Microsoft.EntityFrameworkCore;

namespace Domain.Tasks.Entities;

public class Task : EntityBase
{
    private Task() { }
    
    public Task(
        string name, 
        string? description = null, 
        Priority? priority = null, 
        int? storyId = null, 
        DateTime? estimatedCompletionDate = null, 
        State? state = null, 
        int? userId = null)
    {
        Name = name;
        Description = description;
        Priority = priority;
        StoryId = storyId;
        EstimatedCompletionDate = estimatedCompletionDate;
        State = state;
        UserId = userId;
    }
    
    public string? Name { get; private set; }
    public string? Description { get; private set; }
    public Priority? Priority { get; private set; }
    public int? StoryId { get; private set; }
    public Story? Story { get; private set; }
    public DateTime? EstimatedCompletionDate { get; private set; }
    public State? State { get; private set; }
    public DateTime? CreatedAt { get; private set; } = DateTime.UtcNow;
    public DateTime? StartedAt { get; private set; }
    public DateTime? EndDate { get; private set; } = DateTime.UtcNow;
    public int? UserId { get; private set; }
    public User? User { get; private set; }
    
    public void Update(
        string? name = null, 
        string? description = null, 
        Priority? priority = null, 
        int? storyId = null, 
        DateTime? estimatedCompletionDate = null, 
        State? state = null, 
        int? userId = null)
    {
        Name = name ?? Name;
        Description = description ?? Description;
        Priority = priority ?? Priority;
        StoryId = storyId ?? StoryId;
        EstimatedCompletionDate = estimatedCompletionDate ?? EstimatedCompletionDate;
        State = state ?? State;
        UserId = userId ?? UserId;
    }
    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Task>().HasKey(x => x.Id);
        builder.Entity<Task>().HasIndex(x => x.Name).IsUnique();
        builder.Entity<Task>()
            .HasOne(t => t.User)
            .WithMany(u => u.Tasks)
            .HasForeignKey(t => t.UserId);
        builder.Entity<Task>()
            .HasOne(t => t.Story)
            .WithMany(s => s.Tasks)
            .HasForeignKey(t => t.StoryId);
    }
}