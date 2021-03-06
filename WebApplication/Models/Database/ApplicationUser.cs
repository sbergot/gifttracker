namespace WebApplication.Models.Database
{
    using Microsoft.AspNetCore.Identity;

    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public int? IndividualId { get; set; }

        public Individual Individual { get; set; }
    }
}
