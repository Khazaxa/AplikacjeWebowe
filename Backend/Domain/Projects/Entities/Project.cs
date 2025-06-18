using Core.Database;
using Microsoft.EntityFrameworkCore;

namespace Domain.Projects.Entities;

public class Project : EntityBase
{
    private Project() { }
    
    public Project(string name, string? description = null)
    {
        Name = name;
        Description = description;
    }
    
    public string? Name { get; private set; }
    public string? Description { get; private set; }
    
    public void Update(string? name = null, string? description = null)
    {
        Name = name ?? Name;
        Description = description ?? Description;
    }
    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Project>().HasKey(x => x.Id);
        builder.Entity<Project>().HasIndex(x => x.Name).IsUnique();
    }
}