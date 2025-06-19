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
        string? description,
        Priority? priority, 
        int? storyId,
        DateTime? estimatedCompletionDate,
        State? state,
        int? assignedToId,
        DateTime? createdAt,
        int? reporterId)
    {
        Name = name;
        Description = description;
        Priority = priority;
        StoryId = storyId;
        EstimatedCompletionDate = estimatedCompletionDate;
        State = state;
        AssignedToId = assignedToId;
        ReporterId = reporterId;
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
    public DateTime? EndDate { get; private set; }
    public int? AssignedToId { get; private set; }
    public User? Assigned { get; private set; }
    public int? ReporterId { get; private set; }
    public User? Reporter { get; private set; }
    
    public void Update(
        string? name,
        string? description,
        Priority? priority,
        int? storyId,
        DateTime? estimatedCompletionDate,
        State? state,
        int? assignedToId)
    {
        Name = name;
        Description = description;
        Priority = priority;
        StoryId = storyId;
        EstimatedCompletionDate = estimatedCompletionDate;
        State = state;
        AssignedToId = assignedToId;
    }
    
    public void Start(int? assignedToId)
    {
        StartedAt = DateTime.UtcNow;
        State = Stories.Enums.State.InProgress;
        AssignedToId = assignedToId;
    }
    
    public void Complete()
    {
        EndDate = DateTime.UtcNow;
        State = Stories.Enums.State.Done;
    }
    
    public void Assign(int? assignedToId)
    {
        AssignedToId = assignedToId;
    }
    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Task>().HasKey(x => x.Id);
        builder.Entity<Task>().HasIndex(x => x.Name).IsUnique();
        builder.Entity<Task>()
            .HasOne(t => t.Assigned)
            .WithMany(u => u.Tasks)
            .HasForeignKey(t => t.AssignedToId);
        builder.Entity<Task>()
            .HasOne(t => t.Reporter)
            .WithMany(u => u.ReportedTasks)
            .HasForeignKey(t => t.ReporterId);
        builder.Entity<Task>()
            .HasOne(t => t.Story)
            .WithMany(s => s.Tasks)
            .HasForeignKey(t => t.StoryId);
    }
}