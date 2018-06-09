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
            builder.Entity<UserMail>().HasKey(m => m.Mail);
            builder.Entity<Gift>().Property(g => g.Status).HasDefaultValue(GiftStatus.None);
            builder.Entity<Gift>().Property(g => g.IsVisibleToOthers).HasDefaultValue(true);
            builder.Entity<IndividualInGroup>().HasKey(ig => new { ig.IndividualId, ig.GroupId });
            builder.Entity<IndividualVisibility>().HasKey(ig => new { ig.ViewerId, ig.ViewedId });
        }

        public DbSet<Gift> Gifts { get; set; }

        public DbSet<Event> Events { get; set; }

        public DbSet<Individual> Individuals { get; set; }

        public DbSet<UserMail> UserMails { get; set; }

        public DbSet<IndividualInGroup> IndividualInGroups { get; set; }

        public DbSet<IndividualVisibility> IndividualVisibility { get; set; }

        public DbSet<GiftReceiver> GiftReceiver { get; set; }
    }
}
