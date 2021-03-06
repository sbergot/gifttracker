using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using WebApplication.Data;
using WebApplication.Models.Database;
using WebApplication.Services.Contracts;
using WebApplication.Services.Implementations;

namespace WebApplication
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication().AddGoogle(options => {
                options.ClientId = "746883940309-u02mtkurgh8ha54bf361iv0r5v63q0tl.apps.googleusercontent.com";
                options.ClientSecret = "nDnaB7YKhSVB-Bzv-cwcp9g6";
                options.Scope.Add("email");
                options.Scope.Add("openid");
            });

            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IAccessControlService, AccessControlService>();
            services.AddScoped<IGiftReceiverService, GiftReceiverService>();

            services
                .AddMvc()
                .AddRazorPagesOptions(options =>
                { options.Conventions.AuthorizeFolder("/"); })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddScoped<WebApplication.Filters.ApiExceptionFilter>();

            services.Configure<GzipCompressionProviderOptions>(options => 
                options.Level = System.IO.Compression.CompressionLevel.Optimal);
            services.AddResponseCompression();

            services.AddLogging(loggingBuilder => {
                loggingBuilder.AddConsole();
                loggingBuilder.AddDebug();
                loggingBuilder.AddConfiguration(Configuration.GetSection("Logging"));
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }
            app.UseResponseCompression();

            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
