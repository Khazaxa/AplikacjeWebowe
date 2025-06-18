using Core.Database;
using Domain.Stories.Entities;
using Microsoft.EntityFrameworkCore;
using Domain.Users.Enums;
using Task = Domain.Tasks.Entities.Task;

namespace Domain.Users.Entities;

public sealed class User : EntityBase
{
    private User() { }

    public User(
        string email,
        byte[] passwordHash,
        byte[] passwordSalt,
        UserRole role,
        string? name,
        string? surname,
        int? age,
        string? description)
    {
        Email = email;
        PasswordHash = passwordHash;
        PasswordSalt = passwordSalt;
        Role = role;
        Name = name;
        Surname = surname;
        Age = age;
        Description = description;
    }
    
    
    public string Email { get; private set; } = null!;
    public byte[] PasswordHash { get; private set; } = null!;
    public byte[] PasswordSalt { get; private set; } = null!;
    public UserRole Role { get; private set; }
    public string? Name { get; private set; }
    public string? Surname { get; private set; }
    public int? Age { get; private set; }
    public string? Description { get; private set; }
    public List<Story>? Stories { get; private set; } = new ();
    public List<Task>? Tasks { get; private set; } = new ();

    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>().HasKey(x => x.Id);
        builder.Entity<User>().HasIndex(x => x.Email).IsUnique();
        builder.Entity<User>()
            .HasMany(u => u.Stories)
            .WithOne(s => s.User)
            .HasForeignKey(s => s.UserId);
        builder.Entity<User>()
            .HasMany(u => u.Tasks)
            .WithOne(t => t.User)
            .HasForeignKey(t => t.UserId);
    }
}