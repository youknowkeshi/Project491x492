using Demo_c_.Models;
using Microsoft.EntityFrameworkCore;

namespace Demo_c_.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext() { }

        public AppDbContext(DbContextOptions<AppDbContext> option) : base(option) { }

        public DbSet<UsersModels> users { get; set; }


    }
}
