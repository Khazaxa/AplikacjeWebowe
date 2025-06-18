using Core.Database;
using Microsoft.EntityFrameworkCore;

namespace Domain.Projects.Entities;

public class Project : EntityBase
{
    private Project() { }
    
    
    public string? Name { get; private set; }
    public string? Description { get; private set; }
    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Project>().HasKey(x => x.Id);
        builder.Entity<Project>().HasIndex(x => x.Name).IsUnique();
    }
}