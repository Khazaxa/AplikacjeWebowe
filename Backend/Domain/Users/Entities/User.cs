using Core.Database;
using Microsoft.EntityFrameworkCore;
using Domain.Users.Enums;

namespace Domain.Users.Entities;

public class User : EntityBase
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

    
    public static void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>().HasKey(x => x.Id);
        builder.Entity<User>().HasIndex(x => x.Email).IsUnique();
    }
}