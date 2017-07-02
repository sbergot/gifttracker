namespace WebApplication.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Infrastructure;
    using WebApplication.Models;
    using Microsoft.Extensions.Configuration;
    public class ApplicationDbContextFactory : IDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext Create(DbContextFactoryOptions options)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            var builder = new ConfigurationBuilder()
                .SetBasePath(options.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

            optionsBuilder.UseNpgsql(builder.Build().GetConnectionString("DefaultConnection"));
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}