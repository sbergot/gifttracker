namespace WebApplication.Models
{
    using System;

    public class Individual
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime BirthDay { get; set; }

        public string UserId { get; set; }

        public ApplicationUser User { get; set; }
    }
}
