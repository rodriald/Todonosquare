using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Todonosquare.Data.Entities;

namespace Todonosquare.Data
{
    public class TodonosquareContext : DbContext
    {
        public TodonosquareContext(DbContextOptions<TodonosquareContext> options)
        : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Entities.Task> Tasks { get; set; } = null!;
    }
}
