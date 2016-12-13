namespace WebApplication.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using WebApplication.Models;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);

            builder.Entity<Occurence>()
                .HasOne(o => o.Receiver)
                .WithMany(i => i.Occurences)
                .HasForeignKey(o => o.ReceiverId);
        }

        public DbSet<Gift> Gifts { get; set; }

        public DbSet<Occurence> Occurences { get; set; }

        public DbSet<Event> Events { get; set; }

        public DbSet<Individual> Individuals { get; set; }
    }
}
