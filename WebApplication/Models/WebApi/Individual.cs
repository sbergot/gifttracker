namespace WebApplication.Models.WebApi
{
    using System;

    public class Individual
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime BirthDay { get; set; }
    }
}
